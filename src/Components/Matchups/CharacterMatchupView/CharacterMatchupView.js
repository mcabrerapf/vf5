import React, { useEffect, useRef, useState } from 'react';
import './CharacterMatchupView.scss'
import { useMainContext } from '../../../Contexts/MainContext';
import { getCombos, getCustomMoves, updateMatchups } from '../../../services';
import Button from '../../Button';
import { EditIcon, ChevronDown, MoveLeft, VsIcon, ChevronUp } from '../../Icon';
import TextWithCommand from '../../TextWithCommand';
import CharacterSelectModal from '../../Modals/CharacterSelectModal';
import Move from '../../Move';
import Combo from '../../Combo';
import { sortList, stringNotationParser } from '../../../helpers';
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
    const [showMoves, setShowMoves] = useState(true);
    const [showCombos, setShowCombos] = useState(true);

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
    const {
        movelist,
        move_categories: moveCategories,
        combos_filter_options: combosFilterOptions,
        movelist_filter_options: movelistFilterOptions,
    } = CHARACTERS_JSON[selectedCharacter];
    const combos = getCombos(selectedCharacter);
    const customMoves = getCustomMoves(selectedCharacter);
    const matchupCombos = combos
        .filter(combo => !!combo.character_tags.includes(matchupId))
    const parsedNote = stringNotationParser(note);
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

    const favouriteMoves = customMoves.map(cMove => {
        if (!cMove.favourite) return null;
        const moveMatch = movelist.all_moves.find(move => move.id === cMove.id);
        if (!moveMatch) return null;
        return { ...moveMatch, note: cMove.note || moveMatch.note };
    }).filter(Boolean)
    const attackLevelOptions = movelistFilterOptions.filter(fOption => fOption.key === 'attack_level');

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
                    className='character-matchup__content__combos-notes'
                >
                    {parsedNote &&
                        <div
                            className='character-matchup__content__combos-notes__list__note'
                        >
                            <TextWithCommand
                                content={parsedNote}
                            />
                        </div>
                    }
                    <div
                        className='character-matchup__content__combos-notes__header'
                    >
                        <Button
                            modifier={'active center'}
                            onClick={() => setShowMoves(!showMoves)}
                        >
                            <span>MOVES</span>
                            {showMoves ? <ChevronDown /> : <ChevronUp />}
                        </Button>

                    </div>
                    <div
                        className='character-matchup__content__combos-notes__list'
                    >
                        {showMoves && favouriteMoves.map(move => {
                            return (
                                <Move
                                    key={move.id}
                                    move={move}
                                    showSimpleView
                                    hideEditButton
                                    hideFavouriteButton
                                    moveCategories={moveCategories}
                                    attackLevelOptions={attackLevelOptions}
                                />
                            )

                        })}
                    </div>
                    <div
                        className='character-matchup__content__combos-notes__header'
                    >
                        <Button
                            modifier={'active center'}
                            onClick={() => setShowCombos(!showCombos)}
                        >
                            <span>COMBOS</span>
                            {showCombos ? <ChevronDown /> : <ChevronUp />}
                        </Button>
                    </div>
                    <div
                        className='character-matchup__content__combos-notes__list'
                    >
                        {showCombos && Object.keys(combosByLauncher).map(key => {
                            return combosByLauncher[key].map(combo => {

                                return (
                                    <div
                                        key={combo.id}
                                        className={`character-matchup__content__combos-notes__list__combo${combo.favourite ? ' favourite' : ''}`}
                                    >
                                        <Combo
                                            showSimpleView
                                            hideEditButton
                                            hideFavouriteButton
                                            showOtherTags
                                            combo={combo}
                                            combosFilterOptions={combosFilterOptions}
                                        />
                                    </div>
                                )
                            })
                        })}
                        <div className='bottom-separator s'>.</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CharacterMatchupView;