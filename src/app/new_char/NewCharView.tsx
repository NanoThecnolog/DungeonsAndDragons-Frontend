"use client";
import { useState, useContext, useEffect } from "react"
import { AuthContext } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/Button"
import { useRouter } from "next/navigation"
import { Header } from "@/components/Header"
import { setupAPIClientExternal } from "@/services/apiD&D/apiExternal"
import styles from './styles.module.scss'
import QuickCreate from "@/components/criação/Rapido"
import StandardCreate from "@/components/criação/Padrão"
import type { ClassRaceProps, CharProps } from "@/types/new_char"


export default function NewCharView({ classes, races }: CharProps) {
    const [optionVisible, setOptionVisible] = useState(true);
    const [currentComponent, setCurrentComponent] = useState<string | null>(null)
    const router = useRouter()
    const [name, setName] = useState('')
    const [classList, setClassList] = useState<ClassRaceProps["results"]>(classes.results || [])
    const [racesList, setRacesList] = useState<ClassRaceProps["results"]>(races.results || [])
    const [classSelected, setClassSelected] = useState("barbarian")
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
    }, [user])

    useEffect(() => {
        if (currentComponent) {
            setOptionVisible(false);
        }
    }, [currentComponent]);
    function renderComponent() {
        if (currentComponent === "A") {

            return <QuickCreate
                userId={userId}
                racesList={racesList}
                classList={classList}
            />

        } else if (currentComponent === "B") {

            return <StandardCreate />
        } else if (currentComponent === null) {
            return
        }
    }

    return (
        <>
            <Header />
            {optionVisible && (
                <div>
                    <main className={styles.container}>
                        <div className={styles.cardContainerQuickly} onClick={() => setCurrentComponent("A")}>
                            <div className={styles.cardContainer}>
                                <h2>Rapida</h2>
                                <div className={styles.cardDesc}>
                                    <p>Escolha uma raça e a classe pra criar rapidamente um personagem</p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.cardContainerStandard} onClick={() => setCurrentComponent("B")}>
                            <div className={styles.cardContainer}>
                                <h2>Padrão</h2>
                                <div className={styles.cardDesc}>
                                    <p>Crie seu personagem <br></br>passo a passo</p>
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