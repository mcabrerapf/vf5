import './Move.scss'
import React from 'react';
import SortableProp from './SortableProp';
import MoveCommand from '../MoveCommand';
import TextWithCommand from '../TextWithCommand';
import Button from '../Button';
import { MOVELIST_SORT_OPTIONS, STRINGS } from '../../constants';
import { getDodgeValue } from './helpers';
import { EditIcon } from '../Icon';
import { buildClassName, stringNotationParser } from '../../helpers';

const Move = ({
    move,
    customMove = {},
    selectedSort = {},
    modifier = "",
    selectedFilters = [],
    comboLaunchers = [],
    hideEditButton = false,
    hideFavouriteButton = false,
    hideNote = false,
    showSimpleView = false,
    attackLevelOptions = [],
    onMoveSortablePropClick = () => { },
    onMoveClick = () => { },
    onMoveFavouriteClick = () => { },
    onMoveCombosClick = () => { },
    onMoveFilterPropClick = () => { }
}) => {
    if (!move) return null;
    const {
        id,
        name,
        damage,
        command,
        dodge_direction,
        attack_level,
        notes = '',
    } = move;
    const isCommandFilterActive = !!selectedFilters.find(filter => filter.key === STRINGS.COMMAND);
    const isDodgeSelected = selectedFilters.find(filter => filter.key === STRINGS.DODE_DIRECTION && filter.value === dodge_direction);
    const isDamageSortSelected = selectedSort.key === STRINGS.DAMAGE;
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
        onMoveFilterPropClick(STRINGS.ATTACK_LEVEL, attack_level)
    }

    const onDodgeClick = (e) => {
        e.stopPropagation();
        onMoveFilterPropClick(STRINGS.DODE_DIRECTION, dodge_direction)
    }

    const handleOnCommandClick = (e) => {
        e.stopPropagation();
        const stringCommand = command.join('-');
        onMoveFilterPropClick(STRINGS.COMMAND, stringCommand)
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

    const onSortablePropClick = (newSort) => {
        onMoveSortablePropClick(newSort);
    }

    const onNameClick = (e) => {
        e.stopPropagation();
        onSortablePropClick(STRINGS.NAME)
    }

    const onDamageClick = (e) => {
        e.stopPropagation();
        onSortablePropClick(STRINGS.DAMAGE)
    }

    const handleFavouriteClick = (e) => {
        e.stopPropagation();
        onMoveFavouriteClick(id);
    }

    const favouriteModifier = isFavourite ? 'favourite' : '';
    const mainClassName = showSimpleView ? 'move-simple' : 'move';
    const nameModifier = selectedSort.id === 'name' ? 'sort-selected' : '';
    const className = buildClassName([mainClassName, modifier, favouriteModifier]);
    const nameClassName = buildClassName(['move__main__name', nameModifier, favouriteModifier]);
    const parsedNote = stringNotationParser(extraNote || notes);
    const hasCombos = comboLaunchers.includes(stringCommand);
    const { short_name } = attackLevelOptions.find(alOption => alOption.value === attack_level) || {};
    const sortablePropsKeys = ['startup', 'active', 'total', 'hit', 'c_hit', 'crouch_hit', 'crouch_c_hit', 'block', 'crouch_recovery', 'sober',];
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
                <MoveCommand
                    modifier={isCommandFilterActive ? 'active' : ''}
                    command={command}
                />
                <div
                    className='move-simple__top__buttons'
                >
                    {hasCombos &&
                        <Button
                            modifier={'s'}
                            text={'C'}
                            onClick={handleCombosClick}
                        />
                    }
                    <Button
                        onClick={onDamageClick}
                        modifier={isDamageSortSelected ? 's sort-selected damage' : 's damage'}
                        text={damage}
                    />
                    <Button
                        modifier={isDodgeSelected ? 's active dodge' : 's dodge'}
                        text={dodgeValue}
                        onClick={onDodgeClick}
                    />
                    <Button
                        modifier={`s move-type ${attack_level}`}
                        value={attack_level}
                        text={short_name}
                        onClick={handleOnMoveAttackLevelClick}
                    />
                    {!hideFavouriteButton &&
                        <Button
                            onClick={handleFavouriteClick}
                            modifier={isFavourite ? 's favourite' : 's'}
                            text={'★'}
                        />
                    }
                    {!hideEditButton &&
                        <Button
                            modifier={'s'}
                            onClick={onMoveClick}
                        >
                            <EditIcon />
                        </Button>
                    }
                </div>
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
                            modifier={'s'}
                            text={'C'}
                            onClick={handleCombosClick}
                        />
                    }
                    <Button
                        onClick={onDamageClick}
                        modifier={isDamageSortSelected ? 's sort-selected damage' : 's damage'}
                        text={damage}
                    />
                    <Button
                        modifier={isDodgeSelected ? 's active dodge' : 's dodge'}
                        text={dodgeValue}
                        onClick={onDodgeClick}
                    />
                    <Button
                        modifier={`s move-type ${attack_level}`}
                        value={attack_level}
                        text={short_name}
                        onClick={handleOnMoveAttackLevelClick}
                    />
                    {!hideFavouriteButton &&
                        <Button
                            onClick={handleFavouriteClick}
                            modifier={isFavourite ? 's favourite' : 's'}
                            text={'★'}
                        />
                    }
                    {!hideEditButton &&
                        <Button
                            modifier={'s'}
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