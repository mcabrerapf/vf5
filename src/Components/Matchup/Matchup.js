import './Matchup.scss'
import React from 'react';
import VSIcon from './VSIcon';
import { calculateWinRate } from '../../helpers';

const Matchup = ({
    matchup = {},
    selectedCharacterName,
    updateMatchups,
    onVsClick
}) => {
    const { name, loses, wins, win_rate } = matchup;

    const onOponentClick = (e) => {
        e.preventDefault();
        updateMatchups({
            ...matchup,
            loses: loses + 1,
            win_rate: calculateWinRate(loses + 1, wins)
        })
    }

    const onPlayerClick = (e) => {
        e.preventDefault();
        updateMatchups({
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
                className='matchup__character'
                onClick={onOponentClick}
            >
                <div
                    className='matchup__character__name oponent'
                >
                    <span>
                        {name}
                    </span>
                </div>
                <div
                    className='matchup__character__stats'
                >
                    {loses}
                </div>

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
                onClick={onPlayerClick}
            >
                <div
                    className='matchup__character__name'
                >
                    <span>
                        {selectedCharacterName}
                    </span>

                </div>
                <div
                    className='matchup__character__stats'
                >
                    {wins}
                </div>
            </div>
        </div>
    )
}

export default Matchup;