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
import { ALL_DATA_KEY, STRINGS, SELECTED_CHARACTER_KEY, CHARACTERS } from '../../../../constants';
import { CHARACTERS_JSON } from '../../../../constants/CHARACTERS';

const DataView = () => {
    const currentStorageUsed = getLocalStorageSize();
    const [dataView, setDataView] = useState('default');
    const [importData, setImportData] = useState(null);
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
                    setImportData(validatedData)
                    setDataView('import')
                }

                setIsImporting(false);
            })
            .catch(err => {
                setIsImporting(false);
                console.log(err)
            })
    }

    const confirmImport = () => {
        const stringifiedData = JSON.stringify(importData);
        setLocalStorage(STRINGS.RESET_LOCAL_DATA, stringifiedData);
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
                    <div className='data-view__initial-view__memory'>
                        <div className='data-view__initial-view__memory__header'>Storage Used</div>
                        <div className='data-view__initial-view__memory__ammount'> {currentStorageUsed} Kb</div>
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
                            text="Import Data from clipboard"
                            onClick={onImportClick}
                        />
                    </div>
                </div>
            }
            {dataView === 'import' &&
                <div className='data-view__import-view'>
                    <div className='data-view__import-view__content'>
                        <div className='data-view__import-view__content__header'
                        >
                            The following will be imported:
                        </div>
                        <div
                            className='data-view__import-view__content__data'
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
                                        className='data-view__import-view__content__data__character'
                                    >
                                        <div
                                            className='data-view__import-view__content__data__character__header'
                                        >
                                            {name}
                                        </div>
                                        <div
                                            className='data-view__import-view__content__data__character__content'
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
                    <Button
                        disabled={isImporting}
                        text="Confirm Import"
                        onClick={confirmImport}
                    />
                </div>
            }
        </div>
    )
}

export default DataView;