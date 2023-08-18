import { defineStore } from 'pinia'
import {api} from "~/composables/api";

const state = () => ({
    // Интересные уроки
    interestingLessons: null,

    // Список категорий
    categories: null,
})

const getters = {
    // Интересные уроки
    getInterestingLessons: state => state.interestingLessons || [],

    // Список категорий
    getCategories: state => state.categories || [],
}

const actions = {
    // Запросить категории
    async fetchCategories() {
        if (this.categories) return;
        const { body, err } = await api("/category/get");
        if (!err) this.categories = body;
    },

    // Запросить списки уроков
    fetchMainLists() {
        this.fetchInterestingLessons();
    },

    // Запросить интересные уроки
    fetchInterestingLessons() {
        this.interestingLessons = [{}, {}];
    },
}

export const useMainStore = defineStore("main", {
    state,
    getters,
    actions,
})