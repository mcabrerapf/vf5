import React from 'react';
import './Combo.scss'
import MoveCommand from '../MoveCommand';
import CharacterBadge from '../CharacterBadge';
import { CHARACTERS } from '../../constants';

const Combo = ({
    combo = {},
    onClick = () => { }
}) => {
    const hasAllCharacters = CHARACTERS.length === combo.tags.length;
    return (
        <div className='combo' onClick={onClick}>
            <MoveCommand
                command={combo.command}
            />
            <div className='combo__tags'>
                {hasAllCharacters &&
                    <CharacterBadge
                        modifier={"selected"}
                        character={'ALL'}
                    />
                }
                {!hasAllCharacters && combo.tags.map(tag =>
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