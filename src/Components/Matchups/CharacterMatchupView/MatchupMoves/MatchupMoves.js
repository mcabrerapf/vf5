import './MatchupMoves.scss'
import React, { useState } from 'react'
import Button from '../../../Button'
import { ChevronDown, ChevronUp } from '../../../Icon';
import { getCustomMoves } from '../../../../services';
import { CHARACTERS_JSON } from '../../../../constants';
import Move from '../../../Move';

const MatchupMoves = ({
    selectedCharacter,
}) => {
    const [showMoves, setShowMoves] = useState(true);
    const {
        movelist,
        move_categories: moveCategories,
        movelist_filter_options: movelistFilterOptions,
    } = CHARACTERS_JSON[selectedCharacter];
    const customMoves = getCustomMoves(selectedCharacter);

    const favouriteMoves = customMoves.map(cMove => {
        if (!cMove.favourite) return null;
        const moveMatch = movelist.all_moves.find(move => move.id === cMove.id);
        if (!moveMatch) return null;
        return { ...moveMatch, note: cMove.note || moveMatch.note };
    }).filter(Boolean)
    const attackLevelOptions = movelistFilterOptions.filter(fOption => fOption.key === 'attack_level');

    const hasNoMoves = !favouriteMoves?.length;
    
    return (
        <div
            children="matchup-moves"
        >
            <div
                className='matchup-moves__header'
            >
                <Button
                    disabled={hasNoMoves}
                    modifier={'active center'}
                    onClick={() => setShowMoves(!showMoves)}
                >
                    <span>MOVES</span>
                    {showMoves ? <ChevronDown /> : <ChevronUp />}
                </Button>
            </div>
            <div
                className='matchup-moves__list'
            >
                {showMoves && favouriteMoves.map(move => {
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