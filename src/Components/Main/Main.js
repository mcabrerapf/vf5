import React from 'react';
import './Main.scss'
// import CharacterList from '../CharacterList';
// import { useMainContext } from '../../Contexts/MainContext';
import Character from '../Character';

const Main = () => {

    return (
        <div className='main'>
            {/* {!selectedCharacter && <CharacterList />} */}
            <Character />
        </div>
    )
}

export default Main;