import { useState } from "react"
import Head from "next/head"
import { Header } from "@/components/Header"
import { canSSRAuth } from "@/utils/canSSRAuth"
import Link from "next/link"
import MySelect from "@/components/Select"
import { Button } from "@/components/ui/Button"


import { setupAPIClientExternal } from "@/services/apiD&D/apiExternal"

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

    const [classList, setClassList] = useState(classes.results || [])
    const [racesList, setRacesList] = useState(races.results || [])

    return (
        <>
            <Head>
                <title>Novo Personagem - D&D</title>
            </Head>

            <div>
                <Header />
                <main className={styles.container}>
                    <h1>Novo Personagem</h1>
                    <form className={styles.form}>
                        <input
                            type="text"
                            placeholder="Nome do Personagem"
                            className={styles.input}
                        />
                        <MySelect dataOptions={classList} />
                        <MySelect dataOptions={racesList} />

                        <div className={styles.buttonContainer}>
                            <Button type="submit" title="Criar Personagem" loading={false}>Criar Personagem</Button>
                            <Link href="/dashboard" ><Button title="Dashboard" loading={false}>Início</Button></Link>
                        </div>




                    </form>
                </main>
            </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

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