import React, { useState } from 'react';
import './CombosFiltersModal.scss'
import TagsView from './TagsView';
import ModalHeader from '../ModalHeader';
import ModalFooter from '../ModalFooter';
import Button from '../../Button';
import { useModalContext } from '../../../Contexts/ModalContext';
import { CHARACTERS, STRINGS } from '../../../constants';
import LaunchersView from './LaunchersView';
import { getLaunchers } from './helpers';


const CombosFiltersModal = ({
    combos,
    selectedFilters: _selectedFilters,
}) => {
    const { closeModal } = useModalContext();
    const [selectedFilters, setSelectedFilters] = useState(_selectedFilters);
    const [filtersView, setFiltersView] = useState(STRINGS.TAGS);
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

    const handleLauncherClick = ({ target: { value, isSelected } }) => {
        const stringLauncher = `launcher/${value.join('')}`;

        if (isSelected) {
            const updatedFilters = selectedFilters.filter(filter => filter !== stringLauncher);
            setSelectedFilters(updatedFilters);
        } else {
            const updatedFilters = [...new Set([...selectedFilters, stringLauncher])].filter(Boolean);
            setSelectedFilters(updatedFilters);
        }


    }

    const launchers = getLaunchers(combos);

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
            <div className='combos-filters-modal__sub-header'>
                <Button
                    modifier={filtersView === STRINGS.TAGS ? 'active' : ''}
                    text='Tags'
                    onClick={() => setFiltersView(STRINGS.TAGS)}
                />
                <Button
                    modifier={filtersView === STRINGS.LAUNCHERS ? 'active' : ''}
                    text='Launchers'
                    onClick={() => setFiltersView(STRINGS.LAUNCHERS)}
                />
            </div>
            <div className='combos-filters-modal__content'>
                {filtersView === STRINGS.TAGS &&
                    <TagsView
                        selectedFilters={selectedFilters}
                        allCharactersSelected={allCharactersSelected}
                        handleCharacterClick={handleCharacterClick}
                        handleAllClick={handleAllClick}
                        handleOtherTagClick={handleOtherTagClick}
                    />
                }
                {filtersView === STRINGS.LAUNCHERS &&
                    <LaunchersView
                        selectedFilters={selectedFilters}
                        launchers={launchers}
                        onLauncherClick={handleLauncherClick}
                    />
                }
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