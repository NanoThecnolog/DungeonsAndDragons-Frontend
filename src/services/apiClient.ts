import { setupAPIClient } from "./api";
import { GetServerSidePropsContext } from "next";
const ctx: GetServerSidePropsContext = {
    req: {} as any,
    res: {} as any,
    query: {} as any,
    resolvedUrl: '',
};
export const api = setupAPIClient(ctx);