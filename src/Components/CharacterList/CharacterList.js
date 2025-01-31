import React from 'react';
import './CharacterList.scss'
import { useMainContext } from '../../Contexts/MainContext';
import { CHARACTERS } from '../../constants';
import Button from '../Button/Button';

const CharacterList = () => {
    const { setSelectedCharacter } = useMainContext();

    const onClick = (e) => {
        setSelectedCharacter(e.target.value);
    }

    return (
        <div className='character-list'>
            <ul className='character-list__list'>
                {CHARACTERS.map(character => {
                    return (
                        <li
                            key={character[0]}
                            className='character-list__list__character'>
                            <Button
                                value={character[0]}
                                onClick={onClick}
                                text={character[1]}
                            />
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default CharacterList;