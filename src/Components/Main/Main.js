import React from 'react';
import './Main.scss'
import CharacterList from '../CharacterList';
import { useMainContext } from '../../Contexts/MainContext';
import Character from '../Character';

const Main = () => {
    const { selectedCharacter } = useMainContext();
    
    return (
        <div className='main'>
            {!selectedCharacter && <CharacterList />}
            {selectedCharacter && <Character />}
        </div>
    )
}

export default Main;