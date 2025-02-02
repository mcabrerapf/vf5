import React, { useState } from 'react';
import './CombosFiltersModal.scss'
import ModalHeader from '../ModalHeader';
import ModalFooter from '../ModalFooter';
import Button from '../../Button';
import MoveTypeBadge from '../../MoveTypeBadge';
import { useModalContext } from '../../../Contexts/ModalContext';
import { CHARACTERS } from '../../../constants';

const CombosFiltersModal = ({
    selectedFilters: _selectedFilters,
}) => {
    const { closeModal } = useModalContext();
    const [selectedFilters, setSelectedFilters] = useState(_selectedFilters);

    const characterFilters = selectedFilters.filter(filter => filter.includes('character/'));
    const allCharactersSelected = characterFilters.length === CHARACTERS.length;

    const handleClose = () => {
        closeModal();
    }
    const handleFilterSave = () => {
        closeModal(selectedFilters);
    }

    const handleCharacterClick = ({ target: { value } }) => {
        const parsedValue = `character/${value}`;
        let newTypeFilters;
        if (!!selectedFilters.includes(parsedValue)) {
            newTypeFilters = selectedFilters.filter(value => value !== parsedValue);
        } else {
            newTypeFilters = [...selectedFilters.map(val => val), parsedValue];
        }

        setSelectedFilters(newTypeFilters);
    }

    const handleFiltersReset = () => {
        setSelectedFilters([]);
    }

    const handleAllClick = () => {
        const nonCharacterFilters = selectedFilters.filter(filter => !filter.includes('character/'));
        const updatedCharacterFilters = allCharactersSelected ? [] : CHARACTERS.map(character => `character/${character.id}`);
        const updatedFilters = [...nonCharacterFilters, ...updatedCharacterFilters];
        setSelectedFilters(updatedFilters);
    }


    return (
        <div className='combos-filters-modal'>
            <ModalHeader
                modifier={"align-right"}
            >
                <Button
                    modifier={"no-border"}
                    text={"X"}
                    onClick={handleClose}
                />
            </ModalHeader>
            <div className='combos-filters-modal__content'>
                <div className='combos-filters-modal__content__types'>
                    {CHARACTERS.map(character => {
                        const isSelected = selectedFilters.includes(`character/${character.id}`);
                        const modifier = isSelected ? 'selected' : 'not-selected';

                        return (
                            <MoveTypeBadge
                                key={character.id}
                                modifier={modifier}
                                moveType={character.id}
                                onClick={handleCharacterClick}
                            />
                        )
                    })}
                    <MoveTypeBadge
                        modifier={allCharactersSelected ? 'selected' : 'not-selected'}
                        moveType={'ALL'}
                        onClick={handleAllClick}
                    />
                </div>
            </div>
            <ModalFooter>
                <Button
                    text='Reset'
                    modifier={'active'}
                    onClick={handleFiltersReset}
                />
                <Button
                    text='✓'
                    modifier={'active'}
                    onClick={handleFilterSave}
                />
            </ModalFooter>
        </div>
    )
}

export default CombosFiltersModal;