import React, { useState } from 'react';
import './CommandBuilder.scss';
import MoveCommand from '../MoveCommand';
import Button from '../Button';
import NotationButtons from '../NotationButtons';
import { BackspaceIcon, MoveLeft, MoveRight } from '../Icon';

const CommandBuilder = ({
    command = [],
    disableButtons = false,
    setCommand = () => { },
}) => {
    const [selectedNotationIndex, setSelectedNotationIndex] = useState(null);

    const handleNotationClick = (_, index) => {
        if (disableButtons) return;
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
                <div className='command-builder__top__command-container'>
                    <MoveCommand
                        command={command}
                        selectedNotationIndex={selectedNotationIndex}
                        notationClick={handleNotationClick}
                    />
                </div>
                <div
                    className='command-builder__top__buttons'
                >
                    <Button
                        disabled={disableButtons}
                        modifier="delete-button"
                        onClick={handleDelete}
                    >
                        <BackspaceIcon />
                    </Button>
                    <Button
                        modifier="delete-button"
                        disabled={disableButtons || selectedNotationIndex === null}
                        onClick={handleAddBefore}
                    >
                        <MoveLeft />
                    </Button>
                    <Button
                        modifier="delete-button"
                        disabled={disableButtons || selectedNotationIndex === null}
                        onClick={handleAddAfter}
                    >
                        <MoveRight />
                    </Button>
                </div>
            </div>
            <div className='command-builder__bottom'>
                {!disableButtons &&
                    <NotationButtons
                        disableButtons={disableButtons}
                        onDirectionalButtonClick={handleInputButtonClick}
                        onOtherButtonClick={handleInputButtonClick}
                    />
                }
            </div>
        </div>
    )
}

export default CommandBuilder;