import './Matchup.scss'
import React from 'react';
import VSIcon from './VSIcon';
import Button from '../Button';
import { calculateWinRate } from '../../helpers';

const Matchup = ({
    matchup = {},
    handleMatchupUpdate,
    onVsClick
}) => {
    const { name, loses, wins, win_rate } = matchup;

    const onOponentClick = (e) => {
        e.preventDefault();
        handleMatchupUpdate({
            ...matchup,
            loses: loses + 1,
            win_rate: calculateWinRate(loses + 1, wins)
        })
    }

    const onPlayerClick = (e) => {
        e.preventDefault();
        handleMatchupUpdate({
            ...matchup,
            wins: wins + 1,
            win_rate: calculateWinRate(loses, wins + 1)
        })
    }

    const handleVsClick = () => {
        onVsClick(matchup);
    }

    return (
        <div className='matchup'>
            <div
                role='button'
                className='matchup__buttons'
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
                className='matchup__vs'
                onClick={handleVsClick}
            >
                <div
                    className='matchup__vs__icon'
                >
                    <VSIcon />
                </div>
                <div
                    className='matchup__vs__win-rate'
                >
                    {win_rate}%
                </div>
            </div>
            <div
                role='button'
                className='matchup__character'
                onClick={handleVsClick}
            >
                <div
                    className='matchup__character__name'
                >
                    <div>
                        {name}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Matchup;