"use client";
import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { useSearchParams } from "next/navigation";
import { setupAPIClient } from "@/services/api";
import { setupAPIClientExternal } from "@/services/apiD&D/apiExternal";
import { Button } from "@/components/ui/Button";
import Geral from "@/components/Geral";
import Sobre from "@/components/Sobre";
import Bag from "@/components/Inventario";
import Spells from "@/components/Magias";
import UpdateGeral from "@/components/updates/Geral";
import styles from "./styles.module.scss"
import Modal from "react-modal";
import Teste from "@/components/Teste";
import type { ClassDataProps, RaceDataProps } from "@/types/char";


type ClassProps = {
    id: string;
    index: string;
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
    spells: string[];
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
type SpellsProps = {
    index: string,
    name: string,
    level: number,
    url: string
}
type SpellsDataProps = {
    count: number;
    results: SpellsProps[];
}
interface SkillComponentProps {
    skills: SkillProps | null
    spells: SpellsDataProps
}

export default function CharView({ skills, spells }: SkillComponentProps) {
    const [currentComponent, setCurrentComponent] = useState('A')
    const [title, setTitle] = useState('')
    const searchParams = useSearchParams()
    const [id, setId] = useState(null)
    const [charData, setCharData] = useState<{ char: CharProps, charClass: ClassProps[] } | null>(null)
    const [classData, setClassData] = useState<ClassDataProps[] | null>([])
    const [raceData, setRaceData] = useState<RaceDataProps | null>()

    const [update, setUpdate] = useState<boolean>()

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
        document.title = `${title} - D&D`
    }, [title]);

    useEffect(() => {
        const id = searchParams.get('id');
        if (id) {
            setId(id);
        }
    }, [searchParams]);

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
        setUpdate(false);
        renderComponent()
    }, [id, update]);

    useEffect(() => {
        if (!charData) return
        async function fecthClassData() {
            const apiClientExternal = setupAPIClientExternal();
            if (classData.length === 0) {
                try {
                    if (charData.charClass.length >= 1) {
                        for (const item of charData.charClass) {
                            const response = await apiClientExternal.get(`/api/classes/${item.index}`)
                            const classObject = { name: item.name, data: response.data };
                            setClassData(prevState => [...prevState, classObject])
                        }
                    }
                    console.log("busca da raça concluída")

                } catch (err) {
                    console.log("Erro ao buscar dados da classe na api externa", err)
                }
            }
        };
        async function fecthRaceData() {
            const apiClientExternal = setupAPIClientExternal();
            if (!raceData) {
                try {
                    const response = await apiClientExternal.get(`/api/races/${charData.char.race}`)
                    const raceData = response.data;
                    setRaceData(raceData);

                } catch (err) {
                    console.log("Erro ao buscar dados da raça na api externa", err)

                }
            }
        }
        fecthClassData();
        fecthRaceData();
    }, [charData]);

    if (!charData || !skills || !spells) {
        return <div className={styles.loading}>Carregando...</div>
    }

    function renderComponent() {
        if (currentComponent === 'A') {
            return (
                <>
                    <Geral
                        charData={charData}
                        skills={skills}
                        setUpdate={setUpdate}
                        classData={classData}
                        raceData={raceData}
                    />
                </>
            )
        } else if (currentComponent === 'B') {
            return <Sobre charData={charData} />
        } else if (currentComponent === 'C') {
            return <Bag />
        } else if (currentComponent === 'D') {
            return <Spells charData={charData} spells={spells} />
        } else if (currentComponent === 'E') {
            return <UpdateGeral />
        }
    }
    if (typeof document !== 'undefined') {
        Modal.setAppElement(document.body);
    }
    return (
        <>
            <Header />
            <div className={styles.container}>
                <div className={styles.menuContainer}>
                    <nav>
                        <Button onClick={() => setCurrentComponent('A')}>Geral</Button>
                        <Button onClick={() => setCurrentComponent('B')}>Sobre</Button>
                        <Button onClick={() => setCurrentComponent('C')}>Inventario</Button>
                        <Button onClick={() => setCurrentComponent('D')}>Magias</Button>
                        <Button onClick={() => setCurrentComponent('E')}>Editar Informações</Button>
                    </nav>
                </div>
                <>
                    {renderComponent()}
                </>

            </div>
            <div>
                <Teste />
            </div>
        </>
    )
}