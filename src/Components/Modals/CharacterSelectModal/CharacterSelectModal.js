import React from 'react';
import './CharacterSelectModal.scss'
import ModalHeader from '../ModalHeader';
import Button from '../../Button';
import { useModalContext } from '../../../Contexts/ModalContext';
import { CHARACTERS } from '../../../constants';
import { useMainContext } from '../../../Contexts/MainContext';

const CharacterSelectModal = () => {
    const { closeModal } = useModalContext();
    const { setSelectedCharacter } = useMainContext();

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
                    const characterFirstName = character[1].length > 8 ?
                        character[1].split(' ')[0]
                        : character[1];

                    return (
                        <Button
                            key={character[0]}
                            value={character[0]}
                            text={characterFirstName}
                            onClick={handleCharacterClick}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default CharacterSelectModal;