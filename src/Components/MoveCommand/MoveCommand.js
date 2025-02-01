import React from 'react';
import './MoveCommand.scss'
import { checkIsCombiEnd, checkIsCombiStart } from './helpers';
import Notation from '../Notation/Notation';

const MoveCommand = ({ command, onClick }) => {

    return (
        <div className='move-command' onClick={onClick}>
            {command.map((notation, i) => {
                const isCombiStart = checkIsCombiStart(command, i);
                const isCombiEnd = checkIsCombiEnd(command, i);

                return (
                    <Notation
                        notation={notation}
                        isCombiStart={isCombiStart}
                        isCombiEnd={isCombiEnd}
                    />
                )
            }
            )}
        </div>
    )
}

export default MoveCommand;