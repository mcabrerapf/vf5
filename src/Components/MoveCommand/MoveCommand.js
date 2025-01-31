import React from 'react';
import './MoveCommand.scss'
import { checkIsCombiEnd, checkIsCombiStart } from './helpers';
import Notation from '../Notation/Notation';

const MoveCommand = ({ command }) => {

    return (
        <div className='move-command'>
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