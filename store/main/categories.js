import { defineStore } from 'pinia'
import api from "~/composables/api";

const state = () => ({
    // Список категорий
    categories: null,
})

const getters = {
    // Список категорий
    getCategories: state => state.categories || [],
}

const actions = {
    // Запросить категории
    async fetchCategories() {
        if (this.categories) return;
        const {body, err} = await api.get("/category/get");
        if (!err) this.categories = body;
    },
}

export const useMainCategoriesStore = defineStore("mainCategories", {
    state,
    getters,
    actions,
})