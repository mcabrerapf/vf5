import React from 'react';
import './MoveCategorySelectModal.scss'
import { useModalContext } from '../../../Contexts/ModalContext';
import Button from '../../Button';

const MoveCategorySelectModal = ({
    selectedMoveCategory,
    moveCategories
}) => {
    const { closeModal } = useModalContext();

    const handleCharacterClick = (e) => {
        closeModal(e.target.value);
    }

    return (
        <div className='move-type-select-modal'>
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