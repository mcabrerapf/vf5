import React from 'react';
import './Move.scss'
import MoveCommand from '../MoveCommand';
import MoveTypeBadge from '../MoveTypeBadge';
import { MOVE_LEVEL_MATCHES } from '../../constants';

const Move = ({
    move,
    modifier = "",
    hideType = false,
    onClick = () => { },
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
        sober,
    } = move;

    const handleOnClick = (e) => {
        e.preventDefault()
        onClick(move)
    }

    const handleOnMoveTypeClick = (e) => {
        e.stopPropagation();
        onMoveTypeClick(e);
    }

    const className = ['move', modifier].filter(Boolean).join(' ');
    const parsedLevel = MOVE_LEVEL_MATCHES[attack_level] || attack_level;


    return (
        <div className={className} onClick={handleOnClick}>
            <div className='move__main'>
                <div className={`move__main__name  ${modifier}`}
                    role='button'
                >
                    {move_name}
                </div>
                {parsedLevel &&
                    <MoveTypeBadge
                        moveType={parsedLevel}
                        onClick={handleOnMoveTypeClick}
                    />
                }
            </div>
            {!hideType && <div className='move__type'>{category}</div>}
            <div className='move__damage'>
                <span><strong>damage:</strong> {damage}</span>
                <span><strong>avoid:</strong> {dodge_direction}</span>
                <span><strong>sober:</strong> {sober}</span>
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
                command={command}
            />
            <div className='move__notes'>
                {notes}
            </div>
        </div>
    )
}

export default Move;