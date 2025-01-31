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
                            key={character.id}
                            className='character-list__list__character'>
                            <Button
                                value={character.id}
                                onClick={onClick}
                                text={character.name}
                            />
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default CharacterList;