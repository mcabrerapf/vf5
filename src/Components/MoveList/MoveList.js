import React, { useState, useRef, useEffect } from 'react';
import './Movelist.scss'
import { deleteCustomMove, getCombos, getCustomMoves, updateCustomMoves } from '../../services';
import { useMainContext } from '../../Contexts/MainContext';
import ListHeader from '../ListHeader';
import Move from '../Move';
import {
    CHARACTERS_JSON,
    MOVELIST_SORT_OPTIONS,
    SELECTED_MOVE_CATEGORY_KEY,
    SELECTED_MOVELIST_SORT_KEY,
    SELECTED_MOVELIST_FILTERS_KEY,
    SELECTED_COMBOS_FILTERS_KEY,
    STRINGS,
} from '../../constants';
import ActiveFiltersList from '../ActiveFiltersList';
import getFromLocal from '../../helpers/getFromLocal';
import setLocalStorage from '../../helpers/setLocalStorage';
import { ModalContextWrapper } from '../../Contexts/ModalContext';
import Modal from '../Modals/Modal';
import SortModal from '../Modals/SortModal';
import MoveModal from '../Modals/MoveModal';
import { filterList, getPseudoLaunchers, sortList } from '../../helpers';


const Movelist = ({
    setCharacterView,
}) => {
    const listRef = useRef(null);
    const {
        selectedCharacter,
        listView,
    } = useMainContext();
    const {
        move_categories: moveCategories,
        movelist_filter_options: movelistFilterOptions,
        movelist: selectedCharacterMoveset
    } = CHARACTERS_JSON[selectedCharacter];

    const localSelectedMoveCategory = getFromLocal(SELECTED_MOVE_CATEGORY_KEY);
    const localSelectedSort = getFromLocal(SELECTED_MOVELIST_SORT_KEY);
    const localFilters = getFromLocal(SELECTED_MOVELIST_FILTERS_KEY);
    const verifiedLocalFilters = localFilters
        .filter(lFilter => !!movelistFilterOptions
            .find(fOption => fOption.id === lFilter.id));
    const [customMoves, setCustomMoves] = useState(null);
    const [comboLaunchers, setComboLaunchers] = useState([]);
    const [selectedMoveCategory, setSelectedMoveCategory] = useState(localSelectedMoveCategory);
    const [selectedMovelistSort, setSelectedMovelistSort] = useState(localSelectedSort);
    const [selectedFilters, setSelectedFilters] = useState(verifiedLocalFilters);
    const [showSortModal, setShowSortModal] = useState(false);
    const [selectedMove, setSelectedMove] = useState(null);
    const [showMoveModal, setShowMoveModal] = useState(false);
    const selectedMoveset = selectedCharacterMoveset[selectedMoveCategory];

    useEffect(() => {
        const localCustomMoves = getCustomMoves(selectedCharacter)
        const localCombos = getCombos(selectedCharacter);
        const newLaunchers = getPseudoLaunchers(localCombos);
        const verifiedFilters = selectedFilters
            .filter(lFilter => !!movelistFilterOptions
                .find(fOption => fOption.id === lFilter.id));
        setCustomMoves(localCustomMoves);
        setComboLaunchers(newLaunchers);
        setSelectedFilters(verifiedFilters);
        setSelectedMoveCategory('all_moves');
    },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [selectedCharacter]
    )

    if (!customMoves) return null;

    const scrollToTop = () => {
        if (listRef.current) listRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }

    const handleFiltersChange = (newFilters) => {
        if (newFilters) {
            setLocalStorage(SELECTED_MOVELIST_FILTERS_KEY, JSON.stringify(newFilters));
            setSelectedFilters(newFilters);
            scrollToTop();
        }
    }

    const hadleSortChange = (newSort) => {
        if (newSort) {
            setLocalStorage(SELECTED_MOVELIST_SORT_KEY, JSON.stringify(newSort));
            setSelectedMovelistSort(newSort);
            scrollToTop();
        }
    }

    const onMoveClick = (move) => {
        const customMatch = customMoves.find(fMove => fMove.id === move.id) || {};
        setSelectedMove({ ...move, notes: customMatch.note || move.notes })
        toggleMoveModal();
    }

    const onMoveFavouriteClick = (moveId) => {
        const moveMatch = customMoves.find(fMove => fMove.id === moveId);
        let updatedCustomMoves;

        if (!!moveMatch?.favourite && !moveMatch?.note) {
            updatedCustomMoves = deleteCustomMove(selectedCharacter, moveId);
        } else {
            const newMove = {
                ...moveMatch,
                id: moveId,
                favourite: !moveMatch?.favourite,
            };
            updatedCustomMoves = updateCustomMoves(selectedCharacter, newMove, !moveMatch);
        }
        setCustomMoves(updatedCustomMoves);
    }

    const onMoveCombosClick = (launcherFilter) => {
        setLocalStorage(SELECTED_COMBOS_FILTERS_KEY, JSON.stringify([launcherFilter]));
        setCharacterView(STRINGS.COMBOS);
    }

    const handleMoveModalClose = (note, moveId) => {
        if (note === undefined) {
            toggleMoveModal();
            return;
        }
        const moveMatch = customMoves.find(fMove => fMove.id === moveId);
        let updatedCustomMoves;
        if (!moveMatch?.favourite && !note) {
            updatedCustomMoves = deleteCustomMove(selectedCharacter, moveId);
        } else {
            const newMove = {
                ...moveMatch,
                id: moveId,
                note: note
            };
            updatedCustomMoves = updateCustomMoves(selectedCharacter, newMove, !moveMatch);
        }
        setSelectedMove(null);
        setCustomMoves(updatedCustomMoves);
        toggleMoveModal();
    }

    const onMoveAttackLevelClick = (attackLevelFilterId) => {
        let updatedFilters;
        if (!!selectedFilters.find(sFilter => sFilter.id === attackLevelFilterId)) {
            updatedFilters = selectedFilters.filter(sFilter => sFilter.id !== attackLevelFilterId)
        } else {
            const newFilter = movelistFilterOptions.find(fOption => fOption.id === attackLevelFilterId);
            updatedFilters = [
                ...selectedFilters.map(filter => filter),
                newFilter
            ]
        };
        handleFiltersChange(updatedFilters);
    }

    const onMoveCategoryClick = (categoryName) => {
        const { id: categoryId } = moveCategories.find(cat => cat.name === categoryName) || '';
        if (!categoryId) return;
        const newMoveCategory = categoryId === selectedMoveCategory ?
            moveCategories[0].id : categoryId;
        setLocalStorage(SELECTED_MOVE_CATEGORY_KEY, newMoveCategory);
        setSelectedMoveCategory(newMoveCategory);
        scrollToTop();
    }

    const onMoveCommandClick = (newFilter) => {
        let newFilters;
        if (!!selectedFilters.find(filter => filter.value === newFilter.value)) {
            newFilters = selectedFilters.filter(filter => filter.value !== newFilter.value);
        } else {
            newFilters = [
                ...selectedFilters.map(filter => filter),
                newFilter
            ]
        }
        handleFiltersChange(newFilters);
    }

    const handleActiveFilterClick = (filter) => {
        const newFilters = selectedFilters.filter(sFilter => sFilter.id !== filter.id);
        handleFiltersChange(newFilters);
    }

    const handleSortModalClose = (sort) => {
        handleSortChange(sort)
        toggleSortModal();
    }

    const handleSortDirChange = () => {
        const newSort = {
            ...selectedMovelistSort,
            dir: selectedMovelistSort.dir === 'asc' ? 'dsc' : 'asc'
        }
        hadleSortChange(newSort);
    }

    const handleSortChange = (sort) => {
        if (!sort) return;
        hadleSortChange(sort);
    }

    const toggleSortModal = () => {
        setShowSortModal(!showSortModal);
    }

    const toggleMoveModal = () => {
        setShowMoveModal(!showMoveModal);
    }

    if (!selectedMoveset) return null;
    const filteredMovelist = filterList(selectedMoveset, selectedFilters, customMoves);
    const sortedMovelist = sortList(filteredMovelist, selectedMovelistSort);
    const numerOfMoves = sortedMovelist.length;
    const showSimpleView = listView === 'S';
    const attackLevelOptions = movelistFilterOptions.filter(fOption => fOption.key === 'attack_level');

    return (
        <div className='movelist'>
            <ModalContextWrapper
                showModal={showSortModal}
                closeModal={handleSortModalClose}
            >
                <Modal>
                    <SortModal
                        selectedSort={selectedMovelistSort}
                        sortOptions={MOVELIST_SORT_OPTIONS}
                    />
                </Modal>
            </ModalContextWrapper>
            <ModalContextWrapper
                showModal={showMoveModal}
                closeModal={handleMoveModalClose}
                closeOnBgClick={false}
            >
                <Modal>
                    <MoveModal
                        move={selectedMove}
                        moveCategories={moveCategories}
                        customMoves={customMoves}
                        attackLevelOptions={attackLevelOptions}
                        onMoveFavouriteClick={onMoveFavouriteClick}
                    />
                </Modal>
            </ModalContextWrapper>
            <ListHeader
                moveCategories={moveCategories}
                selectedMoveCategory={selectedMoveCategory}
                selectedFilters={selectedFilters}
                filterOptions={movelistFilterOptions}
                numerOfItems={numerOfMoves}
                selectedMovelistSort={selectedMovelistSort}
                handleFiltersChange={handleFiltersChange}
                setSelectedMoveCategory={setSelectedMoveCategory}
            />
            <ActiveFiltersList
                selectedFilters={selectedFilters}
                selectedSort={selectedMovelistSort}
                onSortClick={toggleSortModal}
                onSortDirClick={handleSortDirChange}
                onFilterClick={handleActiveFilterClick}
            />
            <div className='movelist__list-container'>
                <ul
                    ref={listRef}
                    className={`movelist__list-container__list${showSimpleView ? ' simple' : ""}`}
                >
                    {sortedMovelist.map((move) => {
                        const customMove = customMoves.find(cMove => cMove.id === move.id) || {};
                        return (
                            <Move
                                key={move.id}
                                move={move}
                                customMove={customMove}
                                moveCategories={moveCategories}
                                selectedMoveCategory={selectedMoveCategory}
                                selectedFilters={selectedFilters}
                                selectedSort={selectedMovelistSort}
                                showSimpleView={showSimpleView}
                                comboLaunchers={comboLaunchers}
                                attackLevelOptions={attackLevelOptions}
                                handleFiltersChange={handleFiltersChange}
                                onMoveClick={onMoveClick}
                                handleSortChange={handleSortChange}
                                handleSortDirChange={handleSortDirChange}
                                onMoveFavouriteClick={onMoveFavouriteClick}
                                onMoveCommandClick={onMoveCommandClick}
                                onMoveCategoryClick={onMoveCategoryClick}
                                onMoveAttackLevelClick={onMoveAttackLevelClick}
                                onMoveCombosClick={onMoveCombosClick}
                            />
                        )
                    })}
                    <div className='bottom-separator'>.</div>
                </ul>
            </div>
        </div>
    )
}

export default Movelist;