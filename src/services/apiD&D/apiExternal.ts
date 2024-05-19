import axios, { AxiosError } from 'axios';

export function setupAPIClientExternal() {
    const api = axios.create({
        baseURL: 'https://www.dnd5eapi.co',
    });

    api.interceptors.response.use(
        response => response,
        (error: AxiosError) => {
            if (error.response?.status === 401) {
                console.error("Acesso Não Autorizado - 401");
            }
            return Promise.reject(error);
        }
    );

    return api;
}
