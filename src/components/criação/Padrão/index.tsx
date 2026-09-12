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
import { useState, FormEvent, ChangeEvent } from 'react'
import styles from './styles.module.scss'
import { Button } from '@/components/ui/Button'
import { toast } from 'react-toastify'
import { setupAPIClient } from '@/services/api'
import { setupAPIClientExternal } from '@/services/apiD&D/apiExternal'
import { RaceProps } from '@/types/char'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Resumo from './Resume'

//primeira parte
import PrimeiraEtapa from './PrimeiraEtapa'
//segunda parte importações
import SegundaEtapa from './SegundaEtapa'
//terceira parte
import TerceiraEtapa from './TerceiraEtapa'
//quarta parte
import QuartaEtapa from './QuartaEtapa'
import QuintaEtapa from './QuintaEtapa'
//quinta parte

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
export interface ClassesProps {
    class_levels: string
    hit_die: number
    index: string
    name: string
    multi_classing: {
        prerequisites: [
            {
                ability_score: {
                    index: string;
                    name: string;
                    url: string;
                }
                minimum_score: number
            }
        ]
    }
    proficiencies: [
        {
            index: string;
            name: string;
            url: string;
        }
    ]
    proficiency_choices: [
        {
            from: {
                option_set_type: string;
                options: any;
            }
            choose: number;
            desc: string;
            type: string;
        }
    ]
    saving_throws: [
        {
            index: string;
            name: string;
            url: string;
        }
    ]
    spellcasting?: {
        info: [{
            name: string;
            desc: string[];
        }];
        level: number;
        spellcasting_ability: {
            index: string;
            name: string;
            url: string;
        }
    }
    spells?: string;
    starting_equipment?: [
        {
            equipment: {
                index: string;
                name: string;
                url: string;
            }
            quantity: number;
        }
    ]
    starting_equipment_options: [
        {
            choose: number;
            desc: string;
            from: {
                option_set_type: string;
                options: [
                    {
                        items: [
                            {
                                choice: number;
                                desc: string;
                                from: {
                                    equipment_category: {
                                        name: string;
                                        index: string;
                                        url: string;
                                    }
                                    option_set_type: string;
                                }
                                type: string;
                            }
                        ]
                        option_type: string;
                    }
                ]
            }
            type: string;
        }
    ]
    subclasses?: [
        {
            index: string;
            name: string;
            url: string;
        }
    ]
    url: string;
}
export interface LevelProps {
    ability_score_bonuses: number;
    class: {
        index: string;
        name: string;
        url: string;
    }
    class_specific: Record<string, number>;
    features?: [
        {
            index: string;
            name: string;
            url: string;
        }
    ]
    index: string;
    level: number;
    prof_bonus: number;
    spellcasting?: {
        cantrips_known: number;
        spell_slots_level_1: number;
        spell_slots_level_2: number;
        spell_slots_level_3: number;
        spell_slots_level_4: number;
        spell_slots_level_5: number;
        spell_slots_level_6: number;
        spell_slots_level_7: number;
        spell_slots_level_8: number;
        spell_slots_level_9: number;
        spells_known: number;
    }
    url: string;
}
export interface FeatureLevelProps {
    index: string;
    name: string;
    class: {
        index: string;
        name: string;
        url: string;
    }
    desc: string[]
    feature_specific: {
        expertise_options: {
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
    }
    prerequsites: []
    reference?: string
    level: number;
    url: string;

}
type StatProps = {
    index: string;
    value: number;
}
export interface AttributesProps {
    str: StatProps;
    dex: StatProps;
    con: StatProps;
    int: StatProps;
    wis: StatProps;
    cha: StatProps;
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

    const [name, setName] = useState<string>("")
    const [title, setTitle] = useState<string>("")
    const [imageURL, setImageURL] = useState<string>()
    const [imageFile, setImageFile] = useState(null);

    //Segunda parte - Raças
    const [race, setRace] = useState<RaceProps>()
    const [subrace, setSubrace] = useState<SubRaceProps>()
    const [raceList, setRaceList] = useState<RaceListProps[]>()
    const [raceData, setRaceData] = useState<RaceProps[]>()
    const [subRace, setSubRace] = useState<SubRaceProps[]>()
    const [traits, setTraits] = useState<TraitDataProps[]>([])
    const [specificTrait, setSpecificTrait] = useState([])
    const [subTrait, setSubTrait] = useState<SubTraitProps[]>([])
    // const [subTraitSpecificOptions, setSubTraitSpecificOptions] = useState<string>("")
    // const [specificOptions, setSpecificOptions] = useState<string>("")
    // const [toolProficiency, setToolProficiency] = useState<string>("")
    const [elvySkillOptions, setElvySkillOptions] = useState<string[]>([])
    // const [extraLanguage, setExtraLanguage] = useState<string>("")
    const [extraAbility, setExtraAbility] = useState<ExtraAbilityProps[]>([])
    //verificar oq precisa escolher pra cada raça
    // console.log(race)

    //Terceira Parte - classes
    const [classe, setClasse] = useState<string>()
    const [classList, setClassList] = useState<ClassesProps[] | null>([])
    const [classLevels, setClassLevels] = useState<LevelProps[] | null>([])
    const [proficiencies, setProficiencies] = useState([])
    const [classChoices, setClassChoices] = useState<{ [key: number]: string[] }>({})
    const [levelFeatures, setLevelFeatures] = useState<FeatureLevelProps[]>([])
    //verificar oq precisa escolher pra cada classe

    //Quarta parte - atributos
    const [str, setStr] = useState<number>(0)
    const [dex, setDex] = useState<number>(0)
    const [con, setCon] = useState<number>(0)
    const [int, setInt] = useState<number>(0)
    const [wis, setWis] = useState<number>(0)
    const [cha, setCha] = useState<number>(0)

    const [attributes, setAttributes] = useState<AttributesProps>()
    // const [raceSelected, setRaceSelected] = useState<RaceProps>()
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
    function handleName(value: string) {
        setName(value)
    }
    function handleTitle(value: string) {
        setTitle(value)
    }

    function handleStepOne() {
        console.log(name, title, imageFile)
        fetchRacesData()
        setStepOneVisible(false)
        setStepTwoVisible(true)

    }

    //Segunda parte
    function handleStepTwo() {
        fetchClassesData()
        setStepTwoVisible(false)
        setStepThreeVisible(true)

    }
    function handleELvySkill(value) {
        setElvySkillOptions(value);
    };

    function handleSetExtraAbility(value) {
        setExtraAbility(value);
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
    function handleRace(value: RaceProps) {
        setRace(value)
        console.log("Essa é a raça: ", race)
    }
    function handleSubRace(value: SubRaceProps) {
        setSubrace(value)
        console.log("Essa é a subRaça: ", subrace)
    }


    //Terceira parte
    function handleStepThree() {
        setStepThreeVisible(false)
        setStepFourVisible(true)
        // const raceSelected = raceData.filter((index) => index.raceData.index === race)
        // setRaceSelected(raceSelected)
        // console.log("Raça selecionada", raceSelected)
    }

    async function fetchClassesData() {
        setLoading(true)
        const allClassesData = []
        const allClassLevels = []
        const allProficiencies = []
        const allLevelsFeatures = []

        try {
            const response = await apiClientExternal.get('/api/classes')
            const classesData = response.data

            if (classesData && classesData.results) {
                const classPromises = classesData.results.flatMap(async (classe) => {
                    const classResponse = await apiClientExternal.get(classe.url)
                    const classData = classResponse.data

                    // console.log("ClassData: ", classData)

                    allClassesData.push(classData)

                    const levelsData = await apiClientExternal.get(classData.class_levels)
                    const levelResponse = levelsData.data
                    // console.log("Level response:", levelResponse)
                    // console.log("Features length: ", levelResponse.features)

                    allClassLevels.push(...levelResponse)
                    if (levelResponse) {
                        const featurePromises = levelResponse.flatMap(features => {
                            features.features.map(async feat => {
                                const levelsFeature = await apiClientExternal.get(feat.url)
                                const featuresData = levelsFeature.data
                                allLevelsFeatures.push(featuresData)
                            })
                        })
                        await Promise.all(featurePromises);
                    }

                    // if (levelResponse.features && levelResponse.features.length >= 1) {
                    //     const featurePromises = levelResponse.features.map(async (feat) => {
                    //         const levelsFeatures = await apiClientExternal.get(feat.url)
                    //         const featuresData = levelsFeatures.data
                    //         allLevelsFeatures.push(...featuresData)
                    //     })
                    //     await Promise.all(featurePromises);
                    // }

                })
                await Promise.all(classPromises);
            }
            const fetchProficiencies = await apiClientExternal.get('/api/proficiencies')
            const proficienciesData = fetchProficiencies.data

            if (proficienciesData && proficienciesData.results) {
                const proficiencyPromises = proficienciesData.results.map(async (proficiency) => {
                    const proficiencyResponse = await apiClientExternal.get(proficiency.url)
                    return proficiencyResponse.data
                })
                const proficiencies = await Promise.all(proficiencyPromises)
                allProficiencies.push(...proficiencies)
            }

        } catch (err) {
            console.log("Erro ao buscar dados das classes.", err)

        } finally {
            setLoading(false)
        }
        setClassList(allClassesData)
        setClassLevels(allClassLevels)
        setProficiencies(allProficiencies)
        setLevelFeatures(allLevelsFeatures)


        console.log("Dados das classes:", allClassesData)
        console.log("Dados dos Níveis das classes:", allClassLevels)
        console.log("Dados das proficiencias:", allProficiencies)
        console.log("Dados das features dos níveis:", allLevelsFeatures)
    }
    function handleProfChoices(value) {
        setClassChoices(value)
    }
    function handleClasse(value) {
        setClasse(value)
    }


    //Quarta parte    
    function handleStepFour() {


    }
    function handleAttributes(value: AttributesProps) {
        console.log("Chamando função dos atributos")
        setAttributes(value)
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
            {loading && (
                <div>
                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={loading}
                        onClick={() => setLoading(false)}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>

                </div>)}

            {/* //fase do nome, titulo e imagem */}

            <div className={styles.formContainer}>
                <div>
                    <Resumo
                        name={name}
                        image={imageURL}
                        title={title}
                        race={race}
                        subrace={subrace}
                        classe={classe}
                        attributes={attributes}
                    />

                </div>
                <form action="" onSubmit={handleFinalStep}>
                    {stepOneVisible && (
                        <>
                            <PrimeiraEtapa
                                handleFile={handleFile}
                                handleName={handleName}
                                handleTitle={handleTitle}
                                name={name}
                                title={title}
                                imageURL={imageURL}
                            />
                            <div className={styles.formButton}>
                                <Button type='button' onClick={handleStepOne}>Próximo</Button>
                            </div>
                        </>
                    )}
                    {
                        //fase da raça
                    }
                    {stepTwoVisible && (
                        <>
                            <SegundaEtapa
                                raceList={raceList}
                                raceData={raceData}
                                subRace={subRace}
                                traits={traits}
                                specificTrait={specificTrait}
                                subTrait={subTrait}
                                elvySkills={elvySkillOptions}
                                handleELvySkills={handleELvySkill}
                                extraAbilitySet={handleSetExtraAbility}
                                handleRace={handleRace}
                                handleSubRace={handleSubRace}
                            />
                            <div className={styles.formButton}>
                                <Button type='button' onClick={() => {
                                    setStepOneVisible(true)
                                    setStepTwoVisible(false)
                                }}>Voltar</Button>
                                <Button type='button' onClick={handleStepTwo}>Próximo</Button>
                            </div>
                        </>
                    )}
                    {//Fase da classe
                    }
                    {stepThreeVisible && (
                        <>
                            <TerceiraEtapa
                                classData={classList}
                                levelsData={classLevels}
                                proficiencies={proficiencies}
                                handleChoices={handleProfChoices}
                                levelsFeatures={levelFeatures}
                                handleClasse={handleClasse}
                            />
                            <div className={styles.formButton}>
                                <Button type='button' onClick={() => {
                                    setStepTwoVisible(true)
                                    setStepThreeVisible(false)
                                }}>Voltar</Button>
                                <Button type='button' onClick={handleStepThree}>Próximo</Button>
                            </div>
                        </>
                    )}
                    {/* fase dos atributos */}
                    {stepFourVisible && (
                        <>
                            <QuartaEtapa
                                forca={str}
                                destreza={dex}
                                constituicao={con}
                                inteligencia={int}
                                sabedoria={wis}
                                carisma={cha}
                                race={race}
                                subRace={subrace}
                                handleAttributes={handleAttributes}

                            />
                            <div className={styles.formButton}>
                                <Button type='button' onClick={() => {
                                    setStepThreeVisible(true)
                                    setStepFourVisible(false)
                                }}>Voltar</Button>
                                <Button type='button' onClick={() => {
                                    setStepFourVisible(false)
                                    setStepFiveVisible(true)
                                }}>Próximo</Button>
                            </div>
                        </>
                    )}
                    {stepFiveVisible && (
                        <>
                            <QuintaEtapa

                            />
                            <div className={styles.formButton}>
                                <Button type='button' onClick={() => {
                                    setStepFourVisible(true)
                                    setStepFiveVisible(false)
                                }}>Voltar</Button>
                                <Button type='button' onClick={() => {
                                    setStepFiveVisible(false)
                                    setStepSixVisible(true)
                                }}>Próximo</Button>
                            </div>
                        </>
                    )}
                    {stepSixVisible && (
                        <div>
                            <div className={styles.formButton}>
                                <Button type='button' onClick={() => {
                                    setStepFiveVisible(true)
                                    setStepSixVisible(false)
                                }}>Voltar</Button>
                                <Button type='button' onClick={() => {
                                    setStepSixVisible(false)
                                    setStepFinalVisible(true)
                                }}>Próximo</Button>
                            </div>
                        </div>
                    )}
                    {stepFinalVisible && (
                        <div>
                            <div className={styles.formButton}>
                                <Button onClick={() => {
                                    setStepSixVisible(true)
                                    setStepFinalVisible(false)
                                }}>Voltar</Button>
                                <Button type="submit" title='Confirmar criação'>Confirmar Criação</Button>
                            </div>
                        </div>
                    )}
                </form>
            </div>

        </div>
    )
}