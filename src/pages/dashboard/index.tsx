import { useState } from "react"
import { canSSRAuth } from "@/utils/canSSRAuth"
import Head from "next/head"
import { Header } from "@/components/Header";
import Card from "@/components/Card"
import styles from './styles.module.scss'
import Link from "next/link"
import { FaPlusCircle } from "react-icons/fa"
import { IoIosSettings } from "react-icons/io"
import { setupAPIClient } from "@/services/api"
import { toast } from "react-toastify"

//estipular limite de 5 personagens? criar uma opção de virar doador e permitir criação de mais personagens, ou retirada do limite?
//criar funcionalidades para doadores? preciso ganhar dinheiro....
//funcionalidade de selecionar trilha sonora?
//criar um sistema de moedas para realizar certas ações no aplicativo, como criar um item, criar uma organização, etc...
//a ideia é que a conta receba uma fração de moedas de acordo com o tempo que o jogador permanece ativo no jogo.
//posso criar uma lógica que adiciar 0.1 moedas a cada 1hora de conta logada e a partir de determinado valor em moedas ou em tempo logado
//a quantidade de moedas recebidas diminui pra 0.05, para desencorajar o jogador ficar muito tempo no computador....
//cobrar por buff para organizações? vantagens da organização, contratos?

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
    console.log("Renderizando Dashboard ", { user, charList });

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [avatar, setAvatar] = useState(user.avatar);
    // const [userId, setUserId] = useState(user.id);
    const [char, setChar] = useState(charList || []);
    const [charLimit, setCharLimit] = useState('5');
    const apiClient = setupAPIClient();

    async function handleDeleteChar(id: string) {
        // console.log(id)
        try {
            await apiClient.delete('/char', {
                params: {
                    id: id
                }
            })
            toast.success("Personagem Excluído!");
            setChar((prevChar) => prevChar.filter(char => char.id !== id));

        } catch (err) {
            console.log("Erro ao deletar o personagem", err)
            toast.error("Erro ao excluir o personagem!");

        }
    }

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
                                    <IoIosSettings size={25} />
                                </button>
                            </Link>
                        </div>
                        <div className={styles.userData}>
                            <div className={styles.data}>
                                <p>Nome:</p>
                                <p>{name}</p>
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
                        </div>
                    </div>
                    <div className={styles.containerCard}>
                        <div className={styles.charList}>
                            <h2>Personagens</h2>
                            {char.length >= Number(charLimit) ? '' : (
                                <Link href="/new_char">
                                    <button type="button" title="Criar Personagem!">
                                        <FaPlusCircle size={20} />
                                    </button>
                                </Link>
                            )}


                        </div>

                        {char.length >= 1 ? (
                            char.map(item => (
                                <Card
                                    key={item.id}
                                    id={item.id}
                                    name={item.name}
                                    race={item.race}
                                    title={item.title}
                                    char_class={item.char_class}
                                    image={item.image}
                                    onDelete={handleDeleteChar}
                                />
                            ))
                        ) : (
                            <div>Nenhum personagem foi criado</div>
                        )}


                    </div>
                </section>
            </main>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

    const apiClient = setupAPIClient(ctx);
    try {
        const response = await apiClient.get('/me')
        const charList = await apiClient.get('/char/list')
        console.log("Dados do usuario em Dashboard: ", response.data);
        console.log("Lista de personagens em Dashboard: ", charList.data);

        return {
            props: {
                user: response.data,
                charList: charList.data
            }
        }
    } catch (err) {
        console.log("Erro ao buscar dados com a API", err);
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }
})