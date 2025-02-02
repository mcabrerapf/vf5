import React, { useState } from 'react';
import './CombosFiltersModal.scss'
import ModalHeader from '../ModalHeader';
import ModalFooter from '../ModalFooter';
import Button from '../../Button';
import MoveTypeBadge from '../../MoveTypeBadge';
import { useModalContext } from '../../../Contexts/ModalContext';
import { CHARACTERS, MOVE_LEVEL_MATCH } from '../../../constants';
import CharacterBadge from '../../CharacterBadge';

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

    const handleOtherTagClick = ({ target: { value } }) => {
        const parsedValue = `other/${value}`;
        let newTypeFilters;
        if (!!selectedFilters.includes(parsedValue)) {
            newTypeFilters = selectedFilters.filter(value => value !== parsedValue);
        } else {
            newTypeFilters = [...selectedFilters.map(val => val), parsedValue];
        }

        setSelectedFilters(newTypeFilters);
    }

    const otherTags = Object.keys(MOVE_LEVEL_MATCH).map(key => MOVE_LEVEL_MATCH[key]);

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
                <div className='combos-filters-modal__content__characters'>
                    {CHARACTERS.map(character => {
                        const isSelected = selectedFilters.includes(`character/${character.id}`);
                        const modifier = isSelected ? '' : 'not-selected';

                        return (
                            <CharacterBadge
                                key={character.id}
                                modifier={modifier}
                                character={character.id}
                                onClick={handleCharacterClick}
                            />
                        )
                    })}
                    <CharacterBadge
                        modifier={allCharactersSelected ? '' : 'not-selected'}
                        character={'ALL'}
                        onClick={handleAllClick}
                    />
                </div>
                <div className='combos-filters-modal__content__other-tags'>
                    {otherTags.map(tag =>
                        <MoveTypeBadge
                            key={tag}
                            moveType={tag}
                            modifier={selectedFilters.includes(`other/${tag}`) ? '' : 'not-selected'}
                            onClick={handleOtherTagClick}
                        />
                    )}
                    <MoveTypeBadge
                        moveType="side"
                        modifier={selectedFilters.includes('other/side') ? '' : 'not-selected'}
                        onClick={handleOtherTagClick}
                    />
                    <MoveTypeBadge
                        moveType="ch"
                        modifier={selectedFilters.includes('other/ch') ? '' : 'not-selected'}
                        onClick={handleOtherTagClick}
                    />
                    <MoveTypeBadge
                        moveType="wall"
                        modifier={selectedFilters.includes('other/wall') ? '' : 'not-selected'}
                        onClick={handleOtherTagClick}
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