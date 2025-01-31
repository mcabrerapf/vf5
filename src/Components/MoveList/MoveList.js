import React, { useEffect, useState } from 'react';
import './MoveList.scss'
import { useMainContext } from '../../Contexts/MainContext';
import Move from '../Move';
import Button from '../Button';
import { ModalContextWrapper } from '../../Contexts/ModalContext';
import Modal from '../Modals/Modal';
import MoveTypSelectModal from '../Modals/MoveTypSelectModal';

const MoveList = () => {
    const [selectedMoveType, setSelectedMoveType] = useState('allMoves');
    const [showMoveTypeSelectModal, setShowMoveTypeSelectModal] = useState(false);
    const { characters, selectedCharacter } = useMainContext();
    
    useEffect(
        () => {
            setSelectedMoveType('allMoves');
        },
        [selectedCharacter]
    );

    const handleModalClose = (type) => {
        if (type) setSelectedMoveType(type);
        toggleCharacterSelectModal();
    }

    const toggleCharacterSelectModal = () => {
        setShowMoveTypeSelectModal(!showMoveTypeSelectModal);
    }

    const moveKeys = Object.keys(characters[selectedCharacter])
    const selectedCharacterMoveset = characters[selectedCharacter];

    if (!selectedCharacterMoveset[selectedMoveType]) return null;

    const selectedMoveset = selectedCharacterMoveset[selectedMoveType];

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
            </div>
            <div className='move-list__list-container'>
                <ul className='move-list__list-container__list'>
                    {selectedMoveset.map(move => {
                        return (
                            <li className='move-list__list-container__list__item'>
                                <Move
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