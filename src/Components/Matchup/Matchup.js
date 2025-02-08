import './Matchup.scss'
import React from 'react';
import VSIcon from './VSIcon';
import Button from '../Button';
import { calculateWinRate, stringNotationParser } from '../../helpers';
import TextWithCommand from '../TextWithCommand';

const Matchup = ({
    matchup = {},
    hideNote = false,
    handleMatchupUpdate,
    onVsClick
}) => {
    const { name, loses, wins, win_rate, note } = matchup;

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

    const handleVsClick = () => {
        onVsClick(matchup);
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
                    onClick={handleVsClick}
                >
                    <div
                        className='matchup__content__vs__icon'
                    >
                        <VSIcon />
                    </div>
                    <div
                        className='matchup__content__vs__win-rate'
                    >
                        {win_rate}%
                    </div>
                </div>
                <div
                    role='button'
                    className='matchup__content__character'
                    onClick={handleVsClick}
                >
                    <div
                        className='matchup__content__character__name'
                    >
                        <div>
                            {name}
                        </div>
                    </div>
                </div>
            </div>
            {!hideNote && !!note &&
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