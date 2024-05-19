import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { parseCookies, destroyCookie } from "nookies";
import { AuthTokenError } from "@/services/errors/AuthTokenError";

//restringir as paginas para que só usuarios logados tenham acesso

export function canSSRAuth<P extends { [key: string]: any }>(fn: GetServerSideProps<P>) {
    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
        const cookies = parseCookies(ctx);

        const token = cookies['@d&d.token'];

        if (!token) {
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
                destroyCookie(ctx, '@d&d.token');


            }
            return {
                redirect: {
                    destination: '/',
                    permanent: false
                }
            }
        }


    }
}