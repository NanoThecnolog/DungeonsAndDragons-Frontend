import { useEffect, useState } from "react";
import Head from "next/head";
import { Header } from "@/components/Header";
import Router, { useRouter } from "next/router";
import { canSSRAuth } from "@/utils/canSSRAuth";
import { setupAPIClient } from "@/services/api";
import { StringifyOptions } from "querystring";
import { Button } from "@/components/ui/Button";

import styles from "./styles.module.scss"

type ClassProps = {
    id: string;
    name: string;
    level: string;
}

type SpellsProps = {

}

interface CharProps {
    id: string;
    name: string;
    title: string;
    race: string;
    background: string | null;
    story: string | null;
    image: string;
    spells: SpellsProps[] | null;
    con: string;
    str: string;
    dex: string;
    int: string;
    wis: string;
    cha: string;
    wealth: string;
    max_hp: string;
    current_hp: string;
    temporary_hp: String;
    experience: string;
    armor_class: string;
    ideals: string;
    bonds: string[];
    flaws: string[];
    features: string[];
    traits: string[];
    death_saving_throws: string | null;
    allies: string[];
    proficiency_bonus: string | null;
    death_resistance: boolean;
    personality_traits: string[];
    languages: string[];
    Initiative: string;
    cantrips: string[];
    char_class: ClassProps[];


}
export default function Char() {
    const { id } = Router.query;
    console.log(id);
    const [charData, setCharData] = useState<{ char: CharProps, charClass: ClassProps[] } | null>(null)

    const [update, setUpdate] = useState(false)

    useEffect(() => {
        async function fecthCharData() {
            if (!id) return;

            const apiClient = setupAPIClient();
            try {
                const response = await apiClient.get('/char/detail', {
                    params: {
                        char_id: id
                    }
                })
                setCharData(response.data)
            } catch (err) {
                console.log("Erro ao buscar dados do personagem", err);
            }
        }
        fecthCharData();
    }, [id, update]);

    if (!charData) {
        return <div>Carregando...</div>
    }

    const { char, charClass } = charData


    return (
        <>
            <Head>
                <title>Detalhes do Personagem - D&D</title>
            </Head>
            <Header />
            <div className={styles.container}>
                <div className={styles.menuContainer}>
                    <nav>
                        <Button style={{ width: '18rem' }}>Geral</Button>
                        <Button style={{ width: '18rem' }}>Inventario</Button>
                        <Button style={{ width: '18rem' }}>Magias</Button>
                        <Button style={{ width: '18rem' }}>Sobre o personagem</Button>

                    </nav>
                </div>
                <div className={styles.dataContainer}>
                    {charData ? (
                        <>
                            <div className={styles.image} style={{ backgroundImage: `url(http://localhost:3333/files/${char.image})` }}>{!char.image && ('Sem Imagem')}</div>
                            <div className={styles.area1}>
                                Area 1 - info principal
                                <h4>Detalhes do Personagem: {char.name}</h4>
                                <p>{char.title}</p>
                                <p>{charClass[0].name} - {charClass[0].level}</p>
                                {charData.charClass[1] && (
                                    <p>{charData.charClass[1].name} - {charData.charClass[1].level}</p>
                                )}
                                <p>{char.experience}</p>
                            </div>
                            <div className={styles.area2}>
                                Area 2 - status
                                <p>{char.str}</p>
                                <p>{char.dex}</p>
                                <p>{char.con}</p>
                                <p>{char.int}</p>
                                <p>{char.wis}</p>
                                <p>{char.cha}</p>
                            </div>
                            <div className={styles.area3}>
                                Area 3 - Pericias
                                <p>fazer prisma migrate depois</p>
                            </div>
                            <div className={styles.area4}>
                                Area 4 - Pontos de vida
                                {char.current_hp} / {char.max_hp}
                                <p>Vida temporária</p>
                                {char.temporary_hp}
                            </div>
                            <div className={styles.area5}>
                                Area 5 - Resistencia a morte
                                {char.death_saving_throws}
                            </div>





                        </>
                    ) : "Carregando..."}
                </div>
            </div>
        </>
    )
}
export const getServerSideProps = canSSRAuth(async (ctx) => {

    return {
        props: {}
    }

})