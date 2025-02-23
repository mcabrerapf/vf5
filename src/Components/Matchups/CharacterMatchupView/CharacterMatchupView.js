import React, { useEffect, useRef, useState } from 'react';
import './CharacterMatchupView.scss'
import { useMainContext } from '../../../Contexts/MainContext';
import { getCombos, getCustomMoves, getNotes, updateMatchups } from '../../../services';
import MatchupCombos from './MatchupCombos';
import MatchupMoves from './MatchupMoves';
import Button from '../../Button';
import { EditIcon, MoveLeft, VsIcon } from '../../Icon';
import CharacterSelectModal from '../../Modals/CharacterSelectModal';
import { ModalContextWrapper } from '../../../Contexts/ModalContext';
import MatchupModal from '../../Modals/MatchupModal';
import { CHARACTERS_JSON, STRINGS } from '../../../constants';
import MatchupNotes from './MatchupNotes/MatchupNotes';
import { sortList } from '../../../helpers';

const CharacterMatchupView = ({
    matchup = {},
    setMatchups = () => { },
    handleMatchupChange = () => { }
}) => {
    const listRef = useRef(null);
    const { selectedCharacter, listView } = useMainContext();
    const [showCharacterSelectModal, setShowCharacterSelectModal] = useState(false);
    const [showMatchupModal, setShowMatchupModal] = useState(false);
    const [matchupView, setMatchupView] = useState(STRINGS.NOTES);

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
    const notes = getNotes(matchupId)
    const hasNoNotes = !notes?.length && !note;

    const {
        movelist,
    } = CHARACTERS_JSON[selectedCharacter];
    const customMoves = getCustomMoves(selectedCharacter);

    const favouriteMoves = customMoves.map(cMove => {
        if (!cMove.favourite) return null;
        const moveMatch = movelist.all_moves.find(move => move.id === cMove.id);
        if (!moveMatch) return null;
        return { ...moveMatch, note: cMove.note || moveMatch.note };
    }).filter(Boolean)

    const hasNoMoves = !favouriteMoves?.length;

    const combos = getCombos(selectedCharacter);
    const matchupCombos = combos
        .filter(combo => !!combo.character_tags.includes(matchupId))
    const combosByLauncher = {};
    [...matchupCombos]
        .sort((a, b) => a.launcher.length - b.launcher.length)
        .forEach(combo => {
            const stringLauncher = combo.launcher.join('-');
            if (!combosByLauncher[stringLauncher]) {
                combosByLauncher[stringLauncher] = [combo];
            } else {
                combosByLauncher[stringLauncher].push(combo);
            }
        });

    Object.keys(combosByLauncher).forEach(key => {
        combosByLauncher[key] = sortList(combosByLauncher[key], {
            key: 'launcher',
            dir: 'dsc',
            type: "array",
        })
    })
    const hasNoCombos = !Object.keys(combosByLauncher)?.length;

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
                    >
                        <Button
                            modifier={'character-name-button'}
                            text={short_name}
                            onClick={toggleCharacterSelectModal}
                        />
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
                className='character-matchup__sub-header'
            >
                <Button
                    disabled={hasNoNotes}
                    modifier={`tab-left ${matchupView === STRINGS.NOTES ? 'active' : ''}`}
                    onClick={() => setMatchupView(STRINGS.NOTES)}
                    text={'NOTES'}
                />
                <Button
                    disabled={hasNoMoves}
                    modifier={`tab ${matchupView === STRINGS.MOVES ? 'active' : ''}`}
                    onClick={() => setMatchupView(STRINGS.MOVES)}
                    text={'MOVES'}
                />
                <Button
                    disabled={hasNoCombos}
                    modifier={`tab-right ${matchupView === STRINGS.COMBOS ? 'active' : ''}`}
                    onClick={() => setMatchupView(STRINGS.COMBOS)}
                    text={'COMBOS'}
                />
            </div>
            <div
                className='character-matchup__content'
            >
                <div
                    ref={listRef}
                    className='character-matchup__content__scrollable'
                >
                    {matchupView === STRINGS.NOTES &&
                        <MatchupNotes
                            matchupId={matchupId}
                            matchupNote={note}
                            notes={notes}
                        />
                    }
                    {matchupView === STRINGS.MOVES &&
                        <MatchupMoves
                            selectedCharacter={selectedCharacter}
                            moves={favouriteMoves}
                            showSimpleView={listView==='S'}
                        />
                    }
                    {matchupView === STRINGS.COMBOS &&
                        <MatchupCombos
                            selectedCharacter={selectedCharacter}
                            combosByLauncher={combosByLauncher}
                            showSimpleView={listView==='S'}
                        />
                    }
                </div>
            </div>
        </div>
    )
}

export default CharacterMatchupView;