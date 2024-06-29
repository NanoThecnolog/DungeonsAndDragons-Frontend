import { useState, useEffect } from "react"
import { ClassDataProps } from "@/pages/char";
import { t } from '@/services/translate/t'
import { setupAPIClientExternal } from "@/services/apiD&D/apiExternal";

import styles from './styles.module.scss'

type DataProps = {
    dataClass: ClassDataProps[];
    // onDataChange: (newData: NewObject[]) => void;
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
export default function CardClass({ dataClass, /*onDataChange*/ }: DataProps) {
    const [loading, setLoading] = useState(true)
    const apiClientExternal = setupAPIClientExternal();

    const [classData, setClassData] = useState<ClassDataProps[] | null>(null)
    const [classLevel, setClassLevel] = useState<LevelsProps[]>([])

    const [featDesc, setFeatDesc] = useState([])
    const [featInvoc, setFeatInvoc] = useState([])
    const [invocDesc, setInvocDesc] = useState([])
    const [subFeatDesc, setSubFeatDesc] = useState([])
    // console.log(classLevel)

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
            // handleProfBonusList();
        }
    }, [classLevel])
    useEffect(() => {
        if (featDesc) {
            fetchSubFeature();
            fetchFeatInvocations();
        }

    }, [featDesc])
    useEffect(() => {
        if (featInvoc) {
            fetchInvocations()
        }
    }, [featInvoc])

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
    async function fetchSubFeature() {
        if (!featDesc) return console.log("não está reconhecendo featDesc")
        const apiClientExternal = setupAPIClientExternal();
        setLoading(true)
        try {

            const subFeaturePromises = featDesc.flatMap((feat) => {
                if (feat.description.feature_specific) {
                    if (feat.description.feature_specific.subfeature_options) {
                        if (feat.description.feature_specific.subfeature_options.from) {
                            return feat.description.feature_specific.subfeature_options.from.options.map(async (subfeat) => {
                                const response = await apiClientExternal.get(subfeat.item.url)
                                return {
                                    ...subfeat,
                                    description: response.data
                                }
                            })
                        }
                    }
                }
                return [];
            })
            const subFeatureDescriptions = await Promise.all(subFeaturePromises)
            setSubFeatDesc(subFeatureDescriptions);
        } catch (err) {
            console.log("Erro ao buscar as subfeatures: ", err)
        } finally {
            setLoading(false)
        }

    }
    async function fetchFeatInvocations() {
        if (!featDesc) return;

        setLoading(true)

        try {
            const FeatureInvocationsPromises = featDesc.flatMap((feat) => {
                if (feat.description.feature_specific && feat.description.feature_specific.invocations) {
                    return feat.description.feature_specific.invocations.map(async (featInvoc) => {
                        const response = await apiClientExternal.get(featInvoc.url);

                        return {
                            ...featInvoc,
                            description: response.data
                        }
                    })
                }
                return [];
            })
            const subFeatureInvocations = await Promise.all(FeatureInvocationsPromises)
            setFeatInvoc(subFeatureInvocations)

        } catch (err) {
            console.log("Erro ao buscar invocações das features: ", err)

        } finally {
            setLoading(false)
        }
    }
    async function fetchInvocations() {
        if (!featInvoc) return;
        setLoading(true)
        try {
            const invocationsPromises = featInvoc.map(async (invocation) => {
                const response = await apiClientExternal(invocation.url)

                return {
                    ...invocation,
                    description: response.data
                }
            })
            const invocations = await Promise.all(invocationsPromises)
            setInvocDesc(invocations)


        } catch (err) {
            console.log("Erro ao buscar dados das invocações: ", err)

        } finally {
            setLoading(false)
        }
    }
    // function handleProfBonusList() {
    //     const newArray: NewObject[] = classLevel.flatMap(({ data }) => (
    //         data.map(({ level, prof_bonus }) => ({
    //             level,
    //             prof_bonus
    //         }))
    //     ))
    //     onDataChange(newArray)
    // }
    //criar uma função pra pegar class_specific das classes, salvar em useStates e apresentar


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
                                            <p key={index}>{t(item.name)}</p>
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
                                                {t(item.name)}
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
                                                <p>Você não recebe nenhum equipamento inicial da classe</p>
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
                                        <h4>habil. Conjuração</h4>
                                        {item.data.spellcasting?.spellcasting_ability ? (
                                            <>
                                                {t(item.data.spellcasting.spellcasting_ability.name)}
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
                                                                        <div key={descIndex} className={styles.featureDesc}>
                                                                            <p>{desc}</p>
                                                                            {subFeatDesc && (
                                                                                subFeatDesc.map((item, index) => (
                                                                                    item.description.parent.index === feat.index && (
                                                                                        <div key={index} className={styles.featContainer}>
                                                                                            <h4>{item.description.name}</h4>
                                                                                            {item.description.desc.map((desc, index) => (
                                                                                                <p key={index}>{desc}</p>
                                                                                            ))}
                                                                                        </div>
                                                                                    )


                                                                                ))
                                                                            )}
                                                                            {invocDesc && (
                                                                                invocDesc.map((invocation, index) => (
                                                                                    invocation.description.parent.index === feat.index && (
                                                                                        <div key={index}>
                                                                                            <h4>{invocation.description.name}</h4>
                                                                                            {invocation.description.desc.map((item, index) => (
                                                                                                <p key={index}>{item}</p>
                                                                                            ))}

                                                                                        </div>

                                                                                    )

                                                                                ))
                                                                            )}

                                                                        </div>

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