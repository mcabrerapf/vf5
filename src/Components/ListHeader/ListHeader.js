import './ListHeader.scss'
import React, { useState } from 'react';
import { ModalContextWrapper } from '../../Contexts/ModalContext';
import Modal from '../Modals/Modal';
import MoveCategorySelectModal from '../Modals/MoveCategorySelectModal';
import MoveListFiltersModal from '../Modals/MoveListFiltersModal';
import Button from '../Button';
import { SELECTED_MOVE_CATEGORY_KEY, STRINGS } from '../../constants';
import { setLocalStorage } from '../../helpers';
import { SearchIcon } from '../Icon';
import TextSearchModal from '../Modals/TextSearchModal';
import CombosFiltersModal from '../Modals/CombosFiltersModal';
const { MOVELIST } = STRINGS;
const ListHeader = ({
    listType = MOVELIST,
    moveCategories = [],
    selectedMoveCategory = '',
    selectedFilters = [],
    filterOptions = [],
    numerOfItems,
    handleFiltersChange = () => { },
    setSelectedMoveCategory = () => { },
}) => {
    const [showMoveCategoryModal, setShowMoveCategorySelectModal] = useState(false);
    const [showFiltersModal, setShowFiltersModal] = useState(false);
    const [showTextSearchModal, setShowTextSearchModal] = useState(false);

    const hasFav = !!selectedFilters.find(sFilter => sFilter.key === 'favourite');
    const hasTextSearch = !!selectedFilters.find(sFilter => sFilter.prefix === 'text_search');

    const handleCategorySelectModalClose = (type) => {
        if (type) {
            setLocalStorage(SELECTED_MOVE_CATEGORY_KEY, type);
            setSelectedMoveCategory(type);
        }
        toggleMoveTypeSelectModal();
    }

    const handleFiltersModalClose = (newFilters) => {
        toggleFiltersModal();
        handleFiltersChange(newFilters);
    }

    const toggleMoveTypeSelectModal = () => {
        setShowMoveCategorySelectModal(!showMoveCategoryModal);
    }

    const toggleFiltersModal = () => {
        setShowFiltersModal(!showFiltersModal)
    }

    const toggleFavorite = () => {
        let updatedFilters;

        if (hasFav) {
            updatedFilters = selectedFilters.filter(filter => filter.key !== 'favourite');
        } else {
            updatedFilters = [
                ...selectedFilters.map(filter => filter),
                {
                    id: "favourite/true",
                    key: "favourite",
                    value: true,
                    name: "Favourite",
                    short_name: "Fav",
                }
            ];
        }
        handleFiltersChange(updatedFilters);
    }

    const handleTextSearchModalClose = (newFilters) => {
        toggleTextSearchModal();
        handleFiltersChange(newFilters);
    }

    const toggleTextSearchModal = () => {
        setShowTextSearchModal(!showTextSearchModal);
    }

    const filtersButtonModifier = !!selectedFilters.length ? 'active' : '';

    const { name: selectedMoveCategoryText = '' } = moveCategories
        .find(cat => cat.id === selectedMoveCategory) || {};
    const truncatedMoveCategory = selectedMoveCategoryText.length > 20 ?
        `${selectedMoveCategoryText.substr(0, 20)}...` : selectedMoveCategoryText;
    const moveButtonText = selectedMoveCategory === 'all_moves' ?
        `All Moves (${numerOfItems})` :
        `${truncatedMoveCategory} (${numerOfItems})`;
    const FilterModal = listType === MOVELIST ? MoveListFiltersModal : CombosFiltersModal;
    return (
        <header className='list-header'>
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
                showModal={showFiltersModal}
                closeModal={handleFiltersModalClose}
            >
                <Modal>
                    <FilterModal
                        selectedFilters={selectedFilters}
                        filterOptions={filterOptions}
                    />
                </Modal>
            </ModalContextWrapper>
            <ModalContextWrapper
                showModal={showTextSearchModal}
                closeModal={handleTextSearchModalClose}
            >
                <Modal>
                    <TextSearchModal
                        selectedFilters={selectedFilters}
                    />
                </Modal>
            </ModalContextWrapper>
            <Button
                modifier={'active'}
                text={moveButtonText}
                onClick={toggleMoveTypeSelectModal}
            />
            <div className='list-header__filter-buttons'>
                <Button
                    modifier={hasFav ? 'favourite' : ''}
                    text={"★"}
                    onClick={toggleFavorite}
                />
                <Button
                    modifier={hasTextSearch ? 'active' : ''}
                    onClick={toggleTextSearchModal}
                >
                    <SearchIcon />
                </Button>
                <Button
                    disabled={listType === STRINGS.COMBOS}
                    modifier={filtersButtonModifier}
                    text={'Filters'}
                    onClick={toggleFiltersModal}
                />
            </div>
        </header>
    )
}

export default ListHeader;