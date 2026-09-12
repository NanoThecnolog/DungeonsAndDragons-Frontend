import { Button } from "@/components/ui/Button";
import { Fragment, useState } from "react";

import styles from './styles.module.scss'

export default function D6() {
    const [loading, setLoading] = useState(false);
    const [resultado, setResultado] = useState(null)
    function rolldice(): number {
        const roll = Math.floor(Math.random() * 6) + 1
        return roll;
    }
    function resultRollDice() {
        // setLoading(true)
        let results: number[] = []

        for (let i = 0; i < 4; i++) {
            results.push(rolldice())
        }
        results.sort((a, b) => a - b)

        let threeHigher: number = results.slice(1).reduce((acc, val) => acc + val, 0)
        // setResultado(threeHigher)
        return {
            resultados: results,
            somaDosTres: threeHigher
        }


    }
    function timeToCall() {
        setLoading(true)
        setTimeout(() => {
            const resultado = resultRollDice()
            setResultado(resultado)
            setLoading(false)
        }, 2000)

    }


    return (
        <div className={styles.container}>
            <Button type="button" loading={loading} onClick={timeToCall}>Rolar dados</Button>
            {resultado && (
                <div className={styles.rollContainer}>
                    <div className={styles.results}>

                        {resultado.resultados.map((result, index) => (
                            <p key={index} className={styles.result}>
                                {result}
                            </p>
                        ))}

                    </div>
                    <div className={styles.rollSum}>
                        <p>{resultado.somaDosTres}</p>
                    </div>
                </div>

            )}
        </div>
    )
}