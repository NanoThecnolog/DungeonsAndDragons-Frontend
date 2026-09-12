"use client";
import { useContext, FormEvent, useState } from "react";
import styles from "../../styles/home.module.scss";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/Button";
import { AuthContext } from "@/contexts/AuthContext";
import { toast } from "react-toastify";
import Link from "next/link";

export default function LoginView() {
  const { signIn } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    if (email === "" || password === "") {
      toast.warning("Preencha email e senha para realizar login");
      return;
    }
    setLoading(true);
    let data = {
      email,
      password,
    };
    await signIn(data);
    setLoading(false);
  }

  return (
    <>
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
            <Link href="/signup" className={styles.text}>
              <p>Não possui uma conta?</p>
              <p>Crie uma agora!</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
