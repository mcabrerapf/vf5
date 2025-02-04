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
import { CHARACTERS_JSON } from '../../constants/CHARACTERS';

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
            setLocalStorage(SELECTED_MOVELIST_FILTERS_KEY, newFilters);
            setSelectedFilters(newFilters);
        }
    }

    const onMoveClick = (move) => {
        let updatedFavorites;
        if (favouriteMoves.includes(move.id)) {
            updatedFavorites = favouriteMoves.filter(fav => fav !== move.id);
        } else {
            updatedFavorites = [...favouriteMoves.map(fav => fav), move.id];
        }
        setFavouriteMoves(updatedFavorites);
    }

    const onMoveTypeClick = ({ target: { value } }) => {
        const parsedType = `level/${value}`
        if (selectedFilters.includes(parsedType)) return;
        const updatedFilters = [...selectedFilters.map(filter => filter), parsedType];
        setLocalStorage(SELECTED_MOVELIST_FILTERS_KEY, updatedFilters);
        setSelectedFilters(updatedFilters);
    }

    const handleSortClick = () => {
        setLocalStorage(SELECTED_MOVELIST_SORT_KEY, '/asc');
        setSelectedMovelistSort('/asc');
    }

    const handleFilterClick = ({ target: { value } }) => {
        const newFilters = selectedFilters.filter(filter => filter !== value);
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
                                    modifier={isFavourite ? 'favorite' : ''}
                                    move={move}
                                    hideType={selectedMoveCategory !== 'all_moves'}
                                    onClick={onMoveClick}
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