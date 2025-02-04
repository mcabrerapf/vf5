import {
    MOVELIST_SORT_OPTIONS,
    SELECTED_CHARACTER_KEY,
    SELECTED_CHARACTER_VIEW_KEY,
    SELECTED_COMBOS_FILTERS_KEY,
    SELECTED_MOVE_CATEGORY_KEY,
    SELECTED_MOVELIST_FILTERS_KEY,
    SELECTED_MOVELIST_SORT_KEY,
    STRINGS
} from "../constants";
import { CHARACTERS_JSON } from "../constants/CHARACTERS";
import getFromLocal from "./getFromLocal";
import setLocalStorage from "./setLocalStorage";
const {
    AKIRA,
    ASC,
    ALL_MOVES,
    COMBOS,
    MOVELIST,
    NOTES
} = STRINGS;

const initLocal = () => {
    const selectedCharacter = getFromLocal(SELECTED_CHARACTER_KEY);
    
    if (!selectedCharacter || !CHARACTERS_JSON[selectedCharacter]) {
        const defaultSort = `${MOVELIST_SORT_OPTIONS[0][0]}/${ASC}`
        setLocalStorage(SELECTED_CHARACTER_KEY, AKIRA);
        setLocalStorage(SELECTED_CHARACTER_VIEW_KEY, MOVELIST);
        setLocalStorage(SELECTED_MOVE_CATEGORY_KEY, ALL_MOVES);
        setLocalStorage(SELECTED_MOVELIST_SORT_KEY, defaultSort);
        setLocalStorage(SELECTED_MOVELIST_FILTERS_KEY, '');
        setLocalStorage(SELECTED_COMBOS_FILTERS_KEY, '');
        return window.location.reload();
    }
    const selectedCharacterView = getFromLocal(SELECTED_CHARACTER_VIEW_KEY);
    if (![COMBOS, MOVELIST, NOTES].includes(selectedCharacterView)) {
        setLocalStorage(SELECTED_CHARACTER_VIEW_KEY, MOVELIST);
        return window.location.reload();
    }
    const { move_categories: characterCategories } = CHARACTERS_JSON[selectedCharacter];
    const selectedMoveCategory = getFromLocal(SELECTED_MOVE_CATEGORY_KEY);

    if (!characterCategories.find(category => category.id === selectedMoveCategory)) {
        setLocalStorage(SELECTED_CHARACTER_VIEW_KEY, ALL_MOVES);
        return window.location.reload();
    }
    const selectedMovelistSort = getFromLocal(SELECTED_MOVELIST_SORT_KEY);
    const parsedSort = selectedMovelistSort && typeof selectedMovelistSort === 'string' ?
        selectedMovelistSort.split('/') : '';
    if (!MOVELIST_SORT_OPTIONS.find(option => option[0] === parsedSort[0])) {
        const defaultSort = `${MOVELIST_SORT_OPTIONS[0][0]}/${ASC}`
        setLocalStorage(SELECTED_MOVELIST_SORT_KEY, defaultSort);
        return window.location.reload();
    }
}

export default initLocal;