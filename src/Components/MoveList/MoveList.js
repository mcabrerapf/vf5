import React, { useState, useRef, useEffect } from 'react';
import './Movelist.scss'
import { useMainContext } from '../../Contexts/MainContext';
import MovelistHeader from './MovelistHeader';
import Move from '../Move';
import { CHARACTERS, LOCAL_KEYS, STRINGS } from '../../constants';
import { sortMovelist, filterMovelist } from './helpers';
import ActiveFiltersList from './ActiveFiltersList';
import getFromLocal from '../../helpers/getFromLocal';
import setLocalStorage from '../../helpers/setLocalStorage';

const Movelist = () => {
    const listRef = useRef(null);
    const { selectedCharacter } = useMainContext();
    const localSelectedMoveType = getFromLocal(LOCAL_KEYS.SELECTED_MOVE_TYPE);
    const localSelectedSort = getFromLocal(LOCAL_KEYS.SELECTED_MOVELIST_SORT);
    const localFilters = getFromLocal(LOCAL_KEYS.SELECTED_MOVELIST_FILTERS);

    const localFavorites = getFromLocal(
        LOCAL_KEYS.CHARACTERS_DATA,
        selectedCharacter,
        STRINGS.FAV_MOVES
    );


    const [selectedMoveType, setSelectedMoveType] = useState(localSelectedMoveType);
    const [selectedMovelistSort, setSelectedMovelistSort] = useState(localSelectedSort);
    const [selectedFilters, setSelectedFilters] = useState(localFilters);
    const [favoriteMoves, setFavoriteMoves] = useState(localFavorites);

    const selectedCharacterData = CHARACTERS
        .find(character => character.id === selectedCharacter);

    const moveKeys = Object.keys(selectedCharacterData.movelist);

    useEffect(() => {
        const newLocalFavs = getFromLocal(
            LOCAL_KEYS.CHARACTERS_DATA,
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

    const selectedCharacterMoveset = selectedCharacterData.movelist;

    if (!selectedCharacterMoveset[selectedMoveType] || !selectedMoveType) {
        setSelectedMoveType('allMoves');
        return null;
    }

    const selectedMoveset = selectedCharacterMoveset[selectedMoveType];
    const isShunDi = selectedCharacter === 'shun';

    const filteredMovelist = filterMovelist(selectedMoveset, selectedFilters, favoriteMoves);
    const sortedMovelist = sortMovelist(filteredMovelist, selectedMovelistSort);

    const handleFiltersChange = (newFilters) => {
        if (newFilters) {
            setLocalStorage(LOCAL_KEYS.SELECTED_MOVELIST_FILTERS, newFilters);
            setSelectedFilters(newFilters);
        }
    }

    const handleMoveNameClick = (move) => {
        const stringCommand = move.command.join('');

        let updatedFavorites;
        if (favoriteMoves.includes(stringCommand)) {
            updatedFavorites = favoriteMoves.filter(move => move !== stringCommand);
        } else {
            updatedFavorites = [...favoriteMoves.map(move => move), stringCommand];
        }

        setLocalStorage(
            LOCAL_KEYS.CHARACTERS_DATA,
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
        setSelectedFilters(updatedFilters);
    }

    return (
        <div className='movelist'>
            <MovelistHeader
                moveKeys={moveKeys}
                selectedFilters={selectedFilters}
                selectedMoveType={selectedMoveType}
                selectedMovelistSort={selectedMovelistSort}
                handleFiltersChange={handleFiltersChange}
                setSelectedMoveType={setSelectedMoveType}
                setSelectedMovelistSort={setSelectedMovelistSort}
            />
            <ActiveFiltersList
                selectedFilters={selectedFilters}
                selectedMovelistSort={selectedMovelistSort}
                setSelectedMovelistSort={setSelectedMovelistSort}
                handleFiltersChange={handleFiltersChange}
            />
            <div className='movelist__list-container'>
                <ul
                    ref={listRef}
                    className='movelist__list-container__list'
                >
                    {sortedMovelist.map((move, i) => {

                        const isFavourite = favoriteMoves.includes(move.command.join(''));

                        return (
                            <li
                                key={`${move}-${i}`}
                                className='movelist__list-container__list__item'
                            >
                                <Move
                                    modifier={isFavourite ? 'favorite' : ''}
                                    showSober={isShunDi}
                                    move={move}
                                    hideType={selectedMoveType !== 'allMoves'}
                                    onMoveTypeClick={onMoveTypeClick}
                                    onMoveNameClick={handleMoveNameClick}
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