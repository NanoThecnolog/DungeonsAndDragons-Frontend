import React, { useEffect, useState } from 'react';
import Select, { StylesConfig } from 'react-select';
import styles from './styles.module.scss'

interface OptionType {
    value: string;
    label: string;
}
type DataProps = {
    index: string;
    name: string;
    url: string;
}
interface SelectProps {
    dataOptions: DataProps[] | null;
}
const customStyles: StylesConfig<OptionType, false> = {

    control: (provided) => ({
        ...provided,
        margin: '0.5rem 0',
        borderRadius: '0.3rem',
        borderColor: 'var(--inputBackground)',
        backgroundColor: 'var(--inputBackground)',


    }),
    option: (provided, state) => ({
        ...provided,
        padding: '10px',
        backgroundColor: state.isSelected ? 'var(--vermelho)' : state.isFocused ? 'var(--vermelho-100)' : 'var(--inputBackground)',
        color: state.isSelected ? 'var(--color-text)' : 'var(--color-text)',
    }),
    singleValue: (provided, state) => ({
        ...provided,
        color: 'var(--color-text)',
        placeHolder: 'Selecione',
    })
};

export default function MySelect({ dataOptions }: SelectProps) {

    if (!Array.isArray(dataOptions)) {
        return (
            <div>
                Error: não é array
            </div>
        )
    }
    const options: OptionType[] = dataOptions.map(item => ({
        value: item.index,
        label: item.name,
    }));

    return (
        <Select
            options={options}
            styles={customStyles}
            noOptionsMessage={() => "Nenhuma opção encontrada"}
            className={styles.select}
        />
    )


};


