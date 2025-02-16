import React, { useState } from 'react';
import './CharacterMatchupView.scss'
import { useMainContext } from '../../../Contexts/MainContext';
import { getCombos, updateMatchups } from '../../../services';
import Button from '../../Button';
import { EditIcon, MoveLeft, VsIcon } from '../../Icon';
import TextWithCommand from '../../TextWithCommand';
import { sortList, stringNotationParser } from '../../../helpers';
import MoveCommand from '../../MoveCommand';
import { ModalContextWrapper } from '../../../Contexts/ModalContext';
import Modal from '../../Modals/Modal';
import MatchupModal from '../../Modals/MatchupModal';
import { CHARACTERS_JSON } from '../../../constants';
import CharacterSelectModal from '../../Modals/CharacterSelectModal';

const CharacterMatchupView = ({
    matchup = {},
    setMatchups = () => { },
    handleMatchupChange = () => { }
}) => {
    const { id: matchupId, note } = matchup
    const { short_name } = CHARACTERS_JSON[matchupId];
    const [showCharacterSelectModal, setShowCharacterSelectModal] = useState(false);
    const [showMatchupModal, setShowMatchupModal] = useState(false);
    const { selectedCharacter } = useMainContext();
    const combos = getCombos(selectedCharacter);
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
                <Modal>
                    <CharacterSelectModal
                        selectedCharacter={matchupId}
                        showVs
                        handleCharacterSelect={onMatchupChange}
                    />
                </Modal>
            </ModalContextWrapper>
            <ModalContextWrapper
                showModal={showMatchupModal}
                closeModal={onMatchupModalClose}
                closeOnBgClick={false}
            >
                <Modal>
                    <MatchupModal
                        matchup={matchup}
                    />
                </Modal>
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
                            text={"Combos"}
                        />
                    </div>
                    <div
                        className='character-matchup__content__combos-notes__list'
                    >
                        {Object.keys(combosByLauncher).map(key => {
                            return combosByLauncher[key].map(combo => {
                                const parsedComboNote = stringNotationParser(combo.note);
                                return (
                                    <div
                                        key={combo.id}
                                        className={`character-matchup__content__combos-notes__list__combo${combo.favourite ? ' favourite' : ''}`}
                                    >
                                        <div
                                            className='character-matchup__content__combos-notes__list__combo__launcher'
                                        >
                                            <MoveCommand
                                                command={[...combo.launcher, "⊙", ...combo.command]}
                                            />
                                            <Button
                                                modifier={'damage'}
                                                text={combo.damage}
                                            />
                                        </div>
                                        {parsedComboNote &&
                                            <div
                                                className='character-matchup__content__combos-notes__list__combo__note'
                                            >
                                                <TextWithCommand
                                                    content={parsedComboNote}
                                                />
                                            </div>
                                        }
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