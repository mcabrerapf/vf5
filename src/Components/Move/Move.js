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
    selectedSort = {},
    moveCategories = [],
    selectedMoveCategory = '',
    customMoves = [],
    modifier = "",
    selectedFilters = [],
    hideNote,
    showSimpleView = false,
    handleFiltersChange = () => { },
    handleSortChange = () => { },
    onMoveClick = () => { },
    onMoveCategoryClick = () => { },
    handleSortDirChange = () => { },
    onFavouriteClick = () => { },
    onCommandClick = () => { },
    onMoveTypeClick = () => { }
}) => {
    if (!move) return null;
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

    const dodgeFilter = selectedFilters.find(filter => filter.prefix === 'dodge');
    const dodgeValue = getDodgeValue(dodge_direction);
    const isSelectedDodge = dodgeFilter && dodgeFilter.id === dodge_direction;
    const customMatch = customMoves.find(fMove => fMove.id === move.id) || {};
    const isFavourite = !!customMatch.favourite;
    const extraNote = customMatch.note;
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
        onCommandClick(command.join('-'))

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

    const onDodgeClick = (e) => {
        e.stopPropagation();
        let updatedFilters
        const newDodgeFilter = {
            id: dodge_direction,
            prefix: 'dodge',
            name: `Dodge (${dodgeValue})`
        };
        if (dodgeFilter) {
            updatedFilters = isSelectedDodge ?
                selectedFilters.filter(fOption => fOption.prefix !== 'dodge')
                :
                selectedFilters.map(fOption => {
                    if (fOption.prefix === 'dodge') return newDodgeFilter;
                    return fOption;
                })
        } else {
            updatedFilters = [
                ...selectedFilters,
                newDodgeFilter
            ]
        }
        handleFiltersChange(updatedFilters);
    }

    const favouriteModifier = isFavourite ? 'favourite' : '';
    const className = ['move', modifier, favouriteModifier].filter(Boolean).join(' ');
    const parsedLevel = ATTACK_LEVELS_NAME_TO_ID[attack_level] || attack_level;
    const { name: categoryName } = moveCategories.find(cat => cat.id === category) || '';


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
                <Button
                    modifier={isSelectedDodge ? 'active dodge' : 'not-selected dodge'}
                    text={dodgeValue}
                    onClick={onDodgeClick}
                />
                <MoveTypeBadge
                    modifier={selectedMoveCategory === category ? 'active' : 'not-selected'}
                    moveType={categoryName}
                    onClick={handleOnCategoryClick}
                />
            </div>
            {!showSimpleView &&
                <div className='move__props other'>
                    <SortableMoveProp
                        propKey={'damage'}
                        activeSortId={selectedSort.id}
                        value={damage}
                        onClick={onSortablePropClick}
                    />
                    <SortableMoveProp
                        propKey={'startup'}
                        activeSortId={selectedSort.id}
                        value={startup}
                        onClick={onSortablePropClick}
                    />
                    <SortableMoveProp
                        propKey={'sober'}
                        activeSortId={selectedSort.id}
                        value={sober}
                        onClick={onSortablePropClick}
                    />
                </div>
            }
            {!showSimpleView &&
                <div className='move__props frame-data'>

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
            }
            <MoveCommand
                onClick={handleOnCommandClick}
                command={command}
            />
            {!hideNote &&
                <div className='move__notes'>
                    {extraNote || notes}
                </div>
            }
        </div>
    )
}

export default Move;