import { getNumberColor } from "../../helpers";
import { getMovePropText } from "./helpers";

const SortableMoveProp = ({
    propKey,
    text,
    activeSortId,
    value,
    doFrameCheck,
    onClick
}) => {
    const isSelected = activeSortId === propKey;
    const className = `move__props__prop${isSelected ? ' selected-sort' : ''}`
    const parsedValue = getMovePropText(value, doFrameCheck);
    const numberColor = doFrameCheck ? getNumberColor(value) : '';
    const numberClassname = `move__props__prop__value${numberColor}`;

    const handlePropClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if(isSelected) return;
        onClick(propKey);
    }

    return (
        <span
            className={className}
            onClick={handlePropClick}
        >
            <span
                className='move__props__prop__label'
            >
                {text || propKey}:
            </span>
            <span className={numberClassname}>
                {parsedValue}
            </span>
        </span>
    )
}

export default SortableMoveProp;