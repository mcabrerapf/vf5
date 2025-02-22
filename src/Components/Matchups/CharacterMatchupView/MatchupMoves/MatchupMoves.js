import './MatchupMoves.scss'
import React from 'react'
import { CHARACTERS_JSON } from '../../../../constants';
import Move from '../../../Move';

const MatchupMoves = ({
    selectedCharacter,
    moves
}) => {
    const {
        move_categories: moveCategories,
        movelist_filter_options: movelistFilterOptions,
    } = CHARACTERS_JSON[selectedCharacter];

    const attackLevelOptions = movelistFilterOptions.filter(fOption => fOption.key === 'attack_level');

    return (
        <div
            className="matchup-moves"
        >
            <div
                className='matchup-moves__list'
            >
                {moves.map(move => {
                    return (
                        <Move
                            key={move.id}
                            move={move}
                            showSimpleView
                            hideEditButton
                            hideFavouriteButton
                            moveCategories={moveCategories}
                            attackLevelOptions={attackLevelOptions}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default MatchupMoves;