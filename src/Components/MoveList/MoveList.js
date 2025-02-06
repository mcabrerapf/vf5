import React, { useState, useRef, useEffect } from 'react';
import './Movelist.scss'
import { useMainContext } from '../../Contexts/MainContext';
import MovelistHeader from './MovelistHeader';
import Move from '../Move';
import {
    SELECTED_MOVE_CATEGORY_KEY,
    SELECTED_MOVELIST_SORT_KEY,
    SELECTED_MOVELIST_FILTERS_KEY,
} from '../../constants';
import { sortMovelist, filterMovelist } from './helpers';
import ActiveFiltersList from '../ActiveFiltersList';
import getFromLocal from '../../helpers/getFromLocal';
import setLocalStorage from '../../helpers/setLocalStorage';
import { CHARACTERS_JSON, MOVELIST_FILTER_OPTIONS } from '../../constants/CHARACTERS';

const Movelist = () => {
    const listRef = useRef(null);
    const { selectedCharacter, favouriteMoves, setFavouriteMoves } = useMainContext();
    const localSelectedMoveCategory = getFromLocal(SELECTED_MOVE_CATEGORY_KEY);
    const localSelectedSort = getFromLocal(SELECTED_MOVELIST_SORT_KEY);
    const localFilters = getFromLocal(SELECTED_MOVELIST_FILTERS_KEY);
    
    const [selectedMoveCategory, setSelectedMoveCategory] = useState(localSelectedMoveCategory);
    const [selectedMovelistSort, setSelectedMovelistSort] = useState(localSelectedSort);
    const [selectedFilters, setSelectedFilters] = useState(localFilters);

    const {
        move_categories: moveCategories,
        movelist: selectedCharacterMoveset
    } = CHARACTERS_JSON[selectedCharacter];
    const selectedMoveset = selectedCharacterMoveset[selectedMoveCategory];

    useEffect(() => {
        if (!selectedMoveset) setSelectedMoveCategory('all_moves');
    },
        [selectedMoveset]
    )

    const handleFiltersChange = (newFilters) => {
        
        if (newFilters) {
            setLocalStorage(SELECTED_MOVELIST_FILTERS_KEY, JSON.stringify(newFilters));
            setSelectedFilters(newFilters);
        }
    }

    const onFavouriteClick = (moveId) => {
        let updatedFavorites;
        if (favouriteMoves.includes(moveId)) {
            updatedFavorites = favouriteMoves.filter(fav => fav !== moveId);
        } else {
            updatedFavorites = [...favouriteMoves.map(fav => fav), moveId];
        }
        setFavouriteMoves(updatedFavorites);
    }

    const onMoveTypeClick = (attackLevel) => {
        if (selectedFilters.find(sFilter => sFilter.name === attackLevel)) return;
        const { id: levelId } = MOVELIST_FILTER_OPTIONS.find(option => option.name === attackLevel);

        const updatedFilters = [
            ...selectedFilters.map(filter => filter),
            { id: levelId, prefix: "attack_level", name: attackLevel }
        ];
        setLocalStorage(SELECTED_MOVELIST_FILTERS_KEY, JSON.stringify(updatedFilters));
        setSelectedFilters(updatedFilters);
    }

    const handleSortClick = () => {
        setLocalStorage(SELECTED_MOVELIST_SORT_KEY, '/asc');
        setSelectedMovelistSort('/asc');
    }

    const handleFilterClick = (filter) => {
        const newFilters = selectedFilters.filter(sFilter => sFilter.id !== filter.id);
        handleFiltersChange(newFilters);
    }

    const onMoveCategoryClick = ({ target: { value } }) => {
        const { id: categoryId } = moveCategories.find(cat => cat.name === value) || '';
        if (!categoryId) return;
        setLocalStorage(SELECTED_MOVE_CATEGORY_KEY, categoryId);
        setSelectedMoveCategory(categoryId);
    }

    const onCommandClick = (command) => {
        if (!!selectedFilters.find(filter => filter.id === command)) return;
        const newFilters = [
            ...selectedFilters.map(filter => filter),
            { id: command, name: command, prefix: 'command' }
        ];
        handleFiltersChange(newFilters);
    }

    if (!selectedMoveset) return null;
    const filteredMovelist = filterMovelist(selectedMoveset, selectedFilters, favouriteMoves);
    const sortedMovelist = sortMovelist(filteredMovelist, selectedMovelistSort);
    const numerOfMoves = sortedMovelist.length;

    return (
        <div className='movelist'>
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
                onSortClick={handleSortClick}
                onFilterClick={handleFilterClick}
            />
            <div className='movelist__list-container'>
                <ul
                    ref={listRef}
                    className='movelist__list-container__list'
                >
                    {sortedMovelist.map((move) => {
                        const isFavourite = favouriteMoves.includes(move.id);

                        return (
                            <li
                                key={move.id}
                                className='movelist__list-container__list__item'
                            >
                                <Move
                                    move={move}
                                    isFavourite={isFavourite}
                                    moveCategories={moveCategories}
                                    onFavouriteClick={onFavouriteClick}
                                    onCommandClick={onCommandClick}
                                    onMoveCategoryClick={onMoveCategoryClick}
                                    onMoveTypeClick={onMoveTypeClick}
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