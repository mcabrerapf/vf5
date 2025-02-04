import React, { useState } from 'react';
import './Character.scss'
import { useMainContext } from '../../Contexts/MainContext';
import { ModalContextWrapper } from '../../Contexts/ModalContext'
import Movelist from '../Movelist';
import Button from '../Button';
import Combos from '../Combos';
import Notes from '../Notes';
import Modal from '../Modals/Modal';
import CharacterSelectModal from '../Modals/CharacterSelectModal';
import InfoModal from '../Modals/InfoModal';
import { CHARACTERS, SELECTED_CHARACTER_VIEW_KEY, STRINGS } from '../../constants';
import getFromLocal from '../../helpers/getFromLocal';
import setLocalStorage from '../../helpers/setLocalStorage';


const Character = () => {
    const localSelectedView = getFromLocal(SELECTED_CHARACTER_VIEW_KEY);
    const { selectedCharacter } = useMainContext();
    const [showCharacterSelectModal, setShowCharacterSelectModal] = useState(false);
    const [showInfoModal, setShowInfoModal] = useState(false);
    const [characterView, setCharacterView] = useState(localSelectedView);

    const toggleCharacterSelectModal = () => {
        setShowCharacterSelectModal(!showCharacterSelectModal)
    }

    const handleViewChange = ({ target: { value } }) => {
        setLocalStorage(SELECTED_CHARACTER_VIEW_KEY, value);
        setCharacterView(value);
    }

    const toggleInfoModal = () => {
        setShowInfoModal(!showInfoModal)
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
            <ModalContextWrapper
                showModal={showInfoModal}
                closeModal={toggleInfoModal}
            >
                <Modal>
                    <InfoModal
                    />
                </Modal>
            </ModalContextWrapper>
            <header className='character__header'>
                <Button
                    modifier={'no-border'}
                    onClick={toggleCharacterSelectModal}
                    text={characterName}
                />
                <Button
                    modifier={'no-border info-button'}
                    text="ℹ"
                    onClick={toggleInfoModal}
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
                    value={STRINGS.NOTES}
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