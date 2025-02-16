import './Matchup.scss'
import React, { useState } from 'react';
import { VsIcon } from '../Icon';
import Button from '../Button';
import { calculateWinRate, stringNotationParser } from '../../helpers';
import TextWithCommand from '../TextWithCommand';

const Matchup = ({
    matchup = {},
    hideNote = false,
    disableButtons = false,
    onClick = () => { },
    handleMatchupUpdate = () => { },
    onNameClick = () => { },
    onVsClick = () => { },
}) => {
    const { name, loses, wins, total, win_rate, note } = matchup;
    const [showNote, setShowNote] = useState(true);

    const onOponentClick = (e) => {
        e.stopPropagation();
        handleMatchupUpdate({
            ...matchup,
            loses: loses + 1,
            total: wins + loses + 1,
            win_rate: calculateWinRate(loses + 1, wins)
        })
    }

    const onPlayerClick = (e) => {
        e.stopPropagation();
        handleMatchupUpdate({
            ...matchup,
            wins: wins + 1,
            total: wins + loses + 1,
            win_rate: calculateWinRate(loses, wins + 1)
        })
    }

    const handleNameClick = () => {
        onNameClick(matchup);
    }

    const handleVsClick = () => {
        onVsClick(matchup);
    }

    const handleOnClick = () => {
        onClick(matchup);
    }

    const parsedNote = stringNotationParser(note);

    return (
        <div
            className='matchup'
            onClick={handleOnClick}
        >
            <div className='matchup__content'
            >
                <div
                    role='button'
                    className='matchup__content__buttons'
                >
                    <Button
                        onClick={(e) => disableButtons ? handleNameClick() : onPlayerClick(e)}
                        modifier={'wins'}
                        text={wins}
                    />
                    <Button
                        onClick={(e) => disableButtons ? handleNameClick() : onOponentClick(e)}
                        modifier={'loses'}
                        text={loses}
                    />
                </div>
                <div
                    role='button'
                    className='matchup__content__vs'
                    onClick={handleVsClick}

                >
                    <div
                        className='matchup__content__vs__icon'
                    >
                        <VsIcon />
                    </div>
                    <div
                        className='matchup__content__vs__win-rate'
                    >
                        {`${win_rate}%(${total})`}
                    </div>

                </div>
                <div
                    role='button'
                    className='matchup__content__character'
                    onClick={handleNameClick}
                >
                    <div
                        className='matchup__content__character__name'
                    >
                        {name}
                    </div>
                </div>
            </div>
            {!hideNote && showNote && !!note &&
                <div className='matchup__note'>
                    <TextWithCommand
                        content={parsedNote}
                    />
                </div>
            }
        </div>

    )
}

export default Matchup;