import { useEffect, useState } from "react";
import { canSSRAuth } from "@/utils/canSSRAuth";
import CheckBox from "@/components/ui/CheckBox";
import { TbSettings } from "react-icons/tb";
import DiceRoller from "../Dados/Rolagem";

import styles from "./styles.module.scss"
import { Button } from "../ui/Button";
import { toast } from "react-toastify";

import { setupAPIClient } from "@/services/api";



type DataProps = {
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
type ClassProps = {
    id: string;
    name: string;
    level: string;
}
type CharProps = {
    char: DataProps;
    charClass: ClassProps[];
}

type ResultsSkillsProps = {
    index: string;
    name: string;
    url: string;
}
type SkillsProps = {
    count: number;
    results: ResultsSkillsProps[];
}

interface CharDataProps {
    charData: CharProps;
    skills: SkillsProps;
}

export default function Geral({ charData, skills }: CharDataProps) {
    const [id, setId] = useState(null);
    const [update, setUpdate] = useState(false)
    const [level, setLevel] = useState<number>(1)
    const [experience, setExperience] = useState<number>(0)
    const [proficiencyBonus, setProficiencyBonus] = useState<number>(0)
    // console.log(skills);
    const { count, results } = skills;
    const [skillsList, setSkillsList] = useState([])
    // console.log("skills no geral", skillsList);
    const { char, charClass } = charData

    const [modifyStr, setModifyStr] = useState("");
    const [modifyDex, setModifyDex] = useState("");
    const [modifyCon, setModifyCon] = useState("");
    const [modifyInt, setModifyInt] = useState("");
    const [modifyWis, setModifyWis] = useState("");
    const [modifyCha, setModifyCha] = useState("");
    const [isExperienceExceeded, setIsExperienceExceeded] = useState(false);

    const [notes, setNotes] = useState("");

    const experienceTable: { [level: number]: number } = {
        1: 0,
        2: 300,
        3: 900,
        4: 2700,
        5: 6500,
        6: 14000,
        7: 23000,
        8: 34000,
        9: 48000,
        10: 64000,
        11: 85000,
        12: 100000,
        13: 120000,
        14: 140000,
        15: 165000,
        16: 195000,
        17: 225000,
        18: 265000,
        19: 305000,
        20: 355000,
    };


    useEffect(() => {
        setSkillsList(results)


        function modificadores() {
            if (!char) {
                return;
            }
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
        calculateLevel();
        calculateProficiency(level)

    }, [char, update])
    function calculateLevel() {
        if (charClass.length > 1) {

            const somaLevel = Number(charClass[0].level) + Number(charClass[1].level)
            setLevel(somaLevel)


        } else {
            const level = Number(charClass[0].level)
            setLevel(level)
        }


    }
    function calculateProficiency(level: number) {
        if (level >= 1 && level <= 4) {
            const bonus = 2
            setProficiencyBonus(bonus)
        };
        if (level >= 5 && level <= 8) {
            const bonus = 3
            setProficiencyBonus(bonus)
        };
        if (level >= 9 && level <= 12) {
            const bonus = 4
            setProficiencyBonus(bonus)
        };
        if (level >= 13 && level <= 16) {
            const bonus = 5
            setProficiencyBonus(bonus)
        };
        if (level >= 17 && level <= 20) {
            const bonus = 6
            setProficiencyBonus(bonus)
        };
    }
    // console.log(proficiencyBonus)
    async function handleNotes() {
        console.log("notes")

        try {
            if (!notes) {
                toast.warning("Nada foi escrito.")
                return;
            }
            const noteData = {
                id: char.id,
                notes: [{ text: notes, date: new Date() }]
            };

            const apiClient = setupAPIClient();

            await apiClient.put('/char', noteData)
            toast.success("Anotações salvas!")
            setNotes("")
        } catch (err) {
            console.log("Erro ao salvar notas", err)
            toast.error("Erro ao salvar anotações...")
        }
    }

    if (!charData) {
        return <div>Carregando...</div>
    }
    const experienceLimit = experienceTable[level];
    // console.log("level", level)

    return (
        <>
            <div className={styles.container}>
                <div className={styles.dataContainer}>
                    {char ? (
                        <>
                            <div className={styles.row}>
                                <div className={styles.image} style={{ backgroundImage: `url(http://localhost:3333/files/${char.image})` }}>
                                    <div className={styles.editar}><TbSettings size={25} /></div>
                                    {!char.image && ('Sem Imagem')}
                                </div>
                                <div className={styles.area1}>
                                    <div className={styles.row}>
                                        <div className={styles.principal}>
                                            <div className={styles.editar}><TbSettings size={25} /></div>
                                            <h4>{char.name}</h4>
                                            <p>{char.title ? char.title : (<>Título não definido</>)}</p>
                                            <div className={styles.nivel}>
                                                <p> Nível {level}</p>
                                                {isExperienceExceeded && (<div className={styles.subirNivel}>+ subir nivel</div>)}
                                            </div>

                                            <p>Exp: {char.experience} / {experienceLimit}</p>

                                        </div>
                                        <div className={styles.class}>
                                            <div className={styles.editar}><TbSettings size={25} /></div>
                                            <p>{charData.charClass[0].name} - {charData.charClass[0].level}</p>
                                            {charData.charClass[1] && (
                                                <p>{charData.charClass[1].name} - {charData.charClass[1].level}</p>
                                            )}
                                            <p>{char.race}</p>


                                        </div>
                                        <div className={styles.antecedentes}>
                                            <div className={styles.editar}><TbSettings size={25} /></div>
                                            <p>Antecedêntes</p>
                                            <p><strong>{char.background}</strong></p>
                                        </div>
                                        <div className={styles.ca}>
                                            <div className={styles.editar}><TbSettings size={25} /></div>
                                            <p>CA</p>
                                            <p>{char.armor_class}</p>
                                        </div>
                                    </div>
                                    <div className={styles.row}>
                                        <div className={styles.vida}>
                                            <div className={styles.editar}><TbSettings size={25} /></div>
                                            <h3>Pontos de vida</h3>
                                            <p>{char.current_hp} / {char.max_hp}</p>
                                            <h4>Vida temporária</h4>
                                            <p>{char.temporary_hp}</p>

                                        </div>
                                        <div className={styles.proficiency}>
                                            <div className={styles.editar}><TbSettings size={25} /></div>
                                            <h3>Bônus de Proficiência</h3>
                                            <div className={styles.bonus}>
                                                <p>+{proficiencyBonus}</p>
                                            </div>
                                        </div>
                                        {/**Na área de resistencia a morte, a ideia é utilizar checkboxes para guardar o uso dos testes de resistencia a morte.
                                         * Posso utilizar o banco de dados pra isso ou o localstorage do navegador do usuário... ainda não decidi.
                                         */}
                                        <div className={styles.morte}>
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
                                        <div className={styles.editar}><TbSettings size={25} /></div>
                                        <div className={styles.status}>
                                            <h4 className={styles.statusText}>Força</h4>
                                            <p className={styles.statusValue}>{char.str}</p>
                                            <p className={styles.statusModify}>({modifyStr})</p>
                                        </div>
                                        <div className={styles.status}>
                                            <h4 className={styles.statusText}>Dextreza</h4>
                                            <p className={styles.statusValue}>{char.dex}</p>
                                            <p className={styles.statusModify}>({modifyDex})</p>
                                        </div>
                                        <div className={styles.status}>
                                            <h4 className={styles.statusText}>Constituição</h4>
                                            <p className={styles.statusValue}>{char.con}</p>
                                            <p className={styles.statusModify}>({modifyCon})</p>
                                        </div>
                                        <div className={styles.status}>
                                            <h4 className={styles.statusText}>Inteligência</h4>
                                            <p className={styles.statusValue}>{char.int}</p>
                                            <p className={styles.statusModify}>({modifyInt})</p>
                                        </div>
                                        <div className={styles.status}>
                                            <h4 className={styles.statusText}>Sabedoria</h4>
                                            <p className={styles.statusValue}>{char.wis}</p>
                                            <p className={styles.statusModify}>({modifyWis})</p>
                                        </div>
                                        <div className={styles.status}>
                                            <h4 className={styles.statusText}>Carisma</h4>
                                            <p className={styles.statusValue}>{char.cha}</p>
                                            <p className={styles.statusModify}>({modifyCha})</p>
                                        </div>

                                    </div>

                                    {/*pensar em registrar as perícias do personagem junto com seus valores e mostrá-las aqui. Essa lista sendo renderizada agora pode passar para a edição de personagem.*/}
                                    {/*Relizar o Prisma migrate para atualizar o banco de dados adicionando o campo skills para armazenar os dados das perícias do personagem*/}
                                    <div className={styles.pericias}>
                                        <div className={styles.editar}><TbSettings size={25} /></div>
                                        Area 3 - Pericias
                                        {skillsList.map((item, index) => {
                                            return (
                                                <p key={index}>{item.name}</p>
                                            )
                                        })}
                                    </div>
                                    <div className={styles.outros}>
                                        <div className={styles.row}>
                                            <div className={styles.dados}>
                                                <DiceRoller />
                                            </div>
                                        </div>
                                        <div className={styles.row}>
                                            <div className={styles.anotacoes}>
                                                <textarea
                                                    title="anotações"
                                                    placeholder="Anotações da sessão"
                                                    className={styles.textAnotacoes}
                                                    value={notes}
                                                    onChange={(e) => setNotes(e.target.value)}
                                                />
                                                <div>
                                                    <Button>Ver notas</Button>
                                                    <Button onClick={handleNotes}>Salvar</Button>
                                                </div>
                                                {//adicionar um botão para abrir um modal apresentando uma tabela com todas as notas salvas do personagem.
                                                    //Na tabela devo apresentar o texto salvo, data de criação, opção para editar ou excluir.
                                                }
                                            </div>

                                        </div>
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

    return {
        props: {}
    }

})