import React, { useState } from 'react';
import './MoveListFooter.scss'
import Button from '../../Button';
import { ModalContextWrapper } from '../../../Contexts/ModalContext';
import Modal from '../../Modals/Modal';
import MoveListFiltersModal from '../../Modals/MoveListFiltersModal';
import MoveTypeBadge from '../../MoveTypeBadge';
import MoveCommand from '../../MoveCommand';

const MoveListFooter = ({
    selectedFilters,
    handleFiltersChange,
    handleTextFilterChange
}) => {
    const [showFiltersModal, setShowFiltersModal] = useState(false);

    const handleFiltersModalClose = (newFilters) => {
        toggleFiltersModal();
        handleFiltersChange(newFilters);
    }

    const toggleFiltersModal = () => {
        setShowFiltersModal(!showFiltersModal)
    }

    const onFilterClick = ({ target: { value } }) => {
        const isTextFilter = value.includes('text/');
        const filterToRemove = isTextFilter ? value : `level/${value}`
        const newFilters = selectedFilters.filter(filter => filter !== filterToRemove);
        handleFiltersChange(newFilters);
    }
    const textFilter = selectedFilters.find(filter => filter.includes('text/')) || '/';
    const textFilterCommand = textFilter.split('/')[1].split(' ');

    return (
        <footer className='movelist-footer'>
            <ModalContextWrapper
                showModal={showFiltersModal}
                closeModal={handleFiltersModalClose}
            >
                <Modal>
                    <MoveListFiltersModal
                        selectedFilters={selectedFilters}
                    />
                </Modal>
            </ModalContextWrapper>
            <div className='movelist-footer__filters'>
                <Button
                    modifier={"active"}
                    text="Filters"
                    onClick={toggleFiltersModal}
                />
                <div className='movelist-footer__filters__active-filters'>
                    {textFilterCommand &&
                        <MoveCommand
                            command={textFilterCommand}
                        />
                    }
                    {selectedFilters.map(selectedFilter => {
                        if (selectedFilter.includes('text/')) return null;
                        const [, parsedFilterName] = selectedFilter.split('/')
                        return (
                            <MoveTypeBadge
                                key={parsedFilterName}
                                moveType={parsedFilterName}
                                onClick={onFilterClick}
                            />
                        )
                    }

                    )}
                </div>
            </div>
            <div className='movelist-footer__search-bar'>
                <input
                    className='movelist-footer__search-bar__input'
                    onChange={handleTextFilterChange}
                />
            </div>
        </footer>
    )
}

export default MoveListFooter;