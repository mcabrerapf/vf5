import './Matchups.scss'
import React, { useEffect, useRef, useState } from 'react';
import { ModalContextWrapper } from '../../Contexts/ModalContext';
import { useMainContext } from '../../Contexts/MainContext'
import Matchup from '../Matchup';
import ActiveFiltersList from '../ActiveFiltersList';
import Modal from '../Modals/Modal';
import SortModal from '../Modals/SortModal';
import CharacterMatchupView from './CharacterMatchupView';
import { CHARACTER_ID_TO_NAME, MATHCHUPS_SORT_OPTIONS, SELECTED_MATCHUPS_SORT_KEY, SELECTED_MATCHUPS_VIEW_KEY, } from '../../constants'
import { getMatchups, updateMatchups } from '../../services';
import { getFromLocal, setLocalStorage } from '../../helpers';
import { sortMatchups } from './helpers';

const Matchups = () => {
    const listRef = useRef(null);
    const { selectedCharacter, listView } = useMainContext();

    const selectedCharacterName = CHARACTER_ID_TO_NAME[selectedCharacter]
    const [matchups, setMatchups] = useState(null);
    const [matchupsView, setMatchupsView] = useState('ALL');
    const [selectedSort, setSelectedSort] = useState({});
    const [showSortModal, setShowSortModal] = useState(false);
    console.log({ matchupsView })

    useEffect(() => {
        const localMatchups = getMatchups(selectedCharacter);
        const localMatchupsView = getFromLocal(SELECTED_MATCHUPS_VIEW_KEY);
        const localSelectedSort = getFromLocal(SELECTED_MATCHUPS_SORT_KEY);
        setSelectedSort(localSelectedSort)
        setMatchups(localMatchups);
        setMatchupsView(localMatchupsView);
    },
        [selectedCharacter]
    )
    if (!matchups) return null;

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
                            hideNote={listView === 'S'}
                            handleMatchupUpdate={handleMatchupUpdate}
                            selectedCharacterName={selectedCharacterName}
                            onClick={onMatchupClick}
                        />
                    )
                })}
                <div className='bottom-separator s'>.</div>
            </div>
        </div>
    )
}

export default Matchups;