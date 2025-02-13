import React, { useState } from 'react';
import './CombosHeader.scss'
import { ModalContextWrapper } from '../../../Contexts/ModalContext';
import Modal from '../../Modals/Modal';
import Button from '../../Button';
import CombosFiltersModal from '../../Modals/CombosFiltersModal';

const CombosHeader = ({
    combos,
    selectedFilters,
    handleFiltersChange
}) => {
    const [showFiltersModal, setShowFiltersModal] = useState(false);
    const hasFav = !!selectedFilters.find(sFilter => sFilter.id === 'fav');
    const handleFiltersModalClose = (newFilters) => {
        toggleFiltersModal();
        handleFiltersChange(newFilters);
    }

    const toggleFiltersModal = () => {
        setShowFiltersModal(!showFiltersModal)
    }

    const toogleFavorite = () => {
        let updatedFilters;
        if (hasFav) {
            updatedFilters = selectedFilters.filter(filter => !filter.id === 'fav');
        } else {
            updatedFilters = [
                ...selectedFilters.map(filter => filter),
                { id: 'fav/true', name: 'Fav', key: 'fav' }
            ];
        }
        handleFiltersChange(updatedFilters);
    }

    const filtersButtonModifier = !!selectedFilters.length ? 'active' : '';
    const hasCombos = !!combos.length;

    return (
        <header className='combos-header'>
            <ModalContextWrapper
                showModal={showFiltersModal}
                closeModal={handleFiltersModalClose}
            >
                <Modal>
                    <CombosFiltersModal
                        combos={combos}
                        selectedFilters={selectedFilters}
                    />
                </Modal>
            </ModalContextWrapper>
            <div className='combos-header__filter-buttons'>
                <Button
                    disabled={!hasCombos}
                    modifier={hasFav ? 'fav' : ''}
                    text={"★"}
                    onClick={toogleFavorite}
                />
                <Button
                    modifier={filtersButtonModifier}
                    disabled={!hasCombos}
                    text={'Filters'}
                    onClick={toggleFiltersModal}
                />
            </div>
        </header>
    )
}

export default CombosHeader;