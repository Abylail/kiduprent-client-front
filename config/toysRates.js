import {computed} from "vue";

export const rates = computed((n) => {
    const nuxtApp = useNuxtApp()
    return [
        {
            name_ru: nuxtApp.$t('6_month'),
            price: 112200,
            price_monthly: 18700,
            duration: 6,
        },
        {
            name_ru: nuxtApp.$t('3_month'),
            price: 59997,
            price_monthly: 19999,
            duration: 3,
        },
        {
            name_ru: nuxtApp.$t('1_month'),
            price: 22400,
            price_monthly: 22400,
            duration: 1,
        },
        {
            name_ru: nuxtApp.$t('1_week'),
            price: 11200,
            price_monthly: 11200,
            duration: 0.25,
        },
    ]
})