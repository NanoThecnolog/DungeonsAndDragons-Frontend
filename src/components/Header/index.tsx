"use client";
import { useContext } from "react";
import { useTranslation } from "react-i18next";

import styles from './styles.module.scss'
import Link from 'next/link'

import { FiLogOut } from 'react-icons/fi'

import { AuthContext } from '@/contexts/AuthContext'
import LanguageSwitch from '@/components/ui/LanguageSwitch'

export function Header() {

    const { signOut } = useContext(AuthContext)
    const { t } = useTranslation()

    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href="/dashboard">
                    imagem da logo

                </Link>
                <nav className={styles.menuNav}>
                    <Link href="/dashboard">{t('nav.home')}</Link>
                    <LanguageSwitch />
                    <button type='submit' title="logout" onClick={signOut}>
                        <FiLogOut size={24} />
                    </button>
                </nav>


            </div>

        </header>
    )
}