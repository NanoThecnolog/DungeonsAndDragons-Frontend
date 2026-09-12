import { Fragment, useEffect, useState } from "react";
import { Select, MenuItem, FormControl, TextField } from "@mui/material";

import AttributeManager from "./Attribute points";
import Manual from "./Manual";
import ListValues from "./List";

import styles from "./styles.module.scss"
import { RaceProps } from "@/types/char";
import { SubRaceProps } from "../SegundaEtapa";
import { t } from "@/services/translate/t"
import { AttributesProps } from "..";
import { Button } from "@/components/ui/Button";
import D6 from "@/components/Dados/D6";


export interface FourStepProps {
    forca: number;
    destreza: number;
    constituicao: number;
    inteligencia: number;
    sabedoria: number;
    carisma: number;
    race?: RaceProps;
    subRace?: SubRaceProps;
    handleAttributes: (value: AttributesProps) => void
}
type StatProps = {
    index: string;
    value: number;
}
type BonusProps = {
    ability_score: {
        index: string;
        name: string;
        url: string;
    };
    bonus: number;

}

export default function QuartaEtapa({ forca, destreza, constituicao, inteligencia, sabedoria, carisma, race, subRace, handleAttributes }: FourStepProps) {
    /**## Atributos

### Escolher entre 3 métodos pra definir atributos

- Standard array
    Opções de 8, 10, 12, 13, 14 e 15 para distribuir pelos 6 atributos

- Manual ou (rolando dados)
    - escrever as quantidades (min - 1 max - 18)
    - rolagem de dados (4d6 somar os 3 valores mais altos)
    - compra de pontos
        -- 27 pontos pra gastar (ver a tabela de compra no livro do jogador). Implantar lógica para compra de pontos de atributos.
- Cálculo de valores
    - adicionar os valores de habilidade dependendo da raça
    - apresentar a composição dos valores (valor total, modificador, valor base, bonus racial, etc) */

    const [method, setMethod] = useState<string>("A")
    const [points, setPoints] = useState<number>(27)
    const [abilityBonuses, setAbilityBonuses] = useState<BonusProps[]>([])


    const [str, setStr] = useState<StatProps>({ index: "str", value: forca })
    const [dex, setDex] = useState<StatProps>({ index: "dex", value: destreza })
    const [con, setCon] = useState<StatProps>({ index: "con", value: constituicao })
    const [int, setInt] = useState<StatProps>({ index: "int", value: inteligencia })
    const [wis, setWis] = useState<StatProps>({ index: "wis", value: sabedoria })
    const [cha, setCha] = useState<StatProps>({ index: "cha", value: carisma })

    const stats: StatProps[] = [str, dex, con, int, wis, cha]

    useEffect(() => {
        if (race?.raceData) {
            const { ability_bonuses } = race.raceData
            setAbilityBonuses(ability_bonuses)
            console.log("bonus da raça setado")
        } else if (subRace?.subRace) {
            const { ability_bonuses } = subRace.subRace
            setAbilityBonuses(ability_bonuses)
            console.log("Bonus da subraça setado")
        } else {
            console.log("Nenhum bonus setado")
        }
    }, [])

    function handleSTR(value) {
        setStr(prev => ({ ...prev, value: value }))
    }
    function handleDEX(value) {
        setDex(prev => ({ ...prev, value: value }))
    }
    function handleCON(value) {
        setCon(prev => ({ ...prev, value: value }))
    }
    function handleINT(value) {
        setInt(prev => ({ ...prev, value: value }))
    }
    function handleWIS(value) {
        setWis(prev => ({ ...prev, value: value }))
    }
    function handleCHA(value) {
        setCha(prev => ({ ...prev, value: value }))
    }
    function handleStats() {
        const stat = { str, dex, con, int, wis, cha }
        console.log("Atributos: ", stat)
        handleAttributes(stat)
    }
    function methodSelect(e) {
        setMethod(e)
        const value = 0;
        setStr(prev => ({ ...prev, value: value }))
        setDex(prev => ({ ...prev, value: value }))
        setCon(prev => ({ ...prev, value: value }))
        setInt(prev => ({ ...prev, value: value }))
        setWis(prev => ({ ...prev, value: value }))
        setCha(prev => ({ ...prev, value: value }))
    }



    return (
        <div className={styles.form}>
            <div>
                <div>
                    <h2 style={{ textAlign: 'center', padding: '2rem' }}>Escolha entre os 3 métodos para definição de atributos</h2>
                    <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
                        <Select
                            value={method}
                            onChange={(e) => methodSelect(e.target.value as string)}
                            className={styles.select}
                        >
                            <MenuItem value={"A"}>Manual</MenuItem>
                            <MenuItem value={"B"}>Compra de pontos</MenuItem>
                            <MenuItem value={"C"}>Lista de valores padrão</MenuItem>
                        </Select>
                    </FormControl>

                </div>
                {method === "A" && (
                    <Manual
                        forca={str}
                        destreza={dex}
                        constituicao={con}
                        inteligencia={int}
                        sabedoria={wis}
                        carisma={cha}
                        handleSTR={handleSTR}
                        handleDEX={handleDEX}
                        handleCON={handleCON}
                        handleINT={handleINT}
                        handleWIS={handleWIS}
                        handleCHA={handleCHA}
                    />
                )}
                {method === "B" && (
                    <div>
                        <div>
                            <AttributeManager

                                handleSTR={handleSTR}
                                handleDEX={handleDEX}
                                handleCON={handleCON}
                                handleINT={handleINT}
                                handleWIS={handleWIS}
                                handleCHA={handleCHA}
                            />
                        </div>
                    </div>
                )}
                {method === "C" && (
                    <ListValues
                        handleSTR={handleSTR}
                        handleDEX={handleDEX}
                        handleCON={handleCON}
                        handleINT={handleINT}
                        handleWIS={handleWIS}
                        handleCHA={handleCHA}
                    />
                )}

                <div className={styles.totalContainer}>
                    {stats.map((stat, index) => {
                        const ability = abilityBonuses.find((ability) => stat.index === ability.ability_score.index)
                        const total = ability ? stat.value + ability.bonus : stat.value
                        return (
                            <div key={index} className={styles.total}>
                                <h3>{t(stat.index)}</h3>
                                <p>Total: {total}</p>
                                <div>
                                    <D6 />
                                </div>
                            </div>
                        )
                    }
                    )}
                </div>

                <div className={styles.buttonContainer}>
                    <Button type="button" onClick={handleStats}>Confirmar Atributos</Button>
                </div>




            </div>

            <div className={styles.formItem}>
                <div style={{ textAlign: 'center' }}>
                    <h2>Calculo dos valores de Atributos</h2>
                    <br />
                    <p>Os cálculos, incluindo os valores base e qualquer outro modificador, podem ser encontrados abaixo.</p>
                </div>
                <div className={styles.calculationContainer}>
                    {stats.map((stat, index) => {
                        const ability = abilityBonuses.find((ability) => stat.index === ability.ability_score.index)
                        const total = ability ? stat.value + ability.bonus : stat.value
                        const modify = Math.floor(total / 2) - 5

                        return (
                            <div key={index} className={styles.attributesContainer}>
                                <div className={styles.nameContainer}>
                                    <h3>{t(stat.index)}</h3>
                                </div>
                                <div className={styles.valueContainer}>
                                    <div>
                                        <p>Total</p>
                                    </div>
                                    <div>
                                        <p>{total}</p>
                                    </div>
                                </div>
                                <div className={styles.valueContainer}>
                                    <div>
                                        <p>Modificador</p>
                                    </div>
                                    <div>
                                        <p></p>
                                    </div>

                                </div>
                                <div className={styles.valueContainer}>
                                    <div>
                                        <p>Valor Base</p>
                                    </div>
                                    <div>
                                        {ability ? (
                                            <p>{total}</p>
                                        ) : (
                                            <p>{stat.value}</p>
                                        )}
                                    </div>
                                </div>
                                <div className={styles.valueContainer}>
                                    <div>
                                        <p>Bonus Racial</p>
                                    </div>
                                    <div>
                                        {ability?.bonus ? (<p>{ability.bonus}</p>) : `${0}`}
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    )}
                </div>
            </div>

        </div>
    )
}