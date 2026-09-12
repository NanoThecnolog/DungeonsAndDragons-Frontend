import { Suspense } from "react";
import type { Metadata } from "next";
import { setupAPIClientExternal } from "@/services/apiD&D/apiExternal";
import CharView from "./CharView";

export const metadata: Metadata = {
    title: "Personagem - D&D",
};

export const dynamic = "force-dynamic";

export default async function CharPage() {
    const apiClientExternal = setupAPIClientExternal();
    let skills = null
    let spells = null
    try {
        const responseSkills = await apiClientExternal.get("/api/skills")
        skills = responseSkills.data
        const responseSpells = await apiClientExternal.get("/api/spells")
        spells = responseSpells.data
    } catch (err) {
        console.log("Erro ao buscar pericias e magias no servidor externo", err)
    }

    return (
        <Suspense fallback={<div>Carregando...</div>}>
            <CharView skills={skills} spells={spells} />
        </Suspense>
    )
}