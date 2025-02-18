import React, { useEffect, useRef, useState } from 'react';
import './CharacterMatchupView.scss'
import { useMainContext } from '../../../Contexts/MainContext';
import { updateMatchups } from '../../../services';
import MatchupCombos from './MatchupCombos';
import MatchupMoves from './MatchupMoves';
import Button from '../../Button';
import { EditIcon, MoveLeft, VsIcon } from '../../Icon';
import TextWithCommand from '../../TextWithCommand';
import CharacterSelectModal from '../../Modals/CharacterSelectModal';
import { stringNotationParser } from '../../../helpers';
import { ModalContextWrapper } from '../../../Contexts/ModalContext';
import MatchupModal from '../../Modals/MatchupModal';
import { CHARACTERS_JSON } from '../../../constants';

const CharacterMatchupView = ({
    matchup = {},
    setMatchups = () => { },
    handleMatchupChange = () => { }
}) => {
    const listRef = useRef(null);
    const { selectedCharacter } = useMainContext();
    const [showCharacterSelectModal, setShowCharacterSelectModal] = useState(false);
    const [showMatchupModal, setShowMatchupModal] = useState(false);

    useEffect(
        () => {
            scrollToTop();
        },
        [selectedCharacter, matchup]
    );

    const { id: matchupId, note } = matchup
    const {
        short_name,
    } = CHARACTERS_JSON[matchupId];

    const parsedNote = stringNotationParser(note);

    const scrollToTop = () => {
        if (listRef.current) listRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }

    const onMatchupChange = (character) => {
        handleMatchupChange(character.id);
    }

    const handleMatchupUpdate = (newMatchup) => {
        const updatedMatchups = updateMatchups(selectedCharacter, newMatchup);
        setMatchups(updatedMatchups);
    }

    const onMatchupModalClose = (newMatchup) => {
        if (newMatchup) handleMatchupUpdate(newMatchup);
        toggleMatchupModal();
    }

    const toggleMatchupModal = () => {
        setShowMatchupModal(!showMatchupModal);
    }

    const toggleCharacterSelectModal = () => {
        setShowCharacterSelectModal(!showCharacterSelectModal);
    }

    return (
        <div
            className='character-matchup'
        >
            <ModalContextWrapper
                showModal={showCharacterSelectModal}
                closeModal={toggleCharacterSelectModal}
            >
                <CharacterSelectModal
                    selectedCharacter={matchupId}
                    showVs
                    handleCharacterSelect={onMatchupChange}
                />
            </ModalContextWrapper>
            <ModalContextWrapper
                showModal={showMatchupModal}
                closeModal={onMatchupModalClose}
                closeOnBgClick={false}
            >
                <MatchupModal
                    matchup={matchup}
                />
            </ModalContextWrapper>
            <div
                className='character-matchup__header'
            >
                <div
                    className='character-matchup__header__left'
                >
                    <Button
                        modifier={"back-button"}
                        onClick={() => handleMatchupChange('ALL')}
                    >
                        <MoveLeft />
                        <VsIcon />
                    </Button>

                    <div
                        className='character-matchup__header__left__name'
                        onClick={toggleCharacterSelectModal}
                    >
                        <span
                            className='character-matchup__header__left__name__name'
                        >
                            {short_name}
                        </span>
                    </div>
                </div>
                <div
                    className='character-matchup__header__right'
                    onClick={toggleMatchupModal}
                >
                    <span
                        className='character-matchup__header__right__wins'
                    >
                        {matchup.wins}
                    </span>
                    --
                    <span
                        className='character-matchup__header__right__loses'
                    >
                        {matchup.loses}
                    </span>
                    --
                    <span
                        className='character-matchup__header__right__win-rate'
                    >
                        {matchup.win_rate}%({matchup.total})
                    </span>
                    <Button
                        modifier={"edit-button"}
                    >
                        <EditIcon />
                    </Button>
                </div>
            </div>
            <div
                className='character-matchup__content'
            >
                <div
                    ref={listRef}
                    className='character-matchup__content__scrollable'
                >
                    {parsedNote &&
                        <div
                            className='character-matchup__content__scrollable__note'
                        >
                            <TextWithCommand
                                content={parsedNote}
                            />
                        </div>
                    }
                    <MatchupMoves
                        selectedCharacter={selectedCharacter}
                    />
                    <MatchupCombos
                        selectedCharacter={selectedCharacter}
                        matchupId={matchupId}
                    />
                </div>
            </div>
        </div>
    )
}

export default CharacterMatchupView;