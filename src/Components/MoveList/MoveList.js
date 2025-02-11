import React, { useState, useRef, useEffect } from 'react';
import './Movelist.scss'
import { deleteCustomMove, getCombos, getCustomMoves, updateCustomMoves } from '../../services';
import { useMainContext } from '../../Contexts/MainContext';
import MovelistHeader from './MovelistHeader';
import Move from '../Move';
import {
    SELECTED_MOVE_CATEGORY_KEY,
    SELECTED_MOVELIST_SORT_KEY,
    SELECTED_MOVELIST_FILTERS_KEY,
    SELECTED_COMBOS_FILTERS_KEY,
    STRINGS,
} from '../../constants';
import { sortMovelist, filterMovelist, getLaunchers } from './helpers';
import ActiveFiltersList from '../ActiveFiltersList';
import getFromLocal from '../../helpers/getFromLocal';
import setLocalStorage from '../../helpers/setLocalStorage';
import { CHARACTERS_JSON, MOVELIST_FILTER_OPTIONS, MOVELIST_SORT_OPTIONS } from '../../constants/CHARACTERS';
import { ModalContextWrapper } from '../../Contexts/ModalContext';
import Modal from '../Modals/Modal';
import SortModal from '../Modals/SortModal';
import MoveModal from '../Modals/MoveModal';


const Movelist = ({
    setCharacterView
}) => {
    const listRef = useRef(null);
    const {
        selectedCharacter,
        listView,
    } = useMainContext();
    const localSelectedMoveCategory = getFromLocal(SELECTED_MOVE_CATEGORY_KEY);
    const localSelectedSort = getFromLocal(SELECTED_MOVELIST_SORT_KEY);
    const localFilters = getFromLocal(SELECTED_MOVELIST_FILTERS_KEY);
    const sortOptions = MOVELIST_SORT_OPTIONS.filter(option => {
        return !['active', 'total', 'crouch_hit', 'crouch_c_hit', 'recovery_c'].includes(option.id);
    })

    const [customMoves, setCustomMoves] = useState(null);
    const [comboLaunchers, setComboLaunchers] = useState([]);
    const [selectedMoveCategory, setSelectedMoveCategory] = useState(localSelectedMoveCategory);
    const [selectedMovelistSort, setSelectedMovelistSort] = useState(localSelectedSort);
    const [selectedFilters, setSelectedFilters] = useState(localFilters);
    const [showSortModal, setShowSortModal] = useState(false);
    const [selectedMove, setSelectedMove] = useState(null);
    const [showMoveModal, setShowMoveModal] = useState(false);

    const {
        move_categories: moveCategories,
        movelist: selectedCharacterMoveset
    } = CHARACTERS_JSON[selectedCharacter];
    const selectedMoveset = selectedCharacterMoveset[selectedMoveCategory];

    useEffect(() => {
        const localCustomMoves = getCustomMoves(selectedCharacter)
        const localCombos = getCombos(selectedCharacter);
        const newLaunchers = getLaunchers(localCombos);
        
        setCustomMoves(localCustomMoves);
        setComboLaunchers(newLaunchers);
    },
        [selectedCharacter]
    )

    useEffect(() => {
        if (!selectedMoveset) setSelectedMoveCategory('all_moves');
    },
        [selectedMoveset]
    )

    if (!customMoves) return null;

    const handleFiltersChange = (newFilters) => {
        if (newFilters) {
            setLocalStorage(SELECTED_MOVELIST_FILTERS_KEY, JSON.stringify(newFilters));
            setSelectedFilters(newFilters);
            scrollToTop();
        }
    }

    const onFavouriteClick = (moveId) => {
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

    const onMoveTypeClick = (attackLevel) => {
        if (selectedFilters.find(sFilter => sFilter.name === attackLevel)) return;
        const { id: levelId } = MOVELIST_FILTER_OPTIONS.find(option => option.name === attackLevel);

        const updatedFilters = [
            ...selectedFilters.map(filter => filter),
            { id: levelId, prefix: "attack_level", name: attackLevel }
        ];
        scrollToTop();
        setLocalStorage(SELECTED_MOVELIST_FILTERS_KEY, JSON.stringify(updatedFilters));
        setSelectedFilters(updatedFilters);
    }

    const handleSortClick = () => {
        const newSort = {
            ...selectedMovelistSort,
            dir: selectedMovelistSort.dir === 'asc' ? 'dsc' : 'asc'
        }
        scrollToTop();
        setLocalStorage(SELECTED_MOVELIST_SORT_KEY, JSON.stringify(newSort));
        setSelectedMovelistSort(newSort);
    }

    const handleFilterClick = (filter) => {
        const newFilters = selectedFilters.filter(sFilter => sFilter.id !== filter.id);
        handleFiltersChange(newFilters);
    }

    const onMoveCategoryClick = ({ target: { value } }) => {
        const { id: categoryId } = moveCategories.find(cat => cat.name === value) || '';
        if (!categoryId) return;
        const categoryToSet = categoryId === selectedMoveCategory ?
            moveCategories[0].id : categoryId;
        scrollToTop();
        setLocalStorage(SELECTED_MOVE_CATEGORY_KEY, categoryToSet);
        setSelectedMoveCategory(categoryToSet);
    }

    const onCommandClick = (command) => {
        let newFilters;
        if (!!selectedFilters.find(filter => filter.id === command)) {
            newFilters = selectedFilters.filter(filter => filter.id !== command);
        } else {
            newFilters = [
                ...selectedFilters.map(filter => filter),
                { id: command, name: command, prefix: 'command' }
            ]
        }

        scrollToTop();
        handleFiltersChange(newFilters);
    }

    const handleSortModalClose = (sort) => {
        handleSortChange(sort)
        toggleSortModal();
    }

    const handleSortChange = (sort) => {
        if (!sort) return;
        scrollToTop();
        setLocalStorage(SELECTED_MOVELIST_SORT_KEY, JSON.stringify(sort));
        setSelectedMovelistSort(sort);
    }

    const toggleSortModal = () => {
        setShowSortModal(!showSortModal);
    }

    const onMoveClick = (move) => {
        const customMatch = customMoves.find(fMove => fMove.id === move.id) || {};
        setSelectedMove({ ...move, notes: customMatch.note || move.notes })
        toggleMoveModal();
    }

    const toggleMoveModal = () => {
        setShowMoveModal(!showMoveModal);
    }

    const scrollToTop = () => {
        if (listRef.current) listRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }

    const onCombosClick = (launcherFilter) => {
        setLocalStorage(SELECTED_COMBOS_FILTERS_KEY, JSON.stringify([launcherFilter]));
        setCharacterView(STRINGS.COMBOS);
    }

    if (!selectedMoveset) return null;
    const filteredMovelist = filterMovelist(selectedMoveset, selectedFilters, customMoves);
    const sortedMovelist = sortMovelist(filteredMovelist, selectedMovelistSort);
    const numerOfMoves = sortedMovelist.length;
    const showSimpleView = listView === 'S';

    return (
        <div className='movelist'>
            <ModalContextWrapper
                showModal={showSortModal}
                closeModal={handleSortModalClose}
            >
                <Modal>
                    <SortModal
                        selectedSort={selectedMovelistSort}
                        sortOptions={sortOptions}
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
                        onFavouriteClick={onFavouriteClick}
                    />
                </Modal>
            </ModalContextWrapper>
            <MovelistHeader
                moveCategories={moveCategories}
                selectedFilters={selectedFilters}
                selectedMoveCategory={selectedMoveCategory}
                selectedMovelistSort={selectedMovelistSort}
                numerOfMoves={numerOfMoves}
                handleFiltersChange={handleFiltersChange}
                setSelectedMoveCategory={setSelectedMoveCategory}
                setSelectedFilters={setSelectedFilters}
                setSelectedMovelistSort={setSelectedMovelistSort}
            />
            <ActiveFiltersList
                selectedFilters={selectedFilters}
                selectedSort={selectedMovelistSort}
                onSortClick={toggleSortModal}
                onSortDirClick={handleSortClick}
                onFilterClick={handleFilterClick}
            />
            <div className='movelist__list-container'>
                <ul
                    ref={listRef}
                    className='movelist__list-container__list'
                >
                    {sortedMovelist.map((move) => {

                        return (
                            <li
                                key={move.id}
                                className='movelist__list-container__list__item'
                            >
                                <Move
                                    move={move}
                                    customMoves={customMoves}
                                    selectedSort={selectedMovelistSort}
                                    moveCategories={moveCategories}
                                    selectedMoveCategory={selectedMoveCategory}
                                    selectedFilters={selectedFilters}
                                    showSimpleView={showSimpleView}
                                    comboLaunchers={comboLaunchers}
                                    handleFiltersChange={handleFiltersChange}
                                    onMoveClick={onMoveClick}
                                    handleSortChange={handleSortChange}
                                    handleSortDirChange={handleSortClick}
                                    onFavouriteClick={onFavouriteClick}
                                    onCommandClick={onCommandClick}
                                    onMoveCategoryClick={onMoveCategoryClick}
                                    onMoveTypeClick={onMoveTypeClick}
                                    onCombosClick={onCombosClick}
                                />
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default Movelist;