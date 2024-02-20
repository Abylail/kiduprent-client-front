import {computed} from "vue";

export const rates = computed((n) => {
    const nuxtApp = useNuxtApp()
    return [
        {
            name_ru: nuxtApp.$t('6_month'),
            price: 89996,
            price_monthly: 14999,
            duration: 6,
        },
        {
            name_ru: nuxtApp.$t('3_month'),
            price: 47996,
            price_monthly: 15999,
            duration: 3,
        },
        {
            name_ru: nuxtApp.$t('1_month'),
            price: 17990,
            price_monthly: 17990,
            duration: 1,
        },
        {
            name_ru: nuxtApp.$t('1_week'),
            price: 8999,
            price_monthly: 8999,
            duration: 0.25,
        },
    ]
})