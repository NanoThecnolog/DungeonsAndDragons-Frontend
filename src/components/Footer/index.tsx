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

    return (
        <>
            <footer className={styles.container}>
                <div className={styles.containerFooter}>
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

                </div>
                <div className={styles.footer}>
                    <div className={styles.informacao}>
                        <ul>
                            <li>
                                informação normal
                            </li>
                            <li>
                                informação interessante
                            </li>
                            <li>
                                informação inútil
                            </li>
                            <li>
                                informação extraordinária
                            </li>
                        </ul>
                    </div>
                    <div className={styles.links}>
                        <ul>
                            <li>link 1</li>
                            <li>link dos</li>
                            <li>link três</li>
                            <li>link four</li>
                        </ul>
                    </div>
                    <div className={styles.contato}>
                        <div>
                            <Link className={styles.link} target="_blank" href={"https://www.instagram.com/ericsson.costagomes/"}>
                                <button title="Instagram"><FaInstagram size={45} /></button>
                            </Link>
                            <Link className={styles.link} target="_blank" href={"https://github.com/NanoThecnolog/DungeonsAndDragons-Frontend"}>
                                <button title="Repositório"><FaGithub size={45} /></button>
                            </Link>
                            <Link className={styles.link} target="_blank" href={"https://www.dnd5eapi.co/"}>
                                <button title="D&D API"><FaDiceD20 size={45} /></button>
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

