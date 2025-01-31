import React from 'react';
import './Move.scss'
import MoveNotation from '../MoveNotation';

const Move = ({
    move,
    hideType = false
}) => {
    const {
        // active,
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
        // sober,
        // total
    } = move;
    const showDmg = damage !== '-';
    const showExe = exe !== '-';
    const showOnBlock = guard_stats !== '-';
    const showOnHit = normal_hit_stats !== '-';
    const showOnCh = counter_hit_stats !== '-';

    return (
        <div className='move'>
            <div className='move__name'>{name} ({level})</div>
            {!hideType && <div className='move__type'>{commandType}</div>}
            {showDmg &&
                <div className='move__damage'>
                    <strong>damage:</strong> {damage}
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
            <div className='move__command'>
                {command.map(notation =>
                    <MoveNotation command={notation} />
                )}
            </div>
            <div className='move__notes'>
                {notes}
            </div>

        </div>
    )
}

export default Move;