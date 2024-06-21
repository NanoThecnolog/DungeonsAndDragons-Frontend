import { useState, useContext, ChangeEvent, FormEvent } from "react"
import { AuthContext } from "@/contexts/AuthContext"
import Head from "next/head"
import { canSSRAuth } from "@/utils/canSSRAuth"
import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { FiUpload } from "react-icons/fi"
import Router from "next/router"
import { Header } from "@/components/Header"
import { toast } from "react-toastify"
import { setupAPIClientExternal } from "@/services/apiD&D/apiExternal"
import { setupAPIClient } from "@/services/api"
import styles from './styles.module.scss'

type DataProps = {
    index: string;
    name: string;
    url: string;
}
type ClassRaceProps = {
    results: DataProps[];
}
interface CharProps {
    classes: ClassRaceProps;
    races: ClassRaceProps;
}

export default function New_Char({ classes, races }: CharProps) {
    const [name, setName] = useState('')
    const [classList, setClassList] = useState(classes.results || [])
    const [racesList, setRacesList] = useState(races.results || [])
    const [classSelected, setClassSelected] = useState("Bárbaro")
    const [classLevel, setClassLevel] = useState('1')
    const [classIndex, setClassIndex] = useState<string>()
    const [raceSelected, setRaceSelected] = useState("Dragonborn")
    const [imageUrl, setImageUrl] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const { user } = useContext(AuthContext);
    const [userId, setUserId] = useState(user.id)

    function handleFile(e: ChangeEvent<HTMLInputElement>) {
        if (!e.target.files) {
            return;
        }
        const image = e.target.files[0];
        console.log(image)
        if (!image) {
            return;
        }
        if (image.type === 'image/jpeg' || image.type === 'image/png' || image.type === 'image/jpg') {
            setImageFile(image);
            setImageUrl(URL.createObjectURL(e.target.files[0]))
        }
    }

    function hadleChangeClass(event) {
        setClassSelected(event.target.value)
        console.log(event.target.value)
        setClassIndex(event.target.value)
    }

    function hadleChangeRace(event) {
        setRaceSelected(event.target.value)
        console.log(event.target.value)
    }

    async function handleCreateChar(event: FormEvent) {
        event.preventDefault();
        try {
            if (name === '' || imageFile === null) {
                toast.error("Preencha todos os campos!")
                return;
            }
            const classLength = classList.findIndex(cls => cls.index === classSelected);
            const raceLength = racesList.findIndex(cls => cls.index === raceSelected);
            const charClasses = [{ index: classIndex, level: classLevel, name: classList[classLength].name }]

            const formData = new FormData();
            formData.append('name', name);
            formData.append('char_class', JSON.stringify(charClasses))
            formData.append('race', racesList[raceLength].index)
            formData.append('image', imageFile)
            formData.append('userId', userId)

            const apiClient = setupAPIClient();
            await apiClient.post('/char', formData);

            toast.success('Personagem criado!')
            Router.push('/dashboard')
        } catch (err) {
            console.log(err)
            toast.error("Erro ao criar o personagem.")
        }
    }

    return (
        <>
            <Head>
                <title>Novo Personagem - D&D</title>
            </Head>
            <Header />
            <div>
                <main className={styles.container}>
                    <h1>Novo Personagem</h1>
                    <form className={styles.form} onSubmit={handleCreateChar}>
                        <span>Imagem</span>
                        <label className={styles.labelImage}>
                            <span>
                                <FiUpload size={30} color="#fff" />
                            </span>
                            <input title="image" type="file" accept="image/png, image/jpeg, image/jpg" onChange={handleFile} />
                            {imageUrl && (
                                <img
                                    className={styles.imagePreview}
                                    src={imageUrl}
                                    alt="Imagem do personagem"
                                    width={250}
                                    height={250}
                                />
                            )}
                        </label>
                        <span>Nome do Personagem</span>
                        <input
                            type="text"
                            placeholder="Digite aqui..."
                            className={styles.input}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <span>Classes</span>
                        <select value={classSelected} title="classes" onChange={hadleChangeClass}>
                            {classList.map((item, index) => {
                                return (
                                    <option key={index} value={item.index}>
                                        {item.name}
                                    </option>
                                )
                            })}
                        </select>
                        <span>Raças</span>
                        <select value={raceSelected} title="races" onChange={hadleChangeRace}>
                            {racesList.map((item) => {
                                return (
                                    <option key={item.index} value={item.index}>
                                        {item.name}
                                    </option>
                                )
                            })}
                        </select>
                        <div className={styles.buttonContainer}>
                            <Button type="submit" title="Criar Personagem" loading={false}>Criar Personagem</Button>
                        </div>
                    </form>
                </main>
            </div>
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