import React from 'react';
import { GiRollingDiceCup } from 'react-icons/gi'

interface DieProps {
    type: number;
    roll: number;
}

export default function Die({ type, roll }: DieProps) {
    return (
        <span className={`die die${type}`}>
            <GiRollingDiceCup size={60} />
            <span className="roll">{roll}</span>
        </span>
    );
}
//http://dnd.brianknappdeveloper.com/img/ui/icons/d4.png