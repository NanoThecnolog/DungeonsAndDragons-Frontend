import styles from './styles.module.scss'
import { FaTrash } from 'react-icons/fa'
import { setupAPIClient } from '@/services/api';
import { toast } from 'react-toastify';
// import SweetAlert2 from 'react-sweetalert2';
import Swal, { SweetAlertResult } from 'sweetalert2'
import { useState } from 'react';

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
}
export default function Card({ id, name, title, race, char_class, image, onDelete }: CharProps) {

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
                console.log('negativa')
            }
        });
    }

    return (
        <>
            <div className={styles.containerCard} style={{ backgroundImage: `url(http://localhost:3333/files/${image})` }}>
                <div className={styles.blur}>
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
                    <button type='button' title="excluir personagem" onClick={() => handleDeleteChar(id)}>
                        <FaTrash size={20} />
                    </button>


                </div>
            </div>
        </>
    )
}