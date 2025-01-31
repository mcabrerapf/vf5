import React from 'react';
import './Character.scss'
import { useMainContext } from '../../Contexts/MainContext';
import MoveList from '../MoveList';
import Button from '../Button';
import { CHARACTERS } from '../../constants';

const Character = () => {
    const { setSelectedCharacter, selectedCharacter } = useMainContext();
    const [, characterName] = CHARACTERS.find(options => options[0] === selectedCharacter);

    const onClick = (e) => {
        e.preventDefault();
        setSelectedCharacter();
    }

    return (
        <div className='character'>
            <header className='character__header'>
                <Button
                    onClick={onClick}
                    text={'<'}
                />
                <div className='character__header__name'>
                    {characterName}
                </div>
            </header>
            <MoveList />
        </div>
    )
}

export default Character;