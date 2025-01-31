import React from 'react';
import './Notation.scss'
import { NOTATION_TO_ICON } from '../../constants';
import Icon from '../Icon';

const Notation = ({
    notation = '',
    isCombiStart,
    isCombiEnd,
    onClick = () => { }
}) => {
    const iconName = NOTATION_TO_ICON[notation];
    const iconColor = notation.includes('_') ? 'red' : 'white';
    const parsedCommand = notation.replace(/[[\]]/g, "")

    const handleOnClick = () => {
        onClick(notation);
    }
    return (
        <>
            {isCombiStart &&
                <div
                    className="notation combi"
                >
                    [
                </div>
            }
            <div
                className={`notation ${parsedCommand === '+' ? 'and' : parsedCommand}`}
                onClick={handleOnClick}
            >
                {iconName && <Icon icon={iconName} color={iconColor} />}
                {!iconName && <div>{parsedCommand}</div>}
            </div>
            {isCombiEnd &&
                <div
                    className="notation combi"
                >
                    ]
                </div>
            }
        </>
    )
}

export default Notation;