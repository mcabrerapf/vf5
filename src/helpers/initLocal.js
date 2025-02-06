import {
    CHARACTERS_DATA_KEY,
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
import validateImportData from './validateImportData';
import setLocalStorage from "./setLocalStorage";

const {
    AKIRA,
    ASC,
    ALL_MOVES,
    COMBOS,
    MOVELIST,
    NOTES
} = STRINGS;
const validateOnInit = () => {
    try {
        const allCharactersData = localStorage.getItem(CHARACTERS_DATA_KEY)
        if (
            !allCharactersData ||
            typeof allCharactersData !== 'string'
        ) throw new Error("No characters data");
        const parsedData = JSON.parse(allCharactersData);

        if (
            !parsedData ||
            Array.isArray(parsedData) ||
            typeof parsedData !== 'object'
        ) {
            throw new Error("Invalid characters data");
        };
        const [isDataValid] = validateImportData(parsedData);

        if (!isDataValid && typeof parsedData !== 'object') {
            throw new Error("Invalid characters data");
        }
        return;
    } catch (error) {
        console.log(error);
        localStorage.setItem(CHARACTERS_DATA_KEY, JSON.stringify({}));
        window.location.reload();
        return;
    }
}
const validateSorts = () => {
    try {
        const movelistSort = localStorage.getItem(SELECTED_MOVELIST_SORT_KEY)
        if (!movelistSort) throw new Error("No movelist sort");
        const parsedMovelistSort = JSON.parse(movelistSort);
        if (
            !parsedMovelistSort ||
            !MOVELIST_SORT_OPTIONS.find(option => option.id === parsedMovelistSort.id)
        ) throw new Error("No valid movelist sort");
    } catch (error) {
        console.log(error);
        localStorage.setItem(SELECTED_MOVELIST_SORT_KEY, JSON.stringify(MOVELIST_SORT_OPTIONS[0]));
        window.location.reload();
        return;
    }
}

const validateFilters = () => {
    try {
        const comboFilters = localStorage.getItem(SELECTED_COMBOS_FILTERS_KEY)
        const movelisFilters = localStorage.getItem(SELECTED_MOVELIST_FILTERS_KEY)
        const parsedComboFilters = JSON.parse(comboFilters)
        const parsedMovelisFilters = JSON.parse(movelisFilters)
        if (!Array.isArray(parsedComboFilters) || !Array.isArray(parsedMovelisFilters)) throw new Error("Not array value in filters");


    } catch (error) {
        console.log(error);
        localStorage.setItem(SELECTED_COMBOS_FILTERS_KEY, JSON.stringify([]));
        localStorage.setItem(SELECTED_MOVELIST_FILTERS_KEY, JSON.stringify([]));
        window.location.reload();
        return;
    }
}

const initLocal = () => {
    const selectedCharacter = getFromLocal(SELECTED_CHARACTER_KEY);
    validateOnInit();
    validateFilters();
    validateSorts();
    if (!selectedCharacter || !CHARACTERS_JSON[selectedCharacter]) {
        const defaultSort = `${MOVELIST_SORT_OPTIONS[0][0]}/${ASC}`
        setLocalStorage(SELECTED_CHARACTER_KEY, AKIRA);
        setLocalStorage(SELECTED_CHARACTER_VIEW_KEY, MOVELIST);
        setLocalStorage(SELECTED_MOVE_CATEGORY_KEY, ALL_MOVES);
        setLocalStorage(SELECTED_MOVELIST_SORT_KEY, defaultSort);
        setLocalStorage(SELECTED_MOVELIST_FILTERS_KEY, []);
        setLocalStorage(SELECTED_COMBOS_FILTERS_KEY, []);
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
}

export default initLocal;