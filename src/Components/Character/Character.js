import './Character.scss'
import React, { useState } from 'react';
import { useMainContext } from '../../Contexts/MainContext';
import { ModalContextWrapper } from '../../Contexts/ModalContext'
import Hamburger from '../Hamburger';
import Movelist from '../MoveList';
import Button from '../Button';
import Combos from '../Combos';
import Notes from '../Notes';
import Matchups from '../Matchups';
import CombosSearch from '../CombosSearch';
import CharacterSelectModal from '../Modals/CharacterSelectModal';
import InfoModal from '../Modals/InfoModal';
import DataModal from '../Modals/DataModal';
import { SELECTED_CHARACTER_VIEW_KEY, SELECTED_MATCHUPS_VIEW_KEY, STRINGS } from '../../constants';
import getFromLocal from '../../helpers/getFromLocal';
import setLocalStorage from '../../helpers/setLocalStorage';
import { CHARACTERS_JSON } from '../../constants/CHARACTERS';
import { buildClassName } from '../../helpers';

const Character = () => {
    const { selectedCharacter, listView, setSelectedCharacter, setListView } = useMainContext();
    const localSelectedView = getFromLocal(SELECTED_CHARACTER_VIEW_KEY);
    const [showCharacterSelectModal, setShowCharacterSelectModal] = useState(false);
    const [showDataModal, setShowDataModal] = useState(false);
    const [showInfoModal, setShowInfoModal] = useState(false);
    const [characterView, setCharacterView] = useState(localSelectedView);

    const { name: characterName, short_name } = CHARACTERS_JSON[selectedCharacter];
    document.title = `${short_name} - ${STRINGS[characterView]}`;

    const toggleCharacterSelectModal = () => setShowCharacterSelectModal(!showCharacterSelectModal);

    const toggleDataModal = () => setShowDataModal(!showDataModal);

    const toggleInfoModal = () => setShowInfoModal(!showInfoModal);

    const toggleListViewMode = () => setListView();

    const handleViewChange = (newView) => {
        setLocalStorage(SELECTED_CHARACTER_VIEW_KEY, newView);
        setLocalStorage(SELECTED_MATCHUPS_VIEW_KEY, STRINGS.ALL);
        setCharacterView(newView);
    };

    const handleCharacterChange = (character) => {
        setSelectedCharacter(character);
    };

    const handleComboSearchButtonClick = () => {
        handleViewChange(STRINGS.COMBOS_SEARCH);
    };
    const classNames = ['character__header', `character_${characterView}`];
    // if (characterView === STRINGS.COMBOS_SEARCH) classNames.push('online');
    const headerClassName = buildClassName(classNames);

    return (
        <div className='character'>
            <ModalContextWrapper
                showModal={showCharacterSelectModal}
                closeModal={toggleCharacterSelectModal}
            >
                <CharacterSelectModal
                    selectedCharacter={selectedCharacter}
                    handleCharacterSelect={handleCharacterChange}
                />
            </ModalContextWrapper>
            <ModalContextWrapper
                showModal={showInfoModal}
                closeModal={toggleInfoModal}
            >
                <InfoModal
                />
            </ModalContextWrapper>
            <ModalContextWrapper
                showModal={showDataModal}
                closeModal={toggleDataModal}
            >
                <DataModal
                />
            </ModalContextWrapper>
            <header className={headerClassName}>
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
                <Hamburger
                    characterView={characterView}
                    toggleDataModal={toggleDataModal}
                    toggleInfoModal={toggleInfoModal}
                    handleViewChange={handleViewChange}
                />
            </header>
            {characterView === STRINGS.MOVELIST && <Movelist setCharacterView={setCharacterView} />}
            {characterView === STRINGS.COMBOS && <Combos handleComboSearchButtonClick={handleComboSearchButtonClick} />}
            {characterView === STRINGS.COMBOS_SEARCH && <CombosSearch handleViewChange={handleViewChange} />}
            {characterView === STRINGS.NOTES && <Notes />}
            {characterView === STRINGS.MATCHUPS && <Matchups />}
        </div>
    )
}

export default Character;