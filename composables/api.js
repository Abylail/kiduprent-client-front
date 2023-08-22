import {useFetch, useRuntimeConfig} from "nuxt/app";

// Обработка ошибок
const apiErrorCatcher = error => {
    console.log("API ERROR", error)
}

// Создание ссылки
const createPath = (path, config) => config.public.BACKEND_URL + path;

// GET
const getFetch = async (path, options = {}) => new Promise(resolve => {
    const config = useRuntimeConfig();
    const apiPath = createPath(path, config);
    useFetch(apiPath, options)
        .then(({data, error}) => {
            if (error.value) apiErrorCatcher(error.value);
            resolve({body: data?.value?.body, err: error.value});
        })
});

const api = getFetch
api.get = getFetch

export default api;