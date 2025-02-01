import React from 'react';
import './CharacterBadge.scss'
import Button from '../Button';

const CharacterBadge = ({
    character,
    modifier,
    value,
    onClick = () => { }
}) => {
    const className = ['character-badge', modifier].filter(Boolean).join(' ');

    return (
        <Button
            role='button'
            modifier={className}
            value={value || character}
            text={character}
            onClick={onClick}
        >
        </Button>
    )
}

export default CharacterBadge;