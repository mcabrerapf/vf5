import React from 'react';
import './Combo.scss'
import MoveCommand from '../MoveCommand';
import CharacterBadge from '../CharacterBadge';
import { CHARACTERS } from '../../constants';

const Combo = ({
    combo = {},
    onClick = () => { }
}) => {
    const { tags, characterTags, command, damage, note } = combo || {};
    const hasAllCharacters = CHARACTERS.length === characterTags.length;

    return (
        <div className='combo' onClick={onClick}>
            <div className='combo__main'>
                <MoveCommand
                    command={command}
                />
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
                    />
                }
                {!hasAllCharacters && characterTags.map(characterTag =>
                    <CharacterBadge
                        modifier={"selected"}
                        character={characterTag}
                    />
                )}
            </div>
            <div className='combo__tags'>
                {tags.map(tag =>
                    <CharacterBadge
                        modifier={"selected"}
                        character={tag}
                    />
                )}
            </div>
        </div>
    )
}

export default Combo;