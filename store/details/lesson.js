import { defineStore } from 'pinia'
import api from "~/composables/api";

const state = () => ({
    // Основная информация о уроке
    lessonMainInfo: null,
})

const getters = {
    // Основная информация о уроке
    getLessonInfo: state => state.lessonInfo || {},
}

const actions = {
    // Запросить основную информацию
    async fetchLessonMainInfo({id}) {
        if (this.lessonInfo?.id === id) return;
        this.lessonInfo = null;
    },
}

export const useLessonDetailsStore = defineStore("lessonDetails", {
    state,
    getters,
    actions,
})