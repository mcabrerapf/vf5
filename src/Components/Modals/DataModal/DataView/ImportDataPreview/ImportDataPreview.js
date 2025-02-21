import React, { useState } from 'react';
import './ImportDataPreview.scss'
import { CHARACTERS_JSON, STRINGS } from '../../../../../constants';
import Button from '../../../../Button';
import { setLocalStorage } from '../../../../../helpers';

const ImportDataPreview = ({
    importData,
    cancelImport = () => { },
}) => {
    const [isImporting, setIsImporting] = useState(false);

    const charactersToImport = importData ?
        Object.keys(importData).map(key => {
            const data = importData[key];

            return {
                id: key,
                name: CHARACTERS_JSON[key].name,
                numberOfFavMoves: data.custom_moves?.length || 0,
                numberOfCombos: data.combos?.length || 0,
                numberOfNotes: data.notes?.length || 0,
            }
        }) :
        [];


    const confirmImport = () => {
        const stringifiedData = JSON.stringify(importData);
        setLocalStorage(STRINGS.RESET_LOCAL_DATA, stringifiedData);
        setIsImporting(true);
        window.location.reload();
        return;
    }

    return (
        <div className='import-data-preview'>
            <div className='import-data-preview__content'>
                <div className='import-data-preview__content__header'
                >
                    The following will be imported and OVERRIDE your data:
                </div>
                <div
                    className='import-data-preview__content__data'
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
                                className='import-data-preview__content__data__character'
                            >
                                <div
                                    className='import-data-preview__content__data__character__header'
                                >
                                    {name}
                                </div>
                                <div
                                    className='import-data-preview__content__data__character__content'
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
            <div className='import-data-preview__footer'>
                <Button
                    disabled={isImporting}
                    text="Cancel"
                    onClick={cancelImport}
                />
                <Button
                    modifier="save"
                    disabled={isImporting}
                    text="CONFIRM"
                    onClick={confirmImport}
                />
            </div>
        </div>
    )
}

export default ImportDataPreview;