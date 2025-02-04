import {
    ALL_DATA_KEY,
    CHARACTERS_DATA_KEY,
    SELECTED_CHARACTER_KEY,
    SELECTED_CHARACTER_VIEW_KEY,
    SELECTED_COMBOS_FILTERS_KEY,
    SELECTED_MOVE_TYPE_KEY,
    SELECTED_MOVELIST_SORT_KEY,
    SELECTED_MOVELIST_FILTERS_KEY,
    CHARACTERS,
    STRINGS
} from "../constants"

const {
    MOVELIST,
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
        case ALL_DATA_KEY:
            return localStorage.getItem(CHARACTERS_DATA_KEY);
        case SELECTED_CHARACTER_KEY:
            const isValidCharacter = !!CHARACTERS.find(character => character.id === localValue);
            return isValidCharacter ? localValue : 'akira';
        case SELECTED_CHARACTER_VIEW_KEY:
            return localValue === MOVELIST ||
                localValue === COMBOS ||
                localValue === NOTES ?
                localValue : MOVELIST
        case SELECTED_MOVE_TYPE_KEY:
            return localValue;
        case SELECTED_MOVELIST_SORT_KEY:
            return localValue || '/asc';
        case SELECTED_MOVELIST_FILTERS_KEY:
            return !localValue ? [] : localValue.split(',');
        case SELECTED_COMBOS_FILTERS_KEY:
            return !localValue ? [] : localValue.split(',');
        case CHARACTERS_DATA_KEY:
            const selectedData = getCharacterData(localValue, character, characterKey);
            return selectedData;
        default:
            break;
    }

    return '';
}

export default getFromLocal