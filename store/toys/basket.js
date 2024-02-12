import {defineStore} from "pinia";
import api from "~/composables/api";

const basketKey = "toyCart";

const state = () => ({
    list: [],
})

const getters = {
    getList: state => state.list,
    getIdList: state => state.list.map(({id}) => id),
}

const actions = {
    // Получить игрущки из корзины
    fetchCart() {
        if (process.server) return;
        const cartString = localStorage.getItem(basketKey);
        this.list = cartString ? JSON.parse(cartString) : [];
    },

    // Синхронизировать со списком id
    syncStorageList() {
        localStorage.setItem(basketKey, JSON.stringify(this.list))
    },

    // Добавить игрушку
    async addToy(toy) {
        this.list.push(toy);
        this.syncStorageList();
    },

    // Добавить игрушку
    async removeToy(toy) {
        const index = this.list.findIndex(({id}) => toy.id === id);
        if (index < 0) return;
        this.list.splice(index, 1);
        this.syncStorageList();
    },
}

export const useToysCartStore = defineStore("toysCart", {
    state, getters, actions
})