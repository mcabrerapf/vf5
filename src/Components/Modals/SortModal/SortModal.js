import React, { useState } from 'react';
import './SortModal.scss'
import Button from '../../Button';
import { useModalContext } from '../../../Contexts/ModalContext';

const SortModal = ({
    selectedSort: _selectedSort,
    sortOptions
}) => {
    const { closeModal } = useModalContext();
    const selectedSort = _selectedSort || sortOptions[0];

    const handleSortClick = (sort) => closeModal(sort);

    return (
        <div className='sort-modal'>
            <div className='sort-modal__content'>
                <div className='sort-modal__content__options'>
                    {sortOptions.map(option =>
                        <Button
                            key={option.id}
                            modifier={option.id === selectedSort.id ? 'active' : ''}
                            value={option.id}
                            text={option.name}
                            onClick={() => handleSortClick(option)}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default SortModal;