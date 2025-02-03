import React, { useState } from 'react';
import './NotationButtons.scss'
import DirectionalButtons from '../DirectionalButtons';
import OtherButtons from '../OtherButtons';

const NotationButtons = ({
    onDirectionalButtonClick,
    onOtherButtonClick
}) => {
    const [isShiftActive, setIsShiftActive] = useState(false)

    const handleDirectionalButtonClick = (e) => {
        handleNonShiftClick();
        onDirectionalButtonClick(e);
    }

    const handleOtherButtonClick = (e) => {
        handleNonShiftClick();
        onOtherButtonClick(e);
    }

    const handleNonShiftClick = () => {
        setIsShiftActive(false);
    }


    const toggleShift = () => {
        setIsShiftActive(!isShiftActive);
    }

    return (
        <div className='notation-buttons'>
            <DirectionalButtons
                isShiftActive={isShiftActive}
                onClick={handleDirectionalButtonClick}
            />
            <OtherButtons
                isShiftActive={isShiftActive}
                onClick={handleOtherButtonClick}
                onShiftClick={toggleShift}
            />
        </div>
    )
}

export default NotationButtons;