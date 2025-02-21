import React from 'react';
import './MoveCommand.scss'
import { checkIsCombiEnd, checkIsCombiStart } from './helpers';
import Notation from '../Notation';

const MoveCommand = ({
    command,
    modifier = '',
    selectedNotationIndex,
    onClick = () => { },
    notationClick = () => { }
}) => {
    const className = ['move-command', modifier].filter(Boolean).join(' ');
    let launcherSeapartorIndex;
    if (!command) return null;
    return (
        <div className={className} onClick={onClick}>
            {command.map((notation, i) => {
                const isCombiStart = checkIsCombiStart(command, i);
                const isCombiEnd = checkIsCombiEnd(command, i);
                const modifierToUse = selectedNotationIndex === i ? 'selected' : null;
                if (notation === '⊙' && launcherSeapartorIndex === undefined) launcherSeapartorIndex = i;
                return (
                    <Notation
                        key={`${notation}-${i}`}
                        notation={notation}
                        notationIndex={i}
                        modifier={modifierToUse}
                        isLauncherSeparator={launcherSeapartorIndex === i}
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