import {defineStore} from "pinia";
import api from "~/composables/api";

const pageCount = 10;

const state = () => ({
    feed: null,
    haveMore: true,
    page: 0,
});

export const getters = {
    getFeed: state => state.feed || [],
    getHaveMore: state => state.haveMore,
}

export const actions = {

    async fetchSubjectsInit() {
        if (this.feed) return;
        const { body, err } = await api("/institutionSubject/feed", {params: {limit: pageCount, offset: 0}});
        this.feed = body;
    },

    async fetchSubjectsMore() {
        if (!this.haveMore) return;
        this.page++;
        const { body, err } = await api("/institutionSubject/feed", {params: {limit: pageCount, offset: this.page * pageCount}});
        this.feed = [...this.feed, ...body];
        if (body.length < pageCount) this.haveMore = false;
    },
}

export const useSubjectFeedStore = defineStore("subjectFeed", {
    state,
    getters,
    actions,
})