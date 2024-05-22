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
    image: string | null;
}
export default function Card({ name, title, race, char_class, image }: CharProps) {
    return (
        <>
            <div className={styles.containerCard} style={{ backgroundImage: `url(${image})` }}>
                <div>
                    <h3 className={styles.textName}>{name}</h3>
                    {title && (
                        <p>{title}</p>
                    )}
                </div>
                {char_class.map(item => (
                    <div key={item.id} className={styles.class}>
                        <p>{item.name}</p>
                        <p>{item.level}</p>
                    </div>
                ))}
                <button type='button' title="excluir personagem">
                    <FaTrash size={20} />
                </button>
            </div>
        </>
    )
}