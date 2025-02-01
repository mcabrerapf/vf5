import React, { useEffect, useState, useRef } from 'react';
import './MoveList.scss'
import { useMainContext } from '../../Contexts/MainContext';
import MovelistHeader from './MovelistHeader';
import Move from '../Move';
import { CHARACTERS, LOCAL_KEYS } from '../../constants';
import { sortMovelist, filterMovelist } from './helpers';
import ActiveFiltersList from './ActiveFiltersList';

const MoveList = () => {
    const listRef = useRef(null);
    const localSelectedMoveType = localStorage.getItem(LOCAL_KEYS.SELECTED_MOVE_TYPE);
    const localSelectedSort = localStorage.getItem(LOCAL_KEYS.SELECTED_MOVELIST_SORT);
    const localFilters = localStorage.getItem(LOCAL_KEYS.SELECTED_MOVELIST_FILTERS);
    const parsedLocalFilters = !localFilters ? [] : localFilters.split(',');

    const { selectedCharacter } = useMainContext();
    const [selectedMoveType, setSelectedMoveType] = useState(localSelectedMoveType);
    const [selectedMovelistSort, setSelectedMovelistSort] = useState(localSelectedSort);
    const [selectedFilters, setSelectedFilters] = useState(parsedLocalFilters);

    const selectedCharacterData = CHARACTERS
        .find(character => character.id === selectedCharacter);

    const moveKeys = Object.keys(selectedCharacterData.movelist);

    // useEffect(() => {
    //     TODO: fix scroll
    //     listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    //     listRef.current.scrollTop = 0
    // },
    //     [selectedMovelistSort]
    // )

    const handleFiltersChange = (newFilters) => {
        if (newFilters) {
            localStorage.setItem(LOCAL_KEYS.SELECTED_MOVELIST_FILTERS, newFilters);
            setSelectedFilters(newFilters);
        }
    }

    const selectedCharacterMoveset = selectedCharacterData.movelist;

    if (!selectedCharacterMoveset[selectedMoveType] || !selectedMoveType) {
        setSelectedMoveType('allMoves');
        return null;
    }

    const selectedMoveset = selectedCharacterMoveset[selectedMoveType];
    const isShunDi = selectedCharacter === 'shun';

    const filteredMovelist = filterMovelist(selectedMoveset, selectedFilters);
    const sortedMovelist = sortMovelist(filteredMovelist, selectedMovelistSort);


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
                handleFiltersChange={handleFiltersChange}
            />
            <div className='movelist__list-container'>
                <ul
                    ref={listRef}
                    className='movelist__list-container__list'
                >
                    {sortedMovelist.map((move, i) => {
                        return (
                            <li
                                key={`${move}-${i}`}
                                className='movelist__list-container__list__item'
                            >
                                <Move
                                    showSober={isShunDi}
                                    move={move}
                                    hideType={selectedMoveType !== 'allMoves'} />
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default MoveList;