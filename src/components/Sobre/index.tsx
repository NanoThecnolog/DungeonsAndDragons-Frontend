import { useState, useEffect } from 'react'
import styles from './styles.module.scss'
import { TbSettings } from "react-icons/tb";

export default function Sobre({ charData }) {


    const { char, charClass } = charData
    const [level, setLevel] = useState(1)

    // console.log(charClass)
    useEffect(() => {
        if (charClass.length > 1) {
            const somaLevel = Number(charClass[0].level) + Number(charClass[1].level)
            setLevel(somaLevel)
        } else {
            const level = charClass[0].level
            setLevel(level)
        }
    }, [charClass])
    // console.log(level)
    // console.log(char.languages)

    if (!charData) {
        return (
            <>
                <div>Carregando...</div>
            </>
        )
    }
    return (
        <>
            <div className={styles.container}>
                <div className={styles.dataContainer}>

                    <div className={styles.row}>
                        <div className={styles.geral}>
                            <div className={styles.editar}><TbSettings size={25} /></div>
                            <h3>{char.name}</h3>
                            <p>{char.title}</p>
                            <p>Nível {level}</p>

                        </div>
                        <div className={styles.personalidade}>
                            <div className={styles.editar}><TbSettings size={25} /></div>
                            <h4>traços de personalidade</h4>
                        </div>
                        <div className={styles.ideais}>
                            <div className={styles.editar}><TbSettings size={25} /></div>
                            <h4>Ideais</h4>
                            <p> {char.ideals}</p>
                        </div>
                        <div className={styles.caracteristicas}>
                            <div className={styles.editar}><TbSettings size={25} /></div>
                            <h4>Caracteristicas e Traços</h4>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.classRaca}>
                            <div className={styles.editar}><TbSettings size={25} /></div>
                            <h4>Classe e Raça</h4>
                            <p>{charClass[0].name} - {charClass[0].level}</p>
                            {charClass.length > 1 && (
                                <p>{charClass[1].name} - {charClass[1].level}</p>
                            )}
                            <p>{char.race}</p>
                        </div>
                        <div className={styles.vinculos}>
                            <div className={styles.editar}><TbSettings size={25} /></div>
                            <h4>Vinculos</h4>
                        </div>
                        <div className={styles.defeitos}>
                            <div className={styles.editar}><TbSettings size={25} /></div>
                            <h4>Defeitos</h4>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.idiomas}>
                            <div className={styles.editar}><TbSettings size={25} /></div>
                            <h4>idiomas e proficiencias</h4>
                            <div className={styles.idiomasMap}>
                                {char.languages.map((language, index) => (
                                    <span key={index}>
                                        {language}
                                        {index < char.languages.length - 1 && ','}
                                    </span>
                                ))}
                            </div>

                        </div>
                        <div className={styles.historia}>
                            <div className={styles.editar}><TbSettings size={25} /></div>
                            <h4>História do Personagem</h4>
                            <div title={char.story} className={styles.textStory}>
                                <p>{char.story}</p>
                            </div>
                        </div>
                        <div className={styles.aliados}>
                            <div className={styles.editar}><TbSettings size={25} /></div>
                            <div className={styles.brasao}>Brasão</div>
                            <h4>aliados e organizações</h4>
                            <p>{char.allies}</p>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}