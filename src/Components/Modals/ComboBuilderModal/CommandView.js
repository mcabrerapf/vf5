import React, { useState } from 'react';
import DirectionalButtons from '../../DirectionalButtons';
import MoveCommand from '../../MoveCommand';
import Button from '../../Button';
import OtherButtons from '../../OtherButtons';

const CommandView = ({
    comboDamage,
    comboNotation,
    setComboNotation,
    setComboDamage,
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

    const handleAddBefore = () => {
        let updatedNotation;
        if (selectedNotationIndex === 0) {
            updatedNotation = ['⊙', ...comboNotation.map(notation => notation)];
        } else {
            updatedNotation = comboNotation.map(notation => notation);
            updatedNotation.splice(selectedNotationIndex, 0, '⊙');
        }
        setComboNotation(updatedNotation);
    }

    const handleAddAfter = () => {
        let updatedNotation;
        if (selectedNotationIndex + 1 === comboNotation.length) {
            updatedNotation = comboNotation.map(notation => notation);
            updatedNotation.push('⊙')
        } else {
            updatedNotation = comboNotation.map(notation => notation);
            updatedNotation.splice(selectedNotationIndex + 1, 0, '⊙');
        }
        setSelectedNotationIndex(selectedNotationIndex + 1);
        setComboNotation(updatedNotation);
    }

    const handleDamageChange = ({ target: { value } }) => {
        const parsedDamage = isNaN(value) ? 1 : value;
        const maxChecked = Number(parsedDamage) > 999 ? 999 : parsedDamage;
        setComboDamage(maxChecked);
    }

    const handleDamageBlur = ({ target: { value } }) => {
        const parsedDamage = isNaN(value) || !value ? 1 : value;
        setComboDamage(parsedDamage);
    }

    return (
        <>
            <div className='combo-builder-modal__content__main'>
                <div className='combo-builder-modal__content__main__damage'>
                    <label>Damage</label>
                    <input
                        type='number'
                        value={comboDamage}
                        onFocus={() => setComboDamage('')}
                        onChange={handleDamageChange}
                        onBlur={handleDamageBlur}
                    />
                </div>
                <div className='combo-builder-modal__content__main__notation'>
                    <MoveCommand
                        command={comboNotation}
                        notationModifier={"selected"}
                        selectedNotationIndex={selectedNotationIndex}
                        notationClick={handleNotationClick}
                    />
                    <div className='combo-builder-modal__content__notation__buttons'>
                        <Button
                            modifier="delete-button"
                            text='X'
                            onClick={handleDelete}
                        />
                        <Button
                            modifier="delete-button"
                            disabled={selectedNotationIndex === null}
                            text='<'
                            onClick={handleAddBefore}
                        />
                        <Button
                            modifier="delete-button"
                            disabled={selectedNotationIndex === null}
                            text='>'
                            onClick={handleAddAfter}
                        />
                    </div>
                </div>
            </div>
            <div className='combo-builder-modal__content__controls'>
                <DirectionalButtons onClick={handleInputButtonClick} />
                <OtherButtons onClick={handleInputButtonClick} />
            </div>
        </>
    )
}

export default CommandView;