import React, { useState } from 'react';
import './MovelistHeader.scss'
import { ModalContextWrapper } from '../../../Contexts/ModalContext';
import Modal from '../../Modals/Modal';
import MoveTypSelectModal from '../../Modals/MoveTypSelectModal';
import MoveListSortModal from '../../Modals/MoveListSortModal';
import MoveListFiltersModal from '../../Modals/MoveListFiltersModal';
import Button from '../../Button';
import { SELECTED_MOVELIST_SORT_KEY, SELECTED_MOVE_TYPE_KEY } from '../../../constants';
import { setLocalStorage } from '../../../helpers';

const MovelistHeader = ({
    moveCategories,
    selectedMoveType,
    selectedMovelistSort,
    selectedFilters,
    numerOfMoves,
    handleFiltersChange,
    setSelectedMoveType,
    setSelectedMovelistSort,
}) => {
    const [showMoveTypeSelectModal, setShowMoveTypeSelectModal] = useState(false);
    const [showSortModal, setShowSortModal] = useState(false);
    const [showFiltersModal, setShowFiltersModal] = useState(false);

    const hasFav = selectedFilters.includes('fav/')

    const handleTypeSelectModalClose = (type) => {
        if (type) {
            setLocalStorage(SELECTED_MOVE_TYPE_KEY, type);
            setSelectedMoveType(type);
        }
        toggleMoveTypeSelectModal();
    }

    const handleSortModalClose = (sort) => {
        setLocalStorage(SELECTED_MOVELIST_SORT_KEY, sort);
        setSelectedMovelistSort(sort);
        toggleSortModal();
    }

    const handleFiltersModalClose = (newFilters) => {
        toggleFiltersModal();
        handleFiltersChange(newFilters);
    }

    const toggleMoveTypeSelectModal = () => {
        setShowMoveTypeSelectModal(!showMoveTypeSelectModal);
    }

    const toggleSortModal = () => {
        setShowSortModal(!showSortModal);
    }

    const toggleFiltersModal = () => {
        setShowFiltersModal(!showFiltersModal)
    }

    const toogleFavorite = () => {
        let updatedFilters;
        if (hasFav) {
            updatedFilters = selectedFilters.filter(filter => !filter.includes('fav/'));
        } else {
            updatedFilters = [...selectedFilters.map(filter => filter), 'fav/'];
        }
        handleFiltersChange(updatedFilters);
    }

    const [sortType] = selectedMovelistSort.split('/');
    const filtersButtonModifier = !!selectedFilters.length ? 'active' : '';
    const sortButtonModifier = !!sortType ? 'active' : '';
    const { name: selectedMoveTypeText } = moveCategories.find(cat => cat.id === selectedMoveType);
    const moveButtonText = selectedMoveType === 'all_moves' ?
        `All Moves (${numerOfMoves})` :
        `${selectedMoveTypeText} (${numerOfMoves})`;

    return (
        <header className='movelist-header'>
            <ModalContextWrapper
                showModal={showMoveTypeSelectModal}
                closeModal={handleTypeSelectModalClose}
            >
                <Modal>
                    <MoveTypSelectModal
                        selectedMoveType={selectedMoveType}
                        moveCategories={moveCategories}
                    />
                </Modal>
            </ModalContextWrapper>
            <ModalContextWrapper
                showModal={showSortModal}
                closeModal={handleSortModalClose}
            >
                <Modal>
                    <MoveListSortModal selectedMovelistSort={selectedMovelistSort} />
                </Modal>
            </ModalContextWrapper>
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
            <Button
                modifier={'active'}
                text={moveButtonText}
                onClick={toggleMoveTypeSelectModal}
            />
            <div className='movelist-header__filter-buttons'>
                <Button
                    modifier={hasFav ? 'fav' : ''}
                    text={"★"}
                    onClick={toogleFavorite}
                />
                <Button
                    modifier={filtersButtonModifier}
                    text={'Filters'}
                    onClick={toggleFiltersModal}
                />
                <Button
                    modifier={sortButtonModifier}
                    text={"Sort"}
                    onClick={toggleSortModal}
                />
            </div>

        </header>
    )
}

export default MovelistHeader;