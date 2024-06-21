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
import UpdateGeral from "@/components/updates/Geral";
import styles from "./styles.module.scss"
import Modal from "react-modal";

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


export interface ClassDataProps {
    name: string;
    data: {
        class_levels: "/api/classes/paladin/levels"
        hit_die: 10
        index: "paladin"
        multi_classing: {
            prerequisites: [
                {
                    ability_score: {
                        index: string;
                        name: string;
                        url: string;
                    }
                    minimum_score: number
                }
            ]
        }
        proficiencies: [
            {
                index: string;
                name: string;
                url: string;
            }
        ]
        proficiency_choices: [
            {
                choose: number;
                desc: string;
            }
        ]
        saving_throws: [
            {
                index: string;
                name: string;
                url: string;
            }
        ]
        spellcasting: {
            info: [{
                name: string;
                desc: string[];
            }];
            level: number;
            spellcasting_ability: {
                index: string;
                name: string;
                url: string;
            }
        }
        spells: string;
        starting_equipment: [
            {
                equipment: {
                    index: string;
                    name: string;
                    url: string;
                }
                quantity: number;
            }
        ]
        starting_equipment_options: [
            {
                choose: number;
                desc: string;
                from: {
                    option_set_type: string;
                    options: [
                        {
                            items: [
                                {
                                    choice: number;
                                    desc: string;
                                    from: {
                                        equipment_category: {
                                            name: string;
                                            index: string;
                                            url: string;
                                        }
                                        option_set_type: string;
                                    }
                                    type: string;
                                }
                            ]
                            option_type: string;
                        }
                    ]
                }
                type: string;
            }
        ]
        subclasses: [
            {
                index: string;
                name: string;
                url: string;
            }
        ]
        url: string;
    }
}

export interface RaceDataProps {
    ability_bonuses: [
        {
            ability_score: {
                index: string;
                name: string;
                url: string;
            }
            bonus: number;
        }
    ]
    age: string;
    alignment: string;
    index: string;
    language_desc: string;
    languages: [
        {
            index: string;
            name: string;
            url: string;
        }
    ]
    name: string;
    size: string;
    size_description: string;
    speed: number;
    starting_proficiencies: [
        {
            index: string;
            name: string;
            url: string;
        }
    ]
    starting_proficiency_options: {
        choose: number;
        desc: string;
        from: {
            option_set_type: string;
            options: [
                {
                    item: {
                        index: string;
                        name: string;
                        url: string;
                    }
                    option_type: string;
                }
            ]
        }
        type: string;
    }
    subraces: [
        {
            index: string;
            name: string;
            url: string;
        }
    ]
    traits: [
        {
            index: string;
            name: string;
            url: string;
        }
    ]
    url: string;
}

export default function Char({ skills, spells }: SkillComponentProps) {
    const [currentComponent, setCurrentComponent] = useState('A')
    const [title, setTitle] = useState('')
    const router = useRouter()
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
                console.log(response.data)
            } catch (err) {
                console.log("Erro ao buscar dados do personagem", err);
            }
        }
        fecthCharData();
        console.log(update)
        setUpdate(false);
        console.log(update)
        renderComponent()
    }, [id, update]);

    useEffect(() => {
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
                    console.log("busca da raça concluída")

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
            console.log('a')
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
            console.log('b')
            return <Sobre charData={charData} />
        } else if (currentComponent === 'C') {
            console.log('c')
            return <Bag />
        } else if (currentComponent === 'D') {
            console.log('d')
            return <Spells charData={charData} spells={spells} />
        } else if (currentComponent === 'E') {
            return <UpdateGeral />
        }
    }
    Modal.setAppElement('#__next');
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
        </>
    )
}
export const getServerSideProps = canSSRAuth(async (ctx) => {
    const apiClientExternal = setupAPIClientExternal();
    try {
        const responseSkills = await apiClientExternal.get("/api/skills")
        const skills = responseSkills.data
        const responseSpells = await apiClientExternal.get("/api/spells")
        const spells = responseSpells.data
        console.log("Buscando perícias e magias na api externa, do lado do servidor, em char.")
        return {
            props: {
                skills: skills,
                spells: spells
            }
        }
    } catch (err) {
        console.log("Erro ao buscar pericias no servidor externo", err)
        return {
            props: {
                skills: null,
                spells: null
            }
        }
    }
})

