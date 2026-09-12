import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, FormControl, MenuItem, Select } from '@mui/material'
import { ClassesProps, FeatureLevelProps } from '..'
import styles from './styles.module.scss'
import Image from 'next/image'
import { t } from '@/services/translate/t'
import React, { useState, ChangeEvent } from 'react'
import { Button } from '@/components/ui/Button'
import { LevelProps } from '..'



interface DataProps {
    classData: ClassesProps[]
    levelsData: LevelProps[]
    proficiencies: Record<string, any>;
    levelsFeatures: FeatureLevelProps[];
    handleChoices: (value: { [key: number]: string[] }) => void;
    handleClasse: (value: string) => void;
}

export default function TerceiraEtapa({ classData, levelsData, proficiencies, levelsFeatures, handleChoices, handleClasse }: DataProps) {

    const [level, setLevel] = useState<number>(1)
    const [profChoices, setProfChoices] = useState<{ [key: number]: string[] }>({})
    const [instrumentsChoices, setInstrumentsChoices] = useState<string[]>([])

    function handleClassChoices(e: React.ChangeEvent<{ value: unknown }>, choose: number, index: number, classIndex: string) {
        // console.log(choose)

        let value = e.target.value as string | string[];
        if (typeof value === 'string') {
            value = value.split(',');
        }

        if (value.length > choose) {
            value = value.slice(0, choose);
        }
        // console.log(value)
        const key = `${classIndex}-${index}`
        setProfChoices((prevChoices) => ({
            ...prevChoices,
            [key]: value as string[]
        }));
        console.log("Essas são as escolhas de proficiencia", profChoices)
        handleChoices(profChoices)
    };



    return (
        <div className={styles.form}>
            <div className={styles.formItem}>
                <p>Escolha uma classe</p>
                {classData ? (classData.map((classe, index) => {
                    const hasArmor = classe.proficiencies.some((prof) =>
                        proficiencies.some((item) => item.type === 'Armor' && item.index === prof.index)
                    );
                    const hasWeapon = classe.proficiencies.some((prof) =>
                        proficiencies.some((item) => item.type === 'Weapons' && item.index === prof.index)
                    );
                    const hasTool = classe.proficiencies.some((prof) =>
                        proficiencies.some((item) => ['Tools', "Artisan's Tools", "Musical Instruments", "Other"].includes(item.type) && item.index === prof.index)
                    );
                    const hasSaving = classe.proficiencies.some((prof) =>
                        proficiencies.some((item) => item.type === 'Saving Throws' && item.index === prof.index)
                    );
                    const filteredLevels = levelsData.filter(level => level.class.index === classe.index);

                    return (
                        <div key={index} className={styles.cardClassContainer}>
                            <Accordion className={styles.cardItem}>
                                <AccordionSummary className={styles.cardSummary}>
                                    <div>
                                        <div>
                                            {/* <Image/> */}
                                        </div>
                                        <div className={styles.className}>
                                            <h4>{t(classe.name)}</h4>
                                        </div>
                                    </div>
                                </AccordionSummary>
                                <AccordionDetails className={styles.cardDetails}>
                                    <div>
                                        <FormControl sx={{ m: 0, minWidth: 100 }} size="small">
                                            <Select
                                                value={level}
                                                onChange={(e) => setLevel(e.target.value as number)}
                                            >
                                                <MenuItem value={1}>Nível 1</MenuItem>
                                                <MenuItem value={2}>Nível 2</MenuItem>
                                                <MenuItem value={3}>Nível 3</MenuItem>
                                                <MenuItem value={4}>Nível 4</MenuItem>
                                                <MenuItem value={5}>Nível 5</MenuItem>
                                                <MenuItem value={6}>Nível 6</MenuItem>
                                                <MenuItem value={7}>Nível 7</MenuItem>
                                                <MenuItem value={8}>Nível 8</MenuItem>
                                                <MenuItem value={9}>Nível 9</MenuItem>
                                                <MenuItem value={10}>Nível 10</MenuItem>
                                                <MenuItem value={11}>Nível 11</MenuItem>
                                                <MenuItem value={12}>Nível 12</MenuItem>
                                                <MenuItem value={13}>Nível 13</MenuItem>
                                                <MenuItem value={14}>Nível 14</MenuItem>
                                                <MenuItem value={15}>Nível 15</MenuItem>
                                                <MenuItem value={16}>Nível 16</MenuItem>
                                                <MenuItem value={17}>Nível 17</MenuItem>
                                                <MenuItem value={18}>Nível 18</MenuItem>
                                                <MenuItem value={19}>Nível 19</MenuItem>
                                                <MenuItem value={20}>Nível 20</MenuItem>

                                            </Select>
                                        </FormControl>
                                    </div>
                                    <div>
                                        <div className={styles.content}>
                                            <div>
                                                <p><strong>Dado de vida:</strong> 1d{classe.hit_die}</p>
                                                <p><strong>Pontos de vida no nivel 1:</strong> {classe.hit_die} + modificador de Constituição</p>
                                                <p><strong>Pontos de vida após nivel 1:</strong> 1d{classe.hit_die} + modificador de Constituição por nível de {t(classe.name)}</p>
                                            </div>
                                            <div>
                                                <h3>Proficiências da Classe</h3>
                                                <h5>Armaduras:</h5>
                                                <div>
                                                    {hasArmor ? (
                                                        classe.proficiencies.map((prof, index) => {
                                                            const matchedProficiencies = proficiencies
                                                                .filter((item) => item.type === 'Armor' && item.index === prof.index)
                                                                .map((item) => item.name);
                                                            return (
                                                                <span key={index}>
                                                                    {matchedProficiencies.map((name, index) => (
                                                                        <>
                                                                            <span key={index}>{t(name)}{index <= matchedProficiencies.length - 1 && ','} </span>
                                                                        </>
                                                                    ))
                                                                    }
                                                                </span>
                                                            )
                                                        })

                                                    ) : (<span>Nenhuma</span>)}

                                                </div>
                                                <h5>Armas:</h5>
                                                <div>
                                                    {hasWeapon ? (
                                                        classe.proficiencies.map((prof, index) => {
                                                            const matchedProficiencies = proficiencies
                                                                .filter((item) => item.type === 'Weapons' && item.index === prof.index)
                                                                .map((item) => item.name);
                                                            return (
                                                                <span key={index}>
                                                                    {matchedProficiencies.map((name, index) => (
                                                                        <span key={index}>{t(name)}{index < matchedProficiencies.length && ','} </span>
                                                                    ))}
                                                                </span>
                                                            )
                                                        })
                                                    ) : "Nenhuma"}

                                                </div>
                                                <h5>Ferramentas:</h5>
                                                <div>
                                                    {hasTool ? (
                                                        classe.proficiencies.map((prof, index) => (
                                                            <span key={index}>
                                                                {proficiencies.map((item, Index) => (
                                                                    (['Tools', "Artisan's Tools", "Musical Instruments", "Other"].includes(item.type) && item.index === prof.index) && (
                                                                        <span key={Index}>{t(item.name)}</span>
                                                                    )
                                                                ))}
                                                            </span>
                                                        ))
                                                    ) : (<span>Nenhuma</span>)}


                                                </div>
                                                <h5>Testes de Resistência:</h5>
                                                <div style={{ display: 'flex', flexDirection: "column" }}>
                                                    {hasSaving ? (
                                                        classe.proficiencies.map((prof, index) => {
                                                            const matchedProficiencies = proficiencies
                                                                .filter((item) => item.type === 'Saving Throws' && item.index === prof.index)
                                                                .map((item) => item.name)
                                                            return (
                                                                <span key={index}>
                                                                    {matchedProficiencies.map((name, index) => (
                                                                        <span key={index}>{t(name)}</span>
                                                                    ))}
                                                                </span>
                                                            )
                                                        })
                                                    ) : "Nenhum"}
                                                </div>
                                            </div>
                                            <div>
                                                <h3>Escolhas da classe</h3>
                                                <div>
                                                    {classe.proficiency_choices && classe.proficiency_choices.map((choice, index) => {
                                                        // console.log(classe)
                                                        const key = `${classe.index}-${index}`;
                                                        return (
                                                            <div key={index}>
                                                                <p>{t(choice.desc)}</p>
                                                                <FormControl sx={{ m: 0, minWidth: 300 }}>
                                                                    <Select
                                                                        value={profChoices[key] || []}
                                                                        multiple
                                                                        onChange={(e) => handleClassChoices(e as React.ChangeEvent<{ value: unknown }>, choice.choose, index, classe.index)}
                                                                        renderValue={(selected: any) => selected.join(',')}
                                                                    >
                                                                        <MenuItem value={""}>Nenhum Escolhido</MenuItem>
                                                                        {choice.from?.options?.map((option, index) => (
                                                                            option.option_type === 'choice' ? (
                                                                                option.choice?.from.options.map((item, index) => (
                                                                                    <MenuItem key={index} value={item.item.index}>{t(item.item.name)}</MenuItem>
                                                                                ))
                                                                            ) :
                                                                                option.option_type === 'reference' && (
                                                                                    <MenuItem key={index} value={option.item.index}>{t(option.item.name)}</MenuItem>
                                                                                )
                                                                        ))}

                                                                    </Select>
                                                                </FormControl>
                                                                <div>
                                                                    {profChoices[key] && profChoices[key].length >= choice.choose && (
                                                                        <p>Máximo de {choice.choose} escolhas!</p>
                                                                    )}
                                                                    {profChoices[key] && (
                                                                        <p><strong>selecionado: {t(profChoices[key].join(', '))}</strong></p>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        )
                                                    })}

                                                </div>
                                            </div>
                                            {/* {levelsData.map((data, index) => data.class.index === classe.index && data.level === level && (
                                        <div key={index}>
                                            {data.index}
                                        </div>
                                    ))} */}
                                        </div>
                                    </div>
                                    <Accordion className={styles.cardLevelContainer}>
                                        <AccordionSummary>
                                            <h3>Níveis da Classe</h3>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            {filteredLevels.map((levelInfo, index) => (
                                                <Accordion key={index}>
                                                    <AccordionSummary>
                                                        <div>
                                                            <h4>{t(levelInfo.class.name)} - {levelInfo.level}</h4>
                                                        </div>
                                                    </AccordionSummary>
                                                    <AccordionDetails>
                                                        {levelInfo.ability_score_bonuses != 0 && (
                                                            <div>
                                                                <p>Bônus de atributo: {levelInfo.ability_score_bonuses}</p>
                                                            </div>
                                                        )
                                                        }
                                                        {levelInfo.features?.map((feat, index) => {
                                                            const filtered = levelsFeatures.filter(featData => featData.index === feat.index)
                                                            return (
                                                                <div key={index}>

                                                                    {filtered.map((featData, index) => (
                                                                        <div key={index}>
                                                                            <h4>{feat.name}</h4>
                                                                            {featData.index === feat.index && (
                                                                                <p>{featData.desc}</p>
                                                                            )}
                                                                        </div>

                                                                    ))}
                                                                </div>
                                                            )
                                                        })}
                                                    </AccordionDetails>
                                                </Accordion>
                                            ))}
                                            <div className={styles.cardLevels}>
                                            </div>
                                        </AccordionDetails>
                                    </Accordion>
                                </AccordionDetails>
                                <AccordionActions>
                                    <Button type='button' onClick={(e) => handleClasse(classe.name)}>Escolher Classe</Button>
                                </AccordionActions>
                            </Accordion>
                        </div>
                    )


                })) : (
                    <div className={styles.loading}>Carregando</div>
                )}
                {/* {classData.map((classe))} */}
            </div>
        </div>
    )
}