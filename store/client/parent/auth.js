import api from "~/composables/api";
import cookie from "~/composables/cookie";
import {defineStore} from "pinia";
import {phoneValidation} from "~/helpers/phone";

const state = () => ({
    // Информация клиента
    clientData: null,

    // Координаты пользователя
    clientCoords: null,
})

const getters = {
    // Информация клиента
    getClientData: state => state.clientData || {},

    // Авторизован ли
    isAuth: state => !!state.clientData,

    // Координаты пользователя
    getClientCoords: state => state.clientCoords,
}

const actions = {

    /**
     * Отправить одноразовый пароль
     * @param {string} phone
     * @return {Promise<boolean>} успешно ли отправлен
     * */
    async sendOtp(phone) {
        if (!phoneValidation(phone)) return false;
        const { err } = await api.post("/parent/sendSms", {phone})
        return !err;
    },

    /**
     * Обычная авторизация (по смс)
     * @param {string} phone
     * @param {string} smsCode
     * @return {Promise<boolean>} - успешно ли отправлен
     * */
    async login(phone, smsCode) {
        if (!phoneValidation(phone) || smsCode?.length !== 4) return false;
        const { err, body } = await api.post("/parent/smsAuth", {phone, sms_code: smsCode})
        if (err) return false;
        this.clientData = body;
        await cookie.userToken.set(body.token);
        return true;
    },

    // Авторизация по токену
    async loginToken() {
        if (!cookie.userToken.get()) return
        const { err, body } = await api("/parent/tokenAuth")
        if (!err) this.clientData = body;
        else this.logout();
    },

    // Выход
    logout() {
        if (process.client) cookie.userToken.remove();
    },

    // Обновить данные родителя
    async updateParentInfo(parentInfo = {}) {
        const { err, body } = await api.put("/parent/data/update", parentInfo)
        if (!err && body) this.clientData = body;
    },

    // Записать координаты пользователя
    setUserCoords(coords) {
        this.clientCoords = JSON.parse(JSON.stringify(coords));
    },

    async sendSurvey(answer) {
        const { err, body } = await api.post("/toy/survey", {answer})
        if (!err && body) this.clientData = body;
    },
}

export const useAuthStore = defineStore("auth", {
    state,
    getters,
    actions,
})