import './Move.scss'
import React from 'react';
import SortableMoveProp from './MoveSortableProp';
import MoveCommand from '../MoveCommand';
import MoveTypeBadge from '../MoveTypeBadge';
import Button from '../Button';
import { ATTACK_LEVELS_NAME_TO_ID, MOVELIST_SORT_OPTIONS } from '../../constants';
import { getDodgeValue } from './helpers';

const Move = ({
    move,
    extraNote,
    selectedSort,
    moveCategories,
    isFavourite = false,
    modifier = "",
    handleSortChange = () => { },
    onMoveClick = () => { },
    onMoveCategoryClick = () => { },
    handleSortDirChange = () => { },
    onFavouriteClick = () => { },
    onCommandClick = () => { },
    onMoveTypeClick = () => { }
}) => {
    const {
        id,
        // active,
        // total,
        // recovery_c
        // crouch_c_hit
        // crouch_hit
        command,
        category,
        c_hit,
        damage,
        dodge_direction,
        startup,
        gd,
        attack_level,
        move_name,
        hit,
        notes,
        sober,
    } = move;

    const handleOnClick = (e) => {
        e.preventDefault()
        onMoveClick(move)
    }

    const handleOnMoveTypeClick = (e) => {
        e.stopPropagation();
        onMoveTypeClick(move.attack_level);
    }

    const handleOnCategoryClick = (e) => {
        e.stopPropagation();
        onMoveCategoryClick(e);
    }

    const handleOnCommandClick = (e) => {
        e.stopPropagation();
        onCommandClick(command.join(''))

    }

    const handleFavouriteClick = (e) => {
        e.stopPropagation();
        onFavouriteClick(id);
    }

    const onSortablePropClick = (newSort) => {
        if (newSort === selectedSort.id) {
            handleSortDirChange();
            return;
        }
        const newSortValue = MOVELIST_SORT_OPTIONS
            .find(sOption => sOption.id === newSort);

        if (!newSortValue) return;
        handleSortChange(newSortValue);
    }

    const favouriteModifier = isFavourite ? 'favourite' : '';
    const className = ['move', modifier, favouriteModifier].filter(Boolean).join(' ');
    const parsedLevel = ATTACK_LEVELS_NAME_TO_ID[attack_level] || attack_level;
    const { name: categoryName } = moveCategories.find(cat => cat.id === category) || '';
    const dodgeValue = getDodgeValue(dodge_direction);

    return (
        <div className={className} onClick={handleOnClick}>
            <div className='move__main'>
                <div className={`move__main__name  ${favouriteModifier}`}
                    role='button'
                >
                    {move_name}
                </div>
                <div className='move__main__badges'>
                    <MoveTypeBadge
                        modifier={parsedLevel}
                        value={parsedLevel}
                        moveType={attack_level}
                        onClick={handleOnMoveTypeClick}
                    />
                    <Button
                        onClick={handleFavouriteClick}
                        modifier={isFavourite ? 'small favourite' : 'small'}
                        text={'★'}
                    />
                </div>

            </div>
            <div className='move__category'>
                <MoveTypeBadge
                    modifier={'active'}
                    moveType={categoryName}
                    onClick={handleOnCategoryClick}
                />
            </div>
            <div className='move__props other'>
                <SortableMoveProp
                    propKey={'damage'}
                    activeSortId={selectedSort.id}
                    value={damage}
                    onClick={onSortablePropClick}
                />
                <SortableMoveProp
                    propKey={'dodge_direction'}
                    text={'dodge'}
                    activeSortId={selectedSort.id}
                    value={dodgeValue}
                    onClick={onSortablePropClick}
                />
                <SortableMoveProp
                    propKey={'sober'}
                    activeSortId={selectedSort.id}
                    value={sober}
                    onClick={onSortablePropClick}
                />
            </div>
            <div className='move__props frame-data'>
                <SortableMoveProp
                    propKey={'startup'}
                    activeSortId={selectedSort.id}
                    value={startup}
                    onClick={onSortablePropClick}
                />
                <SortableMoveProp
                    propKey={'hit'}
                    activeSortId={selectedSort.id}
                    value={hit}
                    doFrameCheck
                    onClick={onSortablePropClick}
                />
                <SortableMoveProp
                    propKey={'c_hit'}
                    text={"counter"}
                    activeSortId={selectedSort.id}
                    value={c_hit}
                    doFrameCheck
                    onClick={onSortablePropClick}
                />
                <SortableMoveProp
                    propKey={'gd'}
                    text={'block'}
                    activeSortId={selectedSort.id}
                    value={gd}
                    doFrameCheck
                    onClick={onSortablePropClick}
                />
            </div>
            <MoveCommand
                onClick={handleOnCommandClick}
                command={command}
            />
            <div className='move__notes'>
                {extraNote || notes}
            </div>
        </div>
    )
}

export default Move;