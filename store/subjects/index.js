import {defineStore} from "pinia";
import api from "~/composables/api";

const pageCount = 100;

const state = () => ({
    // Список предметов
    list: null,

    // Страница поиска
    page: 0,

    // Есть ли еще ?
    haveMore: true,
})

const getters = {
    getList: state => state.list || [],
    getHaveMore: state => state.haveMore
}

const actions = {

    // Изначальный запрос
    async fetchListInit() {
        if (this.list) return;
        const { body, err } = await api("/subject/get", {params: {limit: pageCount, offset: 0}});
        this.list = body;
    },

    // Запрос дополнительный инфы
    async fetchListMore(page) {
        if (page <= this.page) return;
        this.page = page;
        const { body, err } = await api("/subject/get", {params: {limit: pageCount, offset: page * pageCount}});
        this.list = [...this.list, ...body];
        if (body.length < pageCount) this.haveMore = false;
    },
}

export const useSubjectsStore = defineStore("subjects", {
    state,
    getters,
    actions,
})