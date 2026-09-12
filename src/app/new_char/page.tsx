import type { Metadata } from "next";
import { setupAPIClientExternal } from "@/services/apiD&D/apiExternal";
import NewCharView from "./NewCharView";
import type { CharProps } from "@/types/new_char";

export const metadata: Metadata = {
    title: "Novo Personagem - D&D",
};

export const dynamic = "force-dynamic";

export default async function NewCharPage() {
    const apiClientExternal = setupAPIClientExternal();

    const responseClasses = await apiClientExternal.get("/api/classes")
    const responseRaces = await apiClientExternal.get("/api/races")

    const data: CharProps = {
        classes: responseClasses.data,
        races: responseRaces.data,
    };

    return <NewCharView classes={data.classes} races={data.races} />;
}