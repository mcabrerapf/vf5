import './DataView.scss';
import React, { useState } from 'react';
import Button from '../../../Button';
import {
    copyToClipboard,
    getFromLocal,
    getLocalStorageSize,
    setLocalStorage,
    validateImportData
} from '../../../../helpers';
import { ALL_DATA_KEY, STRINGS, SELECTED_CHARACTER_KEY, CHARACTERS_DATA_KEY } from '../../../../constants';
import { CHARACTERS_JSON } from '../../../../constants/CHARACTERS';

const DataView = () => {
    const currentStorageUsed = getLocalStorageSize(CHARACTERS_DATA_KEY);
    const [dataView, setDataView] = useState('default');
    const [importData, setImportData] = useState(null);
    const [isImporting, setIsImporting] = useState(false);
    const [importError, setImportError] = useState(false);

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
        setDataView('import');
    }

    const parseImportData = () => {
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
                    setImportData(validatedData)
                    setDataView('confirm')
                } else {
                    setImportError(true)
                }
                setIsImporting(false);
            })
            .catch(err => {
                setIsImporting(false);
                setImportData(null)
                setImportError(true)
            });
    }

    const confirmImport = () => {
        const stringifiedData = JSON.stringify(importData);
        setLocalStorage(STRINGS.RESET_LOCAL_DATA, stringifiedData);
        setIsImporting(true);
        window.location.reload();
        return;
    }

    const charactersToImport = importData ?
        Object.keys(importData).map(key => {
            const data = importData[key];

            return {
                id: key,
                name: CHARACTERS_JSON[key].name,
                numberOfFavMoves: data.fav_moves?.length || 0,
                numberOfCombos: data.combos?.length || 0,
                numberOfNotes: data.notes?.length || 0,
            }
        }) :
        [];

    return (
        <div className='data-view'>
            {dataView === 'default' &&
                <div className='data-view__initial-view'>
                    <div className='data-view__initial-view__url'>
                        Frame data is based on
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
                            disabled={isImporting}
                            text="Reset data"
                            onClick={onResetClick}
                        />
                        <Button
                            disabled={isImporting}
                            text="Copy Data to Clipboard"
                            onClick={onCopyClick}
                        />
                        <Button
                            disabled={isImporting}
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
                        disabled={isImporting}
                        onClick={parseImportData}
                        text='Load from clipboard'
                    />
                </div>
            }
            {dataView === 'confirm' &&
                <div className='data-view__confirm-view'>
                    <div className='data-view__confirm-view__content'>
                        <div className='data-view__confirm-view__content__header'
                        >
                            The following will be imported:
                        </div>
                        <div
                            className='data-view__confirm-view__content__data'
                        >
                            {charactersToImport.map((character) => {
                                const {
                                    name,
                                    numberOfFavMoves,
                                    numberOfCombos,
                                    numberOfNotes
                                } = character;
                                return (
                                    <div
                                        key={character.id}
                                        className='data-view__confirm-view__content__data__character'
                                    >
                                        <div
                                            className='data-view__confirm-view__content__data__character__header'
                                        >
                                            {name}
                                        </div>
                                        <div
                                            className='data-view__confirm-view__content__data__character__content'
                                        >
                                            <div>
                                                Favourite moves: {numberOfFavMoves}
                                            </div>
                                            <div>
                                                Combos: {numberOfCombos}
                                            </div>
                                            <div>
                                                Notes: {numberOfNotes}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className='data-view__confirm-view__footer'>
                        <Button
                            disabled={isImporting}
                            text="Confirm Import"
                            onClick={confirmImport}
                        />
                    </div>
                </div>
            }
        </div>
    )
}

export default DataView;