import React, { useState } from 'react';
import './CommandBuilder.scss';
import MoveCommand from '../MoveCommand';
import Button from '../Button';
import NotationButtons from '../NotationButtons';

const CommandBuilder = ({
    command = [],
    setCommand = () => { },
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
            updatedCombo = [...command.map(notation => notation), button];
        } else {
            updatedCombo = command.map((notation, index) => {
                if (index === selectedNotationIndex) return button;
                return notation;
            });
        }

        setSelectedNotationIndex(null);
        setCommand(updatedCombo);
    }

    const handleDelete = () => {
        let updatedCombo = [];
        if (selectedNotationIndex === null) {
            updatedCombo = [...command.map(notation => notation)];
            updatedCombo.pop();
        } else {
            updatedCombo = command.filter((_, index) => index !== selectedNotationIndex);
        }
        setSelectedNotationIndex(null);
        setCommand(updatedCombo);
    }

    const handleAddBefore = () => {
        let updatedNotation;
        if (selectedNotationIndex === 0) {
            updatedNotation = ['⊙', ...command.map(notation => notation)];
        } else {
            updatedNotation = command.map(notation => notation);
            updatedNotation.splice(selectedNotationIndex, 0, '⊙');
        }
        setCommand(updatedNotation);
    }

    const handleAddAfter = () => {
        let updatedNotation;
        if (selectedNotationIndex + 1 === command.length) {
            updatedNotation = command.map(notation => notation);
            updatedNotation.push('⊙')
        } else {
            updatedNotation = command.map(notation => notation);
            updatedNotation.splice(selectedNotationIndex + 1, 0, '⊙');
        }
        setSelectedNotationIndex(selectedNotationIndex + 1);
        setCommand(updatedNotation);
    }

    return (
        <div
            className='command-builder'
        >
            <div className='command-builder__top'>
                <MoveCommand
                    command={command}
                    notationModifier={"selected"}
                    selectedNotationIndex={selectedNotationIndex}
                    notationClick={handleNotationClick}
                />
                <div
                    className='command-builder__top__buttons'
                >
                    <Button
                        modifier="delete-button"
                        text='⌫'
                        onClick={handleDelete}
                    />
                    <Button
                        modifier="delete-button"
                        disabled={selectedNotationIndex === null}
                        text='⇦'
                        onClick={handleAddBefore}
                    />
                    <Button
                        modifier="delete-button"
                        disabled={selectedNotationIndex === null}
                        text='⇨'
                        onClick={handleAddAfter}
                    />
                </div>
            </div>
            <div className='command-builder__bottom'>
                <NotationButtons
                    onDirectionalButtonClick={handleInputButtonClick}
                    onOtherButtonClick={handleInputButtonClick}
                />
            </div>
        </div>
    )
}

export default CommandBuilder;