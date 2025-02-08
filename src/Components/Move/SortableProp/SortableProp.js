import './SortableProp.scss';
import React from 'react';
import { getMovePropText } from '../helpers';
import { getNumberColor } from "../../../helpers";

const SortableProp = ({
    propKey,
    text,
    activeSortId,
    value,
    doFrameCheck,
    onClick
}) => {
    const isSelected = activeSortId === propKey;
    const className = `sortable-prop${isSelected ? ' selected-sort' : ''}`
    const parsedValue = getMovePropText(value, doFrameCheck);
    const numberColor = getNumberColor(value, doFrameCheck);
    const numberClassname = `sortable-prop__value${numberColor}`;

    const handlePropClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick(propKey);
    }

    return (
        <div
            className={className}
            onClick={handlePropClick}
        >
            <div
                className='sortable-prop__label'
            >
                <span>
                    {text || propKey}
                </span>

            </div>
            <div className={numberClassname}>
                {parsedValue}
            </div>
        </div>
    )
}

export default SortableProp;