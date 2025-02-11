import './Character.scss'
import React, { useState } from 'react';
import { useMainContext } from '../../Contexts/MainContext';
import { ModalContextWrapper } from '../../Contexts/ModalContext'
import Movelist from '../Movelist';
import Button from '../Button';
import Combos from '../Combos';
import Notes from '../Notes';
import Modal from '../Modals/Modal';
import CharacterSelectModal from '../Modals/CharacterSelectModal';
import InfoModal from '../Modals/InfoModal';
import { SELECTED_CHARACTER_VIEW_KEY, STRINGS } from '../../constants';
import getFromLocal from '../../helpers/getFromLocal';
import setLocalStorage from '../../helpers/setLocalStorage';
import { CHARACTERS_JSON } from '../../constants/CHARACTERS';
import Matchups from '../Matchups/Matchups';


const Character = () => {
    const { selectedCharacter, listView, setListView } = useMainContext();
    const localSelectedView = getFromLocal(SELECTED_CHARACTER_VIEW_KEY);
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

    const toggleListViewMode = () => {
        setListView()
    }

    const { name: characterName } = CHARACTERS_JSON[selectedCharacter];

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
                    text={listView}
                    onClick={toggleListViewMode}
                />
                <Button
                    modifier={'no-border character-name'}
                    onClick={toggleCharacterSelectModal}
                    text={characterName}
                />
                <Button
                    modifier={'no-border'}
                    text="ℹ"
                    onClick={toggleInfoModal}
                />
            </header>
            <div className='character__sub-header'>
                <Button
                    modifier={characterView === STRINGS.MOVELIST ? 'active tab-left' : 'tab-left'}
                    value={STRINGS.MOVELIST}
                    text='Moves'
                    onClick={handleViewChange}
                />
                <Button
                    modifier={characterView === STRINGS.COMBOS ? 'active tab' : 'tab'}
                    value={STRINGS.COMBOS}
                    text='Combos'
                    onClick={handleViewChange}
                />
                <Button
                    modifier={characterView === STRINGS.NOTES ? 'active tab' : 'tab'}
                    value={STRINGS.NOTES}
                    text='Notes'
                    onClick={handleViewChange}
                />
                <Button
                    modifier={characterView === STRINGS.MATCHUPS ? 'active tab-right' : 'tab-right'}
                    value={STRINGS.MATCHUPS}
                    text='Matchups'
                    onClick={handleViewChange}
                />
            </div>
            {characterView === STRINGS.MOVELIST && <Movelist setCharacterView={setCharacterView} />}
            {characterView === STRINGS.COMBOS && <Combos />}
            {characterView === STRINGS.NOTES && <Notes />}
            {characterView === STRINGS.MATCHUPS && <Matchups />}
        </div>
    )
}

export default Character;