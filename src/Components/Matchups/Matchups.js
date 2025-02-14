import './Matchups.scss'
import React, { useEffect, useRef, useState } from 'react';
import { ModalContextWrapper } from '../../Contexts/ModalContext';
import { useMainContext } from '../../Contexts/MainContext'
import Matchup from '../Matchup';
import ActiveFiltersList from '../ActiveFiltersList';
import Modal from '../Modals/Modal';
import MatchupModal from '../Modals/MatchupModal';
import SortModal from '../Modals/SortModal';
import CharacterMatchupView from './CharacterMatchupView';
import { CHARACTER_ID_TO_NAME, MATHCHUPS_SORT_OPTIONS, SELECTED_MATCHUPS_SORT_KEY, } from '../../constants'
import { getMatchups, updateMatchups } from '../../services';
import { getFromLocal, setLocalStorage } from '../../helpers';
import { sortMatchups } from './helpers';

const Matchups = () => {
    const listRef = useRef(null);
    const { selectedCharacter } = useMainContext();
    const localSelectedSort = getFromLocal(SELECTED_MATCHUPS_SORT_KEY);
    const selectedCharacterName = CHARACTER_ID_TO_NAME[selectedCharacter]
    const [matchups, setMatchups] = useState(null);
    const [matchupsView, setMatchupsView] = useState('ALL');
    const [selectedSort, setSelectedSort] = useState(localSelectedSort);
    const [selectedMatchup, setSelectedMatchup] = useState(null);
    const [showMatchupModal, setShowMatchupModal] = useState(false);
    const [showSortModal, setShowSortModal] = useState(false);

    useEffect(() => {
        const localMatchups = getMatchups(selectedCharacter);
        setMatchups(localMatchups);
    },
        [selectedCharacter]
    )
    if (!matchups) return null;



    const onVsClick = (matchup) => {
        setSelectedMatchup(matchup);
        toggleMatchupModal();
    }

    const onNameClick = (matchup) => {
        setSelectedMatchup(matchup);
        setMatchupsView(matchup.id)
    }

    const handleMatchupUpdate = (newMatchup) => {
        const updatedMatchups = updateMatchups(selectedCharacter, newMatchup);
        setMatchups(updatedMatchups);
    }

    const onMatchupModalClose = (newMatchup) => {
        if (newMatchup) handleMatchupUpdate(newMatchup);
        setSelectedMatchup(null);
        toggleMatchupModal();
    }

    const toggleMatchupModal = () => {
        setShowMatchupModal(!showMatchupModal);
    }

    const onSortClick = () => {
        toggleSortModal();
    }

    const onSortDirClick = () => {
        const newSort = {
            ...selectedSort,
            dir: selectedSort.dir === 'asc' ? 'dsc' : 'asc'
        }
        scrollToTop();
        setLocalStorage(SELECTED_MATCHUPS_SORT_KEY, JSON.stringify(newSort));
        setSelectedSort(newSort);
    }

    const handleSortModalClose = (sort) => {
        handleSortChange(sort)
        toggleSortModal();
    }

    const handleSortChange = (sort) => {
        if (!sort) return;
        scrollToTop();
        setLocalStorage(SELECTED_MATCHUPS_SORT_KEY, JSON.stringify(sort));
        setSelectedSort(sort);
    }

    const toggleSortModal = () => {
        setShowSortModal(!showSortModal);
    }

    const scrollToTop = () => {
        if (listRef.current) listRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }


    const sortedMatchups = sortMatchups(matchups, selectedSort);
    if (matchupsView !== 'ALL') {
        return (
            <CharacterMatchupView
                matchup={selectedMatchup}
                setMatchupsView={setMatchupsView}
            />
        )
    }
    return (
        <div className='matchups'>
            <ModalContextWrapper
                showModal={showMatchupModal}
                closeModal={onMatchupModalClose}
                closeOnBgClick={false}
            >
                <Modal>
                    <MatchupModal
                        matchup={selectedMatchup}
                        selectedCharacterName={selectedCharacterName}
                    />
                </Modal>
            </ModalContextWrapper>
            <ModalContextWrapper
                showModal={showSortModal}
                closeModal={handleSortModalClose}
            >
                <Modal>
                    <SortModal
                        selectedSort={selectedSort}
                        sortOptions={MATHCHUPS_SORT_OPTIONS}
                    />
                </Modal>
            </ModalContextWrapper>
            <ActiveFiltersList
                onSortClick={onSortClick}
                onSortDirClick={onSortDirClick}
                selectedSort={selectedSort}
            />
            <div
                ref={listRef}
                className='matchups__container'
            >
                {sortedMatchups.map(matchup => {
                    return (
                        <Matchup
                            key={matchup.id}
                            matchup={matchup}
                            disableButtons
                            selectedCharacterName={selectedCharacterName}
                            handleMatchupUpdate={handleMatchupUpdate}
                            onNameClick={onNameClick}
                            onVsClick={onVsClick}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default Matchups;