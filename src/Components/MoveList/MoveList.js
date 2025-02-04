import React, { useState, useRef, useEffect } from 'react';
import './Movelist.scss'
import { useMainContext } from '../../Contexts/MainContext';
import MovelistHeader from './MovelistHeader';
import Move from '../Move';
import {
    CHARACTERS,
    CHARACTERS_DATA_KEY,
    SELECTED_MOVE_TYPE_KEY,
    SELECTED_MOVELIST_SORT_KEY,
    SELECTED_MOVELIST_FILTERS_KEY,
    STRINGS
} from '../../constants';
import { sortMovelist, filterMovelist } from './helpers';
import ActiveFiltersList from '../ActiveFiltersList';
import getFromLocal from '../../helpers/getFromLocal';
import setLocalStorage from '../../helpers/setLocalStorage';

const Movelist = () => {
    const listRef = useRef(null);
    const { selectedCharacter } = useMainContext();
    const localSelectedMoveType = getFromLocal(SELECTED_MOVE_TYPE_KEY);
    const localSelectedSort = getFromLocal(SELECTED_MOVELIST_SORT_KEY);
    const localFilters = getFromLocal(SELECTED_MOVELIST_FILTERS_KEY);
    const localFavorites = getFromLocal(
        CHARACTERS_DATA_KEY,
        selectedCharacter,
        STRINGS.FAV_MOVES
    );

    const [selectedMoveType, setSelectedMoveType] = useState(localSelectedMoveType);
    const [selectedMovelistSort, setSelectedMovelistSort] = useState(localSelectedSort);
    const [selectedFilters, setSelectedFilters] = useState(localFilters);
    const [favoriteMoves, setFavoriteMoves] = useState(localFavorites);

    const selectedCharacterData = CHARACTERS
        .find(character => character.id === selectedCharacter);

    const { move_categories: moveCategories } = selectedCharacterData

    useEffect(() => {
        const newLocalFavs = getFromLocal(
            CHARACTERS_DATA_KEY,
            selectedCharacter,
            STRINGS.FAV_MOVES
        );
        setFavoriteMoves(newLocalFavs);
    },
        [selectedCharacter]
    )
    // useEffect(() => {
    //     TODO: fix scroll
    //     listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    //     listRef.current.scrollTop = 0
    // },
    //     [selectedMovelistSort]
    // )

    const { movelist: selectedCharacterMoveset } = selectedCharacterData;

    if (!selectedCharacterMoveset[selectedMoveType] || !selectedMoveType) {
        setLocalStorage(SELECTED_MOVE_TYPE_KEY, 'all_moves');
        setSelectedMoveType('all_moves');
        return null
    };

    const selectedMoveset = selectedCharacterMoveset[selectedMoveType];
    const filteredMovelist = filterMovelist(selectedMoveset, selectedFilters, favoriteMoves);
    const sortedMovelist = sortMovelist(filteredMovelist, selectedMovelistSort);

    const handleFiltersChange = (newFilters) => {
        if (newFilters) {
            setLocalStorage(SELECTED_MOVELIST_FILTERS_KEY, newFilters);
            setSelectedFilters(newFilters);
        }
    }

    const onMoveClick = (move) => {
        let updatedFavorites;
        if (favoriteMoves.includes(move.id)) {
            updatedFavorites = favoriteMoves.filter(fav => fav !== move.id);
        } else {
            updatedFavorites = [...favoriteMoves.map(fav => fav), move.id];
        }

        setLocalStorage(
            CHARACTERS_DATA_KEY,
            updatedFavorites,
            selectedCharacter,
            STRINGS.FAV_MOVES
        );
        setFavoriteMoves(updatedFavorites);
    }

    const onMoveTypeClick = ({ target: { value } }) => {
        const parsedType = `level/${value}`
        if (selectedFilters.includes(parsedType)) return;
        const updatedFilters = [...selectedFilters.map(filter => filter), parsedType];
        setLocalStorage(SELECTED_MOVELIST_FILTERS_KEY, updatedFilters);
        setSelectedFilters(updatedFilters);
    }

    const handleSortClick = () => {
        setLocalStorage(SELECTED_MOVELIST_SORT_KEY);
        setSelectedMovelistSort('/asc');
    }

    const handleFilterClick = ({ target: { value } }) => {
        const newFilters = selectedFilters.filter(filter => filter !== value);
        handleFiltersChange(newFilters);
    }

    const numerOfMoves = sortedMovelist.length;

    return (
        <div className='movelist'>
            <MovelistHeader
                moveCategories={moveCategories}
                selectedFilters={selectedFilters}
                selectedMoveType={selectedMoveType}
                selectedMovelistSort={selectedMovelistSort}
                numerOfMoves={numerOfMoves}
                handleFiltersChange={handleFiltersChange}
                setSelectedMoveType={setSelectedMoveType}
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
                    {sortedMovelist.map((move, i) => {

                        const isFavourite = favoriteMoves.includes(move.id);
if(i === 0) console.log(move)
                        return (
                            <li
                                key={move.id}
                                className='movelist__list-container__list__item'
                            >
                                <Move
                                    modifier={isFavourite ? 'favorite' : ''}
                                    move={move}
                                    hideType={selectedMoveType !== 'all_moves'}
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