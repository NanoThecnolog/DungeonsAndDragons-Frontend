import styles from './styles.module.scss'
import CheckBox from '../ui/CheckBox'
export default function Spells() {
    return (
        <>
            <main className={styles.container}>
                <article className={styles.dataContainer}>
                    <div className={styles.row}>
                        <div>nome, titulo, classe, nivel da classe</div>
                        <div>classe conjuradora</div>
                        <div>habilidade de conj</div>
                        <div>CD</div>
                        <div>Bonus de ataque magico</div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.magias}>
                            <div className={styles.row}>
                                <h4>truques</h4>
                                <CheckBox></CheckBox>
                                <CheckBox></CheckBox>
                                <CheckBox></CheckBox>
                                <CheckBox></CheckBox>

                            </div>
                        </div>
                        <div className={styles.magias}>
                            <div className={styles.row}>
                                Nível 1
                                <CheckBox></CheckBox>
                                <CheckBox></CheckBox>
                                <CheckBox></CheckBox>
                                <CheckBox></CheckBox>
                            </div>
                        </div>
                        <div className={styles.magias}>
                            <div className={styles.row}>
                                Nível 2
                                <CheckBox></CheckBox>
                                <CheckBox></CheckBox>
                                <CheckBox></CheckBox>
                                <CheckBox></CheckBox>
                            </div></div>
                        <div className={styles.magias}>
                            <div className={styles.row}>
                                Nível 3
                                <CheckBox></CheckBox>
                                <CheckBox></CheckBox>
                                <CheckBox></CheckBox>
                                <CheckBox></CheckBox>
                            </div></div>
                        <div className={styles.magias}>
                            <div className={styles.row}>
                                Nível 4
                                <CheckBox></CheckBox>
                                <CheckBox></CheckBox>
                                <CheckBox></CheckBox>
                                <CheckBox></CheckBox>
                            </div>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.magias}>
                            <div className={styles.row}>
                                Nível 5
                                <CheckBox></CheckBox>
                                <CheckBox></CheckBox>
                                <CheckBox></CheckBox>
                                <CheckBox></CheckBox>
                            </div>
                        </div>
                        <div className={styles.magias}>
                            <div className={styles.row}>
                                Nível 6
                                <CheckBox></CheckBox>
                                <CheckBox></CheckBox>
                                <CheckBox></CheckBox>
                                <CheckBox></CheckBox>
                            </div>
                        </div>
                        <div className={styles.magias}>
                            <div className={styles.row}>
                                Nível 7
                                <CheckBox></CheckBox>
                                <CheckBox></CheckBox>
                                <CheckBox></CheckBox>
                                <CheckBox></CheckBox>
                            </div>
                        </div>
                        <div className={styles.magias}>
                            <div className={styles.row}>
                                Nível 8
                                <CheckBox></CheckBox>
                                <CheckBox></CheckBox>
                                <CheckBox></CheckBox>
                                <CheckBox></CheckBox>
                            </div>
                        </div>
                        <div className={styles.magias}>
                            <div className={styles.row}>
                                Nível 9
                                <CheckBox></CheckBox>
                                <CheckBox></CheckBox>
                                <CheckBox></CheckBox>
                                <CheckBox></CheckBox>
                            </div>
                        </div>
                    </div>
                </article>
            </main>
        </>
    )
}