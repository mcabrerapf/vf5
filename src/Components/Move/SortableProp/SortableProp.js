import './SortableProp.scss';
import React from 'react';
import { getMovePropText } from '../helpers';

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
    const parsedValue = getMovePropText(value, doFrameCheck);
    const numberClassname = `sortable-prop__value ${punish ? punish : ''}`

    const handlePropClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick(key);
    }

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
                {parsedValue}
            </div>
        </div>
    )
}

export default SortableProp;