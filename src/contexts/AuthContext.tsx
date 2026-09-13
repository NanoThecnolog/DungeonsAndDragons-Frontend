"use client";
import { createContext, ReactNode, useState, useEffect } from "react";

import { api } from "@/services/apiClient";

import { destroyCookie, setCookie, parseCookies } from "nookies";
import { useRouter } from "next/navigation";

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
};

type UserProps = {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  char_limit: number;
};

type SignInProps = {
  email: string;
  password: string;
};

type SignUpProps = {
  name: string;
  email: string;
  password: string;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter();
  const [user, setUser] = useState<UserProps>();
  const isAuthenticated = !!user;

  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [currentTrack, setCurrentTrack] = useState("./Diggy-Diggy-Hole.mp3");

  const tracks = [
    "./Morrowind-soundtrack.mp3",
    "./The-Dragonborn-comes.mp3",
    "./Dragonborn.mp3",
    "./Awake.mp3",
    "./Queen-of-lost-world.mp3",
    "./Diggy-Diggy-Hole.mp3",
  ];
  const nextTrack = () => {
    const randomIndex = Math.floor(Math.random() * tracks.length);
    //console.log("proxima track");
    setCurrentTrack(tracks[randomIndex]);
  };

  useEffect(() => {
    const { "@d&d.token": token } = parseCookies();
    if (token) {
      api
        .get("/me")
        .then((response) => {
          const { id, name, email, avatar, char_limit } = response.data;

          setUser({
            id,
            name,
            email,
            avatar,
            char_limit,
          });
        })
        .catch(() => {
          console.log("Erro ao buscar dados do usuário, deslogando...");
          //deslog do usuario em caso de erro.
          signOut();
        });
    } else {
      console.log(
        "Nenhum token encontrado, redirecionando para pagina de login",
      );
      router.replace("/");
    }
  }, []);

  const signIn = async ({ email, password }: SignInProps) => {
    try {
      const response = await api.post("/session", {
        email,
        password,
      });

      // console.log("Resposta do login: ", response.data)

      const { id, name, token, char_limit } = response.data;

      if (!token) {
        console.log("Token não recebido");
        //até aqui o token ta sendo gerado corretamente
      }
      destroyCookie(null, "@d&d.token");

      //cookie deve ser setado como httponly, secure e sameSite para evitar ataques de XSS e CSRF
      setCookie(null, "@d&d.token", token, {
        maxAge: 60 * 60 * 24 * 30, //validade de 1 mes
        path: "/", //setando quais caminhos terão acesso ao cookie
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      });

      setUser({
        id,
        name,
        email,
        avatar: null,
        char_limit,
      });

      // passando o token para outras requisições

      api.defaults.headers["Authorization"] = `Bearer ${token}`;
      // console.log("função signIn redirecionando pro dashboard em caso de login bem sucedido")
      // mandar para o dashboard, inicio do sistema, qualquer coisa do tipo
      toast.success("Bem vindo, jogador!");
      router.push("/dashboard");
    } catch (err: any) {
      if (err.request?.status === 400) {
        console.log(err.response.data.error);
        toast.error("Erro ao Acessar.");
      }
      console.log("Erro no signIn: ", err);
    }
  };
  const signUp = async ({ name, email, password }: SignUpProps) => {
    try {
      const response = await api.post("/users", {
        name,
        email,
        password,
      });

      // console.log("log de conta criada com sucesso em signUp")
      toast.success("Conta criada com sucesso!");
      // console.log(response.data);

      router.push("/");
    } catch (err) {
      //colocar um toastify aqui
      toast.error("Erro ao criar a conta");
      console.log("Erro ao criar uma conta", err);
    }
  };
  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const signOut = async () => {
    try {
      destroyCookie(null, "@d&d.token");
      if (typeof window !== "undefined") {
        window.location.href = "/";
      }
    } catch (err) {
      toast.error("Erro ao deslogar.");
      console.log("Erro ao deslogar", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
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
        nextTrack,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
