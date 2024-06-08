import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './styles.module.scss'
import { FaTrash } from 'react-icons/fa'
import { FaSpinner } from 'react-icons/fa';
import Link from 'next/link';
import Swal from 'sweetalert2'

type ClassProps = {
    level: string;
    name: string;
    id: string;
}

interface CharProps {
    id: string;
    name: string;
    title: string | null;
    race: string;
    char_class: ClassProps[];
    image: string | null;
    onDelete: (id: string) => Promise<void>;
    loading: boolean;
}
export default function Card({ id, name, title, race, char_class, image, onDelete, loading }: CharProps) {

    const [isLoading, setIsLoading] = useState(loading);

    const router = useRouter();

    function handleOnClick(id: string) {
        setIsLoading(true);

        router.push(`/char?id=${id}`)
        // setIsLoading(false);
    }

    async function handleDeleteChar(id: string) {

        Swal.fire({
            title: 'Cuidado!',
            text: 'Essa ação é irreversível, não tem Tony Stark pra salvar o dia.',
            icon: 'success',
            confirmButtonText: 'Apagar',
            showCancelButton: true,
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await onDelete(id);
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                console.log('Personagem não deletado.')
            }
        });
    }

    return (
        <>
            <div className={styles.containerCard} style={{ backgroundImage: `url(http://localhost:3333/files/${image})` }}>
                <div className={styles.blur}>
                    {isLoading && (
                        <div className={styles.loading}>
                            <FaSpinner size={25} />
                        </div>
                    )}
                    <div className={styles.cardLink} onClick={() => handleOnClick(id)}>
                        <div>
                            <h3 className={styles.textName}>{name}</h3>
                            {title && (
                                <p>{title}</p>
                            )}

                        </div>
                        <div>
                            {char_class.map(item => (
                                <div key={item.id} className={styles.class}>
                                    <p>{item.name}</p>
                                    <p>{item.level}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <button className={styles.lixeira} type='button' title="excluir personagem" onClick={() => handleDeleteChar(id)}>
                        <FaTrash size={20} />
                    </button>


                </div>
            </div>
        </>
    )
}