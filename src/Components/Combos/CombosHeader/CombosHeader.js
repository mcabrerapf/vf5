import React, { useState } from 'react';
import './CombosHeader.scss'
import { ModalContextWrapper } from '../../../Contexts/ModalContext';
import Modal from '../../Modals/Modal';
import Button from '../../Button';
import CombosFiltersModal from '../../Modals/CombosFiltersModal';

const CombosHeader = ({
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

    const filtersButtonModifier = !!selectedFilters.length ? 'active' : '';

    return (
        <header className='combos-header'>
            <ModalContextWrapper
                showModal={showFiltersModal}
                closeModal={handleFiltersModalClose}
            >
                <Modal>
                    <CombosFiltersModal
                        selectedFilters={selectedFilters}
                    />
                </Modal>
            </ModalContextWrapper>
            <div className='combos-header__filter-buttons'>
                <Button
                    modifier={filtersButtonModifier}
                    text={'Filters'}
                    onClick={toggleFiltersModal}
                />
            </div>

        </header>
    )
}

export default CombosHeader;