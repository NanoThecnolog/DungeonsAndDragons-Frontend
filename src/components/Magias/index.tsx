import styles from './styles.module.scss'
import CheckBox from '../ui/CheckBox'
import { useState, useEffect } from 'react'
import Editar from '../ui/Config'
// import Modal from 'react-modal'
import { setupAPIClientExternal } from '@/services/apiD&D/apiExternal'
import ModalSpellFilter from '../ModalSpellsFilter'
import { toast } from 'react-toastify'
import { setupAPIClient } from '@/services/api'

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
    spells: string[];
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
interface CharDataProps {
    charData: CharProps;
    spells: SpellsDataProps;
}

export type FilterSpellProps = {
    index: string;
    name: string;
    level: number;
    url: string;
}
export type SpellInfoProps = {
    area_of_effect: {
        size: number;
        type: string;
    };
    casting_time: string;
    classes: [
        {
            index: string;
            name: string;
            url: string;
        }
    ];
    components: string[];
    concentration: boolean;
    desc: string[];
    duration: string;
    higher_level: string[];
    index: string;
    level: number;
    material: string;
    name: string;
    range: string;
    ritual: boolean;
    school: {
        index: string;
        name: string;
        url: string;
    };
    subclasses: [
        {
            index: string;
            name: string;
            url: string;
        }
    ];
    url: string;
}

export default function Spells({ charData, spells }: CharDataProps) {
    // console.log(spells);
    const apiClient = setupAPIClient();
    const [modalItem, setModalItem] = useState()
    const [modalVisible, setModalVisible] = useState(false)
    const charSpells = charData.char.spells;
    const { name, title } = charData.char;
    const charClass = charData.charClass;

    const [truques, setTruques] = useState<SpellInfoProps[]>([])
    const [spell1, setSpell1] = useState<SpellInfoProps[]>([])
    const [spell2, setSpell2] = useState<SpellInfoProps[]>([])
    const [spell3, setSpell3] = useState<SpellInfoProps[]>([])
    const [spell4, setSpell4] = useState<SpellInfoProps[]>([])
    const [spell5, setSpell5] = useState<SpellInfoProps[]>([])
    const [spell6, setSpell6] = useState<SpellInfoProps[]>([])
    const [spell7, setSpell7] = useState<SpellInfoProps[]>([])
    const [spell8, setSpell8] = useState<SpellInfoProps[]>([])
    const [spell9, setSpell9] = useState<SpellInfoProps[]>([])

    const [filtred, setFiltred] = useState<FilterSpellProps[]>([])
    const [spellInfo, setSpellInfo] = useState<SpellInfoProps[]>([])
    const [spellsList, setSpellsList] = useState<SpellInfoProps[]>([])

    const [selectedSpell, setSelectedSpell] = useState<SpellInfoProps[]>([])

    useEffect(() => {
        async function setSpellsInfo() {
            console.log("iniciando o useEffect");
            try {
                const spellsInfo = await spellMap();
                console.log("spellsInfo: ", spellsInfo);
                setSpellsList(spellsInfo);
            } catch (err) {
                console.log("Erro ao setar as informações das magias", err)
            }
        }
        setSpellsInfo();



    }, [])
    useEffect(() => {
        async function handleSpellSelect() {

            await spellsList.map((item) => {
                console.log("Item no map", item.level)
                const spellSetters: { [key: number]: React.Dispatch<React.SetStateAction<SpellInfoProps[]>> } = {
                    0: setTruques,
                    1: setSpell1,
                    2: setSpell2,
                    3: setSpell3,
                    4: setSpell4,
                    5: setSpell5,
                    6: setSpell6,
                    7: setSpell7,
                    8: setSpell8,
                    9: setSpell9,
                };
                const setter = spellSetters[item.level];
                if (setter) {//editar esse bloco para que não seja adicionado mais um. Mudar para atualizar as listas.
                    setter((prevSpells) => [...prevSpells, item]);
                } else {
                    console.warn(`Nenhum setter encontrado para o nível ${item.level}`);
                }
            })
        }
        handleSpellSelect();

    }, [spellsList])



    async function filtrarPorLevel(level: number) {
        console.log("filtrando pelo level: ", level);

        const filtred = spells.results.filter(item => item.level === level);
        try {
            const apiClient = setupAPIClientExternal();

            const promises = filtred.map(item => {
                return apiClient.get(`/api/spells/${item.index}`);
            });

            const responses = await Promise.all(promises);
            const spellsInfo = responses.map(response => response.data);

            console.log(spellsInfo);
            setSpellInfo(spellsInfo);



        } catch (err) {
            console.log("Erro ao buscar dados das magias filtradas.", err)
        }
        // console.log(filtred[0].name)
        setModalVisible(true)

    }
    function handleCloseModal() {
        setModalVisible(false);
    }


    async function spellMap() {
        const apiClientExternal = setupAPIClientExternal();
        console.log("iniciando busca na api externa")
        const promises = charSpells.map(async (item) => {
            try {
                const response = await apiClientExternal.get(`/api/spells/${item}`)
                return response.data
            } catch (err) {
                console.log("erro ao buscar as magias na api Externa")
            }
        })
        console.log("A busca terminou.")
        const results = await Promise.all(promises);
        console.log(results);
        return results;
    }
    function handleSpellSelect() {
        //modificar essa função para enviar o index das magias selecionadas para o banco de dados, editando o personagem no /char.

        spellsList.map((item) => {
            console.log("Item no map", item.level)
            const spellSetters: { [key: number]: React.Dispatch<React.SetStateAction<SpellInfoProps[]>> } = {
                0: setTruques,
                1: setSpell1,
                2: setSpell2,
                3: setSpell3,
                4: setSpell4,
                5: setSpell5,
                6: setSpell6,
                7: setSpell7,
                8: setSpell8,
                9: setSpell9,
            };
            const setter = spellSetters[item.level];
            if (setter) {
                setter((prevSpells) => [...prevSpells, item]);
                toast.success("Magias adicionadas.");
            } else {
                console.warn(`Nenhum setter encontrado para o nível ${item.level}`);
            }
        })
    }

    async function spellRequest() {

        try {
            await apiClient.put('/char')

        } catch {
            console.log("Erro ao salvar as magias no backend")
        }
    }


    // Modal.setAppElement('#__next');
    return (
        <>
            <main className={styles.container}>
                <article className={styles.dataContainer}>
                    <div className={styles.row}>
                        <div className={styles.infoContainer}>
                            <p>{name}</p>
                            <p>{title}</p>
                            <p>{charClass[0].name} - {charClass[0].level}</p>
                        </div>
                        <div className={styles.infoContainer}>classe conjuradora</div>
                        <div className={styles.infoContainer}>habilidade de conj</div>
                        <div className={styles.infoContainer}>CD</div>
                        <div className={styles.infoContainer}><p>Magic Attack</p></div>
                    </div>
                    <div className={styles.row}>
                        {
                            //criar o modal pra mostrar a variavel filtred e o personagem adicionar as magias. ---ok
                            //salvar o nome das magias no banco de dados e fazer a requisição dos dados das magias pelo nome.
                            //apresentar os dados num modal, quando o jogador clicar na magia. Nesse modal apresentar os dados como:
                            //nome
                            //descrição
                            //uso em níveis mais altos
                            //alcance
                            //componentes
                            //material
                            //se precisa de ritual
                            //duração
                            //se precisa de concentração
                            //tempo de canalização
                            //level
                            //tipo de ataque
                            //tipo de dano e o dano por nível de slot
                            //escola
                            //classe e subclasse que pode utilizar
                            //opção de retirar a magia.
                        }
                        <div className={styles.magias}>
                            <div onClick={(() => filtrarPorLevel(0))}><Editar /></div>
                            <h5>truques</h5>
                            <div className={styles.nivelRow}>
                            </div>
                            <div className={styles.spellContainer}>

                                {truques.map(spell => (
                                    <div key={spell.index}>
                                        <p>{spell.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={styles.magias}>
                            <div onClick={(() => filtrarPorLevel(1))}><Editar /></div>
                            <h5>Nível 1</h5>
                            <div className={styles.nivelRow}>
                                <CheckBox></CheckBox>
                                <CheckBox></CheckBox>
                                <CheckBox></CheckBox>
                                <CheckBox></CheckBox>
                            </div>
                            <div className={styles.spellContainer}>
                                {spell1.map(spell => (
                                    <div className={styles.spell} key={spell.index}>
                                        <h5>{spell.name}</h5>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={styles.magias}>
                            <div onClick={(() => filtrarPorLevel(2))}><Editar /></div>
                            <h5>Nível 2</h5>
                            <div className={styles.nivelRow}>
                                <CheckBox></CheckBox>
                                <CheckBox></CheckBox>
                                <CheckBox></CheckBox>
                                <CheckBox></CheckBox>
                            </div>
                            <div className={styles.spellContainer}>
                                {spell2.map(spell => (
                                    <div className={styles.spell} key={spell.index}>
                                        <h5>{spell.name}</h5>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={styles.magias}>
                            <div onClick={(() => filtrarPorLevel(3))}><Editar /></div>
                            <h5>Nível 3</h5>
                            <div className={styles.nivelRow}>
                                <CheckBox></CheckBox>
                                <CheckBox></CheckBox>
                                <CheckBox></CheckBox>
                                <CheckBox></CheckBox>
                            </div>
                            <div className={styles.spellContainer}>
                                {spell3.map(spell => (
                                    <div className={styles.spell} key={spell.index}>
                                        <h5>{spell.name}</h5>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={styles.magias}>
                            <div onClick={(() => filtrarPorLevel(4))}><Editar /></div>
                            <h5>Nível 4</h5>
                            <div className={styles.nivelRow}>
                                <CheckBox></CheckBox>
                                <CheckBox></CheckBox>
                                <CheckBox></CheckBox>
                                <CheckBox></CheckBox>
                            </div>
                            <div className={styles.spellContainer}>
                                {spell4.map(spell => (
                                    <div className={styles.spell} key={spell.index}>
                                        <h5>{spell.name}</h5>
                                    </div>
                                ))}

                            </div>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.magias}>
                            <div onClick={(() => filtrarPorLevel(5))}><Editar /></div>
                            <h5>Nível 5</h5>
                            <div className={styles.nivelRow}>

                                <CheckBox></CheckBox>
                                <CheckBox></CheckBox>
                                <CheckBox></CheckBox>
                                <CheckBox></CheckBox>
                            </div>
                            <div className={styles.spellContainer}>
                                {spell5.map(spell => (
                                    <div className={styles.spell} key={spell.index}>
                                        <h5>{spell.name}</h5>
                                    </div>
                                ))}

                            </div>
                        </div>
                        <div className={styles.magias}>
                            <div onClick={(() => filtrarPorLevel(6))}><Editar /></div>
                            <h5>Nível 6</h5>
                            <div className={styles.nivelRow}>

                                <CheckBox></CheckBox>
                                <CheckBox></CheckBox>
                                <CheckBox></CheckBox>
                                <CheckBox></CheckBox>
                            </div>
                            <div className={styles.spellContainer}>
                                {spell6.map(spell => (
                                    <div className={styles.spell} key={spell.index}>
                                        <h5>{spell.name}</h5>
                                    </div>
                                ))}

                            </div>
                        </div>
                        <div className={styles.magias}>
                            <div onClick={(() => filtrarPorLevel(7))}><Editar /></div>
                            <h5>Nível 7</h5>
                            <div className={styles.nivelRow}>

                                <CheckBox></CheckBox>
                                <CheckBox></CheckBox>
                                <CheckBox></CheckBox>
                                <CheckBox></CheckBox>
                            </div>
                            <div className={styles.spellContainer}>
                                {spell7.map(spell => (
                                    <div className={styles.spell} key={spell.index}>
                                        <h5>{spell.name}</h5>
                                    </div>
                                ))}

                            </div>
                        </div>
                        <div className={styles.magias}>
                            <div onClick={(() => filtrarPorLevel(8))}><Editar /></div>
                            <h5>Nível 8</h5>
                            <div className={styles.nivelRow}>

                                <CheckBox></CheckBox>
                                <CheckBox></CheckBox>
                                <CheckBox></CheckBox>
                                <CheckBox></CheckBox>
                            </div>
                            <div className={styles.spellContainer}>
                                {spell8.map(spell => (
                                    <div className={styles.spell} key={spell.index}>
                                        <h5>{spell.name}</h5>
                                    </div>
                                ))}

                            </div>
                        </div>
                        <div className={styles.magias}>
                            <div onClick={(() => filtrarPorLevel(9))}><Editar /></div>
                            <h5>Nível 9</h5>
                            <div className={styles.nivelRow}>

                                <CheckBox></CheckBox>
                                <CheckBox></CheckBox>
                                <CheckBox></CheckBox>
                                <CheckBox></CheckBox>
                            </div>
                            <div className={styles.spellContainer}>
                                {spell9.map(spell => (
                                    <div className={styles.spell} key={spell.index}>
                                        <p>{spell.name}</p>
                                    </div>
                                ))}

                            </div>
                        </div>
                    </div>
                </article>
            </main>
            {modalVisible && (
                <ModalSpellFilter
                    isOpen={modalVisible}
                    onRequestClose={handleCloseModal}
                    spell={spellInfo}
                    onSpellSelect={handleSpellSelect}
                />
            )}

        </>
    )
}