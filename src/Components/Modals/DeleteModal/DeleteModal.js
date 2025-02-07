import React from 'react';
import './DeleteModal.scss'
import Button from '../../Button';
import { useModalContext } from '../../../Contexts/ModalContext';
import Combo from '../../Combo';

const DeleteModal = ({
    data = {}
}) => {
    const { closeModal } = useModalContext();
    const { command, content } = data;
    
    const handleClose = (shouldDelete) => {
        closeModal(shouldDelete);
    }

    return (
        <div className='delete-modal'>
            <div className='delete-modal__content'>
                {!!command &&
                    <Combo
                        combo={data}
                    />
                }
                {!!content &&
                    <div className='delete-note-modal__content__note-content'>
                        {data.content}
                    </div>
                }
                <div className='delete-modal__content__buttons'>
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

export default DeleteModal;