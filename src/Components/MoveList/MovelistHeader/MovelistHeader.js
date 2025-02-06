import React, { useState } from 'react';
import './MovelistHeader.scss'
import { ModalContextWrapper } from '../../../Contexts/ModalContext';
import Modal from '../../Modals/Modal';
import MoveCategorySelectModal from '../../Modals/MoveCategorySelectModal';
import MoveListSortModal from '../../Modals/MoveListSortModal';
import MoveListFiltersModal from '../../Modals/MoveListFiltersModal';
import Button from '../../Button';
import { SELECTED_MOVELIST_SORT_KEY, SELECTED_MOVE_CATEGORY_KEY } from '../../../constants';
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

    const hasFav = !!selectedFilters.find(sFilter => sFilter.id === 'fav');

    const handleCategorySelectModalClose = (type) => {
        if (type) {
            setLocalStorage(SELECTED_MOVE_CATEGORY_KEY, type);
            setSelectedMoveCategory(type);
        }
        toggleMoveTypeSelectModal();
    }

    const handleSortModalClose = (sort) => {
        if (sort) {
            setLocalStorage(SELECTED_MOVELIST_SORT_KEY, JSON.stringify(sort));
            setSelectedMovelistSort(sort);
        }
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
            updatedFilters = selectedFilters.filter(filter => !filter.id === 'fav');
        } else {
            updatedFilters = [
                ...selectedFilters.map(filter => filter),
                { id: 'fav', name: 'fav', prefix: 'fav' }
            ];
        }
        handleFiltersChange(updatedFilters);
    }

    const filtersButtonModifier = !!selectedFilters.length ? 'active' : '';
    const sortButtonModifier = selectedMovelistSort.id !== 'default' ? 'active' : '';

    const { name: selectedMoveCategoryText } = moveCategories
        .find(cat => cat.id === selectedMoveCategory);
    const truncatedMoveCategory = selectedMoveCategoryText.length > 20 ?
        `${selectedMoveCategoryText.substr(0, 20)}...` : selectedMoveCategoryText;
    const moveButtonText = selectedMoveCategory === 'all_moves' ?
        `All Moves (${numerOfMoves})` :
        `${truncatedMoveCategory} (${numerOfMoves})`;

    return (
        <header className='movelist-header'>
            <ModalContextWrapper
                showModal={showMoveCategoryModal}
                closeModal={handleCategorySelectModalClose}
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