import { useState, useEffect } from "react"
import { ClassDataProps } from "@/pages/char";
import { translate } from "../Geral";
import { setupAPIClientExternal } from "@/services/apiD&D/apiExternal";

import styles from './styles.module.scss'

type DataProps = {
    dataClass: ClassDataProps[];
}
type LevelsProps = {
    index: string;
    data: [{
        ability_score_bonuses: number;
        class: {
            index: string;
            name: string;
            url: string;
        }
        class_specific: Record<string, any>;
        features: [
            {
                index: string;
                name: string;
                url: string;
            }
        ]
        index: string;
        level: number;
        prof_bonus: number;
        spellcasting: {
            cantrips_known: number;
            spell_slots_level_1: number;
            spell_slots_level_2: number;
            spell_slots_level_3: number;
            spell_slots_level_4: number;
            spell_slots_level_5: number;
            spell_slots_level_6: number;
            spell_slots_level_7: number;
            spell_slots_level_8: number;
            spell_slots_level_9: number;
            spells_known: number;
        }
        url: string;

    }]

}
interface ArrayLevelProps {

}
export default function CardClass({ dataClass }: DataProps) {
    const [loading, setLoading] = useState(true)

    const [classData, setClassData] = useState<ClassDataProps[] | null>(null)
    const [classLevel, setClassLevel] = useState<LevelsProps[]>([])
    const [featDesc, setFeatDesc] = useState([])
    console.log("esse é o featDesc: ", featDesc)

    useEffect(() => {
        if (dataClass) {
            setClassData(dataClass)

        }
    }, [dataClass])
    useEffect(() => {
        if (classData) {
            classLevels();
        }


    }, [classData])
    useEffect(() => {
        if (classLevel) {
            fetchFeatures();
        }

    }, [classLevel])

    async function classLevels() {
        const apiClientExternal = setupAPIClientExternal();
        setLoading(true);

        try {
            const classLevelsPromises = classData.map(async (item) => {

                const response = await apiClientExternal.get(item.data.class_levels)
                return {
                    index: item.data.index,
                    data: response.data
                }
            })
            const promiseResult = await Promise.all(classLevelsPromises);
            setClassLevel(promiseResult);
            console.log("Esse é o array resultante da chamada: ", promiseResult)
        } catch (err) {
            console.log("Erro ao buscar dados dos níveis das classes", err)
        } finally {
            setLoading(false)
        }
    }
    async function fetchFeatures() {
        const apiClientExternal = setupAPIClientExternal();
        setLoading(true);
        try {
            const featurePromises = classLevel.flatMap((classData) =>
                classData.data.flatMap((level) =>
                    level.features.map(async (feature) => {
                        const response = await apiClientExternal.get(feature.url)
                        return {
                            ...feature,
                            description: response.data
                        }
                    })
                )
            )
            const featureDescriptions = await Promise.all(featurePromises)
            setFeatDesc(featureDescriptions)

        } catch (err) {
            console.log("Erro ao tentar pegar as descrições das features: ", err)

        } finally {
            setLoading(false);
        }
    }

    if (loading) return <div>Carregando dados da classe...</div>

    return (
        <>
            {classData ? (
                <div className={styles.info}>
                    <h1>Informações de Classe</h1>
                    <div>
                        {classData.map((item, index) => (
                            <div className={styles.classContainer} key={index}>
                                <div className={styles.row}>
                                    <div className={styles.nameDiceContainer}>
                                        <div className={styles.infoContainer}>
                                            <h2>{item.name}</h2>
                                        </div>
                                        <div className={styles.infoContainer}>
                                            <div className={styles.lifeDice}>
                                                <h4>Dado de vida</h4>
                                                <p className={styles.hitDice}>1D{item.data.hit_die}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.row}>
                                    <div className={styles.infoContainer}>
                                        <h4>Proficiências</h4>
                                        {item.data.proficiencies && item.data.proficiencies.map((item, index) => (
                                            <p key={index}>{translate(item.name)}</p>
                                        ))}
                                    </div>
                                    <div className={styles.infoContainer}>
                                        <h4>Opções de proficiência</h4>
                                        {item.data.proficiency_choices && item.data.proficiency_choices.map((item, index) => (
                                            <p key={index}>{item.desc}</p>
                                        ))}
                                    </div>
                                    <div className={styles.infoContainer}>
                                        <h4>Testes de resistência</h4>
                                        {item.data.saving_throws && item.data.saving_throws.map((item, index) => (
                                            <p key={index}>
                                                {translate(item.name)}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                                <div className={styles.row}>
                                    <div className={styles.infoContainer}>
                                        <h4>Subclasses</h4>
                                        {item.data.subclasses && item.data.subclasses.map((item, index) => (
                                            <p key={index}>{item.name}</p>
                                        ))}
                                    </div>
                                    <div className={styles.infoContainer}>
                                        <h4>Equipamento Inicial</h4>
                                        <div>
                                            {item.data.starting_equipment.length ? item.data.starting_equipment.map((item, index) => (
                                                <p key={index}>{item.quantity} {item.equipment.name}</p>
                                            )) : (
                                                <p>Nenhum equipamento inicial para a classe</p>
                                            )}

                                        </div>
                                    </div>
                                    <div className={styles.infoContainer}>
                                        <h4>Opções de equipamento inicial</h4>
                                        <div>
                                            {item.data.starting_equipment_options && item.data.starting_equipment_options.map((item, index) => (
                                                <p key={index}>{item.desc}</p>
                                            ))}
                                        </div>
                                    </div>
                                    <div className={styles.infoContainer}>
                                        <h4>Conjuração</h4>
                                        {item.data.spellcasting?.spellcasting_ability ? (
                                            <>
                                                {translate(item.data.spellcasting.spellcasting_ability.name)}
                                            </>
                                        ) : (
                                            <p>Classe sem conjuração</p>
                                        )}
                                    </div>
                                </div>
                                <div className={styles.infoContainer}>
                                    <div className={styles.conjuration}>
                                        <h4>Tipos de conjuração</h4>
                                        {item.data.spellcasting ? item.data.spellcasting.info.map((item, index) => (
                                            <div key={index} className={styles.conjurationTypes}>
                                                <div className={styles.conjurationName}>
                                                    <h5>{item.name}</h5>
                                                </div>
                                                <div className={styles.conjurationDesc}>
                                                    <p>{item.desc.map((item) => item)}</p>
                                                </div>

                                            </div>
                                        )) : (
                                            <p>Classe sem conjuração</p>
                                        )}
                                    </div>
                                </div>
                                <div className={styles.infoContainer}>
                                    <div className={styles.row}>
                                        <div>
                                            <div className={styles.features}>
                                                {featDesc && (
                                                    <>
                                                        <h3>Features</h3>
                                                        {featDesc.map((feat, index) => (
                                                            feat.description.class.index === item.data.index && (
                                                                <div className={styles.featureContainer} key={index}>
                                                                    <p className={styles.featureName}>{feat.name}</p>
                                                                    {feat.description.desc.map((desc, descIndex) => (
                                                                        <p className={styles.featureDesc} key={descIndex}>{desc}</p>
                                                                    ))}
                                                                </div>
                                                            )
                                                        )
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div>
                    Nenhuma classe encontrada
                </div>
            )}
        </>
    )
}