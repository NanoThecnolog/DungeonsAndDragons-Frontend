import { useContext } from 'react'

import styles from './styles.module.scss'
import Link from 'next/link'

import { FiLogOut } from 'react-icons/fi'

import { AuthContext } from '@/contexts/AuthContext'

export function Header() {

    const { signOut } = useContext(AuthContext)

    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href="/dashboard">
                    imagem da logo

                </Link>
                <nav className={styles.menuNav}>
                    <Link href="/dashboard" legacyBehavior>
                        <a>Início</a>
                    </Link>
                    <button type='submit' title="logout" onClick={signOut}>
                        <FiLogOut size={24} />
                    </button>
                </nav>


            </div>

        </header>
    )
}