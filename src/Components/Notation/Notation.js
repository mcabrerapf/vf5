import React from 'react';
import './Notation.scss'
import { NOTATION_STRINGS, NOTATION_TO_ICON } from '../../constants';
import Icon from '../Icon';

const Notation = ({
    notation = '',
    modifier,
    notationIndex,
    isLauncherSeparator,
    isCombiStart,
    isCombiEnd,
    onClick = () => { }
}) => {
    const iconName = NOTATION_TO_ICON[notation];
    const iconColor = notation.includes('_') ? 'red' : 'white';
    const parsedCommand = notation.replace(/[[\]]/g, "");
    const commandClassName = NOTATION_STRINGS.includes(parsedCommand) ?
        parsedCommand.toLocaleLowerCase() : "";
    const andClass = parsedCommand === '+' ? 'and' : commandClassName;
    const startClass = isCombiStart ? 'combi-start' : '';
    const endClass = isCombiEnd ? 'combi-end' : '';
    const launcherModi = isLauncherSeparator ? 'launcher-separator' : '';
    const className = ['notation', modifier, startClass, endClass].filter(Boolean).join(' ')
    const iconClassName = ['notation__icon', andClass, launcherModi].filter(Boolean).join(' ')

    const handleOnClick = () => {
        onClick(notation, notationIndex);
    }

    return (

        <span
            className={className}
            onClick={handleOnClick}
        >
            {iconName ?
                <Icon icon={iconName} color={iconColor} />
                :
                <span
                    className={iconClassName}
                >
                    {parsedCommand}
                </span>
            }


        </span>

    )
}

export default Notation;