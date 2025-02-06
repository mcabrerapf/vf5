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
    const numberColor = getNumberColor(value, doFrameCheck);
    const numberClassname = `move__props__prop__value${numberColor}`;
    if (doFrameCheck) console.log(numberColor)
    const handlePropClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (isSelected) return;
        onClick(propKey);
    }

    return (
        <div
            className={className}
            onClick={handlePropClick}
        >
            <div
                className='move__props__prop__label'
            >
                {text || propKey}:
            </div>
            <div className={numberClassname}>
                {parsedValue}
            </div>
        </div>
    )
}

export default SortableMoveProp;