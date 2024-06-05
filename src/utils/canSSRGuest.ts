import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { parseCookies } from "nookies";
//para definir paginas acessadas por visitantes

export function canSSRGuest<P extends { [key: string]: any }>(fn: GetServerSideProps<P>) {
    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
        console.log("canSSRGuest sendo executado.")
        const cookies = parseCookies(ctx);


        if (cookies['@d&d.token']) {
            return {
                redirect: {
                    destination: '/dashboard',
                    permanent: false,
                }
            }
        }
        return await fn(ctx);

    }
}