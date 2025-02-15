import React, { useEffect, useRef, useState } from 'react';
import './Combos.scss'
import {
    SELECTED_COMBOS_FILTERS_KEY,
    SELECTED_COMBOS_SORT_KEY,
    COMBOS_SORT_OPTIONS,
    CHARACTERS_JSON,
    STRINGS
} from '../../constants';
import { useMainContext } from '../../Contexts/MainContext';
import { ModalContextWrapper } from '../../Contexts/ModalContext';
import Button from '../Button';
import Combo from '../Combo';
import Modal from '../Modals/Modal';
import ComboBuilderModal from '../Modals/ComboBuilderModal';
import DeleteModal from '../Modals/DeleteModal';
import ActiveFiltersList from '../ActiveFiltersList';
import { filterList, getFromLocal, setLocalStorage, sortList } from '../../helpers';
import SortModal from '../Modals/SortModal';
import { deleteCombo, getCombos, updateCombos } from '../../services';
import ListHeader from '../ListHeader';

const Combos = () => {
    const listRef = useRef(null);
    const { selectedCharacter, listView } = useMainContext();
    const {
        combos_filter_options: combosFilterOptions,
    } = CHARACTERS_JSON[selectedCharacter];
    const localFilters = getFromLocal(SELECTED_COMBOS_FILTERS_KEY);
    const localSelectedSort = getFromLocal(SELECTED_COMBOS_SORT_KEY);

    const [combos, setCombos] = useState(null);
    const [selectedCombo, setSelectedCombo] = useState(null);
    const [selectedFilters, setSelectedFilters] = useState(localFilters);
    const [showComboBuilderModal, setShowComboBuilderModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedSort, setSelectedSort] = useState(localSelectedSort);
    const [showSortModal, setShowSortModal] = useState(false);

    useEffect(
        () => {
            const localCombos = getCombos(selectedCharacter);
            setCombos(localCombos);
        },
        [selectedCharacter]
    )

    if (!combos) return null;

    const handleSortChange = (sort) => {
        if (!sort) return;
        scrollToTop();
        setLocalStorage(SELECTED_COMBOS_SORT_KEY, JSON.stringify(sort));
        setSelectedSort(sort);
    }

    const handleFiltersChange = (newFilters) => {
        if (!newFilters) return;
        scrollToTop();
        setLocalStorage(SELECTED_COMBOS_FILTERS_KEY, JSON.stringify(newFilters));
        setSelectedFilters(newFilters);
    }

    const handleCloseModal = (newCombo) => {
        if (newCombo) {
            const updatedCombos = updateCombos(selectedCharacter, newCombo);
            setCombos(updatedCombos);
        }
        toggleComboBuilderModal();
    }

    const handleComboClick = (combo) => {
        setSelectedCombo(combo);
        toggleComboBuilderModal();
    }

    const handleNewComboClick = () => {
        setSelectedCombo(null);
        toggleComboBuilderModal();
    }

    const toggleComboBuilderModal = () => {
        setShowComboBuilderModal(!showComboBuilderModal);
    }

    const handleDeleteCombo = (shouldDelete) => {
        if (shouldDelete) {
            const updatedCombos = deleteCombo(selectedCharacter, selectedCombo.id);
            setCombos(updatedCombos);
        }
        setSelectedCombo(null);
        toggleDeleteModal();
    }

    const handleDeleteClick = (combo) => {
        setSelectedCombo(combo);
        toggleDeleteModal();
    }

    const toggleDeleteModal = () => {
        setShowDeleteModal(!showDeleteModal);
    }

    const handleCharacterClick = ({ target: { value } }) => {
        if (value === 'ALL') {
            const updatedFilters = selectedFilters.filter(filter => filter.key !== 'character_tags');
            handleFiltersChange(updatedFilters);
        } else {
            if (selectedFilters.find(sFilter => sFilter.name === value)) return;
            const newFilter = combosFilterOptions.find(option => option.id === value.toLocaleLowerCase());
            const updatedFilters = [...selectedFilters.map(filter => filter), newFilter];
            handleFiltersChange(updatedFilters);
        }
    }

    const handleTagClick = ({ target: { value } }) => {
        if (selectedFilters.find(sFilter => sFilter.value === value)) return;
        const newFilter = combosFilterOptions.find(option => option.value === value);
        const updatedFilters = [...selectedFilters.map(filter => filter), newFilter];
        handleFiltersChange(updatedFilters);
    }

    const handleFilterClick = (filter) => {
        const newFilters = selectedFilters.filter(sFilter => sFilter.id !== filter.id);
        handleFiltersChange(newFilters);
    }

    const handleLauncherClick = ({ target: { value } }) => {
        if (!value || selectedFilters.find(sFilter => sFilter.id === value.join('-'))) return;
        const stringLauncher = value.join('-');
        const newFilters = [
            ...selectedFilters,
            { id: stringLauncher, name: stringLauncher, key: 'launcher' }

        ]
        handleFiltersChange(newFilters);
    }

    const onFavouriteClick = (comboId) => {
        const comboMatch = combos.find(combo => combo.id === comboId)
        const updatedCombo = { ...comboMatch, favourite: !comboMatch.favourite };
        const updatedCombos = updateCombos(selectedCharacter, updatedCombo);
        setCombos(updatedCombos);
    }

    const handleSortClick = () => {
        const newSort = {
            ...selectedSort,
            dir: selectedSort.dir === 'asc' ? 'dsc' : 'asc'
        }
        handleSortChange(newSort);
    }

    const handleSortModalClose = (sort) => {
        handleSortChange(sort)
        toggleSortModal();
    }

    const toggleSortModal = () => {
        setShowSortModal(!showSortModal);
    }

    const scrollToTop = () => {
        if (listRef.current) listRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }

    const filteredCombos = filterList(combos, selectedFilters);
    const sortedCombos = sortList(filteredCombos, selectedSort);
    const showSimpleView = listView === 'S';

    const characterFilterOptions = combosFilterOptions
        .filter(option => option.key === 'character_tags')

    return (
        <div className='combos'>
            <ModalContextWrapper
                showModal={showSortModal}
                closeModal={handleSortModalClose}
            >
                <Modal>
                    <SortModal
                        selectedSort={selectedSort}
                        sortOptions={COMBOS_SORT_OPTIONS}
                    />
                </Modal>
            </ModalContextWrapper>
            <ModalContextWrapper
                showModal={showComboBuilderModal}
                closeModal={handleCloseModal}
                closeOnBgClick={false}
            >
                <Modal>
                    <ComboBuilderModal
                        selectedCombo={selectedCombo}
                        combos={combos}
                        combosFilterOptions={combosFilterOptions}
                        handleDeleteClick={handleDeleteClick}
                    />
                </Modal>
            </ModalContextWrapper>
            <ModalContextWrapper
                showModal={showDeleteModal}
                closeModal={handleDeleteCombo}
            >
                <Modal>
                    <DeleteModal
                        data={selectedCombo}
                        combosFilterOptions={combosFilterOptions}
                    />
                </Modal>
            </ModalContextWrapper>
            <ListHeader
                listType={STRINGS.COMBOS}
                selectedFilters={selectedFilters}
                filterOptions={combosFilterOptions}
                numerOfItems={sortedCombos.length}
                listItems={combos}
                handleFiltersChange={handleFiltersChange}
            />
            <ActiveFiltersList
                selectedFilters={selectedFilters}
                selectedSort={selectedSort}
                onSortClick={toggleSortModal}
                onSortDirClick={handleSortClick}
                onFilterClick={handleFilterClick}
            />
            <div className='combos__list-container'>
                <ul
                    ref={listRef}
                    className={`combos__list-container__list${showSimpleView ? ' simple' : ''}`}
                >
                    {sortedCombos.map((combo) =>
                        <Combo
                            combo={combo}
                            selectedSort={selectedSort}
                            selectedFilters={selectedFilters}
                            showSimpleView={showSimpleView}
                            characterFilterOptions={characterFilterOptions}
                            combosFilterOptions={combosFilterOptions}
                            handleSortChange={handleSortChange}
                            onClick={() => handleComboClick(combo)}
                            onLauncherClick={handleLauncherClick}
                            onFavouriteClick={onFavouriteClick}
                            onTagClick={handleTagClick}
                            handleFiltersChange={handleFiltersChange}
                            onCharacterClick={handleCharacterClick}
                        />
                    )}
                    <div className='bottom-separator'>.</div>
                </ul>
            </div>
            <footer className='combos__footer'>
                <Button
                    text={"+"}
                    onClick={handleNewComboClick}
                />
            </footer>
        </div>
    )
}

export default Combos;