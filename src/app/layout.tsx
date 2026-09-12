import type { ReactNode } from "react";
import "./globals.scss";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/contexts/AuthContext";
import AudioPlayer from "@/components/AudioPlayer";
import ScrollToTop from "@/components/ui/ScrollToTop";

export const metadata = {
    title: "D&D",
    description: "Ficha de personagem Dungeons & Dragons",
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="pt-br">
            <body>
                <AuthProvider>
                    <AudioPlayer />
                    {children}
                    <ToastContainer autoClose={3000} />
                    <Footer />
                    <ScrollToTop />
                </AuthProvider>
            </body>
        </html>
    );
}