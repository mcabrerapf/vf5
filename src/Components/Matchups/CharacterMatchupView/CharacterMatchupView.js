import React from 'react';
import './CharacterMatchupView.scss'
import { useMainContext } from '../../../Contexts/MainContext';
import { getCombos } from '../../../services';
import Button from '../../Button';
import { MoveLeft } from '../../Icon';
import TextWithCommand from '../../TextWithCommand';
import { sortList, stringNotationParser } from '../../../helpers';
import MoveCommand from '../../MoveCommand';

const CharacterMatchupView = ({
    matchup = {},
    setMatchupsView = () => { }
}) => {
    const { id: matchupId, note } = matchup
    const { selectedCharacter } = useMainContext();
    const combos = getCombos(selectedCharacter);
    const matchupCombos = combos.filter(combo => !!combo.character_tags.includes(matchupId))
    const parsedNote = stringNotationParser(note);
    const sortedCombos = sortList(matchupCombos, {
        key: 'launcher',
        dir: 'dsc',
        type: "array",
    });
    return (
        <div
            className='character-matchup'
        >
            <div
                className='character-matchup__header'
            >
                <Button
                    modifier={"back-button"}
                    onClick={() => setMatchupsView('ALL')}
                >
                    <MoveLeft />
                </Button>
                <div
                    className='character-matchup__header__name'
                >
                    {matchup.name}
                </div>
            </div>
            <div
                className='character-matchup__content'
            >
                {parsedNote &&
                    <div
                        className='character-matchup__content__note'
                    >
                        <TextWithCommand
                            content={parsedNote}
                        />
                    </div>
                }
                <div
                    className='character-matchup__content__combos'
                >
                    <div
                        className='character-matchup__content__combos__header'
                    >
                        Combos
                    </div>
                    <div
                        className='character-matchup__content__combos__list'
                    >
                        {sortedCombos.map(combo => {
                            return (
                                <div
                                    key={combo.id}
                                    className='character-matchup__content__combos__list__combo'
                                >
                                    <MoveCommand
                                        modifier={"launcher"}
                                        command={combo.launcher}
                                    />
                                    <MoveCommand
                                        command={combo.command}
                                    />
                                </div>
                            )
                        })}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default CharacterMatchupView;