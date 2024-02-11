import {defineStore} from "pinia";
import api from "~/composables/api";

const state = () => ({
    list: null,
})

const getters = {
    getList: state => state.list || [],
}

const actions = {
    // Получить игрущки
    async fetchList() {
        if (this.list) return;
        const { body, err } = await api.get("/toy/get");
        if (!err) this.list = body;
    },
}

export const useToysStore = defineStore("toys", {
    state, getters, actions
})