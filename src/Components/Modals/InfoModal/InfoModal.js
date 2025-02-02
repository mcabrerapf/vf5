import React from 'react';
import './InfoModal.scss'
import ModalHeader from '../ModalHeader';
import Button from '../../Button';
import { useModalContext } from '../../../Contexts/ModalContext';
import { getLocalStorageSize } from '../../../helpers';

const InfoModal = () => {
    const { closeModal } = useModalContext();

    const handleClose = () => {
        closeModal();
    }
    const currentStorageUsed = getLocalStorageSize();
    return (
        <div className='info-modal'>
            <ModalHeader modifier={"align-right"}>
                <Button
                    modifier={"no-border"}
                    text={"X"}
                    onClick={handleClose}
                />
            </ModalHeader>
            <div className='info-modal__content'>
                <div className='info-modal__content__header'>Storage Used:</div>
                <div className='info-modal__content__stuff'> {currentStorageUsed} Kb</div>
            </div>
        </div>
    )
}

export default InfoModal;