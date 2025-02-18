import './ListHeader.scss'
import React, { useState } from 'react';
import { ModalContextWrapper } from '../../Contexts/ModalContext';
import MoveCategorySelectModal from '../Modals/MoveCategorySelectModal';
import MoveListFiltersModal from '../Modals/MoveListFiltersModal';
import Button from '../Button';
import { STRINGS } from '../../constants';
import { SearchIcon } from '../Icon';
import TextSearchModal from '../Modals/TextSearchModal';
import CombosFiltersModal from '../Modals/CombosFiltersModal';
const { MOVELIST } = STRINGS;

const ListHeader = ({
    listType = MOVELIST,
    selectedMoveCategory = '',
    moveCategories = [],
    selectedFilters = [],
    filterOptions = [],
    listItems = [],
    numerOfItems,
    handleFiltersChange = () => { },
    handleCategoryChange = () => { },
}) => {
    const [showMoveCategoryModal, setShowMoveCategorySelectModal] = useState(false);
    const [showFiltersModal, setShowFiltersModal] = useState(false);
    const [showTextSearchModal, setShowTextSearchModal] = useState(false);

    const hasFav = !!selectedFilters.find(sFilter => sFilter.key === 'favourite');
    const hasTextSearch = !!selectedFilters.find(sFilter => sFilter.prefix === 'text_search');

    const handleCategorySelectModalClose = (newCategory) => {
        handleCategoryChange(newCategory);
        toggleMoveTypeSelectModal();
    }

    const handleFiltersModalClose = (newFilters) => {
        toggleFiltersModal();
        handleFiltersChange(newFilters);
    }

    const toggleMoveTypeSelectModal = () => {
        if (listType === 'combos') return;
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
    const movelistButtonText = selectedMoveCategory === 'all_moves' ?
        `All Moves (${numerOfItems})` :
        `${truncatedMoveCategory} (${numerOfItems})`;
    const moveButtonText = listType === MOVELIST ? movelistButtonText : `Combos (${numerOfItems})`
    const FilterModal = listType === MOVELIST ? MoveListFiltersModal : CombosFiltersModal;

    return (
        <header className='list-header'>
            <ModalContextWrapper
                showModal={showMoveCategoryModal}
                closeModal={handleCategorySelectModalClose}
            >
                <MoveCategorySelectModal
                    selectedMoveCategory={selectedMoveCategory}
                    moveCategories={moveCategories}
                />
            </ModalContextWrapper>
            <ModalContextWrapper
                showModal={showFiltersModal}
                closeModal={handleFiltersModalClose}
            >
                <FilterModal
                    selectedFilters={selectedFilters}
                    filterOptions={filterOptions}
                    listItems={listItems}
                />
            </ModalContextWrapper>
            <ModalContextWrapper
                showModal={showTextSearchModal}
                closeModal={handleTextSearchModalClose}
            >
                <TextSearchModal
                    selectedFilters={selectedFilters}
                />
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
                    modifier={filtersButtonModifier}
                    text={'Filters'}
                    onClick={toggleFiltersModal}
                />
            </div>
        </header>
    )
}

export default ListHeader;