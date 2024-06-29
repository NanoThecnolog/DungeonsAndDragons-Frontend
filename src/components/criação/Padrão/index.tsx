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
//Importações Gerais
import { useState, useEffect, useRef, FormEvent, ChangeEvent } from 'react'
import styles from './styles.module.scss'
import { Button } from '@/components/ui/Button'
import { toast } from 'react-toastify'
import { FiUpload } from 'react-icons/fi'
import { setupAPIClient } from '@/services/api'
import { setupAPIClientExternal } from '@/services/apiD&D/apiExternal'
import { RaceProps } from '@/pages/char'
import { t } from '@/services/translate/t'

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


//segunda parte importações
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { FormControl, MenuItem, Select } from '@mui/material'
import Image from 'next/image'

type TraitDataProps = {
    data: {
        index: string;
        desc: [string];
        name: string;
        proficiencies?: [
            {
                index: string;
                name: string;
                url: string;
            }
        ];
        races: [
            {
                index: string;
                name: string;
                url: string;
            }
        ];
        subraces: [
            {
                index: string;
                name: string;
                url: string;
            }
        ];
        proficiency_choices?: {
            choose: number;
            from: {
                option_set_type: string;
                options: [
                    {
                        item: {
                            index: string;
                            name: string;
                            url: string;
                        }
                        option_type: string;
                    }
                ]
            }
            type: string;
        }
        trait_specific?: {
            subtrait_options?: {
                choose: number;
                from: {
                    option_set_type: string;
                    options: [
                        {
                            item: {
                                index: string;
                                name: string;
                                url: string;
                            }
                            option_type: string;
                        }
                    ]
                }
                type: string;
            }
            url: string;
        }
        url: string;
    }
    race: string;
    trait: string;
}
type SpecificTraitProps = {

}


type FetchRaceProps = {
    count: number;
    results: [
        {
            index: string;
            name: string;
            url: string;
        }
    ]
}
type RaceListProps = {
    name: string,
    index: string
}
type SubRaceProps = {
    race: string;
    subRace: {
        index: string;
        name: string;
        url: string;
        desc: string;
        ability_bonuses: [
            {
                ability_score: {
                    index: string;
                    name: string;
                    url: string;
                };
                bonus: number;
            }
        ]
        race: {
            index: string;
            name: string;
            url: string;
        };
        racial_traits: [
            {
                index: string;
                name: string;
                url: string;
            }
        ];
        starting_proficiencies: [
            {
                index: string;
                name: string;
                url: string;
            }
        ]
    }

}
type SubTraitProps = {
    subTrait: {
        index: string
        name: string
        desc: [string]
        proficiencies: [
            {
                index: string;
                name: string;
                url: string;
            }
        ]
        races: [
            {
                index: string;
                name: string;
                url: string;
            }
        ]
        subraces: [
            {
                index: string;
                name: string;
                url: string;
            }
        ]
        trait_specific?: {
            spell_options?: {
                choose: number;
                from: {
                    option_set_type: string;
                    options: [
                        {
                            item: {
                                index: string;
                                name: string;
                                url: string;
                            };
                            option_type: string;
                        }
                    ]
                }
            }
            url: string;
        }

        url: string
    }
    subrace: string;
}
type ExtraAbilityProps = {
    index: string
    name: string
    bonus: number
}


export default function StandardCreate() {
    const [loading, setLoading] = useState(false)
    const apiClient = setupAPIClient()
    const apiClientExternal = setupAPIClientExternal()

    const [stepOneVisible, setStepOneVisible] = useState<boolean>(true)
    const [stepTwoVisible, setStepTwoVisible] = useState<boolean>(false)
    const [stepThreeVisible, setStepThreeVisible] = useState<boolean>(false)
    const [stepFourVisible, setStepFourVisible] = useState<boolean>(false)
    const [stepFiveVisible, setStepFiveVisible] = useState<boolean>(false)
    const [stepSixVisible, setStepSixVisible] = useState<boolean>(false)
    const [stepFinalVisible, setStepFinalVisible] = useState<boolean>(false)

    const [name, setName] = useState<string>()
    const [title, setTitle] = useState<string>()
    const [imageURL, setImageURL] = useState<string>()
    const [imageFile, setImageFile] = useState(null);

    //Segunda parte - Raças
    const [raceList, setRaceList] = useState<RaceListProps[]>()
    const [raceData, setRaceData] = useState<RaceProps[]>()
    const [subRace, setSubRace] = useState<SubRaceProps[]>()
    const [race, setRace] = useState<string>("")
    const [traits, setTraits] = useState<TraitDataProps[]>([])
    const [specificTrait, setSpecificTrait] = useState([])
    const [subTrait, setSubTrait] = useState<SubTraitProps[]>([])
    const [subTraitSpecificOptions, setSubTraitSpecificOptions] = useState<string>("")
    const [specificOptions, setSpecificOptions] = useState<string>("")
    const [toolProficiency, setToolProficiency] = useState<string>("")
    const [elvySkillOptions, setElvySkillOptions] = useState<string[]>([])
    const [extraLanguage, setExtraLanguage] = useState<string>("")
    const [extraAbility, setExtraAbility] = useState<ExtraAbilityProps[]>([])
    //verificar oq precisa escolher pra cada raça
    console.log(race)

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
    // useEffect(() => {
    //     console.log(race)

    // }, [race])


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
        console.log(name, title, imageFile)
        setStepOneVisible(false)
        setStepTwoVisible(true)
        fetchRacesData()
    }

    //Segunda parte
    function handleStepTwo() {
        setStepTwoVisible(false)
        setStepThreeVisible(true)
    }
    function handleELvySkillOptions(e) {
        let value = e.target.value as string | string[];
        if (typeof value === 'string') {
            value = value.split(',');
        }

        if (value.length > 2) {
            value = value.slice(0, 2);
        }

        setElvySkillOptions(value);
    };
    function handleExtraAbility(e) {
        let value = e.target.value as string | string[];
        if (typeof value === 'string') {
            value = value.split(',');
        }

        // Map the selected values to objects with index, name, and bonus
        const selectedAbilities = value.map(val => {
            let ability;
            raceData.some(race => {
                ability = race.raceData.ability_bonus_options?.from.options.find(
                    (opt) => opt.ability_score.index === val
                );
                return ability;
            })
            return {
                index: ability?.ability_score.index || "",
                name: ability?.ability_score.name || "",
                bonus: ability?.bonus || 0
            };
        });

        // Limit the selected abilities to 2
        if (selectedAbilities.length > 2) {
            selectedAbilities.length = 2;
        }

        setExtraAbility(selectedAbilities);
    }
    async function fetchRacesData() {
        setLoading(true)
        const allRacesData: RaceProps[] = []
        const allAtributeData = []
        const allLanguagesData = []
        const allTraitsData = []
        const allSubRaces = []
        const allSpecificTraits = []
        const allSubTraitsData = []

        try {
            const response = await apiClientExternal.get("/api/races")
            const racesData = response.data


            if (racesData && racesData.results) {
                const racePromises = racesData.results.map(async (race) => {
                    const raceResponse = await apiClientExternal.get(race.url)
                    const raceData = raceResponse.data

                    const raceObject = {
                        raceData,
                        desc: raceData.index === "dragonborn" ? "Dragonborn look very much like dragons standing erect in humanoid form, though they lack wings or a tail."
                            : raceData.index === "half-elf" ? "Half-elves combine what some say are the best qualities of their elf and human parents."
                                : raceData.index === "half-orc" ? "Some half-orcs rise to become proud leaders of orc communities. Some venture into the world to prove their worth. Many of these become adventurers, achieving greatness for their mighty deeds."
                                    : raceData.index === "human" ? "Humans are the most adaptable and ambitious people among the common races. Whatever drives them, humans are the innovators, the achievers, and the pioneers of the worlds."
                                        : raceData.index === "tiefling" ? "To be greeted with stares and whispers, to suffer violence and insult on the street, to see mistrust and fear in every eye: this is the lot of the tiefling."
                                            : ""
                    }


                    allRacesData.push(raceObject)

                    const abilityPromises = raceData.ability_bonuses.map((attribute) =>
                        apiClientExternal.get(attribute.ability_score.url).then((response) => ({
                            race: raceData.name,
                            attribute: attribute.ability_score.name,
                            data: response.data
                        }))
                    )
                    const languagePromises = raceData.languages.map((langURL) =>
                        apiClientExternal.get(langURL.url).then((response) => ({
                            race: raceData.name,
                            language: langURL.name,
                            data: response.data
                        }))
                    )
                    const traitPromises = raceData.traits.map((traitURL) =>
                        apiClientExternal.get(traitURL.url).then((response) => ({
                            race: raceData.name,
                            trait: traitURL.name,
                            data: response.data
                        }))
                    )


                    const [abilities, languages, traits] = await Promise.all([
                        Promise.all(abilityPromises),
                        Promise.all(languagePromises),
                        Promise.all(traitPromises)
                    ])

                    allAtributeData.push(...abilities)
                    allLanguagesData.push(...languages)
                    allTraitsData.push(...traits)

                    if (raceData.subraces.length > 0) {
                        const subRacePromises = raceData.subraces.map(async (subRace) => {
                            const subRaceResponse = await apiClientExternal.get(subRace.url)
                            const subRaceData = {
                                race: raceData.name,
                                subRace: subRaceResponse.data
                            }
                            if (subRaceData.subRace.racial_traits.length > 0) {
                                const subTraitsPromises = subRaceData.subRace.racial_traits.map(async (subTrait) => {
                                    const subTraitResponse = await apiClientExternal.get(subTrait.url)
                                    const subTraitData = {
                                        subrace: subRaceData.subRace.index,
                                        subTrait: subTraitResponse.data
                                    }
                                    return subTraitData

                                })
                                const subTraits = await Promise.all(subTraitsPromises)
                                allSubTraitsData.push(...subTraits)
                            }
                            return subRaceData
                        }
                        )
                        const subRaces = await Promise.all(subRacePromises)
                        allSubRaces.push(...subRaces)

                    }

                    const fetchTraitPromises = traits.flatMap((trait) => {
                        if (trait.data.trait_specific && trait.data.trait_specific.subtrait_options) {
                            return trait.data.trait_specific.subtrait_options.from.options.map((traitOption) =>
                                apiClientExternal.get(traitOption.item.url).then(response => ({
                                    race: raceData.name,
                                    trait: traitOption.item.name,
                                    data: response.data
                                }))
                            )
                        }
                        return []
                    })
                    if (fetchTraitPromises.length > 0) {
                        const fetchedTraitsData = await Promise.all(fetchTraitPromises)
                        allSpecificTraits.push(...fetchedTraitsData)
                    }
                })
                await Promise.all(racePromises)
            }
        } catch (err) {
            console.log("Erro ao buscar dados das raças na api externa. ", err)
        } finally {
            setLoading(false)
        }

        const raceList = allRacesData.map((race) => ({
            name: race.raceData.name,
            index: race.raceData.index
        }))


        setRaceList(raceList)
        setRaceData(allRacesData)
        setSubRace(allSubRaces)
        setTraits(allTraitsData)
        setSpecificTrait(allSpecificTraits)
        setSubTrait(allSubTraitsData)


        console.log("Dados das subraças:", allSubRaces)
        console.log("Dados das raças:", allRacesData);
        console.log("Dados dos atributos:", allAtributeData);
        console.log("Dados dos idiomas:", allLanguagesData);
        console.log("Dados dos traços:", allTraitsData);
        console.log("Dados específicos dos traços:", allSpecificTraits)
        console.log("Dados dos traços das subraças:", allSubTraitsData)
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
            {loading ?
                (
                    <div>
                        <Backdrop
                            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open={loading}
                            onClick={() => setLoading(false)}
                        >
                            <CircularProgress color="inherit" />
                        </Backdrop>

                    </div>
                ) : (
                    //fase do nome, titulo e imagem
                    <div className={styles.formContainer}>
                        <form action="" onSubmit={handleFinalStep}>
                            {stepOneVisible && (
                                <div className={styles.form}>
                                    <div className={styles.formItem}>
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
                                    </div>
                                    <div className={styles.formItem}>
                                        <span>Nome do personagem</span>
                                        <input
                                            type="text"
                                            placeholder="Digite aqui..."
                                            className={styles.input}
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                    <div className={styles.formItem}>
                                        <span>Seu personagem tem Título?</span>
                                        <input type="text"
                                            placeholder="Digite aqui..."
                                            className={styles.input}
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                        />
                                    </div>

                                    <div className={styles.formButton}>
                                        <Button loading={loading} type='button' onClick={handleStepOne}>Próximo</Button>
                                    </div>
                                </div>
                            )}
                            {
                                //fase da raça
                            }
                            {stepTwoVisible && (
                                <div className={styles.form}>
                                    <div className={styles.formItem}>
                                        <span>Escolha a raça do personagem</span>
                                        {t("DEX")}

                                        {raceData.map((race) => (
                                            <div key={race.raceData.index} className={styles.cardRaceContainer}>

                                                <Accordion className={styles.cardItem}>
                                                    <AccordionSummary>
                                                        <div className={styles.cardSummary}>
                                                            <div>
                                                                <Image
                                                                    src={`/races/${race.raceData.index}.png`}
                                                                    width={50}
                                                                    height={50}
                                                                    className={styles.raceSmallImage}
                                                                    alt={race.raceData.name}
                                                                />
                                                            </div>
                                                            <div className={styles.raceName}>
                                                                <h4>{t(race.raceData.name)}</h4>
                                                            </div>
                                                        </div>
                                                    </AccordionSummary>
                                                    <AccordionDetails>
                                                        <div className={styles.cardDetails}>
                                                            <div>
                                                                <Image
                                                                    src={`/races/full-${race.raceData.index}.png`}
                                                                    width={150}
                                                                    height={250}
                                                                    className={styles.raceSmallImage}
                                                                    alt={race.raceData.name}
                                                                />
                                                            </div>
                                                            <div>
                                                                {race.desc && (
                                                                    <div className={styles.raceDesc}>
                                                                        <h4>Descrição</h4>
                                                                        <p>{t(race.desc)}</p>
                                                                    </div>
                                                                )}
                                                                <div className={styles.raceDesc}>
                                                                    <h4>Estatura</h4>
                                                                    <p>{t(race.raceData.size)}</p>
                                                                </div>
                                                                <div className={styles.raceDesc}>
                                                                    <h4>Longevidade</h4>
                                                                    <p>{t(race.raceData.age)}</p>
                                                                </div>
                                                                {///////////////////////////////////////////////////////
                                                                }
                                                                <div>
                                                                    <h4>Idiomas</h4>
                                                                    <p>{t(race.raceData.language_desc)}</p>

                                                                    {race.raceData.language_options && (
                                                                        <div style={{ display: 'flex', alignItems: 'center' }}>

                                                                            <div>
                                                                                <h5>Escolha um idioma extra</h5>
                                                                                <FormControl sx={{ m: 1, minWidth: 350 }}>
                                                                                    <Select
                                                                                        value={extraLanguage}
                                                                                        onChange={(e) => setExtraLanguage(e.target.value)}
                                                                                    >
                                                                                        <MenuItem value="">Nenhum escolhido</MenuItem>
                                                                                        {race.raceData.language_options.from.options.map((language, index) => (
                                                                                            <MenuItem key={index} value={language.item.index}>{t(language.item.name)}</MenuItem>
                                                                                        ))}
                                                                                    </Select>
                                                                                </FormControl>
                                                                            </div>

                                                                            {extraLanguage != "" && (
                                                                                <div>
                                                                                    <h5>Você escolheu:</h5>
                                                                                    <p>{t(extraLanguage)}</p>
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    )

                                                                    }
                                                                </div>
                                                                <div>
                                                                    {race.raceData.traits.length > 0 && (
                                                                        <>
                                                                            <div style={{ paddingTop: '1.5rem' }}>
                                                                                <h3>Traços Raciais</h3>
                                                                            </div>

                                                                            {race.raceData.traits.map((trait) => (
                                                                                <div key={trait.index} className={styles.raceTraits}>
                                                                                    <h4>{t(trait.name)}</h4>
                                                                                    <div className={styles.traitDesc}>
                                                                                        {traits
                                                                                            .filter((desc) => desc.race === race.raceData.name && desc.data.name === trait.name)
                                                                                            .flatMap((desc) => desc.data.desc)
                                                                                            .map((item, index) => (
                                                                                                <p key={index}>{t(item)}</p>
                                                                                            ))
                                                                                        }
                                                                                    </div>
                                                                                    {trait.index === 'breath-weapon' && (
                                                                                        <Accordion>
                                                                                            <AccordionSummary>
                                                                                                <h4>Tabela de tipos de Dragões</h4>
                                                                                            </AccordionSummary>
                                                                                            <AccordionDetails>
                                                                                                <table className={styles.traitTable}>
                                                                                                    <thead>
                                                                                                        <tr>
                                                                                                            <th>Dragão</th>
                                                                                                            <th>Tipo de dano</th>
                                                                                                            <th>Arma de Sopro</th>
                                                                                                        </tr>
                                                                                                    </thead>
                                                                                                    <tbody>
                                                                                                        {specificTrait.length > 0 &&
                                                                                                            specificTrait.map((item, index) => (


                                                                                                                <tr key={index} className={styles.trContainer}>
                                                                                                                    <td>{t(item.data.name)}</td>
                                                                                                                    <td>{t(item.data.trait_specific.damage_type.name)}</td>
                                                                                                                    <td>{t(item.data.trait_specific.breath_weapon.area_of_effect.type)} de {(item.data.trait_specific.breath_weapon.area_of_effect.size * 0.3048).toFixed(1)}m (teste de {item.data.trait_specific.breath_weapon.dc.dc_type.name})</td>
                                                                                                                </tr>


                                                                                                            ))}
                                                                                                    </tbody>
                                                                                                </table>
                                                                                                {specificTrait.length > 0 && (
                                                                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                                                                        <div style={{ paddingTop: '1rem' }}>
                                                                                                            <h5>Escolha seu Ancestral Dracônico:</h5>
                                                                                                        </div>
                                                                                                        <FormControl sx={{ m: 1, minWidth: 350 }}>
                                                                                                            <Select
                                                                                                                value={specificOptions}
                                                                                                                onChange={(e) => { setSpecificOptions(e.target.value), console.log(e.target.value) }}
                                                                                                            >
                                                                                                                <MenuItem value="">Nenhum escolhido</MenuItem>
                                                                                                                {specificTrait.map((drag, index) => (
                                                                                                                    <MenuItem key={index} value={drag.data.index}>{t(drag.data.index)}</MenuItem>

                                                                                                                ))}
                                                                                                            </Select>
                                                                                                        </FormControl>
                                                                                                        {specificOptions != "" && (
                                                                                                            <div>
                                                                                                                <h5>Você escolheu:</h5>
                                                                                                                <p>{t(specificOptions)}</p>
                                                                                                            </div>
                                                                                                        )}
                                                                                                    </div>

                                                                                                )

                                                                                                }
                                                                                            </AccordionDetails>
                                                                                        </Accordion>

                                                                                    )}
                                                                                    {trait.index === "tool-proficiency" && (
                                                                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                                                                            <FormControl sx={{ m: 1, minWidth: 350 }}>
                                                                                                <Select
                                                                                                    value={toolProficiency}
                                                                                                    onChange={(e) => setToolProficiency(e.target.value)}
                                                                                                >
                                                                                                    <MenuItem value="">Nenhum escolhido</MenuItem>
                                                                                                    {race.raceData.starting_proficiency_options?.from.options.map((opt, index) => (
                                                                                                        <MenuItem key={index} value={opt.item.index}>{t(opt.item.name)}</MenuItem>
                                                                                                    ))}
                                                                                                </Select>
                                                                                            </FormControl>
                                                                                            {toolProficiency != "" && (
                                                                                                <div>
                                                                                                    <h5>Ferramenta escolhida:</h5>
                                                                                                    <p>{t(toolProficiency)}</p>
                                                                                                </div>
                                                                                            )}
                                                                                        </div>

                                                                                    )

                                                                                    }
                                                                                    {trait.index === "skill-versatility" && (
                                                                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                                                                            <div>
                                                                                                <h5>Escolha duas perícias</h5>
                                                                                                <FormControl sx={{ m: 1, minWidth: 350 }}>
                                                                                                    <Select
                                                                                                        value={elvySkillOptions}
                                                                                                        multiple
                                                                                                        onChange={handleELvySkillOptions}
                                                                                                    >
                                                                                                        <MenuItem value="">Nenhum escolhido</MenuItem>
                                                                                                        {race.raceData.starting_proficiency_options?.from.options.map((opt, index) => (
                                                                                                            <MenuItem key={index} value={opt.item.index}>{t(opt.item.name)}</MenuItem>
                                                                                                        ))}
                                                                                                    </Select>
                                                                                                </FormControl>
                                                                                            </div>
                                                                                            {elvySkillOptions.length > 0 && (
                                                                                                <div>
                                                                                                    <h5>habilidade escolhida:</h5>
                                                                                                    {elvySkillOptions.map((skill, index) => (
                                                                                                        <p key={index}>{t(skill)}</p>
                                                                                                    ))}

                                                                                                </div>
                                                                                            )}
                                                                                        </div>

                                                                                    )

                                                                                    }
                                                                                </div>
                                                                            ))}
                                                                        </>
                                                                    )}
                                                                </div>
                                                                <div>
                                                                    <h4>Incrimento no valor de habilidades</h4>
                                                                    <div>
                                                                        <h5>A raça {race.raceData.name} concede os seguintes aumentos no valor de habilidades:</h5>
                                                                        {race.raceData.ability_bonuses.map((attribute, index) => (
                                                                            <p key={index}>{attribute.bonus} ponto(s) em {t(attribute.ability_score.name)}</p>
                                                                        ))}
                                                                        {race.raceData.ability_bonus_options && (
                                                                            <div>
                                                                                <h5>Você pode escolher mais {race.raceData.ability_bonus_options.choose} atributos para receber pontos.</h5>
                                                                                <FormControl sx={{ m: 1, minWidth: 350 }}>
                                                                                    <Select
                                                                                        value={extraAbility.map(a => a.index)}
                                                                                        multiple
                                                                                        onChange={handleExtraAbility}
                                                                                        renderValue={(selected) => {
                                                                                            const selectedValues = selected as string[];
                                                                                            return selectedValues
                                                                                                .map(val => {
                                                                                                    const ability = extraAbility.find(a => a.index === val);
                                                                                                    return ability ? ability.name : '';
                                                                                                })
                                                                                                .join(', ');
                                                                                        }}
                                                                                    >
                                                                                        <MenuItem value="">Nenhum escolhido</MenuItem>
                                                                                        {race.raceData.ability_bonus_options.from.options.map((ability, index) => (
                                                                                            <MenuItem key={index} value={ability.ability_score.index}>{t(ability.ability_score.name)}</MenuItem>
                                                                                        ))}

                                                                                    </Select>
                                                                                </FormControl>
                                                                                {extraAbility.length > 0 && (
                                                                                    <div>
                                                                                        <h5>habilidade escolhida:</h5>
                                                                                        {extraAbility.map((skill, index) => (
                                                                                            <p key={index}>{t(skill.name)}: {skill.bonus} ponto(s)</p>
                                                                                        ))}

                                                                                    </div>
                                                                                )}

                                                                            </div>
                                                                        )}

                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>

                                                        {race.raceData.subraces.length > 0 &&
                                                            race.raceData.subraces.map((subrace) => (
                                                                <div key={subrace.index}>
                                                                    <h3>Sub-raças</h3>
                                                                    <Accordion>
                                                                        <AccordionSummary>
                                                                            <div>
                                                                                <Image
                                                                                    src={`/races/${subrace.index}.png`}
                                                                                    width={50}
                                                                                    height={50}
                                                                                    className={styles.raceSmallImage}
                                                                                    alt={subrace.name}
                                                                                />
                                                                            </div>
                                                                            <div className={styles.raceName}>
                                                                                <h4>{t(subrace.name)}</h4>
                                                                            </div>
                                                                        </AccordionSummary>
                                                                        <AccordionDetails>
                                                                            <div className={styles.cardDetails}>
                                                                                <div>
                                                                                    <Image
                                                                                        src={`/races/full-${subrace.index}.png`}
                                                                                        width={150}
                                                                                        height={200}
                                                                                        className={styles.raceSmallImage}
                                                                                        alt={race.raceData.name}
                                                                                    />
                                                                                </div>
                                                                                {subRace && subRace.map((sub) =>
                                                                                    sub.subRace?.index &&
                                                                                    sub.subRace.index === subrace.index && (
                                                                                        <div key={sub.subRace.index}>
                                                                                            <div className={styles.subRaceDesc}>
                                                                                                <h4>Descrição</h4>
                                                                                                <p>{t(sub.subRace.desc)}</p>
                                                                                            </div>
                                                                                            {subTrait && subTrait.map((trait, index) => (
                                                                                                trait.subrace === subrace.index && (
                                                                                                    <div key={index}>
                                                                                                        <h4>{trait.subTrait.name}</h4>
                                                                                                        {trait.subTrait.desc.map((desc, index) => (
                                                                                                            <div key={index} className={styles.subTraitDesc}>
                                                                                                                <p>{desc}</p>
                                                                                                            </div>
                                                                                                        ))}
                                                                                                        {trait.subTrait.trait_specific && (
                                                                                                            <Accordion>
                                                                                                                <AccordionSummary>{trait.subTrait.name}</AccordionSummary>
                                                                                                                <AccordionDetails className={styles.accordionSelectForm}>
                                                                                                                    <div>
                                                                                                                        <FormControl sx={{ m: 1, minWidth: 250 }}>


                                                                                                                            <Select
                                                                                                                                value={subTraitSpecificOptions}
                                                                                                                                onChange={(e) => setSubTraitSpecificOptions(e.target.value)}
                                                                                                                            >
                                                                                                                                <MenuItem value="">Nenhum escolhido</MenuItem>
                                                                                                                                {trait.subTrait.trait_specific?.spell_options?.from.options.map((item, index) => (
                                                                                                                                    <MenuItem key={index} value={item.item.index}>{item.item.name}</MenuItem>
                                                                                                                                ))}

                                                                                                                            </Select>
                                                                                                                        </FormControl>
                                                                                                                    </div>
                                                                                                                    <div>
                                                                                                                        <h5>Your choice:</h5>
                                                                                                                        <p>{subTraitSpecificOptions}</p>
                                                                                                                    </div>

                                                                                                                </AccordionDetails>
                                                                                                            </Accordion>

                                                                                                        )

                                                                                                        }

                                                                                                    </div>
                                                                                                )

                                                                                            )
                                                                                            )}
                                                                                            <div>
                                                                                                <h4>Incrimento no valor de habilidades</h4>
                                                                                                <div>
                                                                                                    <h5>A sub-raça {sub.subRace.name} concede os seguintes aumentos no valor de habilidades:</h5>
                                                                                                    {sub.subRace.ability_bonuses.map((attribute, index) => (
                                                                                                        <p key={index}>{attribute.bonus} ponto(s) em {t(attribute.ability_score.name)}</p>
                                                                                                    ))}

                                                                                                </div>

                                                                                            </div>
                                                                                        </div>
                                                                                    )
                                                                                )}
                                                                                <div>

                                                                                </div>

                                                                            </div>
                                                                        </AccordionDetails>
                                                                        <AccordionActions>
                                                                            <Button type='button' onClick={(e) => setRace(subrace.index)}>Escolher sub-raça</Button>
                                                                        </AccordionActions>
                                                                    </Accordion>
                                                                </div>
                                                            ))
                                                        }
                                                    </AccordionDetails>
                                                    <AccordionActions>
                                                        <Button type='button' onClick={(e) => setRace(race.raceData.index)}>Escolher raça</Button>
                                                    </AccordionActions>
                                                </Accordion>
                                            </div>
                                        ))}
                                    </div>
                                    <div className={styles.formButton}>
                                        <Button loading={loading} type='button' onClick={() => {
                                            setStepOneVisible(true)
                                            setStepTwoVisible(false)
                                        }}>Voltar</Button>
                                        <Button loading={loading} type='button' onClick={() => {
                                            setStepTwoVisible(false)
                                            setStepThreeVisible(true)
                                        }}>Próximo</Button>
                                    </div>
                                </div>
                            )}
                            {//Fase da classe
                            }
                            {stepThreeVisible && (
                                <div>
                                    <div>
                                        <Button loading={loading} type='button' onClick={() => {
                                            setStepTwoVisible(true)
                                            setStepThreeVisible(false)

                                        }}>Voltar</Button>
                                        <Button loading={loading} type='button' onClick={() => {
                                            setStepThreeVisible(false)
                                            setStepFourVisible(true)
                                        }}>Próximo</Button>
                                    </div>
                                </div>
                            )}
                            {stepFourVisible && (
                                <div>
                                    <div>
                                        <Button loading={loading} type='button' onClick={() => {
                                            setStepThreeVisible(true)
                                            setStepFourVisible(false)
                                        }}>Voltar</Button>
                                        <Button loading={loading} type='button' onClick={() => {
                                            setStepFourVisible(false)
                                            setStepFiveVisible(true)
                                        }}>Próximo</Button>
                                    </div>
                                </div>
                            )}
                            {stepFiveVisible && (
                                <div>
                                    <div>
                                        <Button loading={loading} type='button' onClick={() => {
                                            setStepFourVisible(true)
                                            setStepFiveVisible(false)
                                        }}>Voltar</Button>
                                        <Button loading={loading} type='button' onClick={() => {
                                            setStepFiveVisible(false)
                                            setStepSixVisible(true)
                                        }}>Próximo</Button>
                                    </div>
                                </div>
                            )}
                            {stepSixVisible && (
                                <div>
                                    <div>
                                        <Button loading={loading} type='button' onClick={() => {
                                            setStepFiveVisible(true)
                                            setStepSixVisible(false)
                                        }}>Voltar</Button>
                                        <Button loading={loading} type='button' onClick={() => {
                                            setStepSixVisible(false)
                                            setStepFinalVisible(true)
                                        }}>Próximo</Button>
                                    </div>
                                </div>
                            )}
                            {stepFinalVisible && (
                                <div>
                                    <div>
                                        <Button loading={loading} onClick={() => {
                                            setStepSixVisible(true)
                                            setStepFinalVisible(false)
                                        }}>Voltar</Button>
                                        <Button type="submit" title='Confirmar criação' loading={loading}>Confirmar Criação</Button>
                                    </div>
                                </div>
                            )}
                        </form>
                    </div>
                )}
        </div>
    )
}