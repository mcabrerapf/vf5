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
    const characterFilters = selectedFilters.filter(filter => filter.key === 'character_tags');
    const allCharactersSelected = characterFilters.length === CHARACTERS.length;
    // COMBO_FILTER_OPTIONS
    const characterOptions = []
        .filter(cOption => cOption.key === 'character_tags')
        .sort((a, b) => a.weight_id - b.weight_id);


    const handleFilterSave = () => {
        const stringCommand = commandFilter.join('-');
        const isRepeat = selectedFilters.find(selected => selected.id === stringCommand);
        if (!stringCommand || isRepeat) {
            closeModal(selectedFilters);
            return;
        }
        const finalCommandFilters = {
            id: stringCommand,
            key: 'command',
            name: stringCommand
        }
        const withCommand = [...selectedFilters, finalCommandFilters];
        closeModal(withCommand);
    }

    const handleCharacterClick = ({ target: { value, className } }) => {
        let newCharacterFilters;
        // COMBO_FILTER_OPTIONS
        const { name: characterName } = [].find(option => option.id === value);
        
        if (className.includes('not-selected')) {
            newCharacterFilters = [
                ...selectedFilters.map(val => val),
                {
                    id: value,
                    name: characterName,
                    key: 'character_tags'
                }
            ];
        } else {
            newCharacterFilters = selectedFilters.filter(sFilter => sFilter.id !== value);
        }

        setSelectedFilters(newCharacterFilters);
    }

    const handleFiltersReset = () => {
        setSelectedFilters([]);
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
            // COMBO_FILTER_OPTIONS
            const { name: filterName, key } = [].find(option => option.id === value);
            newTypeFilters = [
                ...selectedFilters.map(val => val),
                {
                    id: value,
                    name: filterName,
                    key
                }
            ];
        } else {
            newTypeFilters = selectedFilters.filter(value => value.id !== value);

        }

        setSelectedFilters(newTypeFilters);
    }

    const handleLauncherClick = ({ target: { value, isSelected } }) => {
        const stringLauncher = value.join('-');

        if (isSelected) {
            const updatedFilters = selectedFilters.filter(sFilter => sFilter.id !== stringLauncher);
            setSelectedFilters(updatedFilters);
        } else {
            const updatedFilters = [
                ...selectedFilters,
                {
                    id: stringLauncher,
                    name: stringLauncher,
                    key: 'launcher'
                }
            ];
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
                        characterOptions={characterOptions}
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