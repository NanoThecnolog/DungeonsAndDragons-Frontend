"use client";
import { FormEvent, useState, useContext } from "react";
import styles from "../../../styles/home.module.scss";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/Button";
import { AuthContext } from "@/contexts/AuthContext";
import { toast } from "react-toastify";
import Link from "next/link";

export default function SignUpView() {
    const { signUp } = useContext(AuthContext);
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [char_limit, setCharLimit] = useState(5)
    const [loading, setLoading] = useState(false)

    async function handleSignUp(event: FormEvent) {
        event.preventDefault();
        if (name === '' || email === '' || password === '') {
            toast.warning("É preciso preencher todos os campos para criar uma conta")
            return;
        }
        setLoading(true);
        let data = {
            name,
            email,
            password,
            char_limit
        }
        await signUp(data)
        setLoading(false);
    }

    return (
        <>
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
                        <Link href="/" className={styles.text}>Já possui uma conta? Faça Login!</Link>
                    </div>
                </div>
            </div>
        </>
    )
}