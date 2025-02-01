import React, { useState } from 'react';
import DirectionalButtons from '../../DirectionalButtons';
import MoveCommand from '../../MoveCommand';
import Button from '../../Button';
import OtherButtons from '../../OtherButtons';

const CommandView = ({
    comboNotation,
    setComboNotation,
}) => {
    const [selectedNotationIndex, setSelectedNotationIndex] = useState(null);

    const handleNotationClick = (_, index) => {
        if (index === selectedNotationIndex) {
            setSelectedNotationIndex(null);
        } else {
            setSelectedNotationIndex(index);
        }
    }

    const handleInputButtonClick = (button) => {
        let updatedCombo = [];
        if (selectedNotationIndex === null) {
            updatedCombo = [...comboNotation.map(notation => notation), button];
        } else {
            updatedCombo = comboNotation.map((notation, index) => {
                if (index === selectedNotationIndex) return button;
                return notation;
            });
        }

        setSelectedNotationIndex(null);
        setComboNotation(updatedCombo);
    }

    const handleDelete = () => {
        let updatedCombo = [];
        if (selectedNotationIndex === null) {
            updatedCombo = [...comboNotation.map(notation => notation)];
            updatedCombo.pop();
        } else {
            updatedCombo = comboNotation.filter((_, index) => index !== selectedNotationIndex);
        }
        setSelectedNotationIndex(null);
        setComboNotation(updatedCombo);
    }

    return (
        <>
            <div className='combo-builder-modal__content__notation'>
                <MoveCommand
                    command={comboNotation}
                    notationModifier={"selected"}
                    selectedNotationIndex={selectedNotationIndex}
                    notationClick={handleNotationClick}
                />
                <Button
                    modifier="delete-button"
                    text='X'
                    onClick={handleDelete}
                />
            </div>
            <div className='combo-builder-modal__content__controls'>
                <DirectionalButtons onClick={handleInputButtonClick} />
                <OtherButtons onClick={handleInputButtonClick} />
            </div>
        </>
    )
}

export default CommandView;