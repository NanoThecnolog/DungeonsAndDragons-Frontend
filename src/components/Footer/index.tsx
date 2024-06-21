import { useState, useContext } from "react";
import styles from './styles.module.scss'
import { FaCopyright } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaDiceD20 } from "react-icons/fa";

import Link from "next/link";
import { AuthContext } from "@/contexts/AuthContext";

export default function Footer() {

    const { isPlaying, volume, togglePlayPause, setVolume } = useContext(AuthContext);
    const volumePerCent = volume * 100

    return (
        <>
            <footer className={styles.container}>
                <div className={styles.containerFooter}>
                    <div className={styles.audioControl}>
                        <button className={styles.buttonPlayPause} type="button" onClick={togglePlayPause}>
                            {isPlaying ? <FaPause /> : <FaPlay />}
                        </button>
                        <input
                            title={volumePerCent.toString()}
                            className={styles.volume}
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={volume}
                            onChange={(e) => setVolume(parseFloat(e.target.value))}
                        />
                    </div>

                </div>
                <div className={styles.footer}>
                    <div className={styles.informacao}>
                        <div><p>Política de Privacidade</p></div>
                        <div><p>Perguntas frequentes</p></div>
                        <Link href='/livro-do-jogador.pdf' target="_blank" rel="noopener noreferrer">
                            <div>
                                <p>Livro do Jogador</p>
                            </div>
                        </Link>
                    </div>
                    <div className={styles.informacao}>
                        <div><p>Seja um apoiador</p></div>
                        <div><p>Trabalhe conosco</p></div>
                    </div>
                    <div className={styles.informacao}>
                        <div>
                            <Link className={styles.link} target="_blank" href={"https://www.instagram.com/ericsson.costagomes/"}>
                                <button title="Instagram"><FaInstagram size={35} /></button>
                            </Link>
                            <Link className={styles.link} target="_blank" href={"https://github.com/NanoThecnolog/DungeonsAndDragons-Frontend"}>
                                <button title="Repositório"><FaGithub size={35} /></button>
                            </Link>
                            <Link className={styles.link} target="_blank" href={"https://www.dnd5eapi.co/"}>
                                <button title="D&D API"><FaDiceD20 size={35} /></button>
                            </Link>
                        </div>


                    </div>
                    <div className={styles.copyRight}>
                        <FaCopyright /> <span>Copyright 2024. Todos os direitos reservados.</span>
                    </div>

                </div>

            </footer>
        </>
    )
}

