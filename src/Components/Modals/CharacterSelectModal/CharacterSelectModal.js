import React from 'react';
import './CharacterSelectModal.scss'
import Button from '../../Button';
import { CHARACTERS } from '../../../constants';
import { VsIcon } from '../../Icon';
import { useMainContext } from '../../../Contexts/MainContext';
import { useModalContext } from '../../../Contexts/ModalContext';
import { characterIdToName } from '../../../helpers';

const CharacterSelectModal = ({
    selectedCharacter,
    showVs,
    handleCharacterSelect
}) => {
    const { closeModal } = useModalContext();
    const { selectedCharacter: selectedMainCharacter } = useMainContext();

    const handleCharacterClick = (character) => {
        handleCharacterSelect(character);
        closeModal();
    }

    return (
        <div className='character-select-modal'>
            {showVs &&
                <div
                    className='character-select-modal__vs'
                >
                    <span>
                        {characterIdToName(selectedMainCharacter)}
                    </span>
                    <VsIcon />
                </div>
            }
            <div className='character-select-modal__content'>
                {CHARACTERS.map(character =>
                    <Button
                        key={character.id}
                        modifier={character.id === selectedCharacter ? 'active' : ''}
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