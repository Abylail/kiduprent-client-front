import {useFetch, useRuntimeConfig} from "nuxt/app";

const apiErrorCatcher = error => {
    console.log("API ERROR", error)
}

export const api = async (path) => new Promise(resolve => {
    const config = useRuntimeConfig();
    useFetch(config.public.BACKEND_URL + path, {})
        .then(({data, error}) => {
            if (error.value) apiErrorCatcher(error.value);
            resolve({body: data?.value?.body, err: error.value});
        })
})