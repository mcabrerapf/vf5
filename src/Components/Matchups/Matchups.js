import './Matchups.scss'
import React, { useEffect, useState } from 'react';
import { ModalContextWrapper } from '../../Contexts/ModalContext';
import { useMainContext } from '../../Contexts/MainContext'
import Modal from '../Modals/Modal';
import MatchupModal from '../Modals/MatchupModal';
import Matchup from '../Matchup';
import { CHARACTER_ID_TO_NAME, } from '../../constants'
import { getMatchups, updateMatchups } from '../../services';

const Matchups = () => {
    const { selectedCharacter } = useMainContext();
    const selectedCharacterName = CHARACTER_ID_TO_NAME[selectedCharacter]
    const [matchups, setMatchups] = useState(null);
    const [selectedMatchup, setSelectedMatchup] = useState(null);
    const [showMatchupModal, setShowMatchupModal] = useState(null);

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

    const handleMatchupUpdate = (newMatchup) => {
        console.log({ selectedCharacter })
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
                            handleMatchupUpdate={handleMatchupUpdate}
                            onVsClick={onVsClick}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default Matchups;