import React from 'react';
import './MoveNotation.scss'
import { NOTATION_TO_ICON } from './constants';
import Icon from '../Icon';

const MoveNotation = ({ command }) => {
    const iconName = NOTATION_TO_ICON[command];
    const iconColor = command.includes('_') ? 'red' : 'white';
    const parsedCommand = command.replace(/[[\]]/g, "")

    return (
        <div className='move-notation'>
            <div
                className={`move-notation__command ${parsedCommand === '+' ? 'and' : parsedCommand}`}
            >
                {iconName && <Icon icon={iconName} color={iconColor} />}
                {!iconName && parsedCommand}
            </div>

        </div>
    )
}

export default MoveNotation;