import React from 'react';
import './CharacterSelectModal.scss'
import Button from '../../Button';
import { useModalContext } from '../../../Contexts/ModalContext';
import { CHARACTERS } from '../../../constants';
import { useMainContext } from '../../../Contexts/MainContext';
import { VsIcon } from '../../Icon';

const CharacterSelectModal = ({
    characterOverride,
    overrideSelect
}) => {
    const { closeModal } = useModalContext();
    const { setSelectedCharacter, selectedCharacter } = useMainContext();

    const handleCharacterClick = (character) => {
        if (overrideSelect) {
            overrideSelect(character);


        } else {
            setSelectedCharacter(character);
        }
        closeModal();


    }
    const characterToUse = characterOverride || selectedCharacter;

    return (
        <div className='character-select-modal'>
            <div
            className='character-select-modal__vs'
            >
                <VsIcon />
            </div>

            <div className='character-select-modal__content'>
                {CHARACTERS.map(character =>
                    <Button
                        key={character.id}
                        modifier={character.id === characterToUse ? 'active' : ''}
                        value={character.id}
                        text={character.name}
                        onClick={() => handleCharacterClick(character)}
                    />
                )}
            </div>
        </div>
    )
}

export default CharacterSelectModal;