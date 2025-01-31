import React from 'react';
import './CharacterSelectModal.scss'
import ModalHeader from '../ModalHeader';
import Button from '../../Button';
import { useModalContext } from '../../../Contexts/ModalContext';
import { CHARACTERS } from '../../../constants';
import { useMainContext } from '../../../Contexts/MainContext';

const CharacterSelectModal = () => {
    const { closeModal } = useModalContext();
    const { setSelectedCharacter, selectedCharacter } = useMainContext();

    const handleClose = () => {
        closeModal();
    }

    const handleCharacterClick = (e) => {
        setSelectedCharacter(e.target.value);
        closeModal();
    }

    return (
        <div className='character-select-modal'>
            <ModalHeader modifier={"align-right"}>
                <Button
                    modifier={"no-border"}
                    text={"X"}
                    onClick={handleClose}
                />
            </ModalHeader>
            <div className='character-select-modal__content'>
                {CHARACTERS.map(character => {
      
                    return (
                        <Button
                            key={character.id}
                            modifier={character.id === selectedCharacter ? 'active' : ''}
                            value={character.id}
                            text={character.name}
                            onClick={handleCharacterClick}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default CharacterSelectModal;