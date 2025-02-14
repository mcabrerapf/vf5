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

const CharacterMatchupView = ({
    matchup = {},
    setMatchups = () => { },
    setMatchupsView = () => { }
}) => {
    const { id: matchupId, note } = matchup
    const { short_name } = CHARACTERS_JSON[matchupId];
    const [matchupView, setMatchupView] = useState('combos');
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

    return (
        <div
            className='character-matchup'
        >
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
                        onClick={() => setMatchupsView('ALL')}
                    >
                        <MoveLeft />
                        <VsIcon />
                    </Button>

                    <div
                        className='character-matchup__header__left__name'
                        onClick={() => setMatchupsView('ALL')}
                    >
                        <span
                            className='character-matchup__header__left__name__name'
                        >
                            {short_name}
                        </span>
                        <span
                            className='character-matchup__header__left__name__wins'
                        >
                            {matchup.wins}
                        </span>
                        -
                        <span
                            className='character-matchup__header__left__name__loses'
                        >
                            {matchup.loses}
                        </span>
                        -
                        <span
                            className='character-matchup__header__left__name__win-rate'
                        >
                            {matchup.win_rate}%({matchup.total})
                        </span>
                    </div>
                </div>

                <Button
                    modifier={"edit-button"}
                    onClick={toggleMatchupModal}
                >
                    <EditIcon />
                </Button>

            </div>
            <div
                className='character-matchup__content'
            >
                <div
                    className='character-matchup__content__combos-notes'
                >
                    <div
                        className='character-matchup__content__combos-notes__header'
                    >
                        <Button
                            modifier={matchupView === 'combos' ? 'active center' : 'center'}
                            text={"Combos"}
                            onClick={() => setMatchupView('combos')}
                        />
                        <Button
                            modifier={matchupView === 'notes' ? 'active center' : 'center'}
                            onClick={() => setMatchupView('notes')}
                            text={"Notes"}
                        />
                    </div>
                    <div
                        className='character-matchup__content__combos-notes__list'
                    >
                        {matchupView === 'notes' && parsedNote &&
                            <div
                                className='character-matchup__content__combos-notes__list__note'
                            >
                                <TextWithCommand
                                    content={parsedNote}
                                />
                            </div>
                        }
                        {Object.keys(combosByLauncher).map(key => {
                            if (matchupView === 'notes') return null;
                            return combosByLauncher[key].map(combo => {
                                return (
                                    <div
                                        key={combo.id}
                                        className='character-matchup__content__combos-notes__list__combo'
                                    >
                                        <div
                                            className='character-matchup__content__combos-notes__list__combo__launcher'
                                        >
                                            <MoveCommand
                                                command={[...combo.launcher, "⊙", ...combo.command]}
                                            />
                                            <Button
                                                text={combo.damage}
                                            />
                                        </div>
                                  
                                    </div>
                                )
                            })
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CharacterMatchupView;