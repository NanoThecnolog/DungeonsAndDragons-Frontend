import styles from './styles.module.scss'
import { FaTrash } from 'react-icons/fa'

type ClassProps = {
    level: string;
    name: string;
    id: string;
}

interface CharProps {
    name: string;
    title: string | null;
    race: string;
    char_class: ClassProps[];
}
export default function Card({ name, title, race, char_class }: CharProps) {
    return (
        <>
            <div className={styles.containerCard}>
                <h3 className={styles.textName}>{name}</h3>
                <p>{title}</p>
                {char_class.map(item => (
                    <div key={item.id}>
                        <p>{item.name}</p>
                        <p>{item.level}</p>
                    </div>
                ))}
                <button title="excluir personagem">
                    <FaTrash size={20} />
                </button>
            </div>
        </>
    )
}