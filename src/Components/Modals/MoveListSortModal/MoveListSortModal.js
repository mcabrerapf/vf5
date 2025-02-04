import React, { useState } from 'react';
import './MoveListSortModal.scss'
import Button from '../../Button';
import { useModalContext } from '../../../Contexts/ModalContext';
import { MOVELIST_SORT_OPTIONS } from '../../../constants';

const MoveListSortModal = ({ selectedMovelistSort }) => {
    const { closeModal } = useModalContext();
    const parsedSort = selectedMovelistSort.split('/')
    const [sortValue, setSortValue] = useState(parsedSort[0] || '')
    const [sortDirection, setSortDirection] = useState(parsedSort[1] || 'asc')

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
        <div className='movelist-sort-modal'>
            <div className='movelist-sort-modal__content'>
                <div className='movelist-sort-modal__content__options'>
                    {MOVELIST_SORT_OPTIONS.map(option => {

                        return (
                            <Button
                                key={option[0]}
                                modifier={option[0] === sortValue ? 'active' : ''}
                                value={option[0]}
                                text={option[1]}
                                onClick={handleSortClick}
                            />
                        )
                    })}
                </div>
                <div className='movelist-sort-modal__content__options'>
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
                <div className='movelist-sort-modal__content__options'>
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