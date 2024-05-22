import { createContext, ReactNode, useState, useEffect } from "react";

import { api } from "@/services/apiClient";

import { destroyCookie, setCookie, parseCookies } from "nookies";
import Router from "next/router";

import { toast } from "react-toastify";

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
    signOut: () => void;
    signUp: (credentials: SignUpProps) => Promise<void>;
    isPlaying: boolean;
    volume: number;
    togglePlayPause: () => void;
    setVolume: (volume: number) => void;
    currentTrack: string;
    nextTrack: () => void;

}

type UserProps = {
    id: string;
    name: string;
    email: string;
    avatar: string | null;
}

type SignInProps = {
    email: string;
    password: string;
}

type SignUpProps = {
    name: string;
    email: string;
    password: string;
}

type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData)

export function signOut() {
    try {
        destroyCookie(undefined, '@d&d.token')
        Router.push('/')
    } catch {
        console.log('erro ao deslogar')

    }
}



export function AuthProvider({ children }: AuthProviderProps) {

    const [user, setUser] = useState<UserProps>({ id: '', name: '', email: '', avatar: null })
    const isAuthenticated = !!user;

    const [isPlaying, setIsPlaying] = useState(true);
    const [volume, setVolume] = useState(0.5);
    const [currentTrack, setCurrentTrack] = useState('./Morrowind-soundtrack.mp3')

    const tracks = [
        './Morrowind-soundtrack.mp3',
        './The-Dragonborn-comes.mp3',
        './Dragonborn.mp3',
        './Awake.mp3',
        './Queen-of-lost-world.mp3'
    ];
    const nextTrack = () => {
        const randomIndex = Math.floor(Math.random() * tracks.length);
        //console.log("proxima track");
        setCurrentTrack(tracks[randomIndex]);
    }


    useEffect(() => {
        const { '@d&d.token': token } = parseCookies();

        if (token) {
            api.get('/me').then(response => {
                const { id, name, email, avatar } = response.data;

                setUser({
                    id,
                    name,
                    email,
                    avatar
                })
            }).catch(() => {
                //deslog do usuario em caso de erro.
                signOut();
            })
        }
    }, [])

    async function signIn({ email, password }: SignInProps) {
        try {
            const response = await api.post('/session', {
                email,
                password
            })

            //console.log(response.data)
            const { id, name, token } = response.data

            setCookie(undefined, '@d&d.token', token, {
                maxAge: 60 * 60 * 24 * 30, //validade de 1 mes
                path: "/" //setando quais caminhos terão acesso ao cookie
            })

            setUser({
                id,
                name,
                email,
                avatar: null,
            })

            //passando o token para outras requisições

            api.defaults.headers['Authorization'] = `Bearer ${token}`

            //mandar para o dashboard, inicio do sistema, qualquer coisa do tipo
            toast.success("Bem vindo, jogador!")

            Router.push('/dashboard')

        } catch (err: any) {

            if (err.request.status === 400) {
                toast.error(err.response.data.error)


            }


        }



    }
    async function signUp({ name, email, password }: SignUpProps) {
        try {

            const response = await api.post('/users', {
                name,
                email,
                password
            })
            //colocar um toastify aqui
            toast.success("Conta criada com sucesso!")
            //console.log(response.data);

            Router.push('/');

        } catch (err) {
            //colocar um toastify aqui
            toast.error("Erro ao criar a conta")
            console.log("Erro ao criar uma conta", err)
        }
    }
    const togglePlayPause = () => {
        setIsPlaying(prev => !prev);
    };

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated,
            signIn,
            signOut,
            signUp,
            isPlaying,
            volume,
            togglePlayPause,
            setVolume,
            currentTrack,
            nextTrack
        }}>
            {children}
        </AuthContext.Provider>
    )
}