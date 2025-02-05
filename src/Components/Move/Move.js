import React from 'react';
import './Move.scss'
import MoveCommand from '../MoveCommand';
import MoveTypeBadge from '../MoveTypeBadge';
import { MOVE_LEVEL_MATCHES } from '../../constants';

const Move = ({
    move,
    moveCategories,
    modifier = "",
    // hideType = false,
    onClick = () => { },
    onMoveCategoryClick = () => { },
    onCommandClick = () => { },
    onMoveTypeClick = () => { }
}) => {
    const {
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
        // sober,
    } = move;

    const handleOnClick = (e) => {
        e.preventDefault()
        onClick(move)
    }

    const handleOnMoveTypeClick = (e) => {
        e.stopPropagation();
        onMoveTypeClick(e);
    }

    const handleOnCategoryClick = (e) => {
        e.stopPropagation();
        onMoveCategoryClick(e);
    }

    const handleOnCommanClick = (e) => {
        e.stopPropagation();
        onCommandClick(command.join(''))

    }

    const className = ['move', modifier].filter(Boolean).join(' ');
    const parsedLevel = MOVE_LEVEL_MATCHES[attack_level] || attack_level;
    const { name: categoryName } = moveCategories.find(cat => cat.id === category) || '';

    return (
        <div className={className} onClick={handleOnClick}>
            <div className='move__main'>
                <div className={`move__main__name  ${modifier}`}
                    role='button'
                >
                    {move_name}
                </div>
                <div className='move__main__badges'>
                    <MoveTypeBadge
                        moveType={parsedLevel}
                        onClick={handleOnMoveTypeClick}
                    />
                </div>

            </div>
            <div className='move__category'>
                <MoveTypeBadge
                    moveType={categoryName}
                    onClick={handleOnCategoryClick}
                />
            </div>
            <div className='move__damage'>
                <span><strong>damage:</strong> {damage}</span>
                <span><strong>avoid:</strong> {dodge_direction}</span>
                {/* <span><strong>sober:</strong> {sober}</span> */}
            </div>
            <div className='move__frame-data'>
                <span>
                    <strong>startup:</strong> {startup}
                </span>
                <span>
                    <strong>hit:</strong>  {hit}
                </span>
                <span>
                    <strong>ch:</strong>  {c_hit}
                </span>
                <span>
                    <strong>block:</strong>  {gd}
                </span>
            </div>
            <MoveCommand
                onClick={handleOnCommanClick}
                command={command}
            />
            <div className='move__notes'>
                {notes}
            </div>
        </div>
    )
}

export default Move;