import { useState } from 'react'
import { FormControl, Select, MenuItem } from '@mui/material'

import styles from './styles.module.scss'

interface ListProps {
    handleSTR: (value) => void
    handleDEX: (value) => void
    handleCON: (value) => void
    handleINT: (value) => void
    handleWIS: (value) => void
    handleCHA: (value) => void
}

export default function ListValues({ handleSTR, handleDEX, handleCON, handleINT, handleWIS, handleCHA }: ListProps) {
    const values = [8, 10, 12, 13, 14, 15]
    const [attributes, setAttributes] = useState({
        str: 0,
        dex: 0,
        con: 0,
        int: 0,
        wis: 0,
        cha: 0
    })
    function handleChange(attribute: string, value: number) {
        setAttributes((prev) => ({
            ...prev,
            [attribute]: value
        }))
        switch (attribute) {
            case 'str':
                handleSTR(value);
                break;
            case 'dex':
                handleDEX(value);
                break;
            case 'con':
                handleCON(value);
                break;
            case 'int':
                handleINT(value);
                break;
            case 'wis':
                handleWIS(value);
                break;
            case 'cha':
                handleCHA(value);
                break;
            default:
                break;
        }
    }
    function getOptions(selectedValues: number[]) {
        return values.filter(value => !selectedValues.includes(value))
    }

    const selectedValues = Object.values(attributes)

    return (
        <div className={styles.container}>
            {Object.keys(attributes).map((attribute, index) => (
                <div key={index}>
                    {/* {attribute} */}
                    <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
                        <Select
                            value={attributes[attribute]}
                            onChange={(e) => handleChange(attribute, Number(e.target.value))}
                            className={styles.select}
                            label={attribute}
                        >
                            <MenuItem value={""}>--</MenuItem>
                            {getOptions(selectedValues).concat(attributes[attribute]).map((value, index) => (
                                // map((value, index) => (                                
                                <MenuItem key={index} value={value}>
                                    {value}
                                </MenuItem>
                            ))}

                        </Select>

                    </FormControl>

                </div>
            ))}
        </div>
    )
}