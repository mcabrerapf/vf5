import React, { useState } from 'react';
import './SortModal.scss'
import Button from '../../Button';
import { useModalContext } from '../../../Contexts/ModalContext';

const SortModal = ({
    selectedSort: _selectedSort,
    sortOptions
}) => {
    const { closeModal } = useModalContext();
    const [selectedSort, setSelectedSort] = useState(_selectedSort || sortOptions[0])

    const handleSortClick = (sort) => {
        setSelectedSort(sort);
    }

    const handleDirectionClick = (e) => {
        setSelectedSort({ ...selectedSort, dir: e.target.value });
    }

    const handleSortUpdate = () => {
        closeModal(selectedSort);
    }

    return (
        <div className='sort-modal'>
            <div className='sort-modal__content'>
                <div className='sort-modal__content__options'>
                    {sortOptions.map(option => {

                        return (
                            <Button
                                key={option.id}
                                modifier={option.id === selectedSort.id ? 'active' : ''}
                                value={option.id}
                                text={option.name}
                                onClick={() => handleSortClick(option)}
                            />
                        )
                    })}
                </div>
                <div className='sort-modal__content__options'>
                    <Button
                        modifier={selectedSort.dir === 'asc' ? 'active' : ''}
                        value='asc'
                        text='ASC'
                        onClick={handleDirectionClick}
                    />
                    <Button
                        modifier={selectedSort.dir === 'dsc' ? 'active' : ''}
                        value='dsc'
                        text='DSC'
                        onClick={handleDirectionClick}
                    />

                </div>
                <div className='sort-modal__content__options'>
                    <Button
                        text='✓'
                        modifier={'active'}
                        onClick={handleSortUpdate}
                    />
                </div>
            </div>
        </div>
    )
}

export default SortModal;