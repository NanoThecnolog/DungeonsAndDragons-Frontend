import { useEffect, useState } from "react";
import Head from "next/head";
import { Header } from "@/components/Header";
import Router, { useRouter } from "next/router";
import { canSSRAuth } from "@/utils/canSSRAuth";
import { setupAPIClient } from "@/services/api";
import { setupAPIClientExternal } from "@/services/apiD&D/apiExternal";
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

type ResultsSkillsProps = {
    index: string;
    name: string;
    url: string;
}
type SkillsProps = {
    results: ResultsSkillsProps[];
}
interface DataProps {
    skills: SkillsProps;
}
export default function Char({ skills }: DataProps) {
    const { id } = Router.query;
    const [charData, setCharData] = useState<{ char: CharProps, charClass: ClassProps[] } | null>(null)
    const [update, setUpdate] = useState(false)
    const [skillsList, setSkillsList] = useState(skills.results || [])
    // console.log(skillsList[4].name);





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
                            <div className={styles.row}>
                                <div className={styles.image} style={{ backgroundImage: `url(http://localhost:3333/files/${char.image})` }}>{!char.image && ('Sem Imagem')}</div>
                                <div className={styles.area1}>
                                    <div className={styles.principal}>
                                        <h4>{char.name}</h4>
                                        <p>{char.title}</p>
                                        {charClass.length > 1 ? (
                                            <p>Nível {Number(charClass[0].level) + Number(charClass[1].level)}</p>
                                        ) : (
                                            <p>Nível {charClass[0].level}</p>
                                        )}
                                        <p>Exp: {char.experience}</p>


                                    </div>
                                    <div className={styles.class}>
                                        <p>{charClass[0].name} - {charClass[0].level}</p>
                                        {charData.charClass[1] && (
                                            <p>{charClass[1].name} - {charClass[1].level}</p>
                                        )}
                                        <p>{char.race}</p>
                                    </div>
                                    <div className={styles.antecedentes}>
                                        <p>Antecedêntes{char.background}</p>
                                    </div>
                                    <div className={styles.ca}>CA {char.armor_class}</div>

                                </div>
                            </div>
                            <div className={styles.row}>
                                <div className={styles.area2}>

                                    <p>Força {char.str}</p>
                                    <p>Dextreza {char.dex}</p>
                                    <p>Constituição {char.con}</p>
                                    <p>Inteligência {char.int}</p>
                                    <p>Sabedoria {char.wis}</p>
                                    <p>Carisma {char.cha}</p>
                                </div>

                                {/*pensar em registrar as perícias do personagem junto com seus valores e mostrá-las aqui. Essa lista sendo renderizada agora pode passar para a edição de personagem.*/}
                                {/*Relizar o Prisma migrate para atualizar o banco de dados adicionando o campo skills para armazenar os dados das perícias do personagem*/}
                                <div className={styles.area3}>
                                    Area 3 - Pericias
                                    {skillsList.map((item, index) => {
                                        return (
                                            <p key={index}>{item.name}</p>
                                        )
                                    })}


                                </div>
                                <div className={styles.area4}>
                                    Area 4 - Pontos de vida
                                    {char.current_hp} / {char.max_hp}
                                    <p>Vida temporária</p>
                                    {char.temporary_hp}
                                </div>

                                {/**Na área de resistencia a morte, a ideia é utilizar checkboxes para guardar o uso dos testes de resistencia a morte.
                                 * Posso utilizar o banco de dados pra isso ou o localstorage do navegador do usuário... ainda não decidi.
                                 */}
                                <div className={styles.area5}>
                                    Area 5 - Resistencia a morte
                                    {char.death_saving_throws}
                                </div>
                            </div>





                        </>
                    ) : (
                        <div className={styles.loading}>
                            <h2>Carregando...</h2>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
export const getServerSideProps = canSSRAuth(async (ctx) => {

    const apiClientExternal = setupAPIClientExternal();
    const responseSkills = await apiClientExternal.get("/api/skills")

    return {
        props: {
            skills: responseSkills.data
        }
    }

})