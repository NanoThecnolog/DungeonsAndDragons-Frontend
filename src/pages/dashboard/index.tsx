import { useState } from "react"

import { canSSRAuth } from "@/utils/canSSRAuth"
import Head from "next/head"
import { Header } from "@/components/Header"
import Card from "@/components/Card"
import styles from './styles.module.scss'
import Link from "next/link"
import { FaPlusCircle } from "react-icons/fa"
import { IoIosSettings } from "react-icons/io"

import { setupAPIClient } from "@/services/api"

//fazer um condicional para geração dos cards de acordo com a quantidade de personagens criados.

//estipular limite de 5 personagens? criar uma opção de virar doador e permitir criação de mais personagens, ou retirada do limite?

//criar funcionalidades para doadores? preciso ganhar dinheiro....

type UserProps = {
    id: string;
    name: string;
    email: string;
    avatar: string | null;

}
type ClassProps = {
    level: string;
    name: string;
    id: string;
}
type CharProps = {
    id: string;
    name: string;
    title: string | null;
    race: string;
    char_class: ClassProps[];
    image: string | null;
}

interface HomeProps {
    user: UserProps
    charList: CharProps[]
}


export default function Dashboard({ user, charList }: HomeProps) {

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [avatar, setAvatar] = useState(user.avatar);
    const [userId, setUserId] = useState(user.id);

    const [char, setChar] = useState(charList || []);

    const [charLimit, setCharLimit] = useState('5');

    return (
        <>
            <Head>
                <title>Dashboard - D&D</title>
            </Head>
            <Header />
            <main className={styles.container}>
                <h1>Dashboard</h1>
                <section>
                    <div className={styles.containerPerfil}>
                        <div className={styles.userSettings}>
                            <h2>Perfil</h2>
                            <Link href="/me">
                                <button title="Editar informações da conta">
                                    <IoIosSettings color="var(--color-text)" size={25} />
                                </button>
                            </Link>
                        </div>
                        <div className={styles.userData}>
                            <div className={styles.data}>
                                <p>Nome:</p>
                                <p>{name}</p>
                                <p>{userId}</p>
                            </div>
                            <div className={styles.data}>
                                <p>Email:</p>
                                <p>{email}</p>
                            </div>
                            <div className={styles.data}>
                                <p>Personagens:</p>
                                <p>{char.length}/{charLimit}</p>
                            </div>
                            <div className={styles.avatar}>
                                {avatar ? avatar : "sem avatar"}
                            </div>
                            <div>

                            </div>
                        </div>
                    </div>
                    <div className={styles.containerCard}>
                        <div className={styles.charList}>
                            <h2>Jogar</h2>
                            <Link href="/new_char">
                                <button type="button" title="Criar Personagem!">
                                    <FaPlusCircle size={20} />
                                </button>
                            </Link>

                        </div>
                        {char.map(item => (
                            <Card key={item.id}
                                name={item.name}
                                race={item.race}
                                title={item.title}
                                char_class={item.char_class}
                                image={item.image}

                            />
                        ))}


                    </div>
                </section>
            </main>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

    const apiClient = setupAPIClient(ctx);
    const response = await apiClient.get('/me')
    const charList = await apiClient.get('/char/list')
    //console.log(charList.data);


    return {
        props: {
            user: response.data,
            charList: charList.data
        }
    }
})