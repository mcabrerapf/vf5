import { LOCAL_KEYS, CHARACTERS, STRINGS } from "../constants"
const {
    CHARACTERS_DATA,
    SELECTED_CHARACTER,
    SELECTED_CHARACTER_VIEW,
    SELECTED_COMBOS_FILTERS,
    SELECTED_MOVE_TYPE,
    SELECTED_MOVELIST_SORT,
    SELECTED_MOVELIST_FILTERS,
    
} = LOCAL_KEYS;

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
        case SELECTED_CHARACTER:
            const isValidCharacter = !!CHARACTERS.find(character => character.id === localValue);
            return isValidCharacter ? localValue : 'akira';
        case SELECTED_CHARACTER_VIEW:
            return localValue === MOVELIST ||
                localValue === COMBOS ||
                localValue === NOTES ?
                localValue : MOVELIST
        case SELECTED_MOVE_TYPE:
            return localValue;
        case SELECTED_MOVELIST_SORT:
            return localValue || '/asc';
        case SELECTED_MOVELIST_FILTERS:
            return !localValue ? [] : localValue.split(',');
        case SELECTED_COMBOS_FILTERS:
            return !localValue ? [] : localValue.split(',');
        case CHARACTERS_DATA:
            const selectedData = getCharacterData(localValue, character, characterKey);
            return selectedData;
        default:
            break;
    }

    return '';
}

export default getFromLocal