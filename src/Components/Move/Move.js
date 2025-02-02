import React from 'react';
import './Move.scss'
import MoveCommand from '../MoveCommand';
import MoveTypeBadge from '../MoveTypeBadge';
import { MOVE_LEVEL_MATCH } from '../../constants';

const Move = ({
    move,
    modifier="",
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
    const showDmg = damage !== '-';
    const showExe = exe !== '-';
    const showOnBlock = guard_stats !== '-';
    const showOnHit = normal_hit_stats !== '-';
    const showOnCh = counter_hit_stats !== '-';
    const showAvoid = escape !== '-';
    const parsedLevel = MOVE_LEVEL_MATCH[level];

    const handleNameClick = (e) => {
        e.preventDefault()
        onMoveNameClick(move)
    }
    const className = ['move', modifier].filter(Boolean).join(' ');
    
    return (
        <div className={className}>
            <div className='move__main'>
                <div className='move__main__name'
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
            {showDmg &&
                <div className='move__damage'>
                    <span><strong>damage:</strong> {damage}</span>
                    {showAvoid &&
                        <span><strong>avoid:</strong> {escape}</span>
                    }
                    {showSober && sober !== "0" &&
                        <span><strong>sober:</strong> {sober}</span>
                    }
                </div>
            }
            <div className='move__frame-data'>
                {showExe &&
                    <span>
                        <strong>startup:</strong> {exe}
                    </span>
                }
                {showOnHit &&
                    <span>
                        <strong>hit:</strong>  {normal_hit_stats}
                    </span>
                }
                {showOnCh &&
                    <span>
                        <strong>ch:</strong>  {counter_hit_stats}
                    </span>
                }
                {showOnBlock &&
                    <span>
                        <strong>block:</strong>  {guard_stats}
                    </span>
                }
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