import { useState } from 'react';
import { FormControl, Select, MenuItem } from '@mui/material';
import { t } from '@/services/translate/t';

import styles from './styles.module.scss'

const attributeCosts = [0, 1, 2, 3, 4, 5, 7, 9];
// const initialAttributes = Array(6).fill(8);
const maxPoints = 27

type AttributeProps = {
    index: number;
    value: number;
    name: string;
    onChange: (index: number, newValue: number) => void;
    availablePoints: number;
}
interface ManagerProps {

    handleSTR: (value) => void
    handleDEX: (value) => void
    handleCON: (value) => void
    handleINT: (value) => void
    handleWIS: (value) => void
    handleCHA: (value) => void
}


function AttributeSelect({ index, value, name, onChange, availablePoints }: AttributeProps) {
    const options = [8, 9, 10, 11, 12, 13, 14, 15];
    const validOptions = options.filter(
        (opt) => availablePoints + attributeCosts[value - 8] >= attributeCosts[opt - 8]
    );

    return (
        <FormControl sx={{ m: 1, minWidth: 100 }}>
            <h4>{t(name)}</h4>
            <Select
                value={value}
                className={styles.select}
                onChange={(e) => onChange(index, Number(e.target.value))}
            >
                {validOptions.map((opt) => (
                    <MenuItem key={opt} value={opt}>
                        {opt} ({attributeCosts[opt - 8]} pontos)
                    </MenuItem>
                ))}

            </Select>


        </FormControl>
    );
};

export default function AttributeManager({ handleCHA, handleCON, handleDEX, handleINT, handleSTR, handleWIS }: ManagerProps) {
    const [str, setStr] = useState<number>(8)
    const [dex, setDex] = useState<number>(8)
    const [con, setCon] = useState<number>(8)
    const [int, setInt] = useState<number>(8)
    const [wis, setWis] = useState<number>(8)
    const [cha, setCha] = useState<number>(8)
    // const [attributes, setAttributes] = useState(initialAttributes);
    const [points, setPoints] = useState<number>(maxPoints);

    const attributes = [str, dex, con, int, wis, cha]
    const attName = ["str", "dex", "con", "int", "wis", "cha"]
    const setAttributes = [setStr, setDex, setCon, setInt, setWis, setCha]
    const handleAttributes = [handleSTR, handleDEX, handleCON, handleINT, handleWIS, handleCHA]

    function handleAttributeChange(index: number, newValue: number) {
        // const oldValue = attributes[index];
        const newAttributes = [...attributes];
        newAttributes[index] = newValue;

        const usedPoints = newAttributes.reduce((sum, attr) => sum + attributeCosts[attr - 8], 0);
        const newPoints = maxPoints - usedPoints;

        setAttributes[index](newValue);
        handleAttributes[index](newValue);
        setPoints(newPoints);
    };

    return (
        <div >
            <h3>Distribuição de Atributos</h3>
            <div>Pontos restantes: {points}/{maxPoints}</div>
            <div className={styles.container}>
                {attributes.map((attr, index) => (
                    <div className={styles.component}>
                        <AttributeSelect
                            key={index}
                            index={index}
                            value={attr}
                            name={attName[index]}

                            onChange={handleAttributeChange}
                            availablePoints={points}
                        />
                    </div>

                ))}
            </div>
        </div>
    );
};


