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
                <Button
                    modifier={'allMoves' === selectedMoveType ? 'active' : ''}
                    value={'allMoves'}
                    text={'All Moves'}
                    onClick={handleCharacterClick}
                />
                {moveKeys.map(moveKey => {
                    if (moveKey === 'allMoves') return null;
                    const pSelectedMoveType = moveKey.split('-').join(' ');
                    
                    return (
                        <Button
                            key={moveKey}
                            modifier={moveKey === selectedMoveType ? 'active' : ''}
                            value={moveKey}
                            text={pSelectedMoveType}
                            onClick={handleCharacterClick}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default MoveTypSelectModal;