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
    filterOptions = [],
    listItems = [],
    selectedFilters: _selectedFilters,
}) => {
    const { closeModal } = useModalContext();
    const [selectedFilters, setSelectedFilters] = useState(_selectedFilters);
    const [commandFilter, setCommandFilter] = useState([])
    const [filtersView, setFiltersView] = useState(STRINGS.TAGS);
    const characterFilters = selectedFilters.filter(filter => filter.key === 'character_tags');
    const allCharactersSelected = characterFilters.length === CHARACTERS.length;
    const characterOptions = filterOptions
        .filter(cOption => cOption.key === 'character_tags')

    const handleFiltersReset = () => {
        setSelectedFilters([]);
    }

    const handleFilterSave = () => {
        const stringCommand = commandFilter.join('-');
        const isRepeat = selectedFilters.find(selected => selected.value === stringCommand);
        if (!stringCommand || isRepeat) {
            closeModal(selectedFilters);
            return;
        }
        const newCommand = {
            id: `command/${stringCommand}`,
            key: 'command',
            value: stringCommand,
            name: 'Command',
            short_name: 'Cmd'
        }
        const withCommand = [...selectedFilters, newCommand];
        closeModal(withCommand);
    }

    const handleCharacterClick = ({ target: { value, className } }) => {
        let newCharacterFilters;
        const cFilter = filterOptions.find(option => option.value === value);

        if (className.includes('not-selected')) {
            newCharacterFilters = [
                ...selectedFilters.map(val => val),
                cFilter
            ];
        } else {
            newCharacterFilters = selectedFilters.filter(sFilter => sFilter.value !== value);
        }
        setSelectedFilters(newCharacterFilters);
    }

    const handleAllClick = () => {
        const nonCharacterFilters = selectedFilters.filter(filter => filter.key !== 'character_tags');
        const updatedCharacterFilters = allCharactersSelected ? [] : characterOptions;
        const updatedFilters = [...nonCharacterFilters, ...updatedCharacterFilters];
        setSelectedFilters(updatedFilters);
    }

    const handleOtherTagClick = ({ target: { value, className } }) => {
        let newTypeFilters;
        if (className.includes('not-selected')) {
            const newFilter = filterOptions.find(option => option.value === value);
            newTypeFilters = [
                ...selectedFilters,
                newFilter
            ];
        } else {
            newTypeFilters = selectedFilters.filter(sFilter => sFilter.value !== value);
        }
        setSelectedFilters(newTypeFilters);
    }

    const handleLauncherClick = ({ target: { value, isSelected } }) => {
        const stringLauncher = value.join('-');
        const launcherId = `launcher/${stringLauncher}`;
        if (isSelected) {
            const updatedFilters = selectedFilters.filter(sFilter => sFilter.id !== launcherId);
            setSelectedFilters(updatedFilters);
        } else {
            const updatedFilters = [
                ...selectedFilters,
                {
                    id: launcherId,
                    key: 'launcher',
                    value: stringLauncher,
                    name: 'Launcher',
                    short_name: 'Lch'
                }
            ];
            setSelectedFilters(updatedFilters);
        }
    }

    const launchers = getLaunchers(listItems);

    return (
        <div className='combos-filters-modal'>
            <div className='combos-filters-modal__sub-header'>
                <Button
                    modifier={filtersView === STRINGS.TAGS ? 'active left' : 'left'}
                    text='Tags'
                    onClick={() => setFiltersView(STRINGS.TAGS)}
                />
                <Button
                    modifier={filtersView === STRINGS.LAUNCHERS ? 'active center' : 'center'}
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
                        filterOptions={filterOptions}
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