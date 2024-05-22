import { useState, useContext } from "react";
import styles from './styles.module.scss'
import { FaCopyright } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { AuthContext } from "@/contexts/AuthContext";

export default function Footer() {

    const { isPlaying, volume, togglePlayPause, setVolume } = useContext(AuthContext);

    return (
        <>
            <footer className={styles.containerFooter}>
                <div className={styles.audioControl}>
                    <button className={styles.buttonPlayPause} type="button" onClick={togglePlayPause}>
                        {isPlaying ? <FaPause /> : <FaPlay />}
                    </button>
                    <input
                        title="volume"
                        className={styles.volume}
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={(e) => setVolume(parseFloat(e.target.value))}
                    />
                </div>
                <div>
                    <FaCopyright /> <span>Copyright 2024. Todos os direitos reservados.</span>
                </div>
            </footer>
        </>
    )
}

