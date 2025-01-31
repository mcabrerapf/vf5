import React from 'react';
import './MoveNotation.scss'
import { NOTATION_TO_ICON } from './constants';
import Icon from '../Icon';
import { checkIsCombiEnd, checkIsCombiStart } from './helpers';

const MoveNotation = ({ command }) => {
    
    return (
        <div className='move-notation'>
            {command.map((notation, i) => {
                const iconName = NOTATION_TO_ICON[notation];
                const iconColor = notation.includes('_') ? 'red' : 'white';
                const parsedCommand = notation.replace(/[[\]]/g, "")
                const isCombiStart = checkIsCombiStart(command, i);
                const isCombiEnd = checkIsCombiEnd(command, i);

                return (
                    <>
                        {isCombiStart &&
                            <div
                                key={`${notation}-${i}-start`}
                                className="move-notation__command combi"
                            >
                                [
                            </div>
                        }
                        <div
                            key={`${notation}-${i}`}
                            className={`move-notation__command ${parsedCommand === '+' ? 'and' : parsedCommand}`}
                        >
                            {iconName && <Icon icon={iconName} color={iconColor} />}
                            {!iconName && <div>{parsedCommand}</div>}
                        </div>
                        {isCombiEnd &&
                            <div
                                key={`${notation}-${i}-end`}
                                className="move-notation__command combi"
                            >
                                ]
                            </div>
                        }
                    </>

                )
            }
            )}
        </div>
    )
}

export default MoveNotation;