import React, { useState } from 'react';
import './Character.scss'
import { useMainContext } from '../../Contexts/MainContext';
import { ModalContextWrapper } from '../../Contexts/ModalContext'
import MoveList from '../MoveList';
import Button from '../Button';
import Combos from '../Combos';
import Modal from '../Modals/Modal';
import CharacterSelectModal from '../Modals/CharacterSelectModal';
import { CHARACTERS, LOCAL_KEYS } from '../../constants';



const Character = () => {
    const localSelectedView = localStorage.getItem(LOCAL_KEYS.SELECTED_CHARACTER_VIEW);
    const { selectedCharacter } = useMainContext();
    const [showCharacterSelectModal, setShowCharacterSelectModal] = useState(false);
    const [characterView, setCharacterView] = useState(localSelectedView);

    const toggleCharacterSelectModal = () => {
        setShowCharacterSelectModal(!showCharacterSelectModal)
    }

    const handleViewChange = ({ target: { value } }) => {
        localStorage.setItem(LOCAL_KEYS.SELECTED_CHARACTER_VIEW, value);
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
                    modifier={characterView === 'moves' ? 'active' : ''}
                    value='moves'
                    text='Moves'
                    onClick={handleViewChange}
                />
                <Button
                    modifier={characterView === 'combos' ? 'active' : ''}
                    value='combos'
                    text='Combos'
                    onClick={handleViewChange}
                />
            </div>
            {characterView === 'moves' && <MoveList />}
            {characterView === 'combos' && <Combos />}
        </div>
    )
}

export default Character;