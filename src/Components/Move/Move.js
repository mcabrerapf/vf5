import './Move.scss'
import React from 'react';
import SortableProp from './SortableProp';
import MoveCommand from '../MoveCommand';
import MoveTypeBadge from '../MoveTypeBadge';
import TextWithCommand from '../TextWithCommand';
import Button from '../Button';
import { ATTACK_LEVELS_NAME_TO_ID, MOVELIST_SORT_OPTIONS } from '../../constants';
import { getDodgeValue } from './helpers';
import { EditIcon } from '../Icon';
import { stringNotationParser } from '../../helpers';

const Move = ({
    move,
    selectedSort = {},
    moveCategories = [],
    selectedMoveCategory = '',
    customMoves = [],
    modifier = "",
    selectedFilters = [],
    hideEditButton = false,
    hideNote = false,
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
        notes = '',
        sober,
    } = move;

    const dodgeFilter = selectedFilters.find(filter => filter.prefix === 'dodge');
    const isCommandFilterActive = !!selectedFilters.find(filter => filter.prefix === 'command');
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
    const onNameClick = (e) => {
        e.stopPropagation();
        onSortablePropClick('move_name')
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
    const nameModifier = selectedSort.id === 'move_name' && 'sort-selected';
    const nameClassName = ['move__main__name', nameModifier, favouriteModifier]
        .filter(Boolean)
        .join(' ');

    const parsedNote = stringNotationParser(extraNote || notes);
    return (
        <div
            className={className}
            onClick={handleOnClick}
        >
            <div className='move__main'>
                <div
                    className={nameClassName}
                    onClick={onNameClick}
                    role='button'
                >
                    {move_name}
                </div>
                <div className='move__main__badges'>
                    <Button
                        onClick={handleFavouriteClick}
                        modifier={isFavourite ? ' favourite' : ''}
                        text={'★'}
                    />
                    {!hideEditButton &&
                        <Button
                            onClick={onMoveClick}
                        >
                            <EditIcon />
                        </Button>
                    }
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
                    <SortableProp
                        propKey={'damage'}
                        activeSortId={selectedSort.id}
                        value={damage}
                        onClick={onSortablePropClick}
                    />
                    <SortableProp
                        propKey={'startup'}
                        activeSortId={selectedSort.id}
                        value={startup}
                        onClick={onSortablePropClick}
                    />
                    <SortableProp
                        propKey={'sober'}
                        activeSortId={selectedSort.id}
                        value={sober}
                        onClick={onSortablePropClick}
                    />
                </div>
            }
            {!showSimpleView &&
                <div className='move__props frame-data'>

                    <SortableProp
                        propKey={'hit'}
                        activeSortId={selectedSort.id}
                        value={hit}
                        doFrameCheck
                        onClick={onSortablePropClick}
                    />
                    <SortableProp
                        propKey={'c_hit'}
                        text={"counter"}
                        activeSortId={selectedSort.id}
                        value={c_hit}
                        doFrameCheck
                        onClick={onSortablePropClick}
                    />
                    <SortableProp
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
                modifier={isCommandFilterActive ? 'active' : ''}
                onClick={handleOnCommandClick}
                command={command}
            />
            <div className='move__move-attack-level'>
                <MoveTypeBadge
                    modifier={parsedLevel}
                    value={parsedLevel}
                    moveType={attack_level}
                    onClick={handleOnMoveTypeClick}
                />
            </div>
            {!hideNote &&
                <div className='move__notes'>
                    <TextWithCommand
                        content={parsedNote}
                    />
                </div>
            }
        </div>
    )
}

export default Move;