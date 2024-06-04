import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { parseCookies, destroyCookie } from "nookies";
import { AuthTokenError } from "@/services/errors/AuthTokenError";

//restringir as paginas para que só usuarios logados tenham acesso

export function canSSRAuth<P extends { [key: string]: any }>(fn: GetServerSideProps<P>) {
    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
        const cookies = parseCookies(ctx);
        const token = cookies['@d&d.token'];

        console.log('Verificando token no canSSRAuth:', token);

        if (!token) {
            console.log('Token não encontrado, redirecionando para a página de login');
            return {
                redirect: {
                    destination: '/',
                    permanent: false,
                }
            }
        }

        try {
            return await fn(ctx);
        } catch (err) {
            if (err instanceof AuthTokenError) {
                console.log('Erro de autenticação, destruindo cookie e redirecionando', err);
                destroyCookie(ctx, '@d&d.token');
            } else {
                console.log('Erro inesperado durante execução de codigo getServerSideProps', err);
            }
            return {
                redirect: {
                    destination: '/',
                    permanent: false,
                }
            };
        }
    };
}