import {
    CHARACTERS_DATA_KEY,
    SELECTED_CHARACTER_KEY,
    SELECTED_CHARACTER_VIEW_KEY,
    SELECTED_COMBOS_FILTERS_KEY,
    SELECTED_MOVE_CATEGORY_KEY,
    SELECTED_MOVELIST_SORT_KEY,
    SELECTED_MOVELIST_FILTERS_KEY,
    STRINGS,
    MOVELIST_SORT_OPTIONS
} from "../constants"

const {
    COMBOS,
    FAV_MOVES,
    NOTES
} = STRINGS;

const getCharacterData = (localData, character, characterKey) => {
    const parsedData = localData ? JSON.parse(localData) : {};
    const characterData = parsedData[character]

    switch (characterKey) {
        case COMBOS:
            if (!characterData) return [];
            return characterData[characterKey] || [];
        case FAV_MOVES:
            if (!characterData) return [];
            return characterData[characterKey] || [];
        case NOTES:
            if (!characterData) return [];
            return characterData[characterKey] || [];
        default:
            return '';
    }
}

const getFromLocal = (localKey, character, characterKey) => {
    const localValue = localStorage.getItem(localKey);

    switch (localKey) {
        case SELECTED_CHARACTER_KEY:
            return localValue;
        case SELECTED_CHARACTER_VIEW_KEY:
            return localValue;
        case SELECTED_MOVE_CATEGORY_KEY:
            return localValue;
        case SELECTED_MOVELIST_SORT_KEY:
            return localValue ? JSON.parse(localValue) : MOVELIST_SORT_OPTIONS[0];
        case SELECTED_MOVELIST_FILTERS_KEY:
            return localValue ? JSON.parse(localValue) : [];
        case SELECTED_COMBOS_FILTERS_KEY:
            return localValue ? JSON.parse(localValue) : [];
        case CHARACTERS_DATA_KEY:
            const selectedData = getCharacterData(localValue, character, characterKey);
            return selectedData;
        default:
            break;
    }

    return '';
}

export default getFromLocal