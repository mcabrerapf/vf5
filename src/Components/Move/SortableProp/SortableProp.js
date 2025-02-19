import './SortableProp.scss';
import React from 'react';
import { getDodgeValue, getMovePropText } from '../helpers';

const SortableProp = ({
    sortableProp,
    isSelectedSort,
    punish,
    value,
    onClick
}) => {
    const { short_name, key } = sortableProp;
    const doFrameCheck =
        key !== 'damage' &&
        key !== 'sober' &&
        key !== 'total' &&
        key !== 'startup' &&
        key !== 'active';

    const numberClassname = `sortable-prop__value ${punish ? punish : ''}`

    const handlePropClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick(key);
    }
    const parsedValue = getMovePropText(value, doFrameCheck);
    const dodgeValue = getDodgeValue(value);
    const valueTouse = key === 'dodge_direction' ? dodgeValue : parsedValue;
    
    return (
        <div
            className={`sortable-prop${isSelectedSort ? ' selected-sort' : ''}`}
            onClick={handlePropClick}
        >
            <div
                className={`sortable-prop__label${isSelectedSort ? ' selected-sort' : ''}`}
            >
                {short_name}
            </div>
            <div
                className={numberClassname}
            >
                {valueTouse}
            </div>
        </div>
    )
}

export default SortableProp;