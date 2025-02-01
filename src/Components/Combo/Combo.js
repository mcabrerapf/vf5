import React from 'react';
import './Combo.scss'
import MoveCommand from '../MoveCommand';
import CharacterBadge from '../CharacterBadge';

const Combo = ({
    combo = {},
    onClick = () => { }
}) => {
    console.log('Combo');

    return (
        <div className='combo' onClick={onClick}>
            <MoveCommand
                command={combo.command}
            />
            <div className='combo__tags'>
                {combo.tags.map(tag =>
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