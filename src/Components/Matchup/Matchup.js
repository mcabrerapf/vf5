import './Matchup.scss'
import React, { useState } from 'react';
import { VsIcon } from '../Icon';
import Button from '../Button';
import { calculateWinRate, stringNotationParser } from '../../helpers';
import TextWithCommand from '../TextWithCommand';

const Matchup = ({
    matchup = {},
    hideNote = false,
    handleMatchupUpdate = () => { },
    onNameClick = () => { }
}) => {
    const { name, loses, wins, total, win_rate, note } = matchup;
    const [showNote, setShowNote] = useState(true);

    const onOponentClick = (e) => {
        e.preventDefault();
        handleMatchupUpdate({
            ...matchup,
            loses: loses + 1,
            total: wins + loses + 1,
            win_rate: calculateWinRate(loses + 1, wins)
        })
    }

    const onPlayerClick = (e) => {
        e.preventDefault();
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

    const toggleShowNote = () => {
        setShowNote(!showNote);
    }

    const parsedNote = stringNotationParser(note);

    return (
        <div className='matchup'
        >
            <div className='matchup__content'
            >
                <div
                    role='button'
                    className='matchup__content__buttons'
                >
                    <Button
                        onClick={onOponentClick}
                        modifier={'loses'}
                        text={loses}
                    />
                    <Button
                        onClick={onPlayerClick}
                        modifier={'wins'}
                        text={wins}
                    />
                </div>
                <div
                    role='button'
                    className='matchup__content__vs'
                    onClick={toggleShowNote}

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