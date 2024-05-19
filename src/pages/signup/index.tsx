import { FormEvent, useState, useContext } from "react";

import Head from "next/head"
import styles from "../../../styles/home.module.scss";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/Button";

import { AuthContext } from "@/contexts/AuthContext";

import { toast } from "react-toastify";

import Link from "next/link";



export default function SignUp() {

    const { signUp } = useContext(AuthContext);
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [loading, setLoading] = useState(false)

    async function handleSignUp(event: FormEvent) {
        event.preventDefault();

        if (name === '' || email === '' || password === '') {
            //colocar um toastify
            toast.warning("Preencha tudo para criar uma conta")
            return;
        }

        setLoading(true);

        let data = {
            name,
            email,
            password
        }

        await signUp(data)

        setLoading(false);
    }


    return (
        <>
            <Head>
                <title>Cadastro - D&D</title>
            </Head>
            <div className={styles.container}>
                <div className={styles.containerCenter}>
                    <h1>Criando conta</h1>
                    <div className={styles.login}>
                        <form onSubmit={handleSignUp}>
                            <Input
                                placeholder="Digite seu nome"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
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
                            <Button
                                type="submit"
                                loading={loading}

                            >Cadastrar</Button>
                        </form>
                        <Link href="/" legacyBehavior>
                            <a className={styles.text}>Já possui uma conta? Faça Login!</a>
                        </Link>
                    </div>

                </div>

            </div>
        </>
    )
}