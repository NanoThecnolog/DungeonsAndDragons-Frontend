import axios, { AxiosError } from 'axios'
import { parseCookies } from 'nookies'
import { AuthTokenError } from './errors/AuthTokenError'

import { signOut } from '@/contexts/AuthContext'
import { GetServerSidePropsContext } from 'next'

export function setupAPIClient(ctx?: GetServerSidePropsContext) {

    let cookies = parseCookies(ctx)

    const api = axios.create({
        baseURL: 'http://localhost:3333',
        headers: {
            Authorization: `Bearer ${cookies['@d&d.token']}`
        }
    })

    api.interceptors.response.use(response => {
        return response;
    }, (error: AxiosError) => {
        if (error.response?.status === 401) {
            if (typeof window !== undefined) {
                //chamar função de deslogar
                signOut();
            } else {
                return Promise.reject(new AuthTokenError())
            }
        }

        return Promise.reject(error);
    })

    return api;

}