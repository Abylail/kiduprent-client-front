import {defineNuxtRouteMiddleware} from "nuxt/app";
import {useAuthStore} from "~/store/client/auth";

export default defineNuxtRouteMiddleware(async(to, from) => {
    const authStore = useAuthStore();
    if (!authStore.isAuth) {
        await authStore.loginToken();
    }
})