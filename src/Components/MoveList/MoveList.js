import React, { useEffect, useState, useRef } from 'react';
import './MoveList.scss'
import { useMainContext } from '../../Contexts/MainContext';
import Move from '../Move';
import Button from '../Button';
import { ModalContextWrapper } from '../../Contexts/ModalContext';
import Modal from '../Modals/Modal';
import MoveTypSelectModal from '../Modals/MoveTypSelectModal';
import { CHARACTERS, LOCAL_KEYS } from '../../constants';
import MoveListSortModal from '../Modals/MoveListSortModal';
import { SORT_OPTIONS } from '../Modals/MoveListSortModal/constants';
import { sortMovelist } from './helpers';

const MoveList = () => {
    const { selectedCharacter } = useMainContext()
    const listRef = useRef(null);;
    const [selectedMoveType, setSelectedMoveType] = useState(null);
    const [selectedMovelistSort, setSelectedMovelistSort] = useState('/asc');
    const [showMoveTypeSelectModal, setShowMoveTypeSelectModal] = useState(false);
    const [showSortModal, setShowSortModal] = useState(false);

    const selectedCharacterData = CHARACTERS
        .find(character => character.id === selectedCharacter);

    const moveKeys = Object.keys(selectedCharacterData.movelist);

    useEffect(
        () => {
            const localSelectedMoveType = localStorage.getItem(LOCAL_KEYS.SELECTED_MOVE_TYPE);
            const isValidMoveType = !!moveKeys.find(moveKey => moveKey === localSelectedMoveType);
            if (!isValidMoveType) localStorage.setItem(LOCAL_KEYS.SELECTED_MOVE_TYPE, 'allMoves');
            const typeToUse = isValidMoveType ? localSelectedMoveType : 'allMoves';
            setSelectedMoveType(typeToUse);
        },
        [selectedCharacter, moveKeys]
    );

    useEffect(() => {
        // TODO: fix scroll
        // listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        // listRef.current.scrollTop = 0
    },
        [selectedMovelistSort]
    )

    const handleTypeSelectModalClose = (type) => {
        if (type) {
            localStorage.setItem(LOCAL_KEYS.SELECTED_MOVE_TYPE, type);
            setSelectedMoveType(type);
        }
        toggleCharacterSelectModal();
    }

    const handleSortModalClose = (sort) => {
        localStorage.setItem(LOCAL_KEYS.SELECTED_MOVELIST_SORT, sort);
        setSelectedMovelistSort(sort);
        toggleSortModal();
    }

    const toggleCharacterSelectModal = () => {
        setShowMoveTypeSelectModal(!showMoveTypeSelectModal);
    }

    const toggleSortModal = () => {
        setShowSortModal(!showSortModal);
    }

    const selectedCharacterMoveset = selectedCharacterData.movelist;

    if (!selectedCharacterMoveset[selectedMoveType] || !selectedMoveType) return null;

    const selectedMoveset = selectedCharacterMoveset[selectedMoveType];
    const isShunDi = selectedCharacter === 'shun';
    const parsedSort = selectedMovelistSort.split('/');
    const [, sortName] = SORT_OPTIONS.find(option => option[0] === parsedSort[0]);
    const sortedList = sortMovelist(selectedMoveset, selectedMovelistSort);

    return (
        <div className='move-list'>
            <ModalContextWrapper
                showModal={showMoveTypeSelectModal}
                closeModal={handleTypeSelectModalClose}
            >
                <Modal>
                    <MoveTypSelectModal
                        selectedMoveType={selectedMoveType}
                        moveKeys={moveKeys}
                    />
                </Modal>
            </ModalContextWrapper>
            <ModalContextWrapper
                showModal={showSortModal}
                closeModal={handleSortModalClose}
            >
                <Modal>
                    <MoveListSortModal selectedMovelistSort={selectedMovelistSort} />
                </Modal>
            </ModalContextWrapper>
            <div className='move-list__header'>
                <Button
                    modifier={'active'}
                    text={selectedMoveType === 'allMoves' ? 'All Moves' : selectedMoveType}
                    onClick={toggleCharacterSelectModal}
                />
                <Button
                    text={`Sort: ${sortName} ${parsedSort[1]}`}
                    onClick={toggleSortModal}

                />
            </div>
            <div className='move-list__list-container'>
                <ul
                    ref={listRef}
                    className='move-list__list-container__list'
                >
                    {sortedList.map((move, i) => {
                        return (
                            <li
                                key={`${move}-${i}`}
                                className='move-list__list-container__list__item'
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