import React, { useState } from 'react';
import './MoveListFiltersModal.scss'
import ModalHeader from '../ModalHeader';
import ModalFooter from '../ModalFooter';
import Button from '../../Button';
import MoveTypeBadge from '../../MoveTypeBadge/MoveTypeBadge';
import { useModalContext } from '../../../Contexts/ModalContext';
import { MOVE_LEVEL_MATCH } from '../../../constants';


const MoveListFiltersModal = ({
    selectedFilters,
}) => {
    const { closeModal } = useModalContext();
    const [selectedTypeFilters, setSelectedTypeFilters] = useState(selectedFilters);

    const handleClose = () => {
        closeModal();
    }
    const handleFilterSave = () => {
        closeModal(selectedTypeFilters);
    }

    const handleTypeClick = (e) => {
        const parsedValue = `level/${e.target.value}`
        let newTypeFilters;
        if (!!selectedTypeFilters.includes(parsedValue)) {
            newTypeFilters = selectedTypeFilters.filter(value => value !== parsedValue);
        } else {
            newTypeFilters = [...selectedTypeFilters.map(val => val), parsedValue];
        }

        setSelectedTypeFilters(newTypeFilters);
    }

    const typeOptions = Object.keys(MOVE_LEVEL_MATCH).map(key => MOVE_LEVEL_MATCH[key]);

    return (
        <div className='movelist-filters-modal'>
            <ModalHeader
                modifier={"align-right"}
            >
                <Button
                    modifier={"no-border"}
                    text={"X"}
                    onClick={handleClose}
                />
            </ModalHeader>
            <div className='movelist-filters-modal__content'>
                {typeOptions.map(typeOption => {
                    const isSelected = selectedTypeFilters.includes(`level/${typeOption}`);
                    const modifier = isSelected ? 'selected' : '';

                    return (
                        <MoveTypeBadge
                            key={typeOption}
                            modifier={modifier}
                            moveType={typeOption}
                            onClick={handleTypeClick}
                        />
                    )
                })}
            </div>
            <ModalFooter modifier={"align-right"}>
                <Button
                    text='✓'
                    modifier={'active'}
                    onClick={handleFilterSave}
                />
            </ModalFooter>

        </div>
    )
}

export default MoveListFiltersModal;