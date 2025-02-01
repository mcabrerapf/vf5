import React from 'react';
import './MoveTypeBadge.scss'
import Button from '../Button';

const MoveTypeBadge = ({
    moveType,
    modifier,
    value,
    onClick = () => { }
}) => {
    const className = ['move-type-badge', modifier, moveType].filter(Boolean).join(' ');

    return (
        <Button
            role='button'
            modifier={className}
            value={value || moveType}
            text={moveType}
            onClick={onClick}
        >
        </Button>
    )
}

export default MoveTypeBadge;