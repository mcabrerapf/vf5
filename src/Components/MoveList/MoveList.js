import './MoveList.scss'
import React, { useState, useRef, useEffect } from 'react';
import { deleteCustomMove, getCombos, getCustomMoves, updateCustomMoves } from '../../services';
import { ModalContextWrapper } from '../../Contexts/ModalContext';
import { useMainContext } from '../../Contexts/MainContext';
import SortModal from '../Modals/SortModal';
import MoveModal from '../Modals/MoveModal';
import ListHeader from '../ListHeader';
import Move from '../Move';
import ActiveFiltersList from '../ActiveFiltersList';
import getFromLocal from '../../helpers/getFromLocal';
import setLocalStorage from '../../helpers/setLocalStorage';
import { filterList, getPseudoLaunchers, sortList } from '../../helpers';
import {
    CHARACTERS_JSON,
    MOVELIST_SORT_OPTIONS,
    SELECTED_MOVE_CATEGORY_KEY,
    SELECTED_MOVELIST_SORT_KEY,
    SELECTED_MOVELIST_FILTERS_KEY,
    SELECTED_COMBOS_FILTERS_KEY,
    STRINGS,
} from '../../constants';

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

    const [customMoves, setCustomMoves] = useState(null);
    const [comboLaunchers, setComboLaunchers] = useState([]);
    const [selectedMoveCategory, setSelectedMoveCategory] = useState(localSelectedMoveCategory);
    const [selectedMovelistSort, setSelectedMovelistSort] = useState(localSelectedSort);
    const [selectedFilters, setSelectedFilters] = useState(localFilters);
    const [selectedMove, setSelectedMove] = useState(null);
    const [showSortModal, setShowSortModal] = useState(false);
    const [showMoveModal, setShowMoveModal] = useState(false);
    const selectedMoveset = selectedCharacterMoveset[selectedMoveCategory];

    useEffect(() => {
        const localCustomMoves = getCustomMoves(selectedCharacter)
        const localCombos = getCombos(selectedCharacter);
        const newLaunchers = getPseudoLaunchers(localCombos);

        setCustomMoves(localCustomMoves);
        setComboLaunchers(newLaunchers);
        setSelectedMoveCategory(STRINGS.ALL_MOVES);
        if (listRef.current) listRef.current.scrollTo({ top: 0, behavior: "smooth" });
    },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [selectedCharacter]
    )

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

    const handleSortChange = (newSort) => {
        if (newSort) {
            setLocalStorage(SELECTED_MOVELIST_SORT_KEY, JSON.stringify(newSort));
            setSelectedMovelistSort(newSort);
            scrollToTop();
        }
    }

    const handleSortDirChange = () => {
        const newSort = {
            ...selectedMovelistSort,
            dir: selectedMovelistSort.dir === 'asc' ? 'dsc' : 'asc'
        }
        handleSortChange(newSort);
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

    const handleMoveModalClose = (note) => {
        if (note === undefined) {
            toggleMoveModal();
            return;
        }
        const moveMatch = customMoves.find(fMove => fMove.id === selectedMove.id);
        let updatedCustomMoves;
        if (!moveMatch?.favourite && !note) {
            updatedCustomMoves = deleteCustomMove(selectedCharacter, selectedMove.id);
        } else {
            const newMove = {
                ...moveMatch,
                id: selectedMove.id,
                note: note
            };
            updatedCustomMoves = updateCustomMoves(selectedCharacter, newMove, !moveMatch);
        }
        setSelectedMove(null);
        setCustomMoves(updatedCustomMoves);
        toggleMoveModal();
    }

    const onMoveFilterPropClick = (propKey, propValue) => {
        const filterOptionMatch = movelistFilterOptions.find(fOption => {
            if (propKey === STRINGS.COMMAND) return fOption.key === propKey;
            return fOption.value === propValue;
        });
        if (!filterOptionMatch) return;
        const newFilter = { ...filterOptionMatch };
        newFilter.value = propValue;
        newFilter.id = `${propKey}/${propValue}`;
        if (propKey === STRINGS.COMMAND) {
            newFilter.name = 'Command';
            newFilter.short_name = 'Cmd';
        }
        const filteredFilters = selectedFilters
            .filter(sFilter => sFilter.id !== `${propKey}/${propValue}`);
        if (filteredFilters.length !== selectedFilters.length) {
            handleFiltersChange(filteredFilters);
        } else {
            handleFiltersChange([...filteredFilters, newFilter]);
        }
    }

    const onMoveSortablePropClick = (newSortKey) => {
        if (newSortKey === selectedMovelistSort.key) {
            handleSortDirChange();

        } else {
            const newSortValue = MOVELIST_SORT_OPTIONS
                .find(sOption => sOption.key === newSortKey);

            if (!newSortValue) return;
            handleSortChange(newSortValue);
        }
    }

    const handleActiveFilterClick = (filter) => {
        const newFilters = selectedFilters.filter(sFilter => sFilter.id !== filter.id);
        handleFiltersChange(newFilters);
    }

    const handleSortModalClose = (sort) => {
        handleSortChange(sort)
        toggleSortModal();
    }



    const toggleSortModal = () => setShowSortModal(!showSortModal);

    const toggleMoveModal = () => setShowMoveModal(!showMoveModal);

    const handleCategoryChange = (newCategory) => {
        if (newCategory) {
            setLocalStorage(SELECTED_MOVE_CATEGORY_KEY, newCategory);
            setSelectedMoveCategory(newCategory);
            scrollToTop();
        }
    }

    if (!customMoves || !selectedMoveset) return null;

    const filteredMovelist = filterList(selectedMoveset, selectedFilters, customMoves);
    const sortedMovelist = sortList(filteredMovelist, selectedMovelistSort);
    const numerOfMoves = sortedMovelist.length;
    const showSimpleView = listView === 'S';
    const attackLevelOptions = movelistFilterOptions.filter(fOption => fOption.key === STRINGS.ATTACK_LEVEL);
    
    return (
        <div className='movelist'>
            <ModalContextWrapper
                showModal={showSortModal}
                closeModal={handleSortModalClose}
            >
                <SortModal
                    selectedSort={selectedMovelistSort}
                    sortOptions={MOVELIST_SORT_OPTIONS}
                />
            </ModalContextWrapper>
            <ModalContextWrapper
                showModal={showMoveModal}
                closeModal={handleMoveModalClose}
                closeOnBgClick={false}
            >
                <MoveModal
                    move={selectedMove}
                    customMove={customMoves.find(cMove => cMove.id === selectedMove?.id) || {}}
                    moveCategories={moveCategories}
                    customMoves={customMoves}
                    attackLevelOptions={attackLevelOptions}
                    onMoveFavouriteClick={onMoveFavouriteClick}
                />
            </ModalContextWrapper>
            <ListHeader
                moveCategories={moveCategories}
                selectedMoveCategory={selectedMoveCategory}
                selectedFilters={selectedFilters}
                filterOptions={movelistFilterOptions}
                numerOfItems={numerOfMoves}
                selectedMovelistSort={selectedMovelistSort}
                handleFiltersChange={handleFiltersChange}
                handleCategoryChange={handleCategoryChange}
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
                                selectedFilters={selectedFilters}
                                selectedSort={selectedMovelistSort}
                                showSimpleView={showSimpleView}
                                comboLaunchers={comboLaunchers}
                                attackLevelOptions={attackLevelOptions}
                                handleFiltersChange={handleFiltersChange}
                                onMoveClick={onMoveClick}
                                onMoveSortablePropClick={onMoveSortablePropClick}
                                onMoveFavouriteClick={onMoveFavouriteClick}
                                onMoveCombosClick={onMoveCombosClick}
                                onMoveFilterPropClick={onMoveFilterPropClick}
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