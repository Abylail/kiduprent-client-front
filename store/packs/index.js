import api from "~/composables/api";
import {defineStore} from "pinia";

const state = () => ({
    categories: null,
})

const getters = {
    getMainCategory: state => state.categories?.[0] || null,
    getCategories: state => state.categories?.slice(1) || [],
}

const actions = {
    // Запросить категории и пакеты
    async fetchPackCategories() {
        if (this.categories) return;
        const { body, err } = await api.get("/toyPacks/categories");
        if (!err) this.categories = body;
    },
}

export const usePacksStore = defineStore("packs", {
    state,
    getters,
    actions,
})