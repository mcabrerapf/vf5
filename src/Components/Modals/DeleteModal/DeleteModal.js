import React from 'react';
import './DeleteModal.scss'
import Button from '../../Button';
import { useModalContext } from '../../../Contexts/ModalContext';

const DeleteModal = () => {
    const { closeModal } = useModalContext();

    const handleClose = (shouldDelete) => {
        closeModal(shouldDelete);
    }

    return (
        <div className='delete-modal'>
            <div className='delete-modal__content'>
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
    )
}

export default DeleteModal;