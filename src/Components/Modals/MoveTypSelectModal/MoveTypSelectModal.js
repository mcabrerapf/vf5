import React from 'react';
import './MoveTypSelectModal.scss'
import ModalHeader from '../ModalHeader';
import Button from '../../Button';
import { useModalContext } from '../../../Contexts/ModalContext';

const MoveTypSelectModal = ({
    selectedMoveType,
    moveKeys
}) => {
    const { closeModal } = useModalContext();

    const handleClose = () => {
        closeModal();
    }

    const handleCharacterClick = (e) => {
        closeModal(e.target.value);
    }

    return (
        <div className='move-type-select-modal'>
            <ModalHeader modifier={"align-right"}>
                <Button
                    modifier={"no-border"}
                    text={"X"}
                    onClick={handleClose}
                />
            </ModalHeader>
            <div className='move-type-select-modal__content'>
                {moveKeys.map(moveKey => {
                    if (moveKey === 'allMoves') return null;

                    return (
                        <Button
                            key={moveKey}
                            modifier={moveKey === selectedMoveType ? 'active' : ''}
                            value={moveKey}
                            text={moveKey}
                            onClick={handleCharacterClick}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default MoveTypSelectModal;