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
        const parsedCommandFilter = commandFilter.length ?
            `command/${commandFilter.join('')}`
            : null;
        const withCommand = [...selectedTypeFilters, parsedCommandFilter].filter(Boolean);
        closeModal([...new Set(withCommand)]);
    }

    const handleTypeClick = ({ target: { value } }) => {
        const parsedValue = `level/${value}`;
        let newTypeFilters;
        if (!!selectedTypeFilters.includes(parsedValue)) {
            newTypeFilters = selectedTypeFilters.filter(value => value !== parsedValue);
        } else {
            newTypeFilters = [...selectedTypeFilters.map(val => val), parsedValue];
        }

        setSelectedTypeFilters(newTypeFilters);
    }

    const handleButtonClick = (value) => {
        const parsedValue = `command/${value}`;
        let newTypeFilters;
        if (!!selectedTypeFilters.includes(parsedValue)) {
            newTypeFilters = selectedTypeFilters.filter(value => value !== parsedValue);
        } else {
            newTypeFilters = [...selectedTypeFilters.map(val => val), parsedValue];
        }

        setSelectedTypeFilters(newTypeFilters);
    }

    const handleFiltersReset = () => {
        setSelectedTypeFilters([]);
    }

    const handleFavoriteClick = () => {
        const parsedValue = `fav/`;
        let newTypeFilters;
        if (!!selectedTypeFilters.includes(parsedValue)) {
            newTypeFilters = selectedTypeFilters.filter(value => value !== parsedValue);
        } else {
            newTypeFilters = [...selectedTypeFilters.map(val => val), parsedValue];
        }

        setSelectedTypeFilters(newTypeFilters);
    }

    return (
        <div className='movelist-filters-modal'>
            <div className='movelist-filters-modal__sub-header'>
                <Button
                    modifier={filtersView === STRINGS.TAGS ? 'active' : ''}
                    text='Tags'
                    onClick={() => setFiltersView(STRINGS.TAGS)}
                />
                <Button
                    modifier={filtersView === STRINGS.COMMAND ? 'active' : ''}
                    text='Command'
                    onClick={() => setFiltersView(STRINGS.COMMAND)}

                />
            </div>
            <div className='movelist-filters-modal__content'>
                {filtersView === STRINGS.TAGS &&
                    <TagsView
                        selectedTypeFilters={selectedTypeFilters}
                        handleButtonClick={handleButtonClick}
                        handleTypeClick={handleTypeClick}
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

export default MoveListFiltersModal;