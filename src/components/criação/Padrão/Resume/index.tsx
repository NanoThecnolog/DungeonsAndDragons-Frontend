import Image from 'next/image'
import { t } from '@/services/translate/t'
import styles from './styles.module.scss'
import { RaceProps } from '@/types/char'
import { SubRaceProps } from '../SegundaEtapa'

interface ResumeProps {

    name: string
    image?: string
    title?: string
    race?: RaceProps
    subrace?: SubRaceProps
    classe?: string
    attributes?: {
        str: {
            index: string;
            value: number;
        }
        dex: {
            index: string;
            value: number;
        }
        con: {
            index: string;
            value: number;
        }
        int: {
            index: string;
            value: number;
        }
        wis: {
            index: string;
            value: number;
        }
        cha: {
            index: string;
            value: number;
        }
    }

}


export default function Resumo({ name, image, title, race, subrace, classe, attributes }: ResumeProps) {
    if (race) {
        console.log(race);
    }
    return (
        <div className={styles.resumeContainer}>
            {image && (
                <div>
                    <Image
                        src={image}
                        alt="imagem-do-personagem"
                        width={100}
                        height={100}
                        className={styles.image}
                    />
                </div>
            )}
            {name && (
                <div className={styles.textContainer}>
                    <div>
                        <h4>Nome: {name}</h4>
                        {title && (
                            <h4>Título: "{title}"</h4>
                        )}
                    </div>

                    <div style={{ display: 'flex' }}>
                        {race ? (
                            <div style={{ paddingRight: '10px' }}>
                                <h4>Raça:</h4>
                                <p>{t(race.raceData.name)}</p>
                            </div>
                        ) : subrace ? (
                            <div style={{ paddingRight: '10px' }}>
                                <h4>Raça:</h4>
                                <p>{t(subrace.subRace.name)}</p>
                            </div>
                        ) : ""}
                        {classe && (
                            <div>
                                <h4>Classe:</h4>
                                <p>{t(classe)}</p>
                            </div>
                        )}

                    </div>

                </div>
            )}
            {attributes && (
                <div className={styles.attributesContainer}>
                    <div>
                        <h5>Atributos:</h5>
                    </div>
                    <div>
                        <div style={{ display: 'flex' }}>
                            <h5>{t(attributes.str.index)}</h5>
                            <p style={{ paddingLeft: '0.4rem' }}>{attributes.str.value}</p>
                        </div>
                        <div style={{ display: 'flex' }}>
                            <h5>{t(attributes.dex.index)}</h5>
                            <p style={{ paddingLeft: '0.4rem' }}>{attributes.dex.value}</p>
                        </div>
                        <div style={{ display: 'flex' }}>
                            <h5>{t(attributes.con.index)}</h5>
                            <p style={{ paddingLeft: '0.4rem' }}>{attributes.con.value}</p>
                        </div>
                        <div style={{ display: 'flex' }}>
                            <h5>{t(attributes.int.index)}</h5>
                            <p style={{ paddingLeft: '0.4rem' }}>{attributes.int.value}</p>
                        </div>
                        <div style={{ display: 'flex' }}>
                            <h5>{t(attributes.wis.index)}</h5>
                            <p style={{ paddingLeft: '0.4rem' }}>{attributes.wis.value}</p>
                        </div>
                        <div style={{ display: 'flex' }}>
                            <h5>{t(attributes.cha.index)}</h5>
                            <p style={{ paddingLeft: '0.4rem' }}>{attributes.cha.value}</p>
                        </div>
                    </div>
                </div>
            )
            }
        </div >
    )
}