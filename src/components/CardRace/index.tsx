import { useState, useEffect, useSyncExternalStore } from 'react'
import { RaceDataProps } from '@/pages/char'
import { setupAPIClientExternal } from '@/services/apiD&D/apiExternal'
import { translate } from '../Geral'

import styles from './styles.module.scss'

type DataRace = {
    dataRace: RaceDataProps
}

export default function CardRace({ dataRace }: DataRace) {

    const [loading, setLoading] = useState(false)
    const [raceData, setRaceData] = useState<RaceDataProps | null>(null)
    const [trait, setTrait] = useState([])

    const apiClientExternal = setupAPIClientExternal();

    useEffect(() => {
        if (dataRace) {
            setRaceData(dataRace)
        }
    }, [dataRace]);

    useEffect(() => {
        if (raceData) {
            traitsDesc();
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
                                        {trait.map((item, index) => (
                                            <div key={index} className={styles.traitsContainer}>
                                                <h4>{item.name}</h4>
                                                {item.desc.map((item, index) => (
                                                    <span key={index}>{item}</span>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                    <div className={styles.raceContainer}>
                                        <div className={styles.languagesTraits}>
                                            <h4>Idiomas conhecidos</h4>
                                            {raceData.language_desc && (
                                                <p>{raceData.language_desc}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.raceContainer}>
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
                                                <p>{item.bonus} ponto(s) em {translate(item.ability_score.name)}</p>
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
                                    <div className={styles.proficiencyContainer}>
                                        <h4>Proficiências da Raça</h4>
                                        {raceData.starting_proficiencies.length ? raceData.starting_proficiencies.map((item, index) => (
                                            <div className={styles.proficiencyItem} key={index}>
                                                <p>{item.name}</p>
                                            </div>

                                        )) : (
                                            <p>Sem Proficiências da raça</p>
                                        )}
                                        {raceData.starting_proficiency_options && (
                                            <p className={styles.proficiencyOptions}>{raceData.starting_proficiency_options.desc}</p>
                                        )}


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