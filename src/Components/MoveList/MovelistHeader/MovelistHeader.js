import React, { useState } from 'react';
import './MovelistHeader.scss'
import { ModalContextWrapper } from '../../../Contexts/ModalContext';
import Modal from '../../Modals/Modal';
import MoveCategorySelectModal from '../../Modals/MoveCategorySelectModal';
import MoveListSortModal from '../../Modals/MoveListSortModal';
import MoveListFiltersModal from '../../Modals/MoveListFiltersModal';
import Button from '../../Button';
import { SELECTED_MOVELIST_SORT_KEY, SELECTED_MOVE_TYPE_KEY } from '../../../constants';
import { setLocalStorage } from '../../../helpers';

const MovelistHeader = ({
    moveCategories,
    selectedMoveCategory,
    selectedMovelistSort,
    selectedFilters,
    numerOfMoves,
    handleFiltersChange,
    setSelectedMoveCategory,
    setSelectedMovelistSort,
}) => {
    const [showMoveCategoryModal, setShowMoveCategorySelectModal] = useState(false);
    const [showSortModal, setShowSortModal] = useState(false);
    const [showFiltersModal, setShowFiltersModal] = useState(false);

    const hasFav = selectedFilters.includes('fav/')

    const handleTypeSelectModalClose = (type) => {
        if (type) {
            setLocalStorage(SELECTED_MOVE_TYPE_KEY, type);
            setSelectedMoveCategory(type);
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
        setShowMoveCategorySelectModal(!showMoveCategoryModal);
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
    
    const { name: selectedMoveCategoryText } = moveCategories.find(cat => cat.id === selectedMoveCategory);
    const moveButtonText = selectedMoveCategory === 'all_moves' ?
        `All Moves (${numerOfMoves})` :
        `${selectedMoveCategoryText} (${numerOfMoves})`;

    return (
        <header className='movelist-header'>
            <ModalContextWrapper
                showModal={showMoveCategoryModal}
                closeModal={handleTypeSelectModalClose}
            >
                <Modal>
                    <MoveCategorySelectModal
                        selectedMoveCategory={selectedMoveCategory}
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