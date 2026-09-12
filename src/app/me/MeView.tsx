"use client";
import { useState, useEffect } from 'react'
import { Header } from '@/components/Header'
import { useSearchParams } from 'next/navigation'

import styles from './styles.module.scss'
import type { UserProps } from '@/types/user'

export default function MeView() {
    const searchParams = useSearchParams()
    const id = searchParams.get('id')
    const name = searchParams.get('name')
    const email = searchParams.get('email')
    const avatar = searchParams.get('avatar')
    const char_limit = searchParams.get('char_limit')
    const [userData, setUserData] = useState<UserProps | null>(null)

    useEffect(() => {
        if (id && name && email) {
            const decodedData: UserProps = {
                id: decodeURIComponent(id as string),
                name: decodeURIComponent(name as string),
                email: decodeURIComponent(email as string),
                avatar: avatar ? decodeURIComponent(avatar as string) : null,
                char_limit: decodeURIComponent(char_limit as string)
            };
            setUserData(decodedData)
        }
    }, [id, name, email, avatar, char_limit]);

    if (!userData) {
        return <div>Carregando...</div>
    }

    return (
        <>
            <Header />
            <main className={styles.container}>
                <article className={styles.articleContainer}>
                    <div>
                        Página do perfil da conta
                    </div>
                    {userData.name && (
                        <p>Nome: {userData.name}</p>
                    )}
                    {userData.email && (
                        <p>Email: {userData.email}</p>
                    )}
                    {userData.avatar &&
                        userData.avatar === null ? (<p>Avatar: {userData.avatar}</p>) : (<p>Avatar: Sem Avatar</p>)
                    }
                    {userData.char_limit && (
                        <p>Limite de personagens: {userData.char_limit}</p>
                    )}
                </article>
            </main>
        </>
    )
}