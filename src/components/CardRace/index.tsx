import { useState, useEffect, useSyncExternalStore } from 'react'
import { RaceDataProps } from '@/pages/char'
import { setupAPIClientExternal } from '@/services/apiD&D/apiExternal'
import { t } from '../../services/translate/t'
import styles from './styles.module.scss'


type DataRace = {
    dataRace: RaceDataProps
}
type SkillDataProps = {
    index: string
    name: string
    desc: [string]
    ability_score: {
        index: string
        name: string
        url: string
    }
    url: string
}

export default function CardRace({ dataRace }: DataRace) {

    const [loading, setLoading] = useState(false)
    const [raceData, setRaceData] = useState<RaceDataProps | null>(null)
    const [trait, setTrait] = useState([])
    const [skill, setSkill] = useState<SkillDataProps[]>([])
    // console.log(raceData)
    console.log(raceData)

    const apiClientExternal = setupAPIClientExternal();

    useEffect(() => {
        if (dataRace) {
            setRaceData(dataRace)
        }
    }, [dataRace]);

    useEffect(() => {
        if (raceData) {
            traitsDesc();
            fecthProficiencyOptions();
        }


    }, [raceData]);

    async function traitsDesc() {
        if (!raceData) {
            return;
        }
        const { traits } = raceData;
        // console.log(traits);


        try {
            setLoading(true);
            const traitPromises = traits.map(async (item) => {
                try {
                    const response = await apiClientExternal.get(item.url);
                    const traitData = response.data;
                    if (trait.length < traits.length) {
                        setTrait(prevTrait => [...prevTrait, traitData]);
                    }
                } catch (err) {
                    console.error(`Erro ao buscar na url ${item.url}:`, err);
                }
            });
            await Promise.all(traitPromises);
        } catch (err) {
            console.error('Erro ao buscar os dados dos traços', err);
        }
        finally {
            setLoading(false);
        }

    }
    async function fecthProficiencyOptions() {
        if (!raceData) {
            console.warn("raceData não definido.")
            return;
        }
        // console.log("Iniciando função")
        setLoading(true)

        if (raceData.starting_proficiency_options) {
            const options = raceData.starting_proficiency_options.from.options;
            // console.log("Iniciando as Promises")

            const allSkillData = [];

            const optionPromises = options.map(async (option) => {
                try {
                    const response = await apiClientExternal.get(option.item.url)
                    const optionData = response.data;
                    // console.log("Resposta com as informações das options pronta. ", optionData)

                    if (optionData.reference) {
                        try {
                            const response = await apiClientExternal.get(optionData.reference.url)
                            const skillData = response.data;
                            // console.log("Requisição da referência das perícias pronta. ", skillData)
                            allSkillData.push(skillData)
                        } catch (err) {
                            console.error("Erro ao buscar descrição de perícias:", err);
                        }
                    }
                } catch (err) {
                    console.error("Erro ao buscar as opções de proficiências na API externa: ", err);
                }
            });
            try {
                await Promise.all(optionPromises);
                setSkill(allSkillData)
            } catch (err) {
                console.error("Erro ao buscar opções de proficiências: ", err);
            } finally {
                setLoading(false);
            }
        } else {
            console.error("Sem opções de proficiencia")
            setLoading(false)
        }
    }

    if (loading) {
        return <div>Carregando raça...</div>

    }
    if (!raceData) {
        return <div>Sem dados de raça.</div>;
    }

    return (
        <>
            {raceData ? (
                <div className={styles.info}>
                    <h1>Traços raciais</h1>
                    <div className={styles.racaContainer}>
                        <div className={styles.raca}>
                            <div>
                                <h2>{raceData.name}</h2>
                            </div>
                            <div className={styles.subraca}>
                                <h3>Subraças</h3>
                                {raceData.subraces.length ? raceData.subraces.map((item, index) => (
                                    <p key={index}>{item.name}</p>
                                )) : (
                                    <p>Nenhuma sub-raça</p>
                                )}
                            </div>
                        </div>
                        <div className={styles.traits}>
                            <div className={styles.raceTraits}>
                                <div>
                                    <div className={styles.raceContainer}>
                                        <div className={styles.languagesTraits}>
                                            <h4>Idiomas conhecidos</h4>
                                            {raceData.language_desc && (
                                                <p>{t(raceData.language_desc)}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className={styles.raceContainer}>
                                        {trait &&
                                            trait.map((item, index) => (
                                                <div key={index} className={styles.traitsContainer}>
                                                    <h4>{item.name}</h4>
                                                    {item.desc.map((item, index) => (
                                                        <span key={index}>{item}</span>
                                                    ))}
                                                </div>
                                            ))
                                        }

                                    </div>
                                    <div className={styles.raceContainer}>
                                        {skill &&
                                            <div className={styles.skillContainer}>
                                                <h3>Opções de perícias</h3>
                                                {skill.length ?
                                                    skill.map((item, index) => (
                                                        <div key={index} className={styles.skillOptionsContainer}>
                                                            <h4>{item.name}</h4>
                                                            {item.ability_score ?
                                                                (<>
                                                                    <p>({t(item.ability_score.name)})</p>
                                                                </>) :
                                                                (<>
                                                                    <p>{item.desc}</p>
                                                                </>)}



                                                        </div>
                                                    ))
                                                    : (
                                                        <>A merda da tua raça n da opção de perícia...Deve ser humano, o raça desgraçada!</>
                                                    )}

                                            </div>
                                        }
                                    </div>

                                </div>
                                <div className={styles.raceContainer}>
                                    <div className={styles.proficiencyContainer}>
                                        <h4>Proficiências da Raça</h4>
                                        <div className={styles.proficiencyBox}>
                                            <div>
                                                {raceData.starting_proficiencies.length ? raceData.starting_proficiencies.map((item, index) => (
                                                    <div className={styles.proficiencyItem} key={index}>
                                                        <p>{item.name}</p>
                                                    </div>

                                                )) : (
                                                    <p>Sem Proficiências da raça</p>
                                                )}
                                            </div>
                                            <div>
                                                {raceData.starting_proficiency_options && (
                                                    <p className={styles.proficiencyOptions}>{raceData.starting_proficiency_options.desc}</p>
                                                )}
                                            </div>
                                        </div>


                                    </div>
                                    <div className={styles.raceInfo}>
                                        <h4>Estatura</h4>
                                        {raceData.size_description && (
                                            <p>{raceData.size_description}</p>
                                        )}

                                    </div>
                                    <div className={styles.raceInfo}>
                                        <h4>Bonus em habilidades</h4>
                                        {raceData.ability_bonuses.map((item, index) => (
                                            <div key={index}>
                                                <p>{item.bonus} ponto(s) em {t(item.ability_score.name)}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className={styles.raceInfo}>
                                        <h4>Longevidade</h4>
                                        <p>{raceData.age}</p>
                                    </div>
                                    <div className={styles.raceInfo}>
                                        <h4>Tendência:</h4>
                                        <span>{raceData.alignment}</span>
                                    </div>


                                </div>
                            </div>

                            <div className={styles.row}>
                                <div className={styles.raceTraits}>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : "Raça não encontrada."}
        </>
    )

}