import { defineStore } from 'pinia'
import api from "~/composables/api";

const state = () => ({
    // Список категорий
    lessons: null,
})

const getters = {
    // Список уроков
    getLessons: state => state.lessons || [],
}

const actions = {
    /**
     * Поиск по урокам
     * @param {Object<subjectId<string|number|null>>} - id урока
     * */
    async searchLessons({subjectId = null}) {
        this.lessons = null;
        const {body, err} = await api.$get("/search/lessons", {
            params: {
                subjectId: subjectId
            },
        });
        if (!err && body) this.lessons = body;
    },
}

export const useSearchLessonsStore = defineStore("searchLessons", {
    state,
    getters,
    actions,
})