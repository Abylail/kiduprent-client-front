import { defineStore } from 'pinia'
import api from "~/composables/api";

const state = () => ({
    // Интересные уроки
    interestingSubjects: null,

    // Список категорий
    categories: null,
})

const getters = {
    // Интересные уроки
    getInterestingSubjects: state => state.interestingSubjects || [],

    // Список категорий
    getCategories: state => state.categories || [],
}

const actions = {
    // Запросить категории
    async fetchCategories() {
        if (this.categories) return;
        const { body, err } = await api.get("/category/get");
        if (!err) this.categories = body;
    },

    // Запросить списки уроков
    async fetchMainLists() {
        await Promise.all([
            this.fetchInterestingSubjects()
        ])
    },

    // Запросить интересные уроки
    async fetchInterestingSubjects() {
        if (this.interestingSubjects) return;
        const { body, err } = await api("/category/populyarnye/getInstitutionSubjects");
        if (!err) this.interestingSubjects = body;
    },
}

export const useMainStore = defineStore("main", {
    state,
    getters,
    actions,
})