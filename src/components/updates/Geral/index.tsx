import { useState } from 'react'
import styles from './styles.module.scss'
import { Input } from '@/components/ui/input'
import { TextArea } from '@/components/ui/input'
import { Button } from '@/components/ui/Button'


export default function UpdateGeral() {
    const [name, setName] = useState<string>()
    const [title, setTitle] = useState<string>()

    const [background, setBackground] = useState<string>()

    const [str, setStr] = useState<string>()
    const [dex, setDex] = useState<string>()
    const [con, setCon] = useState<string>()
    const [int, setInt] = useState<string>()
    const [wis, setWis] = useState<string>()
    const [cha, setCha] = useState<string>()

    const [skill, setSkill] = useState<string>()
    const [trace, setTrace] = useState<string>()
    const [ideals, setIdeals] = useState<string>()

    //fazer uma lista com os dados e colocar um botão de editar ou excluir


    return (
        <div className={styles.container}>
            <div className={styles.updateContainer}>
                <div className={styles.row}>
                    <div className={styles.upNome}>
                        <h4>Nome:</h4>
                        <Input type="text" placeholder='Digite o nome' />
                    </div>
                    <div className={styles.upTitulo}>
                        <h4>Título:</h4>
                        <Input type="text" placeholder='Digite o título' />
                    </div>
                    <div className={styles.upClasse}>
                        <h4>Adicionar ou modificar classe:</h4>
                        <select title="modificar classe" name="" id="">
                            <option value="">Selecione a classe</option>
                        </select>
                        <Input type="number" placeholder='alterar nível' />
                        <select title="adicionar classe" name="" id="">
                            <option value="">Selecione uma nova classe</option>
                        </select>
                    </div>
                    <div>
                        <h4>Antecedente:</h4>
                        <select title="Antecedente" name="" id="">
                            <option value="">Selecione o antecedente</option>
                        </select>
                    </div>
                </div>
                <div className={styles.row}>
                    <div className={styles.upAtributos}>
                        <h4>Atributos</h4>
                        <div className={styles.upStatus}>
                            <div className={styles.status}>
                                <span>Força</span>
                                <Input type="number" />
                            </div>
                            <div className={styles.status}>
                                <span>Dextreza</span>
                                <Input type="number" />
                            </div>
                            <div className={styles.status}>
                                <span>Constituição</span>
                                <Input type="number" />
                            </div>
                            <div className={styles.status}>
                                <span>Inteligência</span>
                                <Input type="number" />
                            </div>
                            <div className={styles.status}>
                                <span>Sabedoria</span>
                                <Input type="number" />
                            </div>
                            <div className={styles.status}>
                                <span>Carisma</span>
                                <Input type="number" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.row}>
                    <div>
                        <h4>Adicionar ou remover perícias do personagem</h4>
                        <Input type="text" />
                        <Button>adicionar</Button>
                        <Button>remover</Button>
                    </div>
                    <div>
                        <h4>Traços de personalidade</h4>
                        <Input type="text" />
                        <Button>adicionar</Button>
                        <Button>remover</Button>
                    </div>
                    <div>
                        <h4>Ideais</h4>
                        <Input type="text" />
                        <Button>adicionar</Button>
                        <Button>remover</Button>
                    </div>
                </div>
                <div className={styles.row}>
                    <div>
                        <h4>Características e traços físicos</h4>
                        <Input type="text" />
                        <Button>adicionar</Button>

                    </div>
                    <div>
                        <h4>Vínculos</h4>
                        <Input type="text" />
                        <Button>adicionar</Button>
                        <Button>remover</Button>
                    </div>
                    <div>
                        <h4>Defeitos</h4>
                        <Input type="text" />
                        <Button>adicionar</Button>
                        <Button>remover</Button>
                    </div>
                </div>
                <div className={styles.row}>
                    <div>
                        <h4>Idiomas</h4>
                        <Input type="text" />
                        <Button>adicionar</Button>
                        <Button>remover</Button>
                    </div>
                    <div>
                        <h4>Proficiencias</h4>
                        <Input type="text" />
                        <Button>adicionar</Button>
                        <Button>remover</Button>
                    </div>
                    <div>

                        <h4>História</h4>
                        <TextArea />
                        <Button>editar</Button>
                    </div>
                    <div>
                        <h4>Aliados</h4>
                        <Input type="text" />
                        <Button>adicionar</Button>
                        <Button>remover</Button>
                    </div>
                </div>
                <div className={styles.row}>
                    {
                        //painel de organizações
                        //dividido em duas colunas
                        //lado esquerdo uma lista com os dados das organizações
                        //possibilidade de entrar na organização
                        //lado direito apresentar a organização que o personagem pertence
                        //ou se não pertencer a nenhuma pode criar uma
                        //solicitando brasão e nome da organização                                
                    }
                    <div>
                        <h4>Organizações</h4>
                        <Input type="text" />
                        <Button>criar</Button>
                        <Button>remover</Button>
                    </div>
                </div>
                <div className={styles.row}>
                    <div className={styles.submit}>
                        <Button>Salvar</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}