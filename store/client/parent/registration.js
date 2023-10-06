import api from "~/composables/api";
import cookie from "~/composables/cookie";
import {defineStore} from "pinia";
import {phoneValidation} from "~/helpers/phone";

const state = () => ({
    registrations: null,
})

const getters = {
    getRegistrations: state => state.registrations || [],
}

const actions = {
    /** Запросить список записей */
    fetchRegistrations() {

    },

    /**
    * Записаться на пробный урок
     * @param trialProperties
     * @param {Date} trialProperties.date
     * @param {Number} trialProperties.child_id
     * @param {Number} trialProperties.institution_group_id
     * @param {String} trialProperties.weekday
     * @param {String} trialProperties.time
     * @return {Promise<Boolean>} - Успешно ли записался
    * */
    async registrationOnTrial(trialProperties) {
        const { err } = await api.post("/parent/register/trial", trialProperties)
        return !err;
    },
}

export const useParentRegistration = defineStore("parentRegistration", {
    state,
    getters,
    actions,
})