import './Matchups.scss'
import React, { useEffect, useState } from 'react';
import { ModalContextWrapper } from '../../Contexts/ModalContext';
import { useMainContext } from '../../Contexts/MainContext'
import Modal from '../Modals/Modal';
import MatchupModal from '../Modals/MatchupModal';
import Matchup from '../Matchup';
import { CHARACTER_ID_TO_NAME, CHARACTERS_DATA_KEY, STRINGS, } from '../../constants'
import { getFromLocal, setLocalStorage } from '../../helpers';

const Matchups = () => {
    const { selectedCharacter } = useMainContext();
    const selectedCharacterName = CHARACTER_ID_TO_NAME[selectedCharacter]
    const [matchups, setMatchups] = useState(null);
    const [selectedMatchup, setSelectedMatchup] = useState(null);
    const [showMatchupModal, setShowMatchupModal] = useState(null);

    useEffect(() => {
        const localMatchups = getFromLocal(
            CHARACTERS_DATA_KEY,
            selectedCharacter,
            STRINGS.MATCHUPS
        );
        setMatchups(localMatchups);
    },
        [selectedCharacter]
    )
    if (!matchups) return null;

    const updateMatchups = (newMatchup) => {
        if (!newMatchup) return;
        const updatedMatchups = matchups.map(matchup => {
            if (matchup.id === newMatchup.id) return newMatchup;
            return matchup;
        })
        setLocalStorage(
            CHARACTERS_DATA_KEY,
            updatedMatchups,
            selectedCharacter,
            STRINGS.MATCHUPS
        )
        setMatchups(updatedMatchups);
    }

    const onVsClick = (matchup) => {
        setSelectedMatchup(matchup);
        toggleMatchupModal();
    }

    const onMatchupModalClose = (newMatchup) => {
        updateMatchups(newMatchup);
        setSelectedMatchup(null);
        toggleMatchupModal();
    }

    const toggleMatchupModal = () => {
        setShowMatchupModal(!showMatchupModal);
    }

    return (
        <div className='matchups'>
            <ModalContextWrapper
                showModal={showMatchupModal}
                closeModal={onMatchupModalClose}
            >
                <Modal>
                    <MatchupModal
                        matchup={selectedMatchup}
                        selectedCharacterName={selectedCharacterName}
                    />
                </Modal>
            </ModalContextWrapper>
            <div className='matchups__container'>
                {matchups.map(matchup => {
                    return (
                        <Matchup
                            key={matchup.id}
                            matchup={matchup}
                            selectedCharacterName={selectedCharacterName}
                            updateMatchups={updateMatchups}
                            onVsClick={onVsClick}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default Matchups;