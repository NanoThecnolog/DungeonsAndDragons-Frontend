import React, { useState, useEffect } from 'react';
import Die from '../Dado';
import styles from './styles.module.scss';

type DiceType = 4 | 6 | 8 | 10 | 12 | 20 | 100;

function rollDie(type: DiceType): number {
    if (type === 100) {
        return Math.floor(Math.random() * 10 + 1) * 10;
    }
    return Math.ceil(Math.random() * type);
}

export default function DiceRoller() {
    const [rolls, setRolls] = useState<{ type: DiceType, roll: number }[]>([]);
    const [modifier, setModifier] = useState<number>(0);

    const liveDie = (type: DiceType, duration: number = 3000) => {
        let lastRoll = 0;
        let roll = rollDie(type);
        const newDie = { type, roll };
        setRolls((prevRolls) => [...prevRolls, newDie]);

        for (let i = 10; i < duration; i *= 1.4) {
            setTimeout(() => {
                roll = rollDie(type);
                while (roll === lastRoll) {
                    roll = rollDie(type);
                }
                lastRoll = roll;
                setRolls((prevRolls) =>
                    prevRolls.map((die, index) =>
                        index === prevRolls.length - 1 ? { ...die, roll } : die
                    )
                );
            }, i);
        }
    };

    const handleDieButtonClick = (type: DiceType) => {
        liveDie(type, 1200);
    };

    const getRollSum = () => {
        return rolls.reduce((sum, die) => sum + die.roll, 0);
    };

    const renderRollSum = () => {
        const total = getRollSum();
        return modifier > 0 ? total + modifier : total;
    };

    return (
        <div className={styles.container}>
            <div className={styles.rolls}>
                {rolls.map((die, index) => (
                    <Die key={index} type={die.type} roll={die.roll} />
                ))}
            </div>
            <div className={styles.results}>
                <div className="sum">Resultado: {getRollSum()}</div>
                <div className="withModifier">
                    Resultado com modificador: + {renderRollSum()}
                </div>
            </div>
            <div className={styles.controls}>
                <div className={styles.tipoDado}>
                    <button onClick={() => handleDieButtonClick(4)}>D4</button>
                    <button onClick={() => handleDieButtonClick(6)}>D6</button>
                    <button onClick={() => handleDieButtonClick(8)}>D8</button>
                    <button onClick={() => handleDieButtonClick(10)}>D10</button>
                    <button onClick={() => handleDieButtonClick(12)}>D12</button>
                    <button onClick={() => handleDieButtonClick(20)}>D20</button>
                    <button onClick={() => handleDieButtonClick(100)}>D100</button>
                    <button onClick={() => setRolls([])}>Limpar</button>
                </div>
                <div className={styles.modificadores}>
                    <button onClick={() => setModifier(0)}>0</button>
                    <button onClick={() => setModifier(1)}>+1</button>
                    <button onClick={() => setModifier(2)}>+2</button>
                    <button onClick={() => setModifier(3)}>+3</button>
                    <button onClick={() => setModifier(4)}>+4</button>
                    <button onClick={() => setModifier(5)}>+5</button>
                    <button onClick={() => setModifier(6)}>+6</button>
                    <button onClick={() => setModifier(7)}>+7</button>
                    <button onClick={() => setModifier(8)}>+8</button>
                    <button onClick={() => setModifier(9)}>+9</button>
                    <button onClick={() => setModifier(10)}>+10</button>
                </div>
                <div className={styles.modificadores}>
                    <button onClick={() => setModifier(11)}>+11</button>
                    <button onClick={() => setModifier(12)}>+12</button>
                    <button onClick={() => setModifier(13)}>+13</button>
                    <button onClick={() => setModifier(14)}>+14</button>
                    <button onClick={() => setModifier(15)}>+15</button>
                    <button onClick={() => setModifier(16)}>+16</button>
                    <button onClick={() => setModifier(17)}>+17</button>
                    <button onClick={() => setModifier(18)}>+18</button>
                    <button onClick={() => setModifier(19)}>+19</button>
                    <button onClick={() => setModifier(20)}>+20</button>
                </div>
            </div>
        </div>
    );
}
