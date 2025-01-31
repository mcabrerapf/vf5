import React, { useState } from 'react';
import './MoveList.scss'
import { useMainContext } from '../../Contexts/MainContext';
import Move from '../Move';
import Button from '../Button';

const MoveList = () => {
    const [selectedMoveType, setSelectedMoveType] = useState('Normal')
    const { characters, selectedCharacter } = useMainContext();
    const selectedMoveset = characters[selectedCharacter][selectedMoveType];
    const moveKeys = Object.keys(characters[selectedCharacter])

    const handleMoveTypeClick = (e) => {
        const { value } = e.target;
        setSelectedMoveType(value)
    }

    return (
        <div className='move-list'>
            <div className='move-list__header'>
                {moveKeys.map(moveKey =>
                    <Button
                        modifier={selectedMoveType === moveKey ? 'active' : null}
                        text={moveKey === 'allMoves' ? 'All Moves' : moveKey}
                        value={moveKey}
                        onClick={handleMoveTypeClick}
                    />)}
            </div>
            <div className='move-list__list-container'>
                <ul className='move-list__list-container__list'>
                    {selectedMoveset.map(move => {
                        return (
                            <li className='move-list__list-container__list__item'>
                                <Move
                                    move={move}
                                    hideType={selectedMoveType !== 'allMoves'} />
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default MoveList;