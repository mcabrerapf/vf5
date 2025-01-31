import React, { useEffect, useState } from 'react';
import './MoveList.scss'
import { useMainContext } from '../../Contexts/MainContext';
import Move from '../Move';
import Button from '../Button';
import { ModalContextWrapper } from '../../Contexts/ModalContext';
import Modal from '../Modals/Modal';
import MoveTypSelectModal from '../Modals/MoveTypSelectModal';
import { LOCAL_KEYS } from '../../constants';

const MoveList = () => {
    const [selectedMoveType, setSelectedMoveType] = useState('allMoves');
    const [showMoveTypeSelectModal, setShowMoveTypeSelectModal] = useState(false);
    const { characters, selectedCharacter } = useMainContext();
    const moveKeys = Object.keys(characters[selectedCharacter])

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

    const handleModalClose = (type) => {
        if (type) {
            localStorage.setItem(LOCAL_KEYS.SELECTED_MOVE_TYPE, type);
            setSelectedMoveType(type);
        }
        toggleCharacterSelectModal();
    }

    const toggleCharacterSelectModal = () => {
        setShowMoveTypeSelectModal(!showMoveTypeSelectModal);
    }


    const selectedCharacterMoveset = characters[selectedCharacter];

    if (!selectedCharacterMoveset[selectedMoveType]) return null;

    const selectedMoveset = selectedCharacterMoveset[selectedMoveType];
    const isShunDi = selectedCharacter === 'shun';

    return (
        <div className='move-list'>
            <ModalContextWrapper
                showModal={showMoveTypeSelectModal}
                closeModal={handleModalClose}
            >
                <Modal>
                    <MoveTypSelectModal moveKeys={moveKeys} />
                </Modal>
            </ModalContextWrapper>
            <div className='move-list__header'>
                <Button
                    modifier={'active'}
                    text={selectedMoveType === 'allMoves' ? 'All Moves' : selectedMoveType}
                    value={selectedMoveType}
                    onClick={toggleCharacterSelectModal}
                />
                <Button
                    text='Sort: def'

                />
            </div>
            <div className='move-list__list-container'>
                <ul className='move-list__list-container__list'>
                    {selectedMoveset.map((move, i) => {
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