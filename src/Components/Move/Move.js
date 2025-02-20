import './Move.scss'
import React from 'react';
import SortableProp from './SortableProp';
import MoveCommand from '../MoveCommand';
import TextWithCommand from '../TextWithCommand';
import Button from '../Button';
import { MOVELIST_SORT_OPTIONS, STRINGS } from '../../constants';
import { EditIcon } from '../Icon';
import { buildClassName, stringNotationParser } from '../../helpers';

const Move = ({
    move,
    modifier = "",
    customMove = {},
    selectedSort = {},
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
        command,
        attack_level,
        notes = '',
    } = move;
    const isFavourite = !!customMove.favourite;
    const extraNote = customMove.note;
    const stringCommand = command.join('-');

    const handleOnClick = (e) => {
        e.preventDefault()
        onMoveClick(move)
    }

    const handleOnMoveAttackLevelClick = (e) => {
        e.stopPropagation();
        onMoveFilterPropClick(STRINGS.ATTACK_LEVEL, attack_level)
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

    const handleFavouriteClick = (e) => {
        e.stopPropagation();
        onMoveFavouriteClick(id);
    }

    const favouriteModifier = isFavourite ? 'favourite' : '';
    const nameModifier = selectedSort.id === 'name' ? 'sort-selected' : '';
    const className = buildClassName(['move', modifier, favouriteModifier]);
    const nameClassName = buildClassName(['move__main__name', nameModifier, favouriteModifier]);
    const parsedNote = stringNotationParser(extraNote || notes);
    const hasCombos = comboLaunchers.includes(stringCommand);
    const { short_name } = attackLevelOptions.find(alOption => alOption.value === attack_level) || {};
    const sortablePropsKeys = ['damage', 'dodge_direction', 'startup', 'active', 'total', 'hit', 'c_hit', 'crouch_hit', 'crouch_c_hit', 'block', 'crouch_recovery', 'sober',];
    const sortableProps = sortablePropsKeys
        .map(sOption => MOVELIST_SORT_OPTIONS.find(msOption => msOption.key === sOption));

    return (
        <div
            className={className}
            onClick={handleOnClick}
        >
            <div className='move__main'>
                {!showSimpleView &&
                    <div
                        className={nameClassName}
                        onClick={onNameClick}
                        role='button'
                    >
                        {name}
                    </div>
                }
                {showSimpleView &&
                    <MoveCommand
                        modifier={selectedSort.key ==='command' ? 'selected-sort' : ''}
                        command={command}
                        onClick={handleOnCommandClick}
                    />
                }
                <div className='move__main__other'>
                    {hasCombos &&
                        <Button
                            modifier={'s active'}
                            text={'C'}
                            onClick={handleCombosClick}
                        />
                    }
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
            {!showSimpleView &&
                <MoveCommand
                    modifier={selectedSort.key ==='command' ? 'selected-sort' : ''}
                    onClick={handleOnCommandClick}
                    command={command}
                />
            }
            <div className='move__sortable-props'>
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