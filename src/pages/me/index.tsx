import Head from 'next/head'
import { useState, useEffect } from 'react'
import { Header } from '@/components/Header'
import Router, { useRouter } from 'next/router'
import { UserProps } from '../dashboard'

import styles from './styles.module.scss'
import { canSSRAuth } from '@/utils/canSSRAuth'
import { setupAPIClient } from '@/services/api'

export default function Me() {
    const router = useRouter()
    const { id, name, email, avatar, char_limit } = router.query;
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
            <Head>
                <title>Perfil - D&D</title>
            </Head>
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

export const getServerSideProps = canSSRAuth(async (ctx) => {

    return {
        props: {

        }
    }
})