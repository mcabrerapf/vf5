import {
    CHARACTERS_DATA_KEY,
    LIST_VIEW_KEY,
    MOVELIST_SORT_OPTIONS,
    SELECTED_CHARACTER_KEY,
    SELECTED_CHARACTER_VIEW_KEY,
    SELECTED_COMBOS_FILTERS_KEY,
    SELECTED_COMBOS_SORT_KEY,
    SELECTED_MOVE_CATEGORY_KEY,
    SELECTED_MOVELIST_FILTERS_KEY,
    SELECTED_MOVELIST_SORT_KEY,
    STRINGS
} from "../constants";
import CHARACTERS, { CHARACTERS_JSON, COMBOS_SORT_OPTIONS } from "../constants/CHARACTERS";
import validateImportData from './validateImportData';
import setLocalStorage from "./setLocalStorage";
import { validateCombo, validateCustomMove, validateMatchup } from "../services/utils";

const {
    ALL_MOVES,
    COMBOS,
    MOVELIST,
    MATCHUPS,
    NOTES
} = STRINGS;

const validateCharactersData = () => {
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
        const initData = {};
        CHARACTERS.forEach(char => {
            initData[char.id] = {
                combos: [],
                custom_moves: [],
                notes: [],
                matchups: CHARACTERS.map(mCharp => validateMatchup(mCharp))
            }
        })
        localStorage.setItem(CHARACTERS_DATA_KEY, JSON.stringify(initData));
        window.location.reload();
        return;
    }
}
const validateSorts = () => {
    try {
        const movelistSort = localStorage.getItem(SELECTED_MOVELIST_SORT_KEY)
        const combosSort = localStorage.getItem(SELECTED_COMBOS_SORT_KEY)
        if (!movelistSort || !combosSort) throw new Error("No sort");
        const parsedMovelistSort = JSON.parse(movelistSort);
        const parsedCombosSort = JSON.parse(combosSort);

        if (
            !parsedMovelistSort ||
            !MOVELIST_SORT_OPTIONS.find(option => option.id === parsedMovelistSort.id)
        ) throw new Error("No valid movelist sort");

        if (
            !parsedCombosSort ||
            !COMBOS_SORT_OPTIONS.find(option => option.id === parsedCombosSort.id)
        ) throw new Error("No valid combos sort");
    } catch (error) {
        console.log(error);
        localStorage.setItem(SELECTED_MOVELIST_SORT_KEY, JSON.stringify(MOVELIST_SORT_OPTIONS[0]));
        localStorage.setItem(SELECTED_COMBOS_SORT_KEY, JSON.stringify(COMBOS_SORT_OPTIONS[0]));
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

const validateSelectedCharacter = () => {
    try {
        const selectedCharacter = localStorage.getItem(SELECTED_CHARACTER_KEY)
        if (!selectedCharacter || !CHARACTERS_JSON[selectedCharacter]) throw new Error("Invalid selected character");

    } catch (error) {
        console.log(error);
        localStorage.setItem(SELECTED_CHARACTER_KEY, CHARACTERS[0].id);
    }
}

const validateSelectedCharacterView = () => {
    try {
        const selectedCharacterView = localStorage.getItem(SELECTED_CHARACTER_VIEW_KEY);
        if (![COMBOS, MOVELIST, NOTES, MATCHUPS].includes(selectedCharacterView)) {
            throw new Error("Not valid character view");

        }
    } catch (error) {
        console.log(error);
        setLocalStorage(SELECTED_CHARACTER_VIEW_KEY, MOVELIST);
    }
}

const validateCharacterMoveCategory = () => {
    try {
        const selectedCharacter = localStorage.getItem(SELECTED_CHARACTER_KEY)
        const { move_categories: characterCategories } = CHARACTERS_JSON[selectedCharacter];
        const selectedMoveCategory = localStorage.getItem(SELECTED_MOVE_CATEGORY_KEY);

        if (!characterCategories.find(category => category.id === selectedMoveCategory)) {
            throw new Error("Not valid character move category");

        }
    } catch (error) {
        console.log(error)
        localStorage.setItem(SELECTED_MOVE_CATEGORY_KEY, ALL_MOVES);
    }
}

const validateMatchups = () => {
    try {
        const allCharactersData = localStorage.getItem(CHARACTERS_DATA_KEY);
        const parsedCharacters =  JSON.parse(allCharactersData);
        const updatedChars = {};

        Object.keys(parsedCharacters).forEach(charId => {
            updatedChars[charId] = parsedCharacters[charId];

            const matchups = parsedCharacters[charId].matchups.map(matchup => {
                return validateMatchup(matchup);
            })
            const combos = parsedCharacters[charId].combos.map(combo => {
                return validateCombo(combo)
            })
            const customMoves = parsedCharacters[charId].custom_moves.map(custom_move => {
                return validateCustomMove(custom_move)
            })

            updatedChars[charId].matchups = matchups;
            updatedChars[charId].combos = combos;
            updatedChars[charId].custom_moves = customMoves;
            localStorage.setItem(CHARACTERS_DATA_KEY, JSON.stringify(updatedChars))
        })
    } catch (error) {
        console.log(error)
    }

}

const validateListView = () => {
    try {
        const localListView = localStorage.getItem(LIST_VIEW_KEY)
        
        if (
            !localListView ||
            typeof localListView !== 'string' ||
            !['S', 'F'].includes(localListView)
        ) {
            localStorage.setItem(
                LIST_VIEW_KEY,
                'F'
            );
        }

    } catch (error) {
        console.log(error);
    }
}

const initLocal = () => {
    validateCharactersData();
    validateSelectedCharacter();
    validateMatchups();
    validateSelectedCharacterView();
    validateCharacterMoveCategory();
    validateFilters();
    validateSorts();
    validateListView()
    

}

export default initLocal;