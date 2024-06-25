/*
# Primeira parte

##Dados

Nome do personagem
imagem do personagem
título

# Segunda parte

## Raça

Escolher a raça - informações subraças se houver, escolha de subraças
verificar oq o jogador precisa escolher pra cada raça
proficiencia em ferramentas, idiomas, ancestral draconico, etc...


# Terceira parte

## Classe

Escolher classe - informações da classe

verificar oq o jogador precisa escolher pra cada classe
prificiencias, idiomas, etc...

# Quarta parte

## Atributos

### Escolher entre 3 métodos pra definir atributos

- Standard array
    Opções de 8, 10, 12, 13, 14 e 15 para distribuir pelos 6 atributos

- Manual ou (rolando dados)
    - escrever as quantidades (min - 1 max - 18)
    - rolagem de dados (4d6 somar os 3 valores mais altos)
    - compra de pontos
        -- 27 pontos pra gastar (ver a tabela de compra no livro do jogador). Implantar lógica para compra de pontos de atributos.
- Cálculo de valores
    - adicionar os valores de habilidade dependendo da raça
    - apresentar a composição dos valores (valor total, modificador, valor base, bonus racial, etc)
    
# Quinta parte

## Escolha de antecedente

- Escolhas que o antecedente dá
- Escolha de características
    -- traços de personalidade
    -- Ideais
    -- Vínculos
    -- Defeitos
    -- Tendência
    -- Estilo de vida?
    -- Aliados
    -- Inimigos
    -- História

# Sexta parte

## Escolha de equipamentos

- Escolha entre receber equipamento ou riqueza(PO)
    -- Equipamento
        --- Escolher equipamentos que a classe dá
        --- Escolher equipamentos que o antecedente dá
    -- Riqueza
        --- Dinheiro que a classe começa (2d4 x 10)
- Inventário atual após escolher os equipamentos iniciais e confirmar
- Adicionar itens
    -- Criar um filtro de itens por tipo de item (armor, potion, ring, rod, staff, weapon, etc)
        -- mostrar por proficiencia, se é magico
    -- mostrar informações sobre o item (tipo de ataque, alcance, dano, tipo de dano, peso, custo, propriedades (se é versátil, etc))
    -- Escolher quantidade a ser adicionada
- Riquezas
    -- Mostrar o que o personagem tem atualmente
    -- possibilidade de adicionar manualmente quantidade de cada tipo de moeda

# Finalização da ficha

- Mostrar todas as escolhas que foram feitas
- Botão pra confirmar a criação
*/

import { useState, useEffect, useRef, FormEvent, ChangeEvent } from 'react'
import styles from './styles.module.scss'
import { Button } from '@/components/ui/Button'
import { toast } from 'react-toastify'
import { FiUpload } from 'react-icons/fi'

export default function StandardCreate() {
    const [loading, setLoading] = useState(false)
    console.log("renderizando Standard")

    const [stepOneVisible, setStepOneVisible] = useState<boolean>(true)
    const [stepTwoVisible, setStepTwoVisible] = useState<boolean>(false)
    const [stepThreeVisible, setStepThreeVisible] = useState<boolean>(false)
    const [stepFourVisible, setStepFourVisible] = useState<boolean>(false)
    const [stepFiveVisible, setStepFiveVisible] = useState<boolean>(false)
    const [stepSixVisible, setStepSixVisible] = useState<boolean>(false)
    const [stepFinalVisible, setStepFinalVisible] = useState<boolean>(false)

    const [name, setName] = useState<string>()
    const [title, setTitle] = useState<string>('Sem título')
    const [imageURL, setImageURL] = useState<string>()
    const [imageFile, setImageFile] = useState(null);

    const [race, setRace] = useState<string>()
    //verificar oq precisa escolher pra cada raça

    const [classe, setClasse] = useState<string>()
    //verificar oq precisa escolher pra cada classe

    const [str, setStr] = useState<number>()
    const [dex, setDex] = useState<number>()
    const [con, setCon] = useState<number>()
    const [int, setInt] = useState<number>()
    const [wis, setWis] = useState<number>()
    const [cha, setCha] = useState<number>()
    //fazer a lógica pros atributos

    const [background, setBackground] = useState<string>() // antecedente
    const [traces, setTraces] = useState<string>() // traços de personalidade
    const [ideals, setIdeals] = useState<string>() // ideais
    const [bonds, setBonds] = useState<string>() // vínculos
    const [tendency, setTendency] = useState<string>()//tendencia
    const [lifeStyle, setLifeStyles] = useState<string>()// estilo de vida
    const [allies, setAllies] = useState<string>()// aliados
    const [enemies, setEnemies] = useState<string>()//inimigos
    const [story, setStory] = useState<string>()//história
    //fazer a lógica pra definição dessas variáveis

    const [initEquip, setInitEquip] = useState<string>()
    const [treasure, setTreasure] = useState<string>()
    const [bag, setBag] = useState([]) // verificar informações q a api dá dos ítens e criar uma tipagem pra receber essas informações e compor o array de objetos



    //Primeira parte

    function handleFile(e: ChangeEvent<HTMLInputElement>) {
        if (!e.target.files) {
            return;
        }
        const image = e.target.files[0];
        // console.log(image)
        if (!image) {
            return;
        }
        if (image.type === 'image/jpeg' || image.type === 'image/png' || image.type === 'image/jpg') {
            setImageFile(image);
            setImageURL(URL.createObjectURL(image))
        } else {
            console.log("Tipo de imagem não suportado.")
            toast.error(`Tipo de imagem não suportado. O tipo ${image.type} não é aceito.`)
        }
    }

    function handleStepOne() {
        setStepOneVisible(false)
        setStepTwoVisible(true)

    }

    //Segunda parte
    function handleStepTwo() {
        setStepTwoVisible(false)
        setStepThreeVisible(true)

    }

    //Terceira parte
    function handleStepThree() {

    }

    //Quarta parte
    function handleStepFour() {


    }

    //Quinta parte
    function handleStepFive() {


    }

    //Sexta parte
    function handleStepSix() {


    }

    //Parte Final. redirecionar pra /char enviando o id como url parameter
    async function handleFinalStep(event: FormEvent) {
        event.preventDefault()
        setLoading(true)

        try {
            if (name === '' || imageFile === null) {
                toast.error("Preencha todos os campos!")
                return;
            }

            const formData = new FormData();
            formData.append('name', name)

        } catch (err) {
            console.log("Ocorreu um erro ao criar o personagem: ", err)
            toast.error("Ocorreu um erro ao criar seu personagem!")

        } finally {
            setLoading(false)
        }


    }



    return (
        <div className={styles.Container}>

            <form action="" onSubmit={handleFinalStep}>

                {stepOneVisible && (
                    <div>
                        <div>
                            <div>
                                <span>Imagem</span>
                                <label className={styles.labelImage}>
                                    <span>
                                        <FiUpload size={30} color="#fff" />
                                    </span>
                                    <input title="image" type="file" accept="image/png, image/jpeg, image/jpg" onChange={handleFile} />
                                    {imageURL && (
                                        <img
                                            className={styles.imagePreview}
                                            src={imageURL}
                                            alt="Imagem do personagem"
                                            width={250}
                                            height={250}
                                        />
                                    )}
                                </label>
                                <span>Nome do personagem</span>
                                <input
                                    type="text"
                                    placeholder="Digite aqui..."
                                    className={styles.input}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <span>Seu personagem tem Título?</span>
                                <input type="text"
                                    placeholder="Digite aqui..."
                                    className={styles.input}
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>


                            <Button onClick={() => {
                                setStepOneVisible(false)
                                setStepTwoVisible(true)
                            }}>Próximo</Button>
                        </div>


                    </div>
                )}
                {stepTwoVisible && (
                    <div>
                        <div>
                            <Button onClick={() => {
                                setStepOneVisible(true)
                                setStepTwoVisible(false)
                            }}>Voltar</Button>
                            <Button onClick={() => {
                                setStepTwoVisible(false)
                                setStepThreeVisible(true)
                            }}>Próximo</Button>
                        </div>

                    </div>
                )}
                {stepThreeVisible && (
                    <div>
                        <div>
                            <Button onClick={() => {
                                setStepTwoVisible(true)
                                setStepThreeVisible(false)

                            }}>Voltar</Button>
                            <Button onClick={() => {
                                setStepThreeVisible(false)
                                setStepFourVisible(true)
                            }}>Próximo</Button>
                        </div>
                    </div>
                )}
                {stepFourVisible && (
                    <div>
                        <div>
                            <Button onClick={() => {
                                setStepThreeVisible(true)
                                setStepFourVisible(false)
                            }}>Voltar</Button>
                            <Button onClick={() => {
                                setStepFourVisible(false)
                                setStepFiveVisible(true)
                            }}>Próximo</Button>
                        </div>
                    </div>
                )}
                {stepFiveVisible && (
                    <div>
                        <div>
                            <Button onClick={() => {
                                setStepFourVisible(true)
                                setStepFiveVisible(false)
                            }}>Voltar</Button>
                            <Button onClick={() => {
                                setStepFiveVisible(false)
                                setStepSixVisible(true)
                            }}>Próximo</Button>
                        </div>
                    </div>
                )}
                {stepSixVisible && (
                    <div>
                        <div>
                            <Button onClick={() => {
                                setStepFiveVisible(true)
                                setStepSixVisible(false)
                            }}>Voltar</Button>
                            <Button onClick={() => {
                                setStepSixVisible(false)
                                setStepFinalVisible(true)
                            }}>Próximo</Button>
                        </div>
                    </div>
                )}
                {stepFinalVisible && (
                    <div>
                        <div>
                            <Button onClick={() => {
                                setStepSixVisible(true)
                                setStepFinalVisible(false)
                            }}>Voltar</Button>
                            <Button type="submit" title='Confirmar criação' loading={loading}>Confirmar Criação</Button>
                        </div>
                    </div>
                )}
            </form>
        </div>
    )
}