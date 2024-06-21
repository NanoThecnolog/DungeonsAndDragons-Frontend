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
    const [showSpell, setShowSpell] = useState(false)
    const [spellInfo, setSpellInfo] = useState<SpellInfoProps>()
    const convertToMetro = 0.3048;


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
    function showSpellInfo(spell: SpellInfoProps) {
        setSpellInfo(spell)
        setShowSpell(true)
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
    console.log(spellInfo)
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
                                <p>{spellItem.school.name}</p>
                            </div>
                        ))}
                    </div>
                    <div className={styles.spellContainer}>
                        {spell.map(spell => (
                            <div className={styles.spell} key={spell.index} onClick={(() => showSpellInfo(spell))} title={spell.desc[0]}>
                                <p>{spell.name}</p>
                                <p>{spell.school.name}</p>
                                {/* <p>{spell.range}</p>
                                <p>{spell.casting_time}</p> */}
                            </div>
                        ))}
                        {showSpell && (
                            <div className={styles.modalContainer}>
                                <Button style={{ position: 'absolute', top: '5%', right: '5%' }} onClick={(() => handleSpellCLick(spellInfo))} >Adicionar</Button>
                                <button title="Fechar" style={{ position: 'absolute', top: '5%', left: '5%', backgroundColor: 'transparent', border: 0 }} onClick={(() => setShowSpell(false))}><FiX size={45} color="#f34748" /></button>
                                <div className={styles.spellInfoContainer}>
                                    <div className={styles.spellInfo}>
                                        {spellInfo ? (
                                            <>
                                                <div className={styles.infoRow}>
                                                    <div className={styles.info}>
                                                        <h3>{spellInfo.name}</h3>

                                                        {spellInfo.ritual ? (
                                                            <span>{spellInfo.level}º nível de {spellInfo.school.name} (ritual)</span>
                                                        ) : (
                                                            <span>{spellInfo.level}º nível de {spellInfo.school.name}</span>
                                                        )}
                                                    </div>
                                                    <div className={styles.info}>
                                                        <h4>Concentração</h4>
                                                        {spellInfo.concentration ? 'Sim' : 'Não'}
                                                    </div>
                                                    <div className={styles.info}>
                                                        <h4>Area de efeito</h4>
                                                        {spellInfo.area_of_effect ? (
                                                            <p>{(spellInfo.area_of_effect.size * convertToMetro).toFixed(0)} metros - {spellInfo.area_of_effect.type}</p>
                                                        ) : '-'}
                                                    </div>
                                                </div>
                                                <div className={styles.infoRow}>
                                                    <div className={styles.info}>
                                                        <h4>Tempo de Conjuração</h4>
                                                        {spellInfo.casting_time}
                                                    </div>
                                                </div>
                                                <div className={styles.infoRow}>
                                                    <div className={styles.info}>
                                                        <h4>Alcance</h4>
                                                        {spellInfo.range}
                                                    </div>
                                                    <div className={styles.infoClasses}>
                                                        <h4>Classes</h4>
                                                        <div className={styles.classesContainer}>
                                                            {spellInfo.classes ? (
                                                                spellInfo.classes.map((item, index) => (
                                                                    <span key={index}>
                                                                        {item.name}
                                                                        {index < spellInfo.classes.length - 1 && ', '}
                                                                    </span>
                                                                ))
                                                            ) : ''}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={styles.infoComp}>
                                                    <h4>Componentes</h4>
                                                    {spellInfo.material ? (
                                                        <>
                                                            {spellInfo.components.map((item, index) => (
                                                                <p key={index}>{item}</p>
                                                            ))}<p>({spellInfo.material})</p>
                                                        </>
                                                    ) : (
                                                        <>
                                                            {spellInfo.components.map((item, index) => (
                                                                <p key={index}>{item}</p>
                                                            ))}
                                                        </>
                                                    )}
                                                </div>
                                                <div className={styles.infoRow}>
                                                    <div className={styles.info}>
                                                        <h4>Duração</h4>
                                                        <p>{spellInfo.concentration ? (
                                                            <p>Concentração - {spellInfo.duration}</p>
                                                        ) : (
                                                            <p>{spellInfo.duration}</p>
                                                        )}</p>
                                                    </div>
                                                </div>
                                                <div>
                                                    <h4>Descrição</h4>
                                                    <div className={styles.infoDesc}>
                                                        {spellInfo.desc}
                                                        <br /><br />
                                                        {spellInfo.higher_level ? (
                                                            spellInfo.higher_level.map((item, index) => (
                                                                <p key={index}>
                                                                    {item}
                                                                </p>
                                                            ))
                                                        ) : ''}
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <div>Carregando dados...</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Modal>
    )
}