import { defineStore } from 'pinia'
import api from "~/composables/api";

const pageCount = 5;

// Собрать поисковый запрос без page
const getSearchOptions = args => (JSON.stringify({...args, page: undefined}))

const state = () => ({
    // Список категорий
    centers: null,
    lastSearchOptions: null,

    // Есть ли еще страницы
    haveMore: true,


    // Список филиалов (адресов)
    branches: null,
    bLastSearchOptions: null,
})

const getters = {
    // Список центров
    getCenters: state => state.centers || [],

    // Список филиалов (адресов)
    getBranches: state => state.branches || [],

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

    /**
     * Поиск по филиалам
     * @param {Object<subjectId<string|number|null>>} - id урока
     * */
    async searchBranches({ categoryId = null }) {
        if (this.branches && getSearchOptions(arguments[0]) === this.bLastSearchOptions) return;
        this.branches = null;
        const {body, err} = await api.get("/search/branches", {
            params: {
                categoryId: categoryId,
            },
        });
        if (!err) {
            this.branches = body;
            this.bLastSearchOptions = getSearchOptions(arguments[0]);
        }
    }
}

export const useSearchCentersStore = defineStore("searchCenters", {
    state,
    getters,
    actions,
})