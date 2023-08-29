import {useFetch, useRuntimeConfig} from "nuxt/app";

// Обработка ошибок
const apiErrorCatcher = error => {
    console.log("API ERROR", error)
}

// Создание ссылки
const createPath = (path, config) => config.public.BACKEND_URL + path;

// GET
const get = async (path, options = {}) => new Promise(resolve => {
    const config = useRuntimeConfig();
    const apiPath = createPath(path, config);
    useFetch(apiPath, options)
        .then(({data, error}) => {
            if (error.value) apiErrorCatcher(error.value);
            resolve({body: data?.value?.body, err: error.value});
        })
});

// POST
const post = async (path, body = {}, options = {}) => new Promise(resolve => {
    const config = useRuntimeConfig();
    const apiPath = createPath(path, config);
    useFetch(apiPath, {
        ...options,
        method: "post",
        body,
    })
        .then(({data, error}) => {
            if (error.value) apiErrorCatcher(error.value);
            resolve({body: data?.value?.body, err: error.value});
        })
});

const api = get
api.get = get
api.post = post

export default api;