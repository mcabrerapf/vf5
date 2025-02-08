import {
    CHARACTERS_DATA_KEY,
    SELECTED_CHARACTER_KEY,
    SELECTED_CHARACTER_VIEW_KEY,
    SELECTED_COMBOS_FILTERS_KEY,
    SELECTED_MOVE_CATEGORY_KEY,
    SELECTED_MOVELIST_SORT_KEY,
    SELECTED_MOVELIST_FILTERS_KEY,
    STRINGS,
    MOVELIST_SORT_OPTIONS,
    SELECTED_COMBOS_SORT_KEY,
    LIST_VIEW_KEY,
    COMBOS_SORT_OPTIONS,
    SELECTED_MATCHUPS_SORT_KEY,
    MATHCHUPS_SORT_OPTIONS
} from "../constants"

const {
    COMBOS,
    CUSTOM_MOVES,
    MATCHUPS,
    NOTES
} = STRINGS;

const getCharacterData = (localData, character, characterKey) => {
    const parsedData = localData ? JSON.parse(localData) : {};
    const characterData = parsedData[character]

    switch (characterKey) {
        case COMBOS:
            if (!characterData) return [];
            return characterData[characterKey] || [];
        case CUSTOM_MOVES:
            if (!characterData) return [];
            return characterData[characterKey] || [];
        case NOTES:
            if (!characterData) return [];
            return characterData[characterKey] || [];
        case MATCHUPS:
            if (!characterData) return [];
            return characterData[characterKey] || [];
        default:
            return '';
    }
}

const getFromLocal = (localKey, character, characterKey) => {
    const localValue = localStorage.getItem(localKey);

    switch (localKey) {
        case 'ALL':
            return localStorage.getItem(CHARACTERS_DATA_KEY);
        case SELECTED_CHARACTER_KEY:
            return localValue;
        case SELECTED_CHARACTER_VIEW_KEY:
            return localValue;
        case SELECTED_MOVE_CATEGORY_KEY:
            return localValue;
        case LIST_VIEW_KEY:
            return localValue;
        case SELECTED_MOVELIST_SORT_KEY:
            return localValue ? JSON.parse(localValue) : MOVELIST_SORT_OPTIONS[0];
        case SELECTED_MOVELIST_FILTERS_KEY:
            return localValue ? JSON.parse(localValue) : [];
        case SELECTED_COMBOS_FILTERS_KEY:
            return localValue ? JSON.parse(localValue) : [];
        case SELECTED_COMBOS_SORT_KEY:
            return localValue ? JSON.parse(localValue) : COMBOS_SORT_OPTIONS[0];
        case SELECTED_MATCHUPS_SORT_KEY:
            return localValue ? JSON.parse(localValue) : MATHCHUPS_SORT_OPTIONS[0];
        case CHARACTERS_DATA_KEY:
            const selectedData = getCharacterData(localValue, character, characterKey);
            return selectedData;
        default:
            break;
    }

    return '';
}

export default getFromLocal