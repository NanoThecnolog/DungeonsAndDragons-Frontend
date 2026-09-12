import { TextField } from '@mui/material'

import styles from './styles.module.scss'
import { useEffect, useState } from 'react'

interface ManualProps {
    forca: StatProps;
    destreza: StatProps;
    constituicao: StatProps;
    inteligencia: StatProps;
    sabedoria: StatProps;
    carisma: StatProps;
    handleSTR: (value) => void
    handleDEX: (value) => void
    handleCON: (value) => void
    handleINT: (value) => void
    handleWIS: (value) => void
    handleCHA: (value) => void

}
type StatProps = {
    index: string;
    value: number;
}


export default function Manual({ forca, destreza, constituicao, inteligencia, sabedoria, carisma, handleCHA, handleCON, handleDEX, handleINT, handleSTR, handleWIS }: ManualProps) {

    const [str, setStr] = useState<StatProps>(forca)
    const [dex, setDex] = useState<StatProps>(destreza)
    const [con, setCon] = useState<StatProps>(constituicao)
    const [int, setInt] = useState<StatProps>(inteligencia)
    const [wis, setWis] = useState<StatProps>(sabedoria)
    const [cha, setCha] = useState<StatProps>(carisma)

    useEffect(() => {
        setStr(forca)
        setDex(destreza)
        setCon(constituicao)
        setInt(inteligencia)
        setWis(sabedoria)
        setCha(carisma)
    }, [])







    return (
        <div className={styles.attributeContainer}>
            <div>
                <h4>Adicione os valores manualmente</h4>
            </div>
            <div className={styles.statusContainer}>
                <div className={styles.status}>
                    <TextField
                        required
                        id="outlined-required"
                        label="Força"
                        type="number"
                        value={str.value}
                        focused
                        color="warning"
                        onChange={(e) => { handleSTR(Number(e.target.value)), setStr(prev => ({ ...prev, value: Number(e.target.value) })) }}

                    />

                </div>
                <div className={styles.status}>
                    <TextField
                        required
                        id="outlined-required"
                        label="Destreza"
                        type="number"
                        value={dex.value}
                        focused
                        color="info"
                        onChange={(e) => { handleDEX(Number(e.target.value)), setDex(prev => ({ ...prev, value: Number(e.target.value) })) }}
                    />


                </div>
                <div className={styles.status}>
                    <TextField
                        required
                        id="outlined-required"
                        label="Constituição"
                        type="number"
                        value={con.value}
                        focused
                        color='error'
                        onChange={(e) => { handleCON(Number(e.target.value)), setCon(prev => ({ ...prev, value: Number(e.target.value) })) }}
                    />

                </div>
                <div className={styles.status}>
                    <TextField
                        required
                        id="outlined-required"
                        label="Inteligência"
                        type="number"
                        value={int.value}
                        focused
                        color="secondary"
                        onChange={(e) => { handleINT(Number(e.target.value)), setInt(prev => ({ ...prev, value: Number(e.target.value) })) }}
                    />

                </div>
                <div className={styles.status}>
                    <TextField
                        required
                        id="outlined-required"
                        label="Sabedoria"
                        type="number"
                        value={wis.value}
                        focused
                        color='primary'
                        onChange={(e) => { handleWIS(Number(e.target.value)), setWis(prev => ({ ...prev, value: Number(e.target.value) })) }}
                    />

                </div>
                <div className={styles.status}>
                    <TextField
                        required
                        id="outlined-required"
                        label="Carisma"
                        type="number"
                        value={cha.value}
                        focused
                        color='success'
                        onChange={(e) => { handleCHA(Number(e.target.value)), setCha(prev => ({ ...prev, value: Number(e.target.value) })) }}
                    />

                </div>
            </div>
        </div>
    )
}