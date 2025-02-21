import './DataView.scss';
import React, { useState } from 'react';
import Button from '../../../Button';
import ImportDataPreview from './ImportDataPreview';
import {
    copyToClipboard,
    getFromLocal,
    getLocalStorageSize,
    setLocalStorage,
    validateImportData
} from '../../../../helpers';
import { SELECTED_CHARACTER_KEY, CHARACTERS_DATA_KEY } from '../../../../constants';

const DataView = () => {
    const currentStorageUsed = getLocalStorageSize(CHARACTERS_DATA_KEY);
    const [dataView, setDataView] = useState('default');
    const [importData, setImportData] = useState(null);
    const [importError, setImportError] = useState(false);

    const onCopyClick = () => {
        const allCharacterData = getFromLocal("ALL");
        if (!allCharacterData) return;
        copyToClipboard(allCharacterData);
    }

    const onResetClick = () => {
        setLocalStorage(SELECTED_CHARACTER_KEY, null);
        window.location.reload();
    }

    const onImportClick = () => {
        setDataView('import');
    }

    const parseImportData = () => {
        navigator.clipboard
            .readText()
            .then(data => {
                if (!data || typeof data !== 'string') {
                    return;
                }
                const parsedData = JSON.parse(data);
                const [isValid, validatedData] = validateImportData(parsedData);

                if (isValid) {
                    setImportData(validatedData)
                    setDataView('confirm')
                } else {
                    setImportError(true)
                }
            })
            .catch(err => {
                setImportData(null)
                setImportError(true)
            });
    }

    const cancelImport = () => {
        setDataView("default")
        setImportData(null)
        setImportError(false)
    }

    return (
        <div className='data-view'>
            {dataView === 'default' &&
                <div className='data-view__initial-view'>
                    <div className='data-view__initial-view__url'>
                        <span>Frame data is based on</span>
                        <a target='blank' href='https://virtua-fighter.com/revo/en/character/skill/skill01.html'>
                            this
                        </a>
                    </div>
                    <div className='data-view__initial-view__memory'>
                        <div className='data-view__initial-view__memory__header'>Storage Used</div>
                        <div className='data-view__initial-view__memory__ammount'> {currentStorageUsed}</div>
                    </div>
                    <div className='data-view__initial-view__buttons'>
                        <Button
                            text="Reset non esential data"
                            onClick={onResetClick}
                        />
                        <Button
                            text="Copy Data to Clipboard"
                            onClick={onCopyClick}
                        />
                        <Button
                            text="Import Data"
                            onClick={onImportClick}
                        />
                    </div>
                </div>
            }
            {dataView === 'import' &&
                <div className='data-view__import-view'>
                    {importError &&
                        <div className='data-view__import-view__error'>
                            Clipboard data is invalid
                        </div>
                    }
                    <Button
                        onClick={parseImportData}
                        text='Load from clipboard'
                    />
                    <Button
                        text="Cancel Import"
                        onClick={cancelImport}
                    />
                </div>
            }
            {dataView === 'confirm' &&
                <ImportDataPreview
                    importData={importData}
                    cancelImport={cancelImport}
                />
            }
        </div>
    )
}

export default DataView;