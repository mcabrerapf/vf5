import React from 'react';
import './InfoModal.scss'
import ModalHeader from '../ModalHeader';
import Button from '../../Button';
import { useModalContext } from '../../../Contexts/ModalContext';
import { copyToClipboard, getFromLocal, getLocalStorageSize } from '../../../helpers';
import { ALL_DATA_KEY } from '../../../constants';

const InfoModal = () => {
    const { closeModal } = useModalContext();
    const currentStorageUsed = getLocalStorageSize();

    const onCopyClick = ()=> {
        const allCharacterData = getFromLocal(ALL_DATA_KEY);
        if(!allCharacterData) return;
        copyToClipboard(allCharacterData);
    }

    const handleClose = () => {
        closeModal();
    }
    

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
                <div className='info-modal__content__memory'>
                    <div className='info-modal__content__memory__header'>Storage Used</div>
                    <div className='info-modal__content__memory__ammount'> {currentStorageUsed} Kb</div>
                </div>
                <div className='info-modal__content__buttons'>
                    <Button
                        text="Copy Data to Clipboard"
                        onClick={onCopyClick}
                    />
                    <Button
                        disabled
                        text="Import Data from clipboard"
                    />
                </div>
            </div>
        </div>
    )
}

export default InfoModal;