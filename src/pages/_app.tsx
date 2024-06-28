import type { AppProps } from "next/app";
import "./globals.scss";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Footer from "@/components/Footer";
import { AuthProvider, AuthContext } from "@/contexts/AuthContext";
import ReactHowler from 'react-howler';
import ScrollToTop from "@/components/ui/ScrollToTop";
import { appWithTranslation } from 'next-i18next';
import nextI18NextConfig from '../../next-i18next.config.js';
// const nextI18NextConfig = require('../../next-i18next.config.js');

function app({ Component, pageProps }: AppProps) {

    return (
        <AuthProvider>
            <AuthContext.Consumer>
                {({ isPlaying, volume, currentTrack, nextTrack }) => {
                    return (
                        <ReactHowler
                            src={currentTrack}
                            playing={isPlaying}
                            loop={true}
                            volume={volume}
                            onEnd={nextTrack}
                        />
                    );
                }}
            </AuthContext.Consumer>


            <Component {...pageProps} />
            <ToastContainer autoClose={3000} />
            <Footer />
            <ScrollToTop />

        </AuthProvider>
    )
}

export default appWithTranslation(app, nextI18NextConfig)