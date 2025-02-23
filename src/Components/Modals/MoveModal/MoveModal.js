import './MoveModal.scss'
import React, { useState } from 'react';
import { useModalContext } from '../../../Contexts/ModalContext';
import Move from '../../Move';
import ModalFooter from '../ModalFooter';
import Button from '../../Button';
import TextWithCommand from '../../TextWithCommand';
import { stringNotationParser } from '../../../helpers';

const MoveModal = ({
    move = {},
    customMove = {},
    moveCategories,
    selectedSort,
    attackLevelOptions,
    onMoveFavouriteClick = () => { }
}) => {
    const [noteValue, setNoteValue] = useState(move.notes || '')
    const { closeModal } = useModalContext();

    const onSave = () => closeModal(noteValue, move.id);

    const onChange = ({ target: { value } }) => setNoteValue(value);

    return (
        <div className='move-modal'>
            <div className='move-modal__content'>
                <Move
                    hideNote
                    hideEditButton
                    move={move}
                    moveCategories={moveCategories}
                    selectedSort={selectedSort}
                    customMove={customMove}
                    attackLevelOptions={attackLevelOptions}
                    onMoveFavouriteClick={onMoveFavouriteClick}
                />
                <div className='move-modal__content__textarea-container'>
                    <textarea
                        value={noteValue}
                        onChange={onChange}
                    />
                    <div className='move-modal__content__textarea-container__mesage'>
                        *Supports input notation [2_6p+k] <TextWithCommand content={stringNotationParser('[2_6p+k]')} />
                    </div>
                </div>
            </div>
            <ModalFooter modifier={"align-right"}>
                <Button
                    text='CANCEL'
                    onClick={() => closeModal()}
                />
                <Button
                    modifier={'save'}
                    onClick={onSave}
                    text='SAVE'
                />
            </ModalFooter>
        </div>
    )
}

export default MoveModal;