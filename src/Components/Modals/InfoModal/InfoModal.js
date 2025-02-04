import React from 'react';
import './InfoModal.scss'
import Button from '../../Button';
import { copyToClipboard, getFromLocal, getLocalStorageSize, setLocalStorage } from '../../../helpers';
import { ALL_DATA_KEY, SELECTED_CHARACTER_KEY } from '../../../constants';

const InfoModal = () => {
    const currentStorageUsed = getLocalStorageSize();

    const onCopyClick = () => {
        const allCharacterData = getFromLocal(ALL_DATA_KEY);
        if (!allCharacterData) return;
        copyToClipboard(allCharacterData);
    }

    const onResetClick = () => {
        setLocalStorage(SELECTED_CHARACTER_KEY, null);
        window.location.reload();
    }

    return (
        <div className='info-modal'>
            <div className='info-modal__content'>
                <div className='info-modal__content__memory'>
                    <div className='info-modal__content__memory__header'>Storage Used</div>
                    <div className='info-modal__content__memory__ammount'> {currentStorageUsed} Kb</div>
                </div>
                <div className='info-modal__content__buttons'>
                    <Button
                        onClick={onResetClick}
                        text="Reset data"
                    />
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