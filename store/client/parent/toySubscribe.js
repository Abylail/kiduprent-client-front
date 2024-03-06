import api from "~/composables/api";
import {defineStore} from "pinia";

const state = () => ({
    subscribe: null,
    check: false
})

export const getters = {
    getSubscribe: state => state.subscribe,
    getToys: state => !!state.subscribe?.activeToys && JSON.parse(state.subscribe.activeToys) || [],
}

const actions = {

    /**
     * Получить подписку
     * */
    async fetchSubscribe(force = false) {
        if (!force && this.check) return;
        const { err, body } = await api.get("/parent/toySubscribe")
        if (!err && body) this.subscribe = body;
        this.check = true;
    },
}

export const useToySubscribe = defineStore("toySubscribe", {
    state,
    getters,
    actions,
})