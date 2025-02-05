import React, { useState } from 'react';
import './CombosFiltersModal.scss'
import { useModalContext } from '../../../Contexts/ModalContext';
import TagsView from './TagsView';
import LaunchersView from './LaunchersView';
import CommandView from './CommandView';
import ModalFooter from '../ModalFooter';
import Button from '../../Button';
import { CHARACTERS, STRINGS } from '../../../constants';
import { getLaunchers } from './helpers';

const CombosFiltersModal = ({
    combos,
    selectedFilters: _selectedFilters,
}) => {
    const { closeModal } = useModalContext();
    const [selectedFilters, setSelectedFilters] = useState(_selectedFilters);
    const [commandFilter, setCommandFilter] = useState([])
    const [filtersView, setFiltersView] = useState(STRINGS.TAGS);
    const characterFilters = selectedFilters.filter(filter => filter.includes('character/'));
    const allCharactersSelected = characterFilters.length === CHARACTERS.length;

    const handleFilterSave = () => {
        const parsedCommandFilter = commandFilter.length ?
            `command/${commandFilter.join('')}`
            : null;
        const withCommand = [...selectedFilters, parsedCommandFilter].filter(Boolean);
        closeModal(withCommand);
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
            <div className='combos-filters-modal__sub-header'>
                <Button
                    modifier={filtersView === STRINGS.TAGS ? 'active left' : 'left'}
                    text='Tags'
                    onClick={() => setFiltersView(STRINGS.TAGS)}
                />
                <Button
                    modifier={filtersView === STRINGS.LAUNCHERS ? 'active middle' : 'middle'}
                    text='Launchers'
                    onClick={() => setFiltersView(STRINGS.LAUNCHERS)}
                />
                <Button
                    modifier={filtersView === STRINGS.COMMAND ? 'active right' : 'right'}
                    text='Command'
                    onClick={() => setFiltersView(STRINGS.COMMAND)}
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
                {filtersView === STRINGS.COMMAND &&
                    <CommandView
                    commandFilter={commandFilter}
                    setCommandFilter={setCommandFilter}
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