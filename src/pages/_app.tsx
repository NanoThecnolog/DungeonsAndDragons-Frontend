import type { AppProps } from "next/app";
import "./globals.scss";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";

import { AuthProvider, AuthContext } from "@/contexts/AuthContext";

import ReactHowler from 'react-howler';



export default function App({ Component, pageProps }: AppProps) {

    return (
        <AuthProvider>
            <AuthContext.Consumer>
                {({ isPlaying, volume, currentTrack, nextTrack }) => (
                    <ReactHowler
                        src={currentTrack}
                        playing={isPlaying}
                        loop={true}
                        volume={volume}
                        onEnd={nextTrack}
                    />
                )}
            </AuthContext.Consumer>
            <Header />
            <Component {...pageProps} />
            <ToastContainer autoClose={3000} />
            <Footer />
        </AuthProvider>
    )

}