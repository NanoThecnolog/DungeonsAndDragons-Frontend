import axios, { AxiosError } from "axios";
import { destroyCookie, parseCookies } from "nookies";
import { AuthTokenError } from "./errors/AuthTokenError";
// import { GetServerSidePropsContext } from 'next'

export function setupAPIClient(ctx = undefined) {
  let cookies = parseCookies(ctx);
  // console.log("Cookies no arquivo api.ts:", cookies)
  const url = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!url) {
    throw new Error(
      "NEXT_PUBLIC_BACKEND_URL não está definido no arquivo .env.local",
    );
  }

  const api = axios.create({
    baseURL: url,
    headers: {
      Authorization: `Bearer ${cookies["@d&d.token"]}`,
    },
  });
  // console.log("autorization header: ", `Bearer ${cookies['@d&d.token']}`)

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        if (typeof window !== undefined) {
          destroyCookie(null, "@d&d.token");
          console.log("typeof window diferente de undefined");
        } else {
          return Promise.reject(new AuthTokenError());
        }
      }

      return Promise.reject(error);
    },
  );

  return api;
}
