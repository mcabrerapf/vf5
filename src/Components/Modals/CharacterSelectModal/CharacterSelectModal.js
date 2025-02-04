import React from 'react';
import './CharacterSelectModal.scss'
import Button from '../../Button';
import { useModalContext } from '../../../Contexts/ModalContext';
import { CHARACTERS } from '../../../constants';
import { useMainContext } from '../../../Contexts/MainContext';

const CharacterSelectModal = () => {
    const { closeModal } = useModalContext();
    const { setSelectedCharacter, selectedCharacter } = useMainContext();

    const handleCharacterClick = (e) => {
        setSelectedCharacter(e.target.value);
        closeModal();
    }

    return (
        <div className='character-select-modal'>
            <div className='character-select-modal__content'>
                {CHARACTERS.map(character =>
                    <Button
                        key={character.id}
                        modifier={character.id === selectedCharacter ? 'active' : ''}
                        value={character.id}
                        text={character.name}
                        onClick={handleCharacterClick}
                    />
                )}
            </div>
        </div>
    )
}

export default CharacterSelectModal;