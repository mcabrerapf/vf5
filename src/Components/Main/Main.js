import React from 'react';
import './Main.scss'
import Character from '../Character';
import { useMainContext } from '../../Contexts/MainContext';
import { CHARACTERS } from '../../constants';

const Main = () => {
    const { selectedCharacter } = useMainContext();
    document.title = CHARACTERS.find(char => char.id === selectedCharacter).name;
    return (
        <div className='main'>
            <Character />
        </div>
    )
}

export default Main;