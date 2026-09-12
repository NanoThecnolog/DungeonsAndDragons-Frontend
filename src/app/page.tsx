import type { Metadata } from "next";
import LoginView from "./LoginView";

export const metadata: Metadata = {
    title: "Login - D&D",
};

export default function LoginPage() {
    return <LoginView />;
}