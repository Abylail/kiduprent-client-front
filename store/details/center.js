import { defineStore } from 'pinia'
import api from "~/composables/api";

const state = () => ({
    // Основная информация о уроке
    centerInfo: null,
})

const getters = {
    // Основная информация о уроке
    getCenterInfo: state => state.centerInfo || null,
}

const actions = {
    // Запросить основную информацию
    async fetchCenterInfo({id}) {
        if (this.centerInfo?.id === id) return;
        const {body, err} = await api.get(`/institution/details/${id}`);
        if (!err) this.centerInfo = body;
    },
}

export const useCenterDetailsStore = defineStore("centerDetails", {
    state,
    getters,
    actions,
})