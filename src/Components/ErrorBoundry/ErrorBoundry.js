import './ErrorBoundry.scss';
import React, { useState } from "react";
import { copyToClipboard, getFromLocal } from "../../helpers";
import { CHARACTERS_DATA_KEY, SELECTED_CHARACTER_KEY, SELECTED_CHARACTER_VIEW_KEY, SELECTED_COMBOS_FILTERS_KEY, SELECTED_COMBOS_SORT_KEY, SELECTED_MOVE_CATEGORY_KEY, SELECTED_MOVELIST_FILTERS_KEY, SELECTED_MOVELIST_SORT_KEY } from '../../constants';

function ErrorFallback({ error, resetErrorBoundary }) {
    const allCharacterData = getFromLocal('ALL')
    const [areYouSure, setAreYouSure] = useState(false);

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

    const onDeleteClick = () => {
        if (!areYouSure) {
            setAreYouSure(true);
            return;
        }
        localStorage.removeItem(CHARACTERS_DATA_KEY);
        onRemoveClick();
    }
    const deleteButtonText = areYouSure ? 'CONFIRM DELETE' : 'DELETE ALL DATA';
    return (
        <div role="alert" className="error-boundry">
            <div className='error-boundry__buttons'>
                <button onClick={copyData}>Copy to clipboard</button>
                <button onClick={onRemoveClick}>Reset non esential data</button>
                <button onClick={onDeleteClick}>{deleteButtonText}</button>
                <button onClick={resetErrorBoundary}>Reload</button>
            </div>

            <div className='error-boundry__error-message'>{error.message}</div>
            <div>

            </div>
        </div>
    );
}

export default ErrorFallback;