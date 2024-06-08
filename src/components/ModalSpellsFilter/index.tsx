import { useState, useEffect } from "react"
import Modal from "react-modal"
import styles from './styles.module.scss'

import { FiX } from "react-icons/fi"
import { Button } from "../ui/Button"
import { SpellInfoProps } from "../Magias"



interface ModalSpellProps {
    isOpen: boolean;
    onRequestClose: () => void;
    spell: SpellInfoProps[];
    onSpellSelect: (spell: SpellInfoProps[]) => void;
}

export default function ModalSpellFilter({ isOpen, onRequestClose, spell, onSpellSelect }: ModalSpellProps) {
    const [selectedSpells, setSelectedSpells] = useState<SpellInfoProps[]>([])


    const customStyles = {
        content: {
            top: '50%',
            bottom: 'auto',
            left: '50%',
            right: 'auto',
            padding: '30px',
            backgroundColor: 'var(--backgroundColor)',
            transform: 'translate(-50%, -50%)'
        }
    }

    function handleSpellCLick(selectedSpell: SpellInfoProps) {
        setSelectedSpells(prevSelectedSpells => {
            if (prevSelectedSpells.some(spell => spell.index === selectedSpell.index)) {
                return prevSelectedSpells.filter(spell => spell.index !== selectedSpell.index);
            } else {
                return [...prevSelectedSpells, selectedSpell];
            }
        });
    }
    function handleConfirmSelection() {
        onSpellSelect(selectedSpells);
    }
    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
            <button title="Fechar" type="button" onClick={onRequestClose} className="react-modal-close" style={{ background: 'transparent', border: 0 }}>
                <FiX size={45} color="#f34748" />
            </button>

            <Button style={{ position: 'absolute', top: '5%', right: '5%' }} onClick={handleConfirmSelection}>Adicionar</Button>

            <div className={styles.container}>
                <h2>Magias</h2>
                <div className={styles.magicContainer}>
                    <div className={styles.spellSelectedContainer}>
                        {selectedSpells.map(spellItem => (
                            <div className={styles.spell} key={spellItem.index}>
                                <p>{spellItem.name}</p>
                            </div>
                        ))}
                    </div>
                    <div className={styles.spellContainer}>

                        {spell.map(spell => (
                            <div className={styles.spell} key={spell.index} onClick={(() => handleSpellCLick(spell))} title={spell.desc[0]}>
                                <p>{spell.name}</p>
                                <p>{spell.school.name}</p>
                                <p>{spell.range}</p>
                                <p>{spell.casting_time}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Modal>

    )
}