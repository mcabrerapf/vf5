import './SortableProp.scss';
import React from 'react';
import { getDodgeValue, getMovePropText } from '../helpers';
import { buildClassName } from '../../../helpers';

const SortableProp = ({
    sortableProp,
    isSelectedSort,
    punish,
    value,
    isLast = false,
    onClick = () => { }
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
    const selectedClassName = isSelectedSort ? 'selected-sort' : '';
    const isLastClass = isLast ? 'last-prop' : '';
    const className = buildClassName(['sortable-prop', isLastClass]);
    const labelClassName = buildClassName(['sortable-prop__label', selectedClassName]);

    return (
        <div
            className={className}
            onClick={handlePropClick}
        >
            <div
                className={labelClassName}
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