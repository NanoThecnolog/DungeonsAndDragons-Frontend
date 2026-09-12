import { useState, ChangeEvent } from 'react'
import { FiUpload } from 'react-icons/fi'
import { Button } from '@/components/ui/Button'
import styles from './styles.module.scss'
import Image from 'next/image'

interface FirstProps {
    name: string;
    title: string;
    imageURL: string;
    handleFile: (e: ChangeEvent<HTMLInputElement>) => void
    handleName: (value: string) => void
    handleTitle: (value: string) => void
}


export default function PrimeiraEtapa({ name, title, imageURL, handleFile, handleName, handleTitle }: FirstProps) {

    function setName(e: ChangeEvent<HTMLInputElement>) {

        handleName(e.target.value)
    }
    function setTitle(e: ChangeEvent<HTMLInputElement>) {

        handleTitle(e.target.value)
    }

    return (
        <div className={styles.form}>
            <div className={styles.formItem}>
                <span>Imagem</span>
                <label className={styles.labelImage}>
                    <span>
                        <FiUpload size={30} color="#fff" />
                    </span>
                    <input title="image" type="file" accept="image/png, image/jpeg, image/jpg" onChange={handleFile} />
                    {imageURL && (
                        <Image
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
                    onChange={(e) => setName(e)}
                />
            </div>
            <div className={styles.formItem}>
                <span>Seu personagem tem Título?</span>
                <input type="text"
                    placeholder="Digite aqui..."
                    className={styles.input}
                    value={title}
                    onChange={(e) => setTitle(e)}
                />
            </div>
        </div>
    )
}