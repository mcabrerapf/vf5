import React, { useState } from 'react';
import './MoveListFiltersModal.scss'
import ModalFooter from '../ModalFooter';
import Button from '../../Button';
import TagsView from './TagsView';
import { useModalContext } from '../../../Contexts/ModalContext';
import { STRINGS } from '../../../constants';
import CommandView from './CommandView';


const MoveListFiltersModal = ({
    selectedFilters,
}) => {
    const { closeModal } = useModalContext();
    const [selectedTypeFilters, setSelectedTypeFilters] = useState(selectedFilters);
    const [filtersView, setFiltersView] = useState(STRINGS.TAGS)
    const [commandFilter, setCommandFilter] = useState([])
    
    const handleFilterSave = () => {
        const stringCommand = commandFilter.join('-');
        const isRepeat = selectedFilters.find(selected => selected.id === stringCommand);
        if (!stringCommand || isRepeat) {
            closeModal(selectedTypeFilters);
            return;
        }

        const finalCommandFilters = {
            id: stringCommand,
            prefix: 'command',
            name: stringCommand
        }

        const withCommand = [...selectedTypeFilters, finalCommandFilters];
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

    const handleFavoriteClick = () => {

        let newTypeFilters;
        if (!!selectedTypeFilters.find(sFilter => sFilter.id === 'fav')) {
            newTypeFilters = selectedTypeFilters.filter(value => value.id !== 'fav');
        } else {
            newTypeFilters = [
                ...selectedTypeFilters.map(val => val),
                { id: 'fav', name: "fav", prefix: 'fav' }
            ];
        }

        setSelectedTypeFilters(newTypeFilters);
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
                    <TagsView
                        selectedTypeFilters={selectedTypeFilters}
                        handleFilterClick={handleFilterClick}
                        handleFavoriteClick={handleFavoriteClick}
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