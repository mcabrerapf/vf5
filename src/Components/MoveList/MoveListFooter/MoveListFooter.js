import React, { useState } from 'react';
import './MoveListFooter.scss'
import Button from '../../Button';
import { ModalContextWrapper } from '../../../Contexts/ModalContext';
import Modal from '../../Modals/Modal';
import MoveListFiltersModal from '../../Modals/MoveListFiltersModal';
import MoveTypeBadge from '../../MoveTypeBadge';

const MoveListFooter = ({
    selectedFilters,
    handleFiltersChange
}) => {
    const [showFiltersModal, setShowFiltersModal] = useState(false);

    const handleFiltersModalClose = (newFilters) => {
        toggleFiltersModal();
        handleFiltersChange(newFilters);
    }

    const toggleFiltersModal = () => {
        setShowFiltersModal(!showFiltersModal)
    }

    const onFilterClick = (e) => {
        const filterToRemove = `level/${e.target.value}`
        const newFilters = selectedFilters.filter(filter => filter !== filterToRemove);
        handleFiltersChange(newFilters);
    }

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
                    {selectedFilters.map(selectedFilter => {
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
                <input className='movelist-footer__search-bar__input' />
            </div>
        </footer>
    )
}

export default MoveListFooter;