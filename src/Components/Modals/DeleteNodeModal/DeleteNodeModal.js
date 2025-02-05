import React from 'react';
import './DeleteNodeModal.scss'
import Button from '../../Button';
import { useModalContext } from '../../../Contexts/ModalContext';

const DeleteNodeModal = ({
    note
}) => {
    const { closeModal } = useModalContext();

    const handleClose = (shouldDelete) => {
        closeModal(shouldDelete);
    }

    return (
        <div className='delete-note-modal'>
            <div className='delete-note-modal__content'>
                <div className='delete-note-modal__content__note-content'>
                    {note.content}
                </div>
                <div className='delete-note-modal__content__buttons'>
                    <Button
                        modifier={'delete-button'}
                        text='DELETE'
                        onClick={() => handleClose(true)}
                    />
                    <Button
                        text='CANCEL'
                        onClick={() => handleClose()}
                    />
                </div>
            </div>
        </div>
    )
}

export default DeleteNodeModal;