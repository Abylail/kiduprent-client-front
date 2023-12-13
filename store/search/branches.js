import { defineStore } from 'pinia'
import api from "~/composables/api";

// Собрать поисковый запрос без page
const getSearchOptions = args => (JSON.stringify({...args, page: undefined}))

const state = () => ({
    // Список филиалов (адресов)
    branches: null,
    bLastSearchOptions: null,
})

const getters = {
    // Список филиалов (адресов)
    getBranches: state => state.branches || [],
}

const actions = {

    /**
     * Поиск по филиалам
     * @param {Object<subjectId<string|number|null>>} - id урока
     * */
    async searchBranches({ categoryId = null, subjectId = null }) {
        if (this.branches && getSearchOptions(arguments[0]) === this.bLastSearchOptions) return;
        this.branches = null;
        const {body, err} = await api.get("/search/branches", {
            params: {
                categoryId: categoryId,
                subjectId: subjectId,
            },
        });
        if (!err) {
            this.branches = body;
            this.bLastSearchOptions = getSearchOptions(arguments[0]);
        }
    }
}

export const useSearchBranchesStore = defineStore("searchBranches", {
    state,
    getters,
    actions,
})