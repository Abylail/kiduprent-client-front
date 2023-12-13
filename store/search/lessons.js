import { defineStore } from 'pinia'
import api from "~/composables/api";

const pageCount = 5;

// Собрать поисковый запрос без page
const getSearchOptions = args => (JSON.stringify({...args, page: undefined}))

const state = () => ({
    // Список категорий
    lessons: null,
    lastSearchOptions: null,

    // Есть ли еще страницы
    haveMore: true,

})

const getters = {
    // Список уроков
    getLessons: state => state.lessons || [],

    // Есть ли еще страницы
    getHaveMore: state => state.haveMore,
}

const actions = {
    /**
     * Поиск по урокам
     * @param {Object<subjectId<string|number|null>,page<number>>} - id урока
     * */
    async searchLessons({subjectId = null,  categoryId = undefined, page = 1}) {
        if (page === 1 && getSearchOptions(arguments[0]) === this.lastSearchOptions) return;
        if (page === 1) this.lessons = null;
        const {body, err} = await api.get("/search/lessons", {
            params: {
                subjectId,
                categoryId,
                offset: (page-1) * pageCount,
                limit: pageCount
            },
        });
        if (!err) {
            if (page === 1) this.lessons = body;
            else this.lessons = [...JSON.parse(JSON.stringify(this.lessons)), ...body];

            this.lastSearchOptions = getSearchOptions(arguments[0]);
            this.haveMore = body?.length === pageCount;
        }
    },
}

export const useSearchLessonsStore = defineStore("searchLessons", {
    state,
    getters,
    actions,
})