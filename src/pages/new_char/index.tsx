import { useState, useContext, ChangeEvent, FormEvent, useEffect, useRef } from "react"
import { AuthContext } from "@/contexts/AuthContext"
import Head from "next/head"
import { canSSRAuth } from "@/utils/canSSRAuth"
import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { FiUpload } from "react-icons/fi"
import { useRouter } from "next/router"
import { Header } from "@/components/Header"
import { toast } from "react-toastify"
import { setupAPIClientExternal } from "@/services/apiD&D/apiExternal"
import { setupAPIClient } from "@/services/api"
import styles from './styles.module.scss'
import QuickCreate from "@/components/criação/Rapido"
import StandardCreate from "@/components/criação/Padrão"


export type DataProps = {
    index: string;
    name: string;
    url: string;
}
export type ClassRaceProps = {
    results: DataProps[];
}
export interface CharProps {
    classes: ClassRaceProps;
    races: ClassRaceProps;
}

export default function New_Char({ classes, races }: CharProps) {
    const [optionVisible, setOptionVisible] = useState(true);
    const [currentComponent, setCurrentComponent] = useState<string | null>(null)
    const router = useRouter()
    const [name, setName] = useState('')
    const [classList, setClassList] = useState(classes.results || [])
    const [racesList, setRacesList] = useState(races.results || [])
    const [classSelected, setClassSelected] = useState("barbarian")
    // console.log(classSelected)
    const [classLevel, setClassLevel] = useState('1')
    const [classIndex, setClassIndex] = useState("barbarian")
    const [raceSelected, setRaceSelected] = useState("dragonborn")
    const [imageUrl, setImageUrl] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const { user } = useContext(AuthContext);
    const [userId, setUserId] = useState<string>()

    useEffect(() => {
        if (!user) {
            router.push('/dashboard')
        } else {
            setUserId(user.id)
        }
    }, [user, router])


    // useEffect(() => {
    //     renderComponent();
    // }, [])

    // const classRef = useRef<HTMLSelectElement>(null)

    // function handleFile(e: ChangeEvent<HTMLInputElement>) {
    //     if (!e.target.files) {
    //         return;
    //     }
    //     const image = e.target.files[0];
    //     // console.log(image)
    //     if (!image) {
    //         return;
    //     }
    //     if (image.type === 'image/jpeg' || image.type === 'image/png' || image.type === 'image/jpg') {
    //         setImageFile(image);
    //         setImageUrl(URL.createObjectURL(e.target.files[0]))
    //     }
    // }

    // function handleChangeClass(event) {
    //     // setClassSelected(event.target.value)
    //     // console.log(event.target.value)
    //     setClassIndex(event.target.value)
    //     setClassSelected(classRef.current?.value)
    // }

    // function handleChangeRace(event) {
    //     setRaceSelected(event.target.value)
    //     console.log(event.target.value)
    // }

    // async function handleCreateChar(event: FormEvent) {
    //     event.preventDefault();
    //     try {
    //         if (name === '' || imageFile === null) {
    //             toast.error("Preencha todos os campos!")
    //             return;
    //         }
    //         // setClassSelected(classRef.current.value)

    //         const classLength = classList.findIndex(cls => cls.index === classSelected);
    //         const raceLength = racesList.findIndex(cls => cls.index === raceSelected);
    //         const charClasses = [{ index: classIndex, level: classLevel, name: classList[classLength].name }]

    //         const formData = new FormData();
    //         formData.append('name', name);
    //         formData.append('char_class', JSON.stringify(charClasses))
    //         formData.append('race', racesList[raceLength].index)
    //         formData.append('image', imageFile)
    //         formData.append('userId', userId)

    //         const apiClient = setupAPIClient();
    //         await apiClient.post('/char', formData);

    //         toast.success('Personagem criado!')
    //         Router.push('/dashboard')
    //     } catch (err) {
    //         console.log(err)
    //         toast.error("Erro ao criar o personagem.")
    //     }
    // }


    useEffect(() => {
        if (currentComponent) {
            setOptionVisible(false);
        }
    }, [currentComponent]);
    function renderComponent() {
        if (currentComponent === "A") {

            console.log("renderizando quick")
            return <QuickCreate
                userId={userId}
                racesList={racesList}
                classList={classList}
            />

        } else if (currentComponent === "B") {

            console.log("renderizando Standard")
            return <StandardCreate />
        } else if (currentComponent === null) {
            console.log("renderizando nada")
            return
        }
    }



    return (
        <>
            <Head>
                <title>Novo Personagem - D&D</title>
            </Head>
            <Header />
            {optionVisible && (
                <div>
                    <main className={styles.container}>
                        <div className={styles.cardContainerQuickly} onClick={() => setCurrentComponent("A")}>
                            <div className={styles.cardContainer}>
                                <h2>Rapida</h2>
                                <div className={styles.cardDesc}>
                                    <p>Escolha uma raça e a classe pra criar rapidamente um personagem.</p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.cardContainerStandard} onClick={() => setCurrentComponent("B")}>
                            <div className={styles.cardContainer}>
                                <h2>Padrão</h2>
                                <div className={styles.cardDesc}>
                                    <p>Crie seu personagem <br></br>passo-a-passo.</p>
                                </div>
                            </div>
                        </div>

                    </main>
                </div>
            )}
            <main className={styles.container}>
                {renderComponent()}
            </main>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    //alterar a requisição da api externa para o lado do cliente?
    const apiClientExternal = setupAPIClientExternal();
    const responseClasses = await apiClientExternal.get("/api/classes")
    const responseRaces = await apiClientExternal.get("/api/races")

    return {
        props: {
            classes: responseClasses.data,
            races: responseRaces.data
        }
    }
})