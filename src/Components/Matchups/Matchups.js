import './Matchups.scss'
import React, { useEffect, useRef, useState } from 'react';
import { ModalContextWrapper } from '../../Contexts/ModalContext';
import { useMainContext } from '../../Contexts/MainContext'
import Matchup from '../Matchup';
import ActiveFiltersList from '../ActiveFiltersList';
import SortModal from '../Modals/SortModal';
import CharacterMatchupView from './CharacterMatchupView';
import { CHARACTER_ID_TO_NAME, MATHCHUPS_SORT_OPTIONS, SELECTED_MATCHUPS_VIEW_KEY, } from '../../constants'
import { getMatchups, updateMatchups } from '../../services';
import { getFromLocal, setLocalStorage } from '../../helpers';
import { sortMatchups } from './helpers';

const Matchups = () => {
    const listRef = useRef(null);
    const { selectedCharacter, listView } = useMainContext();

    const selectedCharacterName = CHARACTER_ID_TO_NAME[selectedCharacter]
    const [matchups, setMatchups] = useState(null);
    const [matchupsView, setMatchupsView] = useState('ALL');
    const [selectedSort, setSelectedSort] = useState(MATHCHUPS_SORT_OPTIONS[0]);
    const [showSortModal, setShowSortModal] = useState(false);

    useEffect(() => {
        const localMatchups = getMatchups(selectedCharacter);
        const localMatchupsView = getFromLocal(SELECTED_MATCHUPS_VIEW_KEY);
        setMatchups(localMatchups);
        setMatchupsView(localMatchupsView);
    },
        [selectedCharacter]
    )
    if (!matchups) return null;

    const scrollToTop = () => {
        if (listRef.current) listRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }

    const handleMatchupChange = (newMatchupId) => {
        setLocalStorage(SELECTED_MATCHUPS_VIEW_KEY, newMatchupId);
        setMatchupsView(newMatchupId)
    }
    const handleMatchupUpdate = (newMatchup) => {
        const updatedMatchups = updateMatchups(selectedCharacter, newMatchup);
        setMatchups(updatedMatchups);
    }

    const onMatchupClick = (matchup) => {
        handleMatchupChange(matchup.id)
    }

    const onSortClick = () => {
        toggleSortModal();
    }

    const onSortDirClick = () => {
        const newSort = {
            ...selectedSort,
            dir: selectedSort.dir === 'asc' ? 'dsc' : 'asc'
        }
        setSelectedSort(newSort);
        scrollToTop();
    }

    const handleSortModalClose = (sort) => {
        handleSortChange(sort)
        toggleSortModal();
    }

    const handleSortChange = (sort) => {
        if (!sort) return;
        setSelectedSort(sort);
        scrollToTop();
    }

    const toggleSortModal = () => {
        setShowSortModal(!showSortModal);
    }

    const sortedMatchups = sortMatchups(matchups, selectedSort);
    const matchupForView = matchups.find(matchup => matchup.id === matchupsView);

    if (matchupsView !== 'ALL') {
        return (
            <CharacterMatchupView
                matchup={matchupForView}
                setMatchups={setMatchups}
                handleMatchupChange={handleMatchupChange}
            />
        )
    }

    return (
        <div className='matchups'>
            <ModalContextWrapper
                showModal={showSortModal}
                closeModal={handleSortModalClose}
            >
                <SortModal
                    selectedSort={selectedSort}
                    sortOptions={MATHCHUPS_SORT_OPTIONS}
                />
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
                            hideNote={listView === 'S'}
                            handleMatchupUpdate={handleMatchupUpdate}
                            selectedCharacterName={selectedCharacterName}
                            onClick={onMatchupClick}
                        />
                    )
                })}
                <div className='bottom-separator'>.</div>
            </div>
        </div>
    )
}

export default Matchups;