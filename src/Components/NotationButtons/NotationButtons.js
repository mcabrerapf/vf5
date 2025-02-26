import './NotationButtons.scss'
import React, { useState } from 'react';
import { useMainContext } from '../../Contexts/MainContext';
import DirectionalButtons from '../DirectionalButtons';
import OtherButtons from '../OtherButtons';
import Button from '../Button';
import { CHARACTERS_JSON } from '../../constants';
import { getValidCategories } from './helpers';

const NotationButtons = ({
    disableButtons,
    showFromButton = false,
    onDirectionalButtonClick = () => { },
    onOtherButtonClick = () => { }
}) => {
    const { selectedCharacter } = useMainContext();
    const [isShiftActive, setIsShiftActive] = useState(false)
    const [showFromCategories, setShowFromCategories] = useState(false)
    const { move_categories: moveCategories } = CHARACTERS_JSON[selectedCharacter];

    const filteredCategories = getValidCategories(selectedCharacter, moveCategories);

    const toggleShowFromCategories = () => setShowFromCategories(!showFromCategories);

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

    const handleFromCategoryClick = (moveCategory) => {
        toggleShowFromCategories();
        setIsShiftActive(false);
        onDirectionalButtonClick(`From ${moveCategory}`)
    }

    const toggleShift = () => {
        setIsShiftActive(!isShiftActive);
    }

    return (
        <div
            className='notation-buttons'
        >
            {!showFromCategories ?
                <>
                    <DirectionalButtons
                        disableButtons={disableButtons}
                        isShiftActive={isShiftActive}
                        onClick={handleDirectionalButtonClick}
                    />
                    <div
                        className='notation-buttons__center'>
                        {showFromButton &&
                            <Button
                                disabled={disableButtons}
                                onClick={toggleShowFromCategories}
                                text={'From'}
                            />
                        }
                        <Button
                            disabled={disableButtons}
                            modifier='space-bar'
                            onClick={() => onDirectionalButtonClick("⊙")}
                            text={'⊙'}
                        />
                    </div>
                    <OtherButtons
                        disableButtons={disableButtons}
                        isShiftActive={isShiftActive}
                        onClick={handleOtherButtonClick}
                        onShiftClick={toggleShift}
                    />
                </>
                :
                <div
                    className='notation-buttons__move-categories'
                >
                    <Button
                        modifier='back-button active'
                        onClick={toggleShowFromCategories}
                        text={'Back'}
                    />
                    {filteredCategories.map(mCat => {
                        return (
                            <Button
                                onClick={() => handleFromCategoryClick(mCat.name)}
                                text={mCat.name}
                            />
                        )
                    })}
                </div>
            }
        </div>
    )
}

export default NotationButtons;