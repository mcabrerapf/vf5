import React, { useState } from 'react';
import './Character.scss'
import { useMainContext } from '../../Contexts/MainContext';
import { ModalContextWrapper } from '../../Contexts/ModalContext'
import Movelist from '../Movelist';
import Button from '../Button';
import Combos from '../Combos';
import Modal from '../Modals/Modal';
import CharacterSelectModal from '../Modals/CharacterSelectModal';
import { CHARACTERS, LOCAL_KEYS, STRINGS } from '../../constants';
import getFromLocal from '../../helpers/getFromLocal';
import setLocalStorage from '../../helpers/setLocalStorage';
import Notes from '../Notes';



const Character = () => {
    const localSelectedView = getFromLocal(LOCAL_KEYS.SELECTED_CHARACTER_VIEW);
    const { selectedCharacter } = useMainContext();
    const [showCharacterSelectModal, setShowCharacterSelectModal] = useState(false);
    const [characterView, setCharacterView] = useState(localSelectedView);

    const toggleCharacterSelectModal = () => {
        setShowCharacterSelectModal(!showCharacterSelectModal)
    }

    const handleViewChange = ({ target: { value } }) => {
        setLocalStorage(LOCAL_KEYS.SELECTED_CHARACTER_VIEW, value);
        setCharacterView(value);
    }


    const { name: characterName } = CHARACTERS
        .find(character => character.id === selectedCharacter);
    
    return (
        <div className='character'>
            <ModalContextWrapper
                showModal={showCharacterSelectModal}
                closeModal={toggleCharacterSelectModal}
            >
                <Modal>
                    <CharacterSelectModal />
                </Modal>
            </ModalContextWrapper>
            <header className='character__header'>
                <Button
                    modifier={'no-border'}
                    onClick={toggleCharacterSelectModal}
                    text={characterName}
                />
            </header>
            <div className='character__sub-header'>
                <Button
                    modifier={characterView === STRINGS.MOVELIST ? 'active' : ''}
                    value={STRINGS.MOVELIST}
                    text='Moves'
                    onClick={handleViewChange}
                />
                <Button
                    modifier={characterView === STRINGS.COMBOS ? 'active' : ''}
                    value={STRINGS.COMBOS}
                    text='Combos'
                    onClick={handleViewChange}
                />
                <Button
                    modifier={characterView === STRINGS.NOTES ? 'active' : ''}
                    value={ STRINGS.NOTES}
                    text='Notes'
                    onClick={handleViewChange}
                />
            </div>
            {characterView === STRINGS.MOVELIST && <Movelist />}
            {characterView === STRINGS.COMBOS && <Combos />}
            {characterView === STRINGS.NOTES && <Notes />}
        </div>
    )
}

export default Character;