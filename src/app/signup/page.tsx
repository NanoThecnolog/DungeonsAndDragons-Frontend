import type { Metadata } from "next";
import SignUpView from "./SignUpView";

export const metadata: Metadata = {
    title: "Cadastro - D&D",
};

export default function SignUpPage() {
    return <SignUpView />;
}