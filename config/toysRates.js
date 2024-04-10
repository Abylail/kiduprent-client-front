import {computed} from "vue";

export const rates = computed((n) => {
    const nuxtApp = useNuxtApp()
    return [
        {
            name_ru: nuxtApp.$t("6_month"),
            price: 125040,
            price_monthly: 20840,
            stars: 3,
            pluses: [
                "100 токенов",
                "Бесплатная доставка",
                "Доступ в каталог с 100+ товарами",
                "Безграничная замена",
                "Скидка на сдедующую подписку 20%",
            ],
            minuses: [],
            duration: 6
        },
        {
            name_ru: nuxtApp.$t("3_month"),
            price: 67500,
            price_monthly: 22500,
            stars: 2,
            pluses: [
                "100 токенов",
                "Бесплатная доставка",
                "Доступ в каталог с 100+ товарами",
                "3 замены",
                "Скидка на сдедующую подписку 20%",
            ],
            minuses: [
                "Безграничная замена",
            ],
            duration: 3
        },
        {
            name_ru: nuxtApp.$t("1_month"),
            price: 29167,
            price_monthly: 29167,
            stars: 1,
            pluses: [
                "100 токенов",
                "Бесплатная доставка",
                "Доступ в каталог с 100+ товарами",
                "1 замена"
            ],
            minuses: [
                "Безграничная замена",
                "Скидка на сдедующую подписку 20%",
            ],
            duration: 1
        },
        {
            name_ru: nuxtApp.$t("1_week"),
            price: 21000,
            price_monthly: 21000,
            stars: 0,
            pluses: [
                "100 токенов",
                "Бесплатная доставка",
                "Доступ в каталог с 100+ товарами",
            ],
            minuses: [
                "Замена товара",
                "Безграничная замена",
                "Скидка на сдедующую подписку 20%",
            ],
            duration: 0.25
        }
    ]
})