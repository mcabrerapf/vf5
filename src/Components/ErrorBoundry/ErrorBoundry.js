import './ErrorBoundry.scss';
import React, { use, useState } from "react";
import { copyToClipboard, getFromLocal, setLocalStorage, validateImportData } from "../../helpers";
import { CHARACTERS_DATA_KEY, SELECTED_CHARACTER_KEY, SELECTED_CHARACTER_VIEW_KEY, SELECTED_COMBOS_FILTERS_KEY, SELECTED_COMBOS_SORT_KEY, SELECTED_MOVE_CATEGORY_KEY, SELECTED_MOVELIST_FILTERS_KEY, SELECTED_MOVELIST_SORT_KEY, STRINGS } from '../../constants';
import Button from '../Button';

function ErrorBoundry({ error, resetErrorBoundary }) {
    const allCharacterData = getFromLocal('ALL')
    const [areYouSure, setAreYouSure] = useState(false);
    const [confirmImport, setConfirmImport] = useState(false);
    const [isImporting, setIsImporting] = useState(false);
    const [importError, setImportError] = useState(null);

    const copyData = () => {
        copyToClipboard(allCharacterData);
    }

    const onRemoveClick = () => {
        localStorage.removeItem(SELECTED_CHARACTER_KEY);
        localStorage.removeItem(SELECTED_CHARACTER_VIEW_KEY);
        localStorage.removeItem(SELECTED_MOVE_CATEGORY_KEY);
        localStorage.removeItem(SELECTED_COMBOS_FILTERS_KEY);
        localStorage.removeItem(SELECTED_MOVELIST_FILTERS_KEY);
        localStorage.removeItem(SELECTED_COMBOS_SORT_KEY);
        localStorage.removeItem(SELECTED_MOVELIST_SORT_KEY);
        window.location.reload();
    }

    const onImportClick = () => {
        if (!confirmImport) {
            setConfirmImport(true);
            setAreYouSure(false);
            return;
        }
        setIsImporting(true);
        navigator.clipboard
            .readText()
            .then(data => {
                if (!data || typeof data !== 'string') {
                    setIsImporting(false);
                    return;
                }
                const parsedData = JSON.parse(data);
                const [isValid, validatedData] = validateImportData(parsedData);

                if (isValid) {
                    const stringifiedData = JSON.stringify(validatedData);
                    setLocalStorage(STRINGS.RESET_LOCAL_DATA, stringifiedData);
                    window.location.reload();
                    return;
                } else {
                    throw new Error("Error importing character data");
                    
                }
                
            })
            .catch(err => {
                setIsImporting(false);
                setConfirmImport(false);
                setImportError(err)
            });
    }

    const onDeleteClick = () => {
        if (!areYouSure) {
            setConfirmImport(false);
            setAreYouSure(true);
            return;
        }
        localStorage.removeItem(CHARACTERS_DATA_KEY);
        onRemoveClick();
    }
    const deleteButtonText = areYouSure ? 'CONFIRM DELETE' : 'DELETE ALL DATA';
    const importButtonText = confirmImport ? 'CONFIRM IMPORT' : 'Import characters data from clipboard';
    
    return (
        <div role="alert" className="error-boundry">
            <div className='error-boundry__buttons'>
                <Button
                    disabled={isImporting}
                    onClick={resetErrorBoundary}
                >
                    Reload
                </Button>
                <Button
                    disabled={isImporting}
                    onClick={onRemoveClick}
                >
                    Reset non esential data and Reload
                </Button>
                <Button
                    disabled={isImporting}
                    onClick={copyData}
                >
                    Copy characters data to clipboard
                </Button>
                <Button
                    disabled={isImporting}
                    onClick={onImportClick}
                >
                    {importButtonText}
                </Button>
                <Button
                    disabled={isImporting}
                    modifier={'danger'}
                    onClick={onDeleteClick}
                >
                    {deleteButtonText}
                </Button>

            </div>
            {importError &&
                <div className='error-boundry__error-message'>
                    Import failed
                </div>
            }
            <div className='error-boundry__error-message'>{error.message}</div>
            <div className='error-boundry__characters-data'>
                <h3>Characters Data</h3>
                <div className='error-boundry__characters-data__data'>
                    {JSON.stringify(allCharacterData, null, 2)}
                </div>
            </div>
        </div>
    );
}

export default ErrorBoundry;