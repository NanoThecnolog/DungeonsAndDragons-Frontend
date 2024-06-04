import { useContext, FormEvent, useState } from "react";
import Head from "next/head"
import styles from "../../styles/home.module.scss";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/Button";
import { AuthContext } from "@/contexts/AuthContext";
import { toast } from "react-toastify";
import Link from "next/link";
import { canSSRGuest } from "@/utils/canSSRGuest";



export default function Home() {

    const { signIn } = useContext(AuthContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(Boolean);

    async function handleLogin(event: FormEvent) {
        event.preventDefault();

        if (email === '' || password === '') {
            //colocar um toastify aqui
            toast.warning("Preencha com email e senha para logar")
            return;
        }

        setLoading(true);

        let data = {
            email,
            password
        }
        console.log("Tentando realizar login com: ", data);
        await signIn(data)

        setLoading(false);
    }


    return (
        <>
            <Head>
                <title>Login - D&D</title>
            </Head>

            <div className={styles.container}>
                <div className={styles.containerCenter}>
                    <h1>Login</h1>
                    <div className={styles.login}>
                        <form onSubmit={handleLogin}>
                            <Input
                                placeholder="Digite seu email"
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <Input
                                placeholder="Digite sua senha"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button type="submit" loading={loading}>
                                Acessar
                            </Button>
                        </form>
                        <Link href="/signup" legacyBehavior>
                            <a className={styles.text}>Não possui uma conta?<br /> Crie uma agora!</a>
                        </Link>
                    </div>

                </div>

            </div>
        </>
    )
}
export const getServerSideProps = canSSRGuest(async (ctx) => {

    console.log("canSSRGuest executado");
    return {
        props: {}
    }
})