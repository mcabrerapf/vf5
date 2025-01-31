import React, { useState } from 'react';
import './Character.scss'
import { useMainContext } from '../../Contexts/MainContext';
import MoveList from '../MoveList';
import Button from '../Button';
import Modal from '../Modals/Modal';
import { ModalContextWrapper } from '../../Contexts/ModalContext'
import { CHARACTERS } from '../../constants';
import CharacterSelectModal from '../Modals/CharacterSelectModal';

const Character = () => {
    const { selectedCharacter } = useMainContext();
    const [showCharacterSelectModal, setShowCharacterSelectModal] = useState(false);
    const [characterView, setCharacterView] = useState('moves');
    const { name: characterName } = CHARACTERS
        .find(character => character.id === selectedCharacter);
    

    const toggleCharacterSelectModal = () => {
        setShowCharacterSelectModal(!showCharacterSelectModal)
    }

    const handleViewChange = (e) => {
        setCharacterView(e.target.value);
    }

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
            {/* {characterView === 1 && <MoveList />} */}
        </div>
    )
}

export default Character;