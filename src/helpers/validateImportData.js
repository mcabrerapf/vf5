import { CHARACTERS } from "../constants";
import { validateCombo, validateCustomMove, validateMatchup, validateNote } from "../services/utils";

const validateImportData = (data = {}) => {
    const validatedData = {};
    const initMatchups = CHARACTERS.map(char => {
        return validateMatchup({ id: char.id });
    });
    CHARACTERS.forEach(character => {
        const { id } = character;
        const currentCharacterData = data[id];
        if (currentCharacterData) {
            const validatedCharacterData = { combos: [], custom_moves: [], notes: [], matchups: [] };
            const { combos, custom_moves, notes, matchups } = currentCharacterData;

            if (notes && Array.isArray(notes)) {
                const validNotes = notes.map(validateNote).filter(Boolean);
                validatedCharacterData.notes = validNotes;
            }
            if (custom_moves) {
                const validCustomMoves = custom_moves.filter(validateCustomMove).filter(Boolean);
                validatedCharacterData.custom_moves = validCustomMoves;
            }
            if (combos) {
                const validCombos = combos.map(validateCombo).filter(Boolean);
                validatedCharacterData.combos = validCombos;
            }
            if (matchups) {
                const validatedMatchups = matchups.map(validateMatchup).filter(Boolean);
                validatedCharacterData.matchups = validatedMatchups;
            }
            validatedData[id] = validatedCharacterData;
        } else {
            validatedData[id] = {
                combos: [],
                custom_moves: [],
                matchups: initMatchups,
                notes: []
            }
        }

        
    })
    return [true, validatedData];
}

export default validateImportData;