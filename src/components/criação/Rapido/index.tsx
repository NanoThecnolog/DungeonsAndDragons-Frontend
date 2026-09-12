import { useState, FormEvent, ChangeEvent, useEffect } from 'react'
import styles from './styles.module.scss'
import { FiUpload } from 'react-icons/fi'
import { Button } from '@/components/ui/Button'
import { setupAPIClient } from '@/services/api'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { CharProps, DataProps } from '@/types/new_char'
import { ClassDataProps } from '@/types/char'

interface QuickProps {
    racesList: DataProps[];
    classList: DataProps[];
    userId: string;
}

export default function QuickCreate({ racesList, classList, userId }: QuickProps) {
    const router = useRouter();
    const [imageUrl, setImageUrl] = useState<string>()
    const [name, setName] = useState<string>("")
    const [raceSelected, setRaceSelected] = useState<string>("")
    // const [classSelected, setClassSelected] = useState<string>("dragonborn")
    const [classIndex, setClassIndex] = useState<string>("")
    const [classLevel, setClassLevel] = useState('1')
    const [imageFile, setImageFile] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        console.log(name)

    }, [name])

    async function handleCreateChar(event: FormEvent) {
        event.preventDefault();
        setLoading(true)
        try {
            if (name === '' || imageFile === null || classIndex === '' || raceSelected === '') {
                toast.error("Preencha todos os campos!")
                return;
            }
            // setClassSelected(classRef.current.value)

            const classLength = classList.findIndex(cls => cls.index === classIndex);
            const raceLength = racesList.findIndex(cls => cls.index === raceSelected);
            const charClasses = [
                {
                    index: classIndex,
                    level: classLevel,
                    name: classList[classLength].name
                }
            ]

            const formData = new FormData();
            formData.append('name', name);
            formData.append('char_class', JSON.stringify(charClasses))
            formData.append('race', racesList[raceLength].index)
            formData.append('image', imageFile)
            formData.append('userId', userId)

            const apiClient = setupAPIClient();
            await apiClient.post('/char', formData);

            toast.success('Personagem criado!')
            router.push('/dashboard')
        } catch (err) {
            console.log(err)
            toast.error("Erro ao criar o personagem.")
        } finally {
            setLoading(false)
        }
    }

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
            setImageUrl(URL.createObjectURL(e.target.files[0]))
        }
    }

    function handleChangeClass(event) {
        // setClassSelected(event.target.value)
        setClassIndex(event.target.value)
        console.log(event.target.value)
    }

    function handleChangeRace(event) {
        setRaceSelected(event.target.value)
        console.log(event.target.value)
    }

    return (
        <main className={styles.container}>
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

                <span>Raças</span>
                <select value={raceSelected} title="races" onChange={handleChangeRace}>
                    <option value="">Selecione uma Raça</option>
                    {racesList.map((item) =>
                    (
                        <option key={item.index} value={item.index}>
                            {item.name}
                        </option>
                    )
                    )}
                </select>
                <span>Classes</span>
                <select value={classIndex} title="classes" onChange={handleChangeClass}>
                    <option value="">Selecione uma Classe</option>
                    {classList.map((item, index) =>
                    (
                        <option key={index} value={item.index}>
                            {item.name}
                        </option>
                    )
                    )}
                </select>

                <div className={styles.buttonContainer}>
                    <Button type="submit" title="Criar Personagem" loading={loading}>Criar Personagem</Button>
                </div>
            </form>
        </main>
    )
}