import React from 'react';
import './MoveTypeBadge.scss'
import Button from '../Button';

const MoveTypeBadge = ({
    moveType,
    modifier,
    value,
    disabled=false,
    onClick = () => { }
}) => {
    const className = ['move-type-badge', modifier].filter(Boolean).join(' ');

    return (
        <Button
            role='button'
            disabled={disabled}
            modifier={className}
            value={value || moveType}
            text={moveType}
            onClick={onClick}
        >
        </Button>
    )
}

export default MoveTypeBadge;