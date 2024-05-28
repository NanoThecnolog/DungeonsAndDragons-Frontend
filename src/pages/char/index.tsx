import { useEffect, useState } from "react";
import Head from "next/head";
import { Header } from "@/components/Header";
import { useRouter } from "next/router";
import { canSSRAuth } from "@/utils/canSSRAuth";
import { setupAPIClient } from "@/services/api";
import { setupAPIClientExternal } from "@/services/apiD&D/apiExternal";
import { Button } from "@/components/ui/Button";
import CheckBox from "@/components/ui/CheckBox";


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
    const router = useRouter();
    const [id, setId] = useState(null);
    const [charData, setCharData] = useState<{ char: CharProps, charClass: ClassProps[] } | null>(null)
    const [update, setUpdate] = useState(false)
    const [skillsList, setSkillsList] = useState(skills.results || [])
    const [modifyStr, setModifyStr] = useState("");
    const [modifyDex, setModifyDex] = useState("");
    const [modifyCon, setModifyCon] = useState("");
    const [modifyInt, setModifyInt] = useState("");
    const [modifyWis, setModifyWis] = useState("");
    const [modifyCha, setModifyCha] = useState("");

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
            } catch (err) {
                console.log("Erro ao buscar dados do personagem", err);
            }
        }
        fecthCharData();
    }, [id, update]);

    useEffect(() => {

        function modificadores() {
            if (!charData) {
                return;
            }
            const { char } = charData;

            const str = Number(char.str);
            const baseStr = Math.floor(str / 2) - 5;
            const modifyStr = baseStr >= 0 ? `+${baseStr}` : `${baseStr}`
            setModifyStr(modifyStr);

            const dex = Number(char.dex);
            const baseDex = Math.floor(dex / 2) - 5;
            const modifyDex = baseDex >= 0 ? `+${baseDex}` : `${baseDex}`
            setModifyDex(modifyDex);

            const con = Number(char.con);
            const baseCon = Math.floor(con / 2) - 5;
            const modifyCon = baseCon >= 0 ? `+${baseCon}` : `${baseCon}`
            setModifyCon(modifyCon);

            const int = Number(char.int);
            const baseInt = Math.floor(int / 2) - 5;
            const modifyInt = baseInt >= 0 ? `+${baseInt}` : `${baseInt}`
            setModifyInt(modifyInt);

            const wis = Number(char.wis);
            const baseWis = Math.floor(wis / 2) - 5;
            const modifyWis = baseWis >= 0 ? `+${baseWis}` : `${baseWis}`
            setModifyWis(modifyWis);

            const cha = Number(char.cha);
            const baseCha = Math.floor(cha / 2) - 5;
            const modifyCha = baseCha >= 0 ? `+${baseCha}` : `${baseCha}`
            setModifyCha(modifyCha);


        }
        modificadores();

    }, [charData, update])

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
                                    <div className={styles.row}>
                                        <div className={styles.principal}>
                                            <h4>{char.name}</h4>
                                            <p>{char.title ? char.title : (<>Título não definido</>)}</p>
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
                                        <div className={styles.ca}>
                                            <p>CA</p>
                                            <p>{char.armor_class}</p>
                                        </div>
                                    </div>
                                    <div className={styles.row}>
                                        <div className={styles.area4}>
                                            <h3>Pontos de vida</h3>
                                            <p>{char.current_hp} / {char.max_hp}</p>
                                            <h4>Vida temporária</h4>
                                            <p>{char.temporary_hp}</p>
                                        </div>
                                        {/**Na área de resistencia a morte, a ideia é utilizar checkboxes para guardar o uso dos testes de resistencia a morte.
                                         * Posso utilizar o banco de dados pra isso ou o localstorage do navegador do usuário... ainda não decidi.
                                         */}
                                        <div className={styles.area5}>
                                            <h3>Resistencia a morte</h3>
                                            {char.death_saving_throws}
                                            <div>
                                                <CheckBox>
                                                    Primeira morte
                                                </CheckBox>
                                                <CheckBox>
                                                    Segunda morte
                                                </CheckBox>
                                                <CheckBox>
                                                    Terceira morte
                                                </CheckBox>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>

                            <div className={styles.row}>
                                <div className={styles.linhadebaixo}>
                                    <div className={styles.statusContainer}>
                                        <div className={styles.status}>
                                            <p className={styles.statusText}>Força</p>
                                            <p className={styles.statusValue}>{char.str}</p>
                                            <p className={styles.statusModify}>({modifyStr})</p>
                                        </div>
                                        <div className={styles.status}>
                                            <p className={styles.statusText}>Dextreza</p>
                                            <p className={styles.statusValue}>{char.dex}</p>
                                            <p className={styles.statusModify}>({modifyDex})</p>
                                        </div>
                                        <div className={styles.status}>
                                            <p className={styles.statusText}>Constituição</p>
                                            <p className={styles.statusValue}>{char.con}</p>
                                            <p className={styles.statusModify}>({modifyCon})</p>
                                        </div>
                                        <div className={styles.status}>
                                            <p className={styles.statusText}>Inteligência</p>
                                            <p className={styles.statusValue}>{char.int}</p>
                                            <p className={styles.statusModify}>({modifyInt})</p>
                                        </div>
                                        <div className={styles.status}>
                                            <p className={styles.statusText}>Sabedoria</p>
                                            <p className={styles.statusValue}>{char.wis}</p>
                                            <p className={styles.statusModify}>({modifyWis})</p>
                                        </div>
                                        <div className={styles.status}>
                                            <p className={styles.statusText}>Carisma</p>
                                            <p className={styles.statusValue}>{char.cha}</p>
                                            <p className={styles.statusModify}>({modifyCha})</p>
                                        </div>
                                        <div>Editar</div>
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
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className={styles.loading}>
                            <h2>Carregando....</h2>
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