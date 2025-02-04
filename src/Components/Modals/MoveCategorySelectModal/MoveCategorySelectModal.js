import React from 'react';
import './MoveCategorySelectModal.scss'
import ModalHeader from '../ModalHeader';
import Button from '../../Button';
import { useModalContext } from '../../../Contexts/ModalContext';

const MoveCategorySelectModal = ({
    selectedMoveCategory,
    moveCategories
}) => {
    const { closeModal } = useModalContext();

    const handleClose = () => {
        closeModal();
    }

    const handleCharacterClick = (e) => {
        closeModal(e.target.value);
    }

    return (
        <div className='move-type-select-modal'>
            <ModalHeader modifier={"align-right"}>
                <Button
                    modifier={"no-border"}
                    text={"X"}
                    onClick={handleClose}
                />
            </ModalHeader>
            <div className='move-type-select-modal__content'>
                {moveCategories.map(category => {    
                    return (
                        <Button
                            key={category.id}
                            modifier={category.id === selectedMoveCategory ? 'active' : ''}
                            value={category.id}
                            text={`${category.name} (${category.number_of_moves})`}
                            onClick={handleCharacterClick}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default MoveCategorySelectModal;