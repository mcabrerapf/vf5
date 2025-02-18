import './Move.scss'
import React from 'react';
import SortableProp from './SortableProp';
import MoveCommand from '../MoveCommand';
import MoveTypeBadge from '../MoveTypeBadge';
import TextWithCommand from '../TextWithCommand';
import Button from '../Button';
import { MOVELIST_SORT_OPTIONS } from '../../constants';
import { getDodgeValue } from './helpers';
import { EditIcon } from '../Icon';
import { stringNotationParser } from '../../helpers';

const Move = ({
    move,
    customMove = {},
    selectedSort = {},
    moveCategories = [],
    selectedMoveCategory = '',
    modifier = "",
    selectedFilters = [],
    comboLaunchers = [],
    hideEditButton = false,
    hideNote = false,
    showSimpleView = false,
    attackLevelOptions = [],
    handleFiltersChange = () => { },
    handleSortChange = () => { },
    onMoveClick = () => { },
    onMoveCategoryClick = () => { },
    handleSortDirChange = () => { },
    onMoveFavouriteClick = () => { },
    onMoveCommandClick = () => { },
    onMoveAttackLevelClick = () => { },
    onMoveCombosClick = () => { }
}) => {
    if (!move) return null;
    const {
        id,
        name,
        command,
        category,
        dodge_direction,
        attack_level,
        notes = '',
    } = move;
    const dodgeFilter = selectedFilters.find(filter => filter.key === 'dodge_direction');
    const isCommandFilterActive = !!selectedFilters.find(filter => filter.key === 'command');
    const isDodgeSelected = dodgeFilter?.value === dodge_direction;
    const isFavourite = !!customMove.favourite;
    const extraNote = customMove.note;
    const stringCommand = command.join('-');
    const dodgeValue = getDodgeValue(dodge_direction);

    const handleOnClick = (e) => {
        e.preventDefault()
        onMoveClick(move)
    }

    const handleOnMoveAttackLevelClick = (e) => {
        e.stopPropagation();
        onMoveAttackLevelClick(`attack_level/${attack_level}`);
    }

    const handleOnCategoryClick = (e) => {
        e.stopPropagation();
        onMoveCategoryClick(categoryName);
    }

    const onDodgeClick = (e) => {
        e.stopPropagation();

        const newDodgeFilter = {
            id: `dodge_direction/${dodge_direction}`,
            key: 'dodge_direction',
            value: dodge_direction,
            name: `Dodge (${dodgeValue})`,
            short_name: `D(${dodgeValue})`
        };
        let updatedFilters;
        if (dodgeFilter) {
            updatedFilters = isDodgeSelected ?
                selectedFilters.filter(fOption => fOption.key !== 'dodge_direction')
                :
                selectedFilters.map(fOption => {
                    if (fOption.key === 'dodge_direction') return newDodgeFilter;
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

    const handleOnCommandClick = (e) => {
        e.stopPropagation();
        const stringCommand = command.join('-');
        const moveFilter = {
            id: `command/${stringCommand}`,
            key: 'command',
            value: stringCommand,
            name: 'Command',
            short_name: 'Cmd'
        }
        onMoveCommandClick(moveFilter)
    }

    const onNameClick = (e) => {
        e.stopPropagation();
        onSortablePropClick('name')
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

    const handleFavouriteClick = (e) => {
        e.stopPropagation();
        onMoveFavouriteClick(id);
    }

    const handleCombosClick = (e) => {
        e.stopPropagation();
        const launcherFilter = {
            id: `pseudo-launcher/${stringCommand}`,
            key: 'pseudo-launcher',
            value: stringCommand,
            name: stringCommand,
            short_name: stringCommand

        }
        onMoveCombosClick(launcherFilter);
    }

    const favouriteModifier = isFavourite ? 'favourite' : '';
    const mainClassName = showSimpleView ? 'move-simple' : 'move';
    const className = [mainClassName, modifier, favouriteModifier].filter(Boolean).join(' ');
    const { name: categoryName } = moveCategories.find(cat => cat.id === category) || '';
    const nameModifier = selectedSort.id === 'name' && 'sort-selected';
    const nameClassName = ['move__main__name', nameModifier, favouriteModifier]
        .filter(Boolean)
        .join(' ');

    const parsedNote = stringNotationParser(extraNote || notes);
    const hasCombos = comboLaunchers.includes(stringCommand);
    const { name: attackLevelName, short_name } = attackLevelOptions.find(alOption => alOption.value === attack_level);
    const sortablePropsKeys = ['damage', 'sober', 'startup', 'active', 'total', 'hit', 'c_hit', 'crouch_hit', 'crouch_c_hit', 'block', 'crouch_recovery'];
    const sortableProps = sortablePropsKeys
        .map(sOption => MOVELIST_SORT_OPTIONS.find(msOption => msOption.key === sOption));

    if (showSimpleView) return (
        <div
            className={className}
            onClick={handleOnClick}
        >
            <div
                className='move-simple__top'
                onClick={handleOnClick}
            >
                <MoveTypeBadge
                    modifier={attack_level}
                    value={attack_level}
                    moveType={short_name}
                    onClick={handleOnMoveAttackLevelClick}
                />
                <Button
                    modifier={isDodgeSelected ? 'active' : ''}
                    text={dodgeValue}
                    onClick={onDodgeClick}
                />

                <MoveCommand
                    modifier={isCommandFilterActive ? 'active' : ''}
                    command={command}
                />
            </div>
            <div
                className='move-simple__bot'
            >
                <div
                    className='move-simple__bot__scrollable-props'
                >
                    {sortableProps
                        .map(sKey => {
                            const isSelectedSort = selectedSort.key === sKey.key;
                            const punish = move[`is_punishable_on_${sKey.key}`] || move[`guarantees_on_${sKey.key}`];
                            return (
                                <SortableProp
                                    sortableProp={sKey}
                                    isSelectedSort={isSelectedSort}
                                    value={move[sKey.key]}
                                    punish={punish}
                                    onClick={onSortablePropClick}
                                />
                            )
                        })}
                </div>
            </div>
            {!hideNote && parsedNote &&
                <div className='move__notes'>
                    <TextWithCommand
                        content={parsedNote}
                    />
                </div>
            }
        </div>
    )
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
                    {name}
                </div>
                <div className='move__main__badges'>
                    {hasCombos &&
                        <Button
                            modifier={'not-selected'}
                            text={'C'}
                            onClick={handleCombosClick}
                        />
                    }
                    <MoveTypeBadge
                        modifier={attack_level}
                        value={attack_level}
                        moveType={short_name}
                        onClick={handleOnMoveAttackLevelClick}
                    />
                    <Button
                        modifier={isDodgeSelected ? 'active dodge' : 'dodge'}
                        text={dodgeValue}
                        onClick={onDodgeClick}
                    />
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

            <MoveCommand
                modifier={isCommandFilterActive ? 'active' : ''}
                onClick={handleOnCommandClick}
                command={command}
            />
            <div className='move__category'>
                {/* <MoveTypeBadge
                    modifier={attack_level}
                    value={attack_level}
                    moveType={attackLevelName}
                    onClick={handleOnMoveAttackLevelClick}
                />
                <Button
                    modifier={isDodgeSelected ? 'active dodge' : 'dodge'}
                    text={dodgeValue}
                    onClick={onDodgeClick}
                /> */}
                {/* <MoveTypeBadge
                    modifier={selectedMoveCategory === category ? 'active' : 'not-selected'}
                    moveType={categoryName}
                    onClick={handleOnCategoryClick}
                /> */}
                {showSimpleView && hasCombos &&
                    <MoveTypeBadge
                        modifier={'not-selected'}
                        value={attack_level}
                        moveType={'Combos'}
                        onClick={handleCombosClick}
                    />
                }
            </div>
            <div className='move__props'>
                {sortableProps.map(sKey => {
                    const isSelectedSort = selectedSort.key === sKey.key;
                    const punish = move[`is_punishable_on_${sKey.key}`] || move[`guarantees_on_${sKey.key}`];
                    return (
                        <SortableProp
                            sortableProp={sKey}
                            isSelectedSort={isSelectedSort}
                            value={move[sKey.key]}
                            punish={punish}
                            onClick={onSortablePropClick}
                        />
                    )
                })}
            </div>
            {!hideNote && parsedNote &&
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