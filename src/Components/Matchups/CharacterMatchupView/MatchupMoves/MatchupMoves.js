import './MatchupMoves.scss'
import React from 'react'
import { CHARACTERS_JSON } from '../../../../constants';
import Move from '../../../Move';

const MatchupMoves = ({
    selectedCharacter,
    moves,
    showSimpleView
}) => {

    const {
        movelist,
        move_categories: moveCategories,
        movelist_filter_options: movelistFilterOptions,
    } = CHARACTERS_JSON[selectedCharacter];

    const favouriteMoves = moves.map(cMove => {
        if (!cMove.favourite) return null;
        const moveMatch = movelist.all_moves.find(move => move.id === cMove.id);
        if (!moveMatch) return null;
        return { ...moveMatch, note: cMove.note || moveMatch.note };
    }).filter(Boolean)

    const attackLevelOptions = movelistFilterOptions.filter(fOption => fOption.key === 'attack_level');

    return (
        <div
            className="matchup-moves"
        >
            <div
                className='matchup-moves__list'
            >
                {favouriteMoves.map(move => {
                    return (
                        <Move
                            key={move.id}
                            hideEditButton
                            move={move}
                            showSimpleView={showSimpleView}
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