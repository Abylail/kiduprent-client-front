import { defineStore } from 'pinia'

const state = () => ({
    // Интересные уроки
    interestingLessons: null,
})

const getters = {
    // Интересные уроки
    getInterestingLessons: state => state.interestingLessons || [],
}

const actions = {
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