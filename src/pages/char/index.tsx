import { useEffect, useState } from "react";
import Head from "next/head";
import { Header } from "@/components/Header";
import { useRouter } from "next/router";
import { canSSRAuth } from "@/utils/canSSRAuth";
import { setupAPIClient } from "@/services/api";
import { setupAPIClientExternal } from "@/services/apiD&D/apiExternal";
import { Button } from "@/components/ui/Button";

import Geral from "@/components/Geral";
import Sobre from "@/components/Sobre";
import Bag from "@/components/Inventario";
import Spells from "@/components/Magias";

import styles from "./styles.module.scss"


type ClassProps = {
    id: string;
    name: string;
    level: string;
}
interface CharProps {
    id: string;
    name: string;
    title: string;
    race: string;
    background: string | null;
    story: string | null;
    image: string;
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

interface SkillProps {
    count: number
    results: ResultsSkillsProps[];
}
type UserProps = {
    id: string;
    name: string;
    email: string;
}
interface SkillComponentProps {
    skills: SkillProps | null
    usuario: UserProps
}
export default function Char({ skills, /*usuario*/ }: SkillComponentProps) {
    const [currentComponent, setCurrentComponent] = useState('A');
    const [title, setTitle] = useState('');

    const router = useRouter();
    const [id, setId] = useState(null);
    const [charData, setCharData] = useState<{ char: CharProps, charClass: ClassProps[] } | null>(null)
    const [update, setUpdate] = useState(false)

    // const [usuarioReq, setUsuarioReq] = useState(usuario);
    // console.log(usuarioReq)


    // const [skillsList, setSkillsList] = useState<SkillProps>(null)

    useEffect(() => {
        if (currentComponent === 'A') {
            setTitle('Geral');
        } else if (currentComponent === 'B') {
            setTitle('Sobre')
        } else if (currentComponent === 'C') {
            setTitle('Inventário');
        } else if (currentComponent === 'D') {
            setTitle('Magias');
        }
    }, [currentComponent]);


    useEffect(() => {
        if (router.isReady) {
            const { id } = router.query;
            if (id) {
                setId(id);
            }
        }
    }, [router.isReady, router.query]);

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
                // console.log(response.data)

            } catch (err) {
                console.log("Erro ao buscar dados do personagem", err);
            }
        }
        fecthCharData();

    }, [id, update]);

    // console.log("teste", skills)



    if (!charData || !skills) {
        return <div className={styles.loading}>Carregando...</div>
    }



    function renderComponent() {
        if (currentComponent === 'A') {
            return (
                <>
                    <Geral
                        charData={charData}
                        skills={skills}
                    />
                </>
            )
        } else if (currentComponent === 'B') {

            return <Sobre charData={charData} />
        } else if (currentComponent === 'C') {

            return <Bag />
        } else if (currentComponent === 'D') {

            return <Spells />
        }
    }

    return (
        <>
            <Head>
                <title>{title} - D&D</title>
            </Head>
            <Header />
            <div className={styles.container}>
                <div className={styles.menuContainer}>
                    <nav>
                        <Button onClick={() => setCurrentComponent('A')}>Geral</Button>
                        <Button onClick={() => setCurrentComponent('C')}>Inventario</Button>
                        <Button onClick={() => setCurrentComponent('D')}>Magias</Button>
                        <Button onClick={() => setCurrentComponent('B')}>Sobre</Button>

                    </nav>
                </div>
                <>

                    {renderComponent()}
                </>
            </div>
        </>
    )
}
export const getServerSideProps = canSSRAuth(async (ctx) => {
    // const apiClient = setupAPIClient(ctx);
    const apiClientExternal = setupAPIClientExternal();
    try {

        const responseSkills = await apiClientExternal.get("/api/skills")
        const skills = responseSkills.data

        // const response = await apiClient.get('./me')
        // const usuario = response.data
        // console.log("dados do usuario na pagina char: ", usuario)

        return {
            props: {
                skills,
                // usuario
            }
        }
    } catch (err) {
        console.log("Erro ao buscar pericias no servidor externo", err)
        return {
            props: {
                skills: null,
                // usuario: null

            }
        }
    }




})