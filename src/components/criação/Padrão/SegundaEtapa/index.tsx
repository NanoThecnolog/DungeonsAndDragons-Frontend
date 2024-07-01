import { ChangeEvent, useState } from "react"
import { RaceProps } from "@/pages/char"
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Image from "next/image";
import { Button } from '@/components/ui/Button'
import { FormControl, MenuItem, Select } from '@mui/material'

import { t } from '@/services/translate/t'

import styles from './styles.module.scss'

type RaceListProps = {
    name: string,
    index: string
}
type SubRaceProps = {
    race: string;
    subRace: {
        index: string;
        name: string;
        url: string;
        desc: string;
        ability_bonuses: [
            {
                ability_score: {
                    index: string;
                    name: string;
                    url: string;
                };
                bonus: number;
            }
        ]
        race: {
            index: string;
            name: string;
            url: string;
        };
        racial_traits: [
            {
                index: string;
                name: string;
                url: string;
            }
        ];
        starting_proficiencies: [
            {
                index: string;
                name: string;
                url: string;
            }
        ]
    }

}
type SubTraitProps = {
    subTrait: {
        index: string
        name: string
        desc: [string]
        proficiencies: [
            {
                index: string;
                name: string;
                url: string;
            }
        ]
        races: [
            {
                index: string;
                name: string;
                url: string;
            }
        ]
        subraces: [
            {
                index: string;
                name: string;
                url: string;
            }
        ]
        trait_specific?: {
            spell_options?: {
                choose: number;
                from: {
                    option_set_type: string;
                    options: [
                        {
                            item: {
                                index: string;
                                name: string;
                                url: string;
                            };
                            option_type: string;
                        }
                    ]
                }
            }
            url: string;
        }

        url: string
    }
    subrace: string;
}
type TraitDataProps = {
    data: {
        index: string;
        desc: [string];
        name: string;
        proficiencies?: [
            {
                index: string;
                name: string;
                url: string;
            }
        ];
        races: [
            {
                index: string;
                name: string;
                url: string;
            }
        ];
        subraces: [
            {
                index: string;
                name: string;
                url: string;
            }
        ];
        proficiency_choices?: {
            choose: number;
            from: {
                option_set_type: string;
                options: [
                    {
                        item: {
                            index: string;
                            name: string;
                            url: string;
                        }
                        option_type: string;
                    }
                ]
            }
            type: string;
        }
        trait_specific?: {
            subtrait_options?: {
                choose: number;
                from: {
                    option_set_type: string;
                    options: [
                        {
                            item: {
                                index: string;
                                name: string;
                                url: string;
                            }
                            option_type: string;
                        }
                    ]
                }
                type: string;
            }
            url: string;
        }
        url: string;
    }
    race: string;
    trait: string;
}
type ExtraAbilityProps = {
    index: string
    name: string
    bonus: number
}
type SpecificTraitProps = {
    data: {
        desc: string[];
        index: string;
        name: string;
        parent: {
            index: string;
            name: string;
            url: string;
        }
        proficiencies?: string[];
        races: [
            {
                index: string;
                name: string;
                url: string;
            }
        ]
        subraces?: string[]
        trait_specific?: {
            breath_weapon: {
                area_of_effect: {
                    size: number;
                    type: string;
                }
                damage: [{
                    damage_at_character_level: {
                        1: string;
                        6: string;
                        11: string;
                        16: string;
                    }
                    damage_type: {
                        index: string;
                        name: string;
                        url: string;
                    }

                }]
                dc: {
                    dc_type: {
                        index: string;
                        name: string;
                        url: string;
                    }
                    success_type: string;
                }
                desc: string;
                name: string;
                usage: {
                    times: number;
                    type: string;
                }

            }
            damage_type: {
                index: string;
                name: string;
                url: string;
            }
            url: string;
        }
    }
    race: string;
    trait: string;
}
interface SecondProps {
    raceList: RaceListProps[];
    raceData: RaceProps[];
    subRace: SubRaceProps[];
    traits: TraitDataProps[];
    specificTrait: SpecificTraitProps[];
    subTrait: SubTraitProps[];
    handleELvySkills: (value: string[] | string) => void;
    extraAbilitySet: (value: ExtraAbilityProps[]) => void;
    elvySkills: string[]



}

export default function SegundaEtapa({ raceList, raceData, subRace, traits, specificTrait, subTrait, elvySkills, handleELvySkills, extraAbilitySet }: SecondProps) {

    // const [raceList, setRaceList] = useState<RaceListProps[]>()
    // const [raceData, setRaceData] = useState<RaceProps[]>()
    // const [subRace, setSubRace] = useState<SubRaceProps[]>()
    const [race, setRace] = useState<string>("")
    console.log(race)
    // const [traits, setTraits] = useState<TraitDataProps[]>([])
    // const [specificTrait, setSpecificTrait] = useState([])
    // const [subTrait, setSubTrait] = useState<SubTraitProps[]>([])
    const [subTraitSpecificOptions, setSubTraitSpecificOptions] = useState<string>("")
    const [specificOptions, setSpecificOptions] = useState<string>("")
    const [toolProficiency, setToolProficiency] = useState<string>("")
    const [elvySkillOptions, setElvySkillOptions] = useState<string[]>(elvySkills)
    const [extraLanguage, setExtraLanguage] = useState<string>("")
    const [extraAbility, setExtraAbility] = useState<ExtraAbilityProps[]>([])

    function handleELvySkillOptions(e: ChangeEvent<HTMLInputElement>) {
        console.log("handleElvySkillOptions sendo chamada")
        let value = e.target.value as string | string[];
        if (typeof value === 'string') {
            value = value.split(',');
        }

        if (value.length > 2) {
            value = value.slice(0, 2);
        }

        setElvySkillOptions(value);
        handleELvySkills(value);
    };
    function handleExtraAbility(e: ChangeEvent<HTMLInputElement>) {
        console.log("handleExtraAbility sendo chamada")
        let value = e.target.value as string | string[];
        if (typeof value === 'string') {
            value = value.split(',');
        }

        // Map the selected values to objects with index, name, and bonus
        const selectedAbilities = value.map(val => {
            let ability;
            raceData.some(race => {
                ability = race.raceData.ability_bonus_options?.from.options.find(
                    (opt) => opt.ability_score.index === val
                );
                return ability;
            })
            return {
                index: ability?.ability_score.index || "",
                name: ability?.ability_score.name || "",
                bonus: ability?.bonus || 0
            };
        });

        // Limit the selected abilities to 2
        if (selectedAbilities.length > 2) {
            selectedAbilities.length = 2;
        }

        setExtraAbility(selectedAbilities);
        extraAbilitySet(selectedAbilities);
    }


    return (
        <div className={styles.form}>
            <div className={styles.formItem}>
                <span>Escolha a raça do personagem</span>

                {raceData.map((race) => (
                    <div key={race.raceData.index} className={styles.cardRaceContainer}>

                        <Accordion className={styles.cardItem}>
                            <AccordionSummary>
                                <div className={styles.cardSummary}>
                                    <div>
                                        <Image
                                            src={`/races/${race.raceData.index}.png`}
                                            width={50}
                                            height={50}
                                            className={styles.raceSmallImage}
                                            alt={race.raceData.name}
                                        />
                                    </div>
                                    <div className={styles.raceName}>
                                        <h4>{t(race.raceData.name)}</h4>
                                    </div>
                                </div>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className={styles.cardDetails}>
                                    <div>
                                        <Image
                                            src={`/races/full-${race.raceData.index}.png`}
                                            width={150}
                                            height={250}
                                            className={styles.raceSmallImage}
                                            alt={race.raceData.name}
                                        />
                                    </div>
                                    <div>
                                        {race.desc && (
                                            <div className={styles.raceDesc}>
                                                <h4>Descrição</h4>
                                                <p>{t(race.desc)}</p>
                                            </div>
                                        )}
                                        <div className={styles.raceDesc}>
                                            <h4>Estatura</h4>
                                            <p>{t(race.raceData.size)}</p>
                                        </div>
                                        <div className={styles.raceDesc}>
                                            <h4>Longevidade</h4>
                                            <p>{t(race.raceData.age)}</p>
                                        </div>
                                        {///////////////////////////////////////////////////////
                                        }
                                        <div>
                                            <h4>Idiomas</h4>
                                            <p>{t(race.raceData.language_desc)}</p>

                                            {race.raceData.language_options && (
                                                <div style={{ display: 'flex', alignItems: 'center' }}>

                                                    <div>
                                                        <h5>Escolha um idioma extra</h5>
                                                        <FormControl sx={{ m: 1, minWidth: 350 }}>
                                                            <Select
                                                                value={extraLanguage}
                                                                onChange={(e) => setExtraLanguage(e.target.value)}
                                                            >
                                                                <MenuItem value="">Nenhum escolhido</MenuItem>
                                                                {race.raceData.language_options.from.options.map((language, index) => (
                                                                    <MenuItem key={index} value={language.item.index}>{t(language.item.name)}</MenuItem>
                                                                ))}
                                                            </Select>
                                                        </FormControl>
                                                    </div>

                                                    {extraLanguage != "" && (
                                                        <div>
                                                            <h5>Você escolheu:</h5>
                                                            <p>{t(extraLanguage)}</p>
                                                        </div>
                                                    )}
                                                </div>
                                            )

                                            }
                                        </div>
                                        <div>
                                            {race.raceData.traits.length > 0 && (
                                                <>
                                                    <div style={{ paddingTop: '1.5rem' }}>
                                                        <h3>Traços Raciais</h3>
                                                    </div>

                                                    {race.raceData.traits.map((trait) => (
                                                        <div key={trait.index} className={styles.raceTraits}>
                                                            <h4>{t(trait.name)}</h4>
                                                            <div className={styles.traitDesc}>
                                                                {traits
                                                                    .filter((desc) => desc.race === race.raceData.name && desc.data.name === trait.name)
                                                                    .flatMap((desc) => desc.data.desc)
                                                                    .map((item, index) => (
                                                                        <p key={index}>{t(item)}</p>
                                                                    ))
                                                                }
                                                            </div>
                                                            {trait.index === 'breath-weapon' && (
                                                                <Accordion>
                                                                    <AccordionSummary>
                                                                        <h4>Tabela de tipos de Dragões</h4>
                                                                    </AccordionSummary>
                                                                    <AccordionDetails>
                                                                        <table className={styles.traitTable}>
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>Dragão</th>
                                                                                    <th>Tipo de dano</th>
                                                                                    <th>Arma de Sopro</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                {specificTrait.length > 0 &&
                                                                                    specificTrait.map((item, index) => (


                                                                                        <tr key={index} className={styles.trContainer}>
                                                                                            <td>{t(item.data.name)}</td>
                                                                                            <td>{t(item.data.trait_specific.damage_type.name)}</td>
                                                                                            {item.data.trait_specific.breath_weapon.area_of_effect.type === 'line' ? (
                                                                                                <td style={{ fontSize: '0.81rem' }}>{t(item.data.trait_specific.breath_weapon.area_of_effect.type)} de {((item.data.trait_specific.breath_weapon.area_of_effect.size * 0.2950) / 5.8).toFixed(1)} a {(item.data.trait_specific.breath_weapon.area_of_effect.size * 0.3000).toFixed(0)}m (teste de {t(item.data.trait_specific.breath_weapon.dc.dc_type.name)})</td>
                                                                                            ) : (
                                                                                                <td style={{ fontSize: '0.81rem' }}>{t(item.data.trait_specific.breath_weapon.area_of_effect.type)} de {(item.data.trait_specific.breath_weapon.area_of_effect.size * 0.3000).toFixed(1)}m (teste de {t(item.data.trait_specific.breath_weapon.dc.dc_type.name)})</td>
                                                                                            )}

                                                                                        </tr>


                                                                                    ))}
                                                                            </tbody>
                                                                        </table>
                                                                        {specificTrait.length > 0 && (
                                                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                                                <div style={{ paddingTop: '1rem' }}>
                                                                                    <h5>Escolha seu Ancestral Dracônico:</h5>
                                                                                </div>
                                                                                <FormControl sx={{ m: 1, minWidth: 350 }}>
                                                                                    <Select
                                                                                        value={specificOptions}
                                                                                        onChange={(e) => { setSpecificOptions(e.target.value), console.log(e.target.value) }}
                                                                                    >
                                                                                        <MenuItem value="">Nenhum escolhido</MenuItem>
                                                                                        {specificTrait.map((drag, index) => (
                                                                                            <MenuItem key={index} value={drag.data.index}>{t(drag.data.index)}</MenuItem>

                                                                                        ))}
                                                                                    </Select>
                                                                                </FormControl>
                                                                                {specificOptions != "" && (
                                                                                    <div>
                                                                                        <h5>Você escolheu:</h5>
                                                                                        <p>{t(specificOptions)}</p>
                                                                                    </div>
                                                                                )}
                                                                            </div>

                                                                        )

                                                                        }
                                                                    </AccordionDetails>
                                                                </Accordion>

                                                            )}
                                                            {trait.index === "tool-proficiency" && (
                                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                                    <FormControl sx={{ m: 1, minWidth: 350 }}>
                                                                        <Select
                                                                            value={toolProficiency}
                                                                            onChange={(e) => setToolProficiency(e.target.value)}
                                                                        >
                                                                            <MenuItem value="">Nenhum escolhido</MenuItem>
                                                                            {race.raceData.starting_proficiency_options?.from.options.map((opt, index) => (
                                                                                <MenuItem key={index} value={opt.item.index}>{t(opt.item.name)}</MenuItem>
                                                                            ))}
                                                                        </Select>
                                                                    </FormControl>
                                                                    {toolProficiency != "" && (
                                                                        <div>
                                                                            <h5>Ferramenta escolhida:</h5>
                                                                            <p>{t(toolProficiency)}</p>
                                                                        </div>
                                                                    )}
                                                                </div>

                                                            )

                                                            }
                                                            {trait.index === "skill-versatility" && (
                                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                                    <div>
                                                                        <h5>Escolha duas perícias</h5>
                                                                        <FormControl sx={{ m: 1, minWidth: 350 }}>
                                                                            <Select
                                                                                value={elvySkillOptions}
                                                                                multiple
                                                                                onChange={handleELvySkillOptions}
                                                                            >
                                                                                <MenuItem value="">Nenhum escolhido</MenuItem>
                                                                                {race.raceData.starting_proficiency_options?.from.options.map((opt, index) => (
                                                                                    <MenuItem key={index} value={opt.item.index}>{t(opt.item.name)}</MenuItem>
                                                                                ))}
                                                                            </Select>
                                                                        </FormControl>
                                                                    </div>
                                                                    {elvySkillOptions.length > 0 && (
                                                                        <div>
                                                                            <h5>habilidade escolhida:</h5>
                                                                            {elvySkillOptions.map((skill, index) => (
                                                                                <p key={index}>{t(skill)}</p>
                                                                            ))}

                                                                        </div>
                                                                    )}
                                                                </div>

                                                            )

                                                            }
                                                        </div>
                                                    ))}
                                                </>
                                            )}
                                        </div>
                                        <div>
                                            <h4>Incrimento no valor de habilidades</h4>
                                            <div>
                                                <h5>A raça {t(race.raceData.name)} concede os seguintes aumentos no valor de habilidades:</h5>
                                                {race.raceData.ability_bonuses.map((attribute, index) => (
                                                    <p key={index}>{attribute.bonus} ponto(s) em {t(attribute.ability_score.name)}</p>
                                                ))}
                                                {race.raceData.ability_bonus_options && (
                                                    <div>
                                                        <h5>Você pode escolher mais {race.raceData.ability_bonus_options.choose} atributos para receber pontos.</h5>
                                                        <FormControl sx={{ m: 1, minWidth: 350 }}>
                                                            <Select
                                                                value={extraAbility.map(a => a.index)}
                                                                multiple
                                                                onChange={handleExtraAbility}
                                                                renderValue={(selected) => {
                                                                    const selectedValues = selected as string[];
                                                                    return selectedValues
                                                                        .map(val => {
                                                                            const ability = extraAbility.find(a => a.index === val);
                                                                            return ability ? ability.name : '';
                                                                        })
                                                                        .join(', ');
                                                                }}
                                                            >
                                                                <MenuItem value="">Nenhum escolhido</MenuItem>
                                                                {race.raceData.ability_bonus_options.from.options.map((ability, index) => (
                                                                    <MenuItem key={index} value={ability.ability_score.index}>{t(ability.ability_score.name)}</MenuItem>
                                                                ))}

                                                            </Select>
                                                        </FormControl>
                                                        {extraAbility.length > 0 && (
                                                            <div>
                                                                <h5>habilidade escolhida:</h5>
                                                                {extraAbility.map((skill, index) => (
                                                                    <p key={index}>{t(skill.name)}: {skill.bonus} ponto(s)</p>
                                                                ))}

                                                            </div>
                                                        )}

                                                    </div>
                                                )}

                                            </div>

                                        </div>
                                    </div>
                                </div>

                                {race.raceData.subraces.length > 0 &&
                                    race.raceData.subraces.map((subrace) => (
                                        <div key={subrace.index}>
                                            <h3>Sub-raças</h3>
                                            <Accordion>
                                                <AccordionSummary>
                                                    <div>
                                                        <Image
                                                            src={`/races/${subrace.index}.png`}
                                                            width={50}
                                                            height={50}
                                                            className={styles.raceSmallImage}
                                                            alt={subrace.name}
                                                        />
                                                    </div>
                                                    <div className={styles.raceName}>
                                                        <h4>{t(subrace.name)}</h4>
                                                    </div>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <div className={styles.cardDetails}>
                                                        <div>
                                                            <Image
                                                                src={`/races/full-${subrace.index}.png`}
                                                                width={150}
                                                                height={200}
                                                                className={styles.raceSmallImage}
                                                                alt={race.raceData.name}
                                                            />
                                                        </div>
                                                        {subRace && subRace.map((sub) =>
                                                            sub.subRace?.index &&
                                                            sub.subRace.index === subrace.index && (
                                                                <div key={sub.subRace.index}>
                                                                    <div className={styles.subRaceDesc}>
                                                                        <h4>Descrição</h4>
                                                                        <p>{t(sub.subRace.desc)}</p>
                                                                    </div>
                                                                    {subTrait && subTrait.map((trait, index) => (
                                                                        trait.subrace === subrace.index && (
                                                                            <div key={index}>
                                                                                <h4>{t(trait.subTrait.name)}</h4>
                                                                                {trait.subTrait.desc.map((desc, index) => (
                                                                                    <div key={index} className={styles.subTraitDesc}>
                                                                                        <p>{t(desc)}</p>
                                                                                    </div>
                                                                                ))}
                                                                                {trait.subTrait.trait_specific && (
                                                                                    <Accordion>
                                                                                        <AccordionSummary>{t(trait.subTrait.name)}</AccordionSummary>
                                                                                        <AccordionDetails className={styles.accordionSelectForm}>
                                                                                            <div>
                                                                                                <FormControl sx={{ m: 1, minWidth: 250 }}>


                                                                                                    <Select
                                                                                                        value={subTraitSpecificOptions}
                                                                                                        onChange={(e) => setSubTraitSpecificOptions(e.target.value)}
                                                                                                    >
                                                                                                        <MenuItem value="">Nenhum escolhido</MenuItem>
                                                                                                        {trait.subTrait.trait_specific?.spell_options?.from.options.map((item, index) => (
                                                                                                            <MenuItem key={index} value={item.item.index}>{t(item.item.name)}</MenuItem>
                                                                                                        ))}

                                                                                                    </Select>
                                                                                                </FormControl>
                                                                                            </div>
                                                                                            <div>
                                                                                                <h5>Você escolheu:</h5>
                                                                                                <p>{t(subTraitSpecificOptions)}</p>
                                                                                            </div>

                                                                                        </AccordionDetails>
                                                                                    </Accordion>

                                                                                )

                                                                                }

                                                                            </div>
                                                                        )

                                                                    )
                                                                    )}
                                                                    <div>
                                                                        <h4>Incrimento no valor de habilidades</h4>
                                                                        <div>
                                                                            <h5>A sub-raça {t(sub.subRace.name)} concede os seguintes aumentos no valor de habilidades:</h5>
                                                                            {sub.subRace.ability_bonuses.map((attribute, index) => (
                                                                                <p key={index}>{attribute.bonus} ponto(s) em {t(attribute.ability_score.name)}</p>
                                                                            ))}

                                                                        </div>

                                                                    </div>
                                                                </div>
                                                            )
                                                        )}
                                                        <div>

                                                        </div>

                                                    </div>
                                                </AccordionDetails>
                                                <AccordionActions>
                                                    <Button type='button' onClick={(e) => setRace(subrace.index)}>Escolher sub-raça</Button>
                                                </AccordionActions>
                                            </Accordion>
                                        </div>
                                    ))
                                }
                            </AccordionDetails>
                            <AccordionActions>
                                <Button type='button' onClick={(e) => setRace(race.raceData.index)}>Escolher raça</Button>
                            </AccordionActions>
                        </Accordion>
                    </div>
                ))}
            </div>

        </div>
    )
}