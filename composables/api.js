import {useFetch, useRuntimeConfig, useRequestHeaders} from "nuxt/app";

// Обработка ошибок
const apiErrorCatcher = error => {
    console.log("API ERROR", error)
}

// Создание ссылки
const createPath = (path, config) => config.public.BACKEND_URL + path;

// Создание опций
const createOptions = (options = {}) => ({credentials: "include", headers: useRequestHeaders(["cookie"]), ...options})

// GET
const get = async (path, options = {}) => new Promise(resolve => {
    const config = useRuntimeConfig();
    const apiPath = createPath(path, config);
    const apiOptions = createOptions(options);
    useFetch(apiPath, apiOptions)
        .then(({data, error}) => {
            if (error.value) apiErrorCatcher(error.value);
            resolve({body: data?.value?.body, err: error.value});
        })
});

// POST
const post = async (path, body = {}, options = {}) => new Promise(resolve => {
    const config = useRuntimeConfig();
    const apiPath = createPath(path, config);
    const apiOptions = createOptions(options);
    useFetch(apiPath, {
        ...apiOptions,
        method: "post",
        body,
    })
        .then(({data, error}) => {
            if (error.value) apiErrorCatcher(error.value);
            resolve({body: data?.value?.body, err: error.value});
        })
});

// PUT
const put = async (path, body = {}, options = {}) => new Promise(resolve => {
    const config = useRuntimeConfig();
    const apiPath = createPath(path, config);
    const apiOptions = createOptions(options);
    useFetch(apiPath, {
        ...apiOptions,
        method: "put",
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
api.put = put

export default api;