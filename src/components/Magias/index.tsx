import styles from './styles.module.scss'
import CheckBox from '../ui/CheckBox'
import { useState } from 'react'
import Editar from '../ui/Config'
import Modal from 'react-modal'
import { setupAPIClientExternal } from '@/services/apiD&D/apiExternal'
import ModalSpellFilter from '../ModalSpellsFilter'
import { toast } from 'react-toastify'

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

    const [modalItem, setModalItem] = useState()
    const [modalVisible, setModalVisible] = useState(false)


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

    const [selectedSpell, setSelectedSpell] = useState<SpellInfoProps[]>([])



    async function filtrarPorLevel(level: number) {
        console.log("filtrando pelo level: ", level);

        const filtred = spells.results.filter(item => item.level === level);


        setFiltred(filtred)

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
    function handleSpellSelect(spell: SpellInfoProps[]) {
        if (spell[0].level === 0) {
            setTruques(spell);
        } else if (spell[0].level === 1) {
            setSpell1(spell)
        } else if (spell[0].level === 2) {
            setSpell2(spell)
        } else if (spell[0].level === 3) {
            setSpell3(spell)
        } else if (spell[0].level === 4) {
            setSpell4(spell)
        } else if (spell[0].level === 5) {
            setSpell5(spell)
        } else if (spell[0].level === 6) {
            setSpell6(spell)
        } else if (spell[0].level === 7) {
            setSpell7(spell)
        } else if (spell[0].level === 8) {
            setSpell8(spell)
        } else if (spell[0].level === 9) {
            setSpell9(spell)
        }
        toast.success("Magias adicionadas.")

    }

    Modal.setAppElement('#__next');
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
                            // criar o modal pra mostrar a variavel filtred e o personagem adicionar as magias. 
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
                                        <p>{spell.casting_time}</p>
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
                                        <p>{spell.casting_time}</p>
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
                                        <p>{spell.casting_time}</p>
                                    </div>
                                ))}
                                {/* {filtred.map(spell => (
                                    <div className={styles.spell} key={spell.index}>
                                        <h5>{spell.name}</h5>
                                        <p>{spell.school.name}</p>
                                    </div>
                                ))} */}

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
                                        <p>{spell.casting_time}</p>
                                    </div>
                                ))}
                                {/* {filtred.map(spell => (
                                    <div className={styles.spell} key={spell.index}>
                                        <h5>{spell.name}</h5>
                                        <p>{spell.casting_time}</p>
                                    </div>
                                ))} */}

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
                                        <p>{spell.casting_time}</p>
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
                                        <p>{spell.casting_time}</p>
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
                                        <p>{spell.casting_time}</p>
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
                                        <p>{spell.casting_time}</p>
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
                                        <p>{spell.casting_time}</p>
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
                                        <p>{spell.casting_time}</p>
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