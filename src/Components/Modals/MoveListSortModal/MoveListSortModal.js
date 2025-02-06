import React, { useState } from 'react';
import './MoveListSortModal.scss'
import Button from '../../Button';
import { useModalContext } from '../../../Contexts/ModalContext';
import { MOVELIST_SORT_OPTIONS } from '../../../constants';

const MoveListSortModal = ({
    selectedMovelistSort = MOVELIST_SORT_OPTIONS[0]
}) => {
    const { closeModal } = useModalContext();
    const [selectedSort, setSelectedSort] = useState(selectedMovelistSort)

    const handleSortClick = (sort) => {
        setSelectedSort({ ...selectedSort, id: sort.id, name: sort.name });
    }

    const handleDirectionClick = (e) => {
        setSelectedSort({ ...selectedSort, dir: e.target.value });
    }

    const handleSortUpdate = () => {
        closeModal(selectedSort);
    }
    
    const validSorts = MOVELIST_SORT_OPTIONS.filter(option => {
        return !['active', 'total', 'crouch_hit', 'crouch_c_hit', 'recovery_c'].includes(option.id);
    })
    
    return (
        <div className='movelist-sort-modal'>
            <div className='movelist-sort-modal__content'>
                <div className='movelist-sort-modal__content__options'>
                    {validSorts.map(option => {

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
                <div className='movelist-sort-modal__content__options'>
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