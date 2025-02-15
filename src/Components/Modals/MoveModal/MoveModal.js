import React, { useState } from 'react';
import './MoveModal.scss'
import { useModalContext } from '../../../Contexts/ModalContext';
import Move from '../../Move';
import ModalFooter from '../ModalFooter';
import Button from '../../Button';
import { SaveIcon } from '../../Icon';

const MoveModal = ({
    move,
    moveCategories,
    selectedSort,
    customMoves,
    attackLevelOptions,
    onMoveFavouriteClick
}) => {
    const [noteValue, setNoteValue] = useState(move.notes || '')
    const { closeModal } = useModalContext();

    const onSave = () => {
        closeModal(noteValue, move.id);
    }

    const onChange = ({ target: { value } }) => {
        setNoteValue(value);
    }
    const customMove = customMoves.find(cMove => cMove.id === move.id) || {};
    
    return (
        <div className='move-modal'>
            <div className='move-modal__content'>
                <Move
                    move={move}
                    moveCategories={moveCategories}
                    selectedSort={selectedSort}
                    customMove={customMove}
                    attackLevelOptions={attackLevelOptions}
                    hideNote
                    hideEditButton
                    onMoveFavouriteClick={onMoveFavouriteClick}
                />
                <div className='move-modal__content__textarea-container'>
                    <textarea
                        value={noteValue}
                        onChange={onChange}
                    />
                </div>
            </div>
            <ModalFooter modifier={"align-right"}>

                <Button
                    text='CANCEL'
                    onClick={() => closeModal()}
                />
                <Button
                    modifier={'save-button'}
                    onClick={onSave}
                >
                    SAVE
                </Button>

            </ModalFooter>
        </div>
    )
}

export default MoveModal;