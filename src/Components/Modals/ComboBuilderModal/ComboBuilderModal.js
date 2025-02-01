import React, { useState } from 'react';
import './ComboBuilderModal.scss'
import ModalHeader from '../ModalHeader';
import ModalFooter from '../ModalFooter';
import DirectionalButtons from '../../DirectionalButtons';
import MoveCommand from '../../MoveCommand';
import Button from '../../Button';
import { useModalContext } from '../../../Contexts/ModalContext';
import OtherButtons from '../../OtherButtons';


const ComboBuilderModal = ({
    selectedCombo = []
}) => {
    const { closeModal } = useModalContext();
    const [comboNotation, setComboNotation] = useState(selectedCombo);
    const [selectedNotationIndex, setSelectedNotationIndex] = useState(null);

    const handleInputButtonClick = (button) => {
        let updatedCombo = [];
        if (selectedNotationIndex === null) {
            if (button === 'DEL') {
                updatedCombo = [...comboNotation.map(notation => notation)];
                updatedCombo.pop();
            } else {
                updatedCombo = [...comboNotation.map(notation => notation), button];
            }
        } else {
            if (button === 'DEL') {
                updatedCombo = comboNotation.filter((_, index) => index !== selectedNotationIndex);

            } else {
                updatedCombo = comboNotation.map((notation, index) => {
                    if (index === selectedNotationIndex) return button;
                    return notation;
                });
            }
        }

        setSelectedNotationIndex(null);
        setComboNotation(updatedCombo);
    }

    const handleSaveCombo = () => {
        closeModal(comboNotation);
    }

    const handleCloseModal = () => {
        closeModal();
    }

    const handleNotationClick = (_, index) => {
        if (index === selectedNotationIndex) {
            setSelectedNotationIndex(null);
        } else {
            setSelectedNotationIndex(index);
        }

    }

    return (
        <div className='combo-builder-modal'>
            <ModalHeader modifier="align-right">
                <Button
                    modifier="no-border"
                    text="X"
                    onClick={handleCloseModal}
                />
            </ModalHeader>
            <div className='combo-builder-modal__content'>
                <div className='combo-builder-modal__content__notation'>
                    <MoveCommand
                        command={comboNotation}
                        notationModifier={"selected"}
                        selectedNotationIndex={selectedNotationIndex}
                        notationClick={handleNotationClick}
                    />
                </div>
                <div className='combo-builder-modal__content__controls'>
                    <DirectionalButtons onClick={handleInputButtonClick} />
                    <OtherButtons onClick={handleInputButtonClick} />
                </div>
            </div>
            <ModalFooter modifier="align-right">
                <Button
                    text='✓'
                    onClick={handleSaveCombo}
                />
            </ModalFooter>
        </div>
    )
}

export default ComboBuilderModal;