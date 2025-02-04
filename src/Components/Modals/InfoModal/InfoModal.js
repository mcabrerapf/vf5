import React, { useState } from 'react';
import './InfoModal.scss'
import Button from '../../Button';
import { copyToClipboard, getFromLocal, getLocalStorageSize, setLocalStorage } from '../../../helpers';
import { ALL_DATA_KEY, STRINGS, SELECTED_CHARACTER_KEY } from '../../../constants';
import { validateImportData } from '../../../helpers';

const InfoModal = () => {
    const currentStorageUsed = getLocalStorageSize();
    const [isImporting, setIsImporting] = useState(false);

    const onCopyClick = () => {
        const allCharacterData = getFromLocal(ALL_DATA_KEY);
        if (!allCharacterData) return;
        copyToClipboard(allCharacterData);
    }

    const onResetClick = () => {
        setLocalStorage(SELECTED_CHARACTER_KEY, null);
        window.location.reload();
    }

    const onImportClick = () => {
        setIsImporting(true);
        navigator.clipboard
            .readText()
            .then(data => {
                if (!data || typeof data !== 'string') {
                    setIsImporting(false);
                    return;
                }
                const parsedData = JSON.parse(data);
                const validatedData = validateImportData(parsedData);
                const hasData = !!Object.keys(validatedData).length;
                if (hasData) {
                    const stringifiedData = JSON.stringify(validatedData);
                    setLocalStorage(STRINGS.RESET_LOCAL_DATA, stringifiedData);
                    window.location.reload();
                    return;
                }

                setIsImporting(false);
            })
            .catch(err => {
                setIsImporting(false);
                console.log(err)
            })


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
                        text="Reset data"
                        onClick={onResetClick}
                    />
                    <Button
                        text="Copy Data to Clipboard"
                        onClick={onCopyClick}
                    />
                    <Button
                        disabled={isImporting}
                        text="Import Data from clipboard"
                        onClick={onImportClick}
                    />
                </div>
            </div>
        </div>
    )
}

export default InfoModal;