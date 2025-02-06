import './Move.scss'
import React from 'react';
import MoveCommand from '../MoveCommand';
import MoveTypeBadge from '../MoveTypeBadge';
import Button from '../Button';
import { ATTACK_LEVELS_NAME_TO_ID } from '../../constants';
import { getNumberColor } from '../../helpers';

const Move = ({
    move,
    sortKey,
    moveCategories,
    isFavourite = false,
    modifier = "",
    onClick = () => { },
    onMoveCategoryClick = () => { },
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
        // commandType,
        c_hit,
        // counter_hit_stats,
        damage,
        dodge_direction,
        // escape,
        startup,
        // exe,
        gd,
        // guard_stats,
        attack_level,
        // level,
        move_name,
        // name,
        hit,
        // normal_hit_stats,
        notes,
        sober,
    } = move;

    const handleOnClick = (e) => {
        e.preventDefault()
        onClick(move)
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

    const favouriteModifier = isFavourite ? 'favourite' : '';
    const className = ['move', modifier, favouriteModifier].filter(Boolean).join(' ');
    const parsedLevel = ATTACK_LEVELS_NAME_TO_ID[attack_level] || attack_level;
    const { name: categoryName } = moveCategories.find(cat => cat.id === category) || '';
    const onBlockColor = getNumberColor(gd, 'on_block');
    const onHitColor = getNumberColor(hit);
    const onChColor = getNumberColor(c_hit);
    console.log(sortKey);
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
                    modifier={'not-selected'}
                    moveType={categoryName}
                    onClick={handleOnCategoryClick}
                />
            </div>
            <div className='move__damage'>
                <span className='move__damage__number'>
                    <span
                        className={`move__damage__number__label${sortKey === 'damage' ? ' underline' : ''}`}
                    >
                        damage:
                    </span>
                    <span className={'move__damage__number__number'}>
                        {damage}
                    </span>
                </span>
                <span className='move__damage__number'>
                    <span
                        className={`move__damage__number__label${sortKey === 'dodge_direction' ? ' underline' : ''}`}
                    >
                        dodge:
                    </span>
                    <span className={'move__damage__number__number'}>
                        {dodge_direction}
                    </span>
                </span>
                <span className='move__damage__number'>
                    <span
                        className={`move__damage__number__label${sortKey === 'sober' ? ' underline' : ''}`}
                    >
                        sober:
                    </span>
                    <span className={'move__damage__number__number'}>
                        {sober}
                    </span>
                </span>
            </div>
            <div className='move__frame-data'>
                <span className='move__frame-data__number'>
                    <span
                        className={`move__frame-data__number__label${sortKey === 'startup' ? ' underline' : ''}`}
                    >
                        startup:
                    </span>
                    <span className={'move__frame-data__number__number'}>
                        {startup}
                    </span>
                </span>
                <span className='move__frame-data__number'>
                    <span
                        className={`move__frame-data__number__label${sortKey === 'hit' ? ' underline' : ''}`}
                    >
                        hit:
                    </span>
                    <span className={`move__frame-data__number__number${onHitColor}`}>
                        {hit > 0 ? '+' : ''}{hit}
                    </span>
                </span>
                <span className='move__frame-data__number'>
                    <span
                        className={`move__frame-data__number__label${sortKey === 'c_hit' ? ' underline' : ''}`}
                    >
                        ch:
                    </span>
                    <span className={`move__frame-data__number__number${onChColor}`}>
                        {c_hit > 0 ? '+' : ''}{c_hit}
                    </span>
                </span>
                <span className='move__frame-data__number'>
                    <span
                        className={`move__frame-data__number__label${sortKey === 'gd' ? ' underline' : ''}`}
                    >
                        bloack:
                    </span>
                    <span className={`move__frame-data__number__number${onBlockColor}`}>
                        {gd > 0 ? '+' : ''}{gd}
                    </span>
                </span>
            </div>
            <MoveCommand
                onClick={handleOnCommandClick}
                command={command}
            />
            <div className='move__notes'>
                {notes}
            </div>
        </div>
    )
}

export default Move;