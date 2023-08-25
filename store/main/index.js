import { defineStore } from 'pinia'
import api from "~/composables/api";

const state = () => ({
    // Интересные уроки
    interestingSubjects: null,

    // Центры с высоким рейтингом
    topCenters: null,

    // Список категорий
    categories: null,
})

const getters = {
    // Интересные уроки
    getInterestingSubjects: state => state.interestingSubjects || [],

    // Центры с высоким рейтингом
    getTopCenters: state => state.topCenters || [],

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

    // Запросить центры с высоким рейтингом
    async fetchTopCenters() {
        if (this.topCenters) return;
        const { body, err } = await api("/institution/top");
        if (!err) this.topCenters = body;
    },
}

export const useMainStore = defineStore("main", {
    state,
    getters,
    actions,
})