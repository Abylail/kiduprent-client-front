import api from "~/composables/api";
import cookie from "~/composables/cookie";
import {defineStore} from "pinia";

const state = () => ({
    // Дети
    children: null,
})

const getters = {
    // Дети
    getChildren: state => state.children || [],
}

const actions = {
    // Получить детей
    async fetchChildren() {
        const { err, body } = await api("/parent/data/children/get")
        if (!err) this.children = body;
    },

    // Добавить ребенка
    async addChild(childInfo) {
        const { err, body } = await api.post("/parent/data/children/add", childInfo)
        if (!err) this.children = body;
    },

    // Обновить ребенка
    async updateChild(childInfo) {
        const { err, body } = await api.put("/parent/data/children/update", childInfo)
        if (!err) this.children = body;
    },
}

export const useParentChildrenStore = defineStore("parentChildren", {
    state,
    getters,
    actions,
})