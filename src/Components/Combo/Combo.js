import React from 'react';
import './Combo.scss'
import MoveCommand from '../MoveCommand';
import CharacterBadge from '../CharacterBadge';
import MoveTypeBadge from '../MoveTypeBadge';
import { CHARACTERS } from '../../constants';
import { getLauncher } from '../../helpers';

const Combo = ({
    combo = {},
    onClick = () => { },
    onCharacterClick = () => { },
    onTagClick = () => { }
}) => {
    const { tags, characterTags, command, damage, note } = combo || {};
    const hasAllCharacters = CHARACTERS.length === characterTags.length;

    const handleComboClick = (e) => {
        onClick(e);
    }

    const handleTagClick = (e) => {
        e.stopPropagation();
        onTagClick(e);
    }

    const handleCharacterClick = (e) => {
        e.stopPropagation();
        onCharacterClick(e)
    }

    const [, restOfCombo, launcher] = getLauncher(command);

    if (restOfCombo[0] === 'ch') {
        launcher.push(restOfCombo[0]);
        restOfCombo.shift();
    }
    if (restOfCombo[0] === '⊙') restOfCombo.shift();

    return (
        <div className='combo' onClick={handleComboClick}>
            <div className='combo__main'>
                <div className='combo__main__notation'>
                    <MoveCommand
                        modifier={"launcher"}
                        command={launcher}
                    />
                    {!!restOfCombo.length &&
                        <MoveCommand
                            command={restOfCombo}
                        />
                    }
                </div>
                <div className='combo__main__damage'>{damage}</div>
            </div>

            {note &&
                <div className='combo__note'>
                    {note}
                </div>
            }
            <div className='combo__tags'>
                {hasAllCharacters &&
                    <CharacterBadge
                        modifier={"selected"}
                        character={'ALL'}
                        onClick={handleCharacterClick}
                    />
                }
                {!hasAllCharacters && characterTags.map(characterTag =>
                    <CharacterBadge
                        modifier={"selected"}
                        character={characterTag}
                        onClick={handleCharacterClick}
                    />
                )}
            </div>
            <div className='combo__tags'>
                {tags.map(tag =>
                    <MoveTypeBadge
                        moveType={tag}
                        onClick={handleTagClick}
                    />
                )}
            </div>
        </div>
    )
}

export default Combo;