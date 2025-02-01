import { LOCAL_KEYS, CHARACTERS } from "../constants"
const {
    CHARACTER_COMBOS,
    SELECTED_CHARACTER,
    SELECTED_CHARACTER_VIEW,
    SELECTED_MOVE_TYPE,
    SELECTED_MOVELIST_SORT,
    SELECTED_MOVELIST_FILTERS
} = LOCAL_KEYS;

const getFromLocal = (localKey) => {
    const localValue = localStorage.getItem(localKey);

    switch (localKey) {
        case SELECTED_CHARACTER:
            const isValidCharacter = !!CHARACTERS.find(character => character.id === localValue);
            return isValidCharacter ? localValue : 'akira';
        case SELECTED_CHARACTER_VIEW:
            return localValue === 'moves' || localValue === 'combos' ? localValue : 'moves'
        case SELECTED_MOVE_TYPE:
            return localValue;
        case SELECTED_MOVELIST_SORT:
            return localValue;
        case SELECTED_MOVELIST_FILTERS:
            return !localValue ? [] : localValue.split(',');
        default:
            break;
    }

    if (localKey.includes(CHARACTER_COMBOS)) {
        const parsedCombos = JSON.parse(localValue);
        if(!parsedCombos || !parsedCombos.length || !parsedCombos[0].id)return [];
        return parsedCombos;
    }
    return '';
}

export default getFromLocal