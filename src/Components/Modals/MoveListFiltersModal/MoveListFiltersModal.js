import React, { useState } from 'react';
import './MoveListFiltersModal.scss'
import ModalFooter from '../ModalFooter';
import Button from '../../Button';
import { useModalContext } from '../../../Contexts/ModalContext';
import { STRINGS } from '../../../constants';
import CommandView from './CommandView';
import MoveTypeBadge from '../../MoveTypeBadge';


const MoveListFiltersModal = ({
    selectedFilters,
    filterOptions,
}) => {
    const { closeModal } = useModalContext();
    const [selectedTypeFilters, setSelectedTypeFilters] = useState(selectedFilters);
    const [filtersView, setFiltersView] = useState(STRINGS.TAGS)
    const [commandFilter, setCommandFilter] = useState([])

    const handleFilterSave = () => {
        const stringCommand = commandFilter.join('-');
        const isRepeat = selectedFilters.find(selected => selected.value === stringCommand);
        if (!stringCommand || isRepeat) {
            closeModal(selectedTypeFilters);
            return;
        }
        const newCommand = {
            id: `command/${stringCommand}`,
            key: 'command',
            value: stringCommand,
            name: 'Command',
            short_name: 'Cmd'
        }
        const withCommand = [...selectedTypeFilters, newCommand];
        closeModal(withCommand);
    }

    const handleFilterClick = (filter) => {
        let newTypeFilters;
        const hasFilter = !!selectedTypeFilters.find(selected => selected.id === filter.id)

        if (hasFilter) {
            newTypeFilters = selectedTypeFilters.filter(value => value.id !== filter.id);
        } else {
            newTypeFilters = [...selectedTypeFilters.map(val => val), filter];
        }

        setSelectedTypeFilters(newTypeFilters);
    }

    const handleFiltersReset = () => {
        setSelectedTypeFilters([]);
    }
  
    return (
        <div className='movelist-filters-modal'>
            <div className='movelist-filters-modal__sub-header'>
                <Button
                    modifier={filtersView === STRINGS.TAGS ? 'active left' : 'left'}
                    text='Tags'
                    onClick={() => setFiltersView(STRINGS.TAGS)}
                />
                <Button
                    modifier={filtersView === STRINGS.COMMAND ? 'active right' : 'right'}
                    text='Command'
                    onClick={() => setFiltersView(STRINGS.COMMAND)}

                />
            </div>
            <div className='movelist-filters-modal__content'>
                {filtersView === STRINGS.TAGS &&
                    <div
                        className='movelist-filters-modal__content__options'
                    >
                        {filterOptions.map(fOption => {
                            if (fOption.key !== 'attack_level') return null;
                            const isSelected = !!selectedTypeFilters.find(sFilter => sFilter.id === fOption.id);
                            const modifier = isSelected ? fOption.value : 'not-selected';
                            return (
                                <MoveTypeBadge
                                    key={fOption.id}
                                    modifier={modifier}
                                    value={fOption.id}
                                    moveType={fOption.name}
                                    onClick={() => handleFilterClick(fOption)}
                                />
                            )
                        })}
                    </div>
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
                    modifier={'active reset'}
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

export default MoveListFiltersModal;