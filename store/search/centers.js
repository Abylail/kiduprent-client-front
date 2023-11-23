import { defineStore } from 'pinia'
import api from "~/composables/api";

const pageCount = 5;

// Собрать поисковый запрос без page
const getSearchOptions = args => (JSON.stringify({...args, page: undefined}))

const state = () => ({
    // Список категорий
    centers: null,

    // Есть ли еще страницы
    haveMore: true,

    lastSearchOptions: null,
})

const getters = {
    // Список центров
    getCenters: state => state.centers || [],

    // Есть ли еще страницы
    getHaveMore: state => state.haveMore,
}

const actions = {
    /**
     * Поиск по урокам
     * @param {Object<categoryId<string|number|null>,page<number>>} - id урока
     * */
    async searchCenters({categoryId = undefined, page = 1}) {
        // Если такой поиск уже сделан
        if (page === 1 && getSearchOptions(arguments[0]) === this.lastSearchOptions) return;
        if (page === 1) this.centers = null;
        const {body, err} = await api.get("/search/centers", {
            params: {
                categoryId: categoryId,
                offset: (page-1) * pageCount,
                limit: pageCount
            },
        });
        if (!err) {
            if (page === 1) this.centers = body;
            else this.centers = [...JSON.parse(JSON.stringify(this.centers)), ...body];

            this.lastSearchOptions = getSearchOptions(arguments[0]);
            this.haveMore = body.length === pageCount;
        }
    },
}

export const useSearchCentersStore = defineStore("searchCenters", {
    state,
    getters,
    actions,
})