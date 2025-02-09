import React from 'react';
import './Notation.scss'
import { NOTATION_TO_ICON } from '../../constants';
import Icon from '../Icon';

const Notation = ({
    notation = '',
    modifier,
    notationIndex,
    isCombiStart,
    isCombiEnd,
    onClick = () => { }
}) => {
    const iconName = NOTATION_TO_ICON[notation];
    const iconColor = notation.includes('_') ? 'red' : 'white';
    const parsedCommand = notation.replace(/[[\]]/g, "");
    const commandClassName = parsedCommand.toLocaleLowerCase();
    const className = ['notation', modifier].filter(Boolean).join(' ')

    const handleOnClick = () => {
        onClick(notation, notationIndex);
    }

    return (
        <>
            {isCombiStart &&
                <span
                    className="notation combi"
                >
                    {"["}
                </span>
            }
            <span
                className={`${className} ${parsedCommand === '+' ? 'and' : commandClassName}`}
                onClick={handleOnClick}
            >
                {iconName && <Icon icon={iconName} color={iconColor} />}
                {!iconName && parsedCommand}
            </span>
            {isCombiEnd &&
                <span
                    className="notation combi"
                >
                    {"]"}
                </span>
            }
        </>
    )
}

export default Notation;