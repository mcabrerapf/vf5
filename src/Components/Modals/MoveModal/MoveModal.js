import React, { useState } from 'react';
import './MoveModal.scss'
import { useModalContext } from '../../../Contexts/ModalContext';
import Move from '../../Move';
import ModalFooter from '../ModalFooter';
import Button from '../../Button';

const MoveModal = ({
    move,
    moveCategories,
    selectedSort
}) => {
    const [noteValue, setNoteValue] = useState(move.notes || '')
    const { closeModal } = useModalContext();

    const onSave = () => {
        closeModal(noteValue, move.id);
    }

    const onChange = ({ target: { value } }) => {
        setNoteValue(value);
    }

    return (
        <div className='move-modal'>
            <div className='move-modal__content'>
                <Move
                    move={move}
                    moveCategories={moveCategories}
                    selectedSort={selectedSort}
                />
                <div  className='move-modal__textarea-container'>
                    <textarea
                        value={noteValue}
                        onChange={onChange}
                    />
                </div>
            </div>
            <ModalFooter modifier={"align-right"}>
                <Button
                onClick={onSave}
                    text="✓"
                />
            </ModalFooter>

        </div>
    )
}

export default MoveModal;