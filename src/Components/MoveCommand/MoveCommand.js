import React from 'react';
import './MoveCommand.scss'
import { checkIsCombiEnd, checkIsCombiStart } from './helpers';
import Notation from '../Notation/Notation';

const MoveCommand = ({
    command,
    notationModifier,
    selectedNotationIndex,
    onClick,
    notationClick }) => {

    return (
        <div className='move-command' onClick={onClick}>
            {command.map((notation, i) => {
                const isCombiStart = checkIsCombiStart(command, i);
                const isCombiEnd = checkIsCombiEnd(command, i);
                const modifierToUse = selectedNotationIndex === i ? notationModifier : null;
                
                return (
                    <Notation
                        notation={notation}
                        notationIndex={i}
                        modifier={modifierToUse}
                        isCombiStart={isCombiStart}
                        isCombiEnd={isCombiEnd}
                        onClick={notationClick}
                    />
                )
            }
            )}
        </div>
    )
}

export default MoveCommand;