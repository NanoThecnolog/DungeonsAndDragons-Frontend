import { Suspense } from "react";
import type { Metadata } from "next";
import MeView from "./MeView";

export const metadata: Metadata = {
    title: "Perfil - D&D",
};

export default function MePage() {
    return (
        <Suspense fallback={<div>Carregando...</div>}>
            <MeView />
        </Suspense>
    );
}