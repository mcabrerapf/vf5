import React from 'react';
import './MoveCategorySelectModal.scss'
import { useModalContext } from '../../../Contexts/ModalContext';
import Button from '../../Button';

const MoveCategorySelectModal = ({
    selectedMoveCategory,
    moveCategories
}) => {
    const { closeModal } = useModalContext();

    const onCategoryClick = (value) => {
        closeModal(value);
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

                            onClick={() => onCategoryClick(category.id)}
                        >
                            <span className='move-category-name'>
                                {category.name}
                            </span>
                            <span className='number-of-moves'>
                                ({category.number_of_moves})
                            </span>
                        </Button>
                    )
                })}
            </div>
        </div>
    )
}

export default MoveCategorySelectModal;