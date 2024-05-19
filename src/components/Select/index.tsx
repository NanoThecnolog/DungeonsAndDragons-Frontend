import React from 'react';
import Select, { StylesConfig } from 'react-select';

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

// const options: OptionType[] = [
//     { value: '1', label: 'Classe 1' },
//     { value: '2', label: 'Classe 2' },
//     { value: '3', label: 'Classe 3' }
// ];

const customStyles: StylesConfig<OptionType, false> = {

    control: (provided) => ({
        ...provided,
        padding: '0 0.5rem',
        margin: '0.5rem 0',
        borderRadius: '0.3rem',
        borderColor: 'var(--vermelhoLaranja)',
        backgroundColor: 'var(--inputBackground)',
    }),
    option: (provided, state) => ({
        ...provided,
        padding: '10px',
        backgroundColor: state.isSelected ? 'var(--vermelho)' : state.isFocused ? 'var(--vermelho-100)' : 'var(--inputBackground)',
        color: state.isSelected ? 'var(--color-text)' : 'var(--color-text)',
    }),
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
        />
    )


};


