import React from 'react';
import './MoveTypSelectModal.scss'
import ModalHeader from '../ModalHeader';
import Button from '../../Button';
import { useModalContext } from '../../../Contexts/ModalContext';

const MoveTypSelectModal = ({
    selectedMoveType,
    moveCategories
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
                    modifier={'all_moves' === selectedMoveType ? 'active' : ''}
                    value={'all_moves'}
                    text={'All Moves'}
                    onClick={handleCharacterClick}
                />
                {moveCategories.map(moveKey => {
                    if (moveKey.id === 'all_moves') return null;
                    
                    
                    return (
                        <Button
                            key={moveKey.id}
                            modifier={moveKey.id === selectedMoveType ? 'active' : ''}
                            value={moveKey.id}
                            text={moveKey.name}
                            onClick={handleCharacterClick}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default MoveTypSelectModal;