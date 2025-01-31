import React, { useState } from 'react';
import './MoveListSortModal.scss'
import ModalHeader from '../ModalHeader';
import Button from '../../Button';
import { useModalContext } from '../../../Contexts/ModalContext';
import { SORT_OPTIONS } from './constants';

const MoveListSortModal = ({ selectedMovelistSort }) => {
    const { closeModal } = useModalContext();
    const parsedSort = selectedMovelistSort.split('/')
    const [sortValue, setSortValue] = useState(parsedSort[0] || '')
    const [sortDirection, setSortDirection] = useState(parsedSort[1] || 'asc')

    const handleClose = () => {
        closeModal(selectedMovelistSort);
    }

    const handleSortClick = (e) => {
        setSortValue(e.target.value);
    }

    const handleDirectionClick = (e) => {
        setSortDirection(e.target.value);
    }

    const handleSortUpdate = () => {
        closeModal(`${sortValue}/${sortDirection}`);
    }
    
    return (
        <div className='move-list-sort-modal'>
            <ModalHeader modifier={"align-right"}>
                <Button
                    modifier={"no-border"}
                    text={"X"}
                    onClick={handleClose}
                />
            </ModalHeader>
            <div className='move-list-sort-modal__content'>
                <div className='move-list-sort-modal__content__options'>
                    {SORT_OPTIONS.map(option => {

                        return (
                            <Button
                                key={option[0]}
                                disabled={option[0] === 'sober'}
                                modifier={option[0] === sortValue ? 'active' : ''}
                                value={option[0]}
                                text={option[1]}
                                onClick={handleSortClick}
                            />
                        )
                    })}
                </div>
                <div className='move-list-sort-modal__content__options'>
                    <Button
                        modifier={sortDirection === 'asc' ? 'active' : ''}
                        value='asc'
                        text='ASC'
                        onClick={handleDirectionClick}
                    />
                    <Button
                        modifier={sortDirection === 'dsc' ? 'active' : ''}
                        value='dsc'
                        text='DSC'
                        onClick={handleDirectionClick}
                    />

                </div>
                <div className='move-list-sort-modal__content__options'>
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

export default MoveListSortModal;