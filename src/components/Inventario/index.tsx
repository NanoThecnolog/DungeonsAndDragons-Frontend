import styles from './styles.module.scss'
import { FaCirclePlus } from "react-icons/fa6";
import { FaCircleMinus } from "react-icons/fa6";

import Editar from '../ui/Config';

/**Criar uma função para criar itens com nome, descrição, valor monetario, peso em kg, quantidade, tipo de equipamento (arma, armadura, escudo, equipamento aleatório), tipo de equipamento:
 * se for arma => tipo de dano da arma (lista padrão ou outro, permitindo colocar o tipo customizado), propriedade da arma, atributo da arma, dado de dano, bonus de dano 
 * se for armadura => classe de armadura base, atributo da armadura pra escolher e o minimo
 * se for escudo => classe de armadura base, atributo do escudo pra escolher
 * se for item => tipo do equipamento, normal ou mágico
*/

export default function Bag() {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.dataContainer}>
                    <div className={styles.row}>
                        <div className={styles.peso}>
                            <div>
                                <h3>Bolsa</h3>
                            </div>
                            <div className={styles.capacity}>
                                Peso
                                <div>
                                    15kg / 25kg
                                </div>
                                <div className={styles.total}>
                                    {//colocar a variável de uso da capacidade de carga
                                    }
                                    <div className={styles.usage} style={{ width: "50%" }}>
                                        50%
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className={styles.moedas}>
                            <Editar />

                            <div className={styles.pecas}>
                                <h4>PC</h4>
                                <div className={styles.quant}>
                                    20
                                </div>
                            </div>
                            <div className={styles.pecas}>
                                <h4>PP</h4>
                                <div className={styles.quant}>
                                    14
                                </div>
                            </div>
                            <div className={styles.pecas}>
                                <h4>PE</h4>
                                <div className={styles.quant}>
                                    3
                                </div>
                            </div>
                            <div className={styles.pecas}>
                                <h4>PO</h4>
                                <div className={styles.quant}>
                                    0
                                </div>
                            </div>
                            <div className={styles.pecas}>
                                <h4>PL</h4>
                                <div className={styles.quant}>
                                    0
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.inventario}>
                            <div className={styles.listaItens}>
                                <div className={styles.item}>
                                    <h2>Nome do item</h2>
                                    <h2>Peso do item</h2>
                                    <h2>Quantidade</h2>
                                </div>
                                <hr />
                                <div className={styles.item}>
                                    <h3>nome do item</h3>
                                    <p>peso do item</p>
                                    <p>quantidade</p>
                                </div>
                                <hr />
                                <div className={styles.item}>
                                    <h3>nome do item</h3>
                                    <p>peso do item</p>
                                    <p>quantidade</p>
                                </div>
                                <hr />
                                <div className={styles.item}>
                                    <h3>nome do item</h3>
                                    <p>peso do item</p>
                                    <p>quantidade</p>
                                </div>
                                <hr />
                                <div className={styles.item}>
                                    <h3>nome do item</h3>
                                    <p>peso do item</p>
                                    <p>quantidade</p>
                                </div>
                                <hr />
                                <div className={styles.item}>
                                    <h3>nome do item</h3>
                                    <p>peso do item</p>
                                    <p>quantidade</p>
                                </div>
                                <hr />
                                <div className={styles.item}>
                                    <h3>nome do item</h3>
                                    <p>peso do item</p>
                                    <p>quantidade</p>
                                </div>
                                <hr />
                            </div>
                            <div className={styles.buttons}>
                                <button title='Adicionar item'>
                                    <FaCirclePlus size={40} />
                                </button>
                                <button title='Remover item'>
                                    <FaCircleMinus size={40} />
                                </button>
                            </div>
                            <div className={styles.equipados}>
                                <Editar />
                                <div className={styles.equip}>
                                    <div><h3>Mão Direita</h3></div>
                                    <div><p>Item equipado</p></div>
                                </div>
                                <hr />
                                <div className={styles.equip}>
                                    <div><h3>Mão Esquerda</h3></div>
                                    <div><p>Item equipado</p></div>
                                </div>
                                <hr />
                                <div className={styles.equip}>
                                    <div><h3>Munição</h3></div>
                                    <div><p>Item equipado</p></div>
                                </div>
                                <hr />
                                <div className={styles.equip}>
                                    <div><h3>Cabeça</h3></div>
                                    <div><p>Item equipado</p></div>
                                </div>
                                <hr />
                                <div className={styles.equip}>
                                    <div><h3>Peito</h3></div>
                                    <div><p>Item equipado</p></div>
                                </div>
                                <hr />
                                <div className={styles.equip}>
                                    <div><h3>Pés</h3></div>
                                    <div><p>Item equipado</p></div>
                                </div>
                                <hr />
                                <div className={styles.equip}>
                                    <div><h3>Mãos</h3></div>
                                    <div><p>Item equipado</p></div>
                                </div>
                                <hr />
                                <div className={styles.equip}>
                                    <div><h3>Colar</h3></div>
                                    <div><p>Item equipado</p></div>
                                </div>
                                <hr />
                                <div className={styles.equip}>
                                    <div><h3>Anéis</h3></div>
                                    <div><p>Item equipado</p></div>
                                </div>
                                <hr />
                                <div className={styles.equip}>
                                    <div><h3>Cinto</h3></div>
                                    <div><p>Item equipado</p></div>
                                </div>
                                <hr />
                                <div className={styles.equip}>
                                    <div><h3>Capa</h3></div>
                                    <div><p>Item equipado</p></div>
                                </div>
                                <hr />
                                <div className={styles.equip}>
                                    <div><h3>Mochila</h3></div>
                                    <div><p>Item equipado</p></div>
                                </div>
                                <hr />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}