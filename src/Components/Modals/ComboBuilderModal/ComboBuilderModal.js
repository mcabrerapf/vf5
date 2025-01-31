import React, { useState } from 'react';
import './ComboBuilderModal.scss'
import ModalHeader from '../ModalHeader';
import ModalFooter from '../ModalFooter';
import DirectionalButtons from '../../DirectionalButtons';
import MoveCommand from '../../MoveCommand';
import Button from '../../Button';
import { useModalContext } from '../../../Contexts/ModalContext';
import OtherButtons from '../../OtherButtons';


const ComboBuilderModal = () => {
    const { closeModal } = useModalContext();
    const [comboNotation, setComboNotation] = useState([]);

    const handleDirectionalClick = (direction) => {
        const updatedCombo = [...comboNotation.map(notation => notation), direction];
        setComboNotation(updatedCombo);
    }

    const handleSaveCombo = () => {
        closeModal(comboNotation);
    }

    const handleCloseModal = () => {
        closeModal();
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
                    />
                </div>
                <div className='combo-builder-modal__content__controls'>
                    <DirectionalButtons onClick={handleDirectionalClick} />
                    <OtherButtons onClick={handleDirectionalClick}/>
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