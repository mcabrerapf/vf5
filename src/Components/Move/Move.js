import React from 'react';
import './Move.scss'
import MoveCommand from '../MoveCommand';
import MoveTypeBadge from '../MoveTypeBadge';
import { MOVE_LEVEL_MATCH } from '../../constants';

const Move = ({
    move,
    modifier = "",
    showSober = false,
    hideType = false,
    onMoveNameClick = () => { },
    onMoveTypeClick = () => { }
}) => {
    const {
        // active,
        // total,
        command,
        commandType,
        counter_hit_stats,
        damage,
        escape,
        exe,
        guard_stats,
        level,
        name,
        normal_hit_stats,
        notes,
        sober,
    } = move;


    const handleNameClick = (e) => {
        e.preventDefault()
        onMoveNameClick(move)
    }

    const className = ['move', modifier].filter(Boolean).join(' ');
    const parsedLevel = MOVE_LEVEL_MATCH[level];
    return (
        <div className={className}>
            <div className='move__main'>
                <div className={`move__main__name  ${modifier}`}
                    role='button'
                    onClick={handleNameClick}
                >
                    {name}
                </div>
                {parsedLevel &&
                    <MoveTypeBadge
                        moveType={parsedLevel}
                        onClick={onMoveTypeClick}
                    />
                }
            </div>
            {!hideType && <div className='move__type'>{commandType}</div>}
            <div className='move__damage'>
                <span><strong>damage:</strong> {damage}</span>
                <span><strong>avoid:</strong> {escape}</span>
                <span><strong>sober:</strong> {sober}</span>
            </div>
            <div className='move__frame-data'>
                <span>
                    <strong>startup:</strong> {exe}
                </span>
                <span>
                    <strong>hit:</strong>  {normal_hit_stats}
                </span>
                <span>
                    <strong>ch:</strong>  {counter_hit_stats}
                </span>
                <span>
                    <strong>block:</strong>  {guard_stats}
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