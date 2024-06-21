import { useState, useEffect } from 'react'
import styles from './styles.module.scss'
import { TbSettings } from "react-icons/tb";

export default function Sobre({ charData }) {
    const { char, charClass } = charData
    const [level, setLevel] = useState(1)

    useEffect(() => {
        if (charClass.length > 1) {
            const somaLevel = Number(charClass[0].level) + Number(charClass[1].level)
            setLevel(somaLevel)
        } else {
            const level = charClass[0].level
            setLevel(level)
        }
    }, [charClass])

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
                            <span>personalidade</span>
                            <span>personalidade</span>
                            <span>personalidade</span>
                            <span>personalidade</span>
                        </div>
                        <div className={styles.ideais}>
                            <div className={styles.editar}><TbSettings size={25} /></div>
                            <h4>Ideais</h4>
                            <span>ideais</span>
                            <span>ideais</span>
                            <span>ideais</span>
                            <span>ideais</span>
                        </div>
                        <div className={styles.caracteristicas}>
                            <div className={styles.editar}><TbSettings size={25} /></div>
                            <h4>Caracteristicas e Traços</h4>
                            <span>Caracteristica</span>
                            <span>Traço</span>
                            <span>Caracteristica</span>
                            <span>Traço</span>
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
                            <span>vinculo</span>
                            <span>vinculo</span>
                            <span>vinculo</span>
                        </div>
                        <div className={styles.defeitos}>
                            <div className={styles.editar}><TbSettings size={25} /></div>
                            <h4>Defeitos</h4>
                            <span>defeito</span>
                            <span>defeito</span>
                            <span>defeito</span>
                            <span>defeito</span>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.idiomas}>
                            <div className={styles.editar}><TbSettings size={25} /></div>
                            <h4>idiomas e proficiencias</h4>
                            <div className={styles.idiomasMap}>
                                <h4>Idiomas</h4>
                                {char.languages.map((language, index) => (
                                    <span key={index}>
                                        {language}
                                        {index < char.languages.length - 1 && ','}
                                    </span>
                                ))}
                            </div>
                            <div className={styles.profMap}>
                                <h4>Proficiências</h4>
                                <span>proficiencia</span>
                                <span>proficiencia</span>
                                <span>proficiencia</span>
                                <span>proficiencia</span>
                                <span>proficiencia</span>
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
                            {/*Após adaptar o schema Prisma para criar uma nova tabela para organizações.
                            Criar um modal que apresente todas as organizações já cadastradas, seus brasões, quantidade de membros associados a ela e opção do personagem se associar.
                            A associação será através da seleção de uma organização na lista para evitar erros de digitação, etc.
                            Haverá a possibilidade de criar uma organização para o jogador. A criação exigirá nome e brasão da organização
                            Pensar em uma página da organização, com ideais, missão visão valores? acho interessante.
                            */}
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