import React, { useState } from 'react';
import './NotationButtons.scss'
import DirectionalButtons from '../DirectionalButtons';
import OtherButtons from '../OtherButtons';
import Button from '../Button';

const NotationButtons = ({
    disableButtons,
    onDirectionalButtonClick = () => { },
    onOtherButtonClick = () => { }
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
                disableButtons={disableButtons}
                isShiftActive={isShiftActive}
                onClick={handleDirectionalButtonClick}
            />
            <Button
                disabled={disableButtons}
                modifier='notation-buttons__space-bar'
                onClick={() => onDirectionalButtonClick("⊙")}
                text={'⊙'}
            />
            <OtherButtons
                disableButtons={disableButtons}
                isShiftActive={isShiftActive}
                onClick={handleOtherButtonClick}
                onShiftClick={toggleShift}
            />
        </div>
    )
}

export default NotationButtons;