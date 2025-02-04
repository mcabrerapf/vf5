import { CHARACTERS } from "../constants";
const validateNote = note => {
    if (
        !note ||
        typeof note !== 'object' ||
        !note.id ||
        typeof note.id !== 'string' ||
        !note.content ||
        typeof note.content !== 'string'
    ) return null;
    const { id, content } = note;
    return { id, content };

}

const validateFavMove = (favMove, characterMoves) => {
    if (typeof favMove !== 'string') return false;
    return !!characterMoves.find(move => move.id === favMove);
}

const validateCombo = (combo) => {
    if (typeof combo !== 'object' || !combo.id || typeof combo.id !== 'string') return null;
    const { id, damage, characterTags, command, tags, note } = combo;
    if (
        !Array.isArray(tags) ||
        !Array.isArray(characterTags) ||
        !Array.isArray(command)
    ) return null
    const validTags = tags.filter(tag => typeof tag === 'string');
    const validCharacterTags = characterTags.filter(cTag => typeof cTag === 'string');
    const validCommand = command.filter(notation => typeof notation === 'string');
    const validNote = typeof note === 'string' ? note : '';
    const validDamage = typeof damage === 'number' ? damage : 1;
    return {
        id,
        damage: validDamage,
        command: validCommand,
        tags: validTags,
        characterTags: validCharacterTags,
        note: validNote
    };
}

const validateImportData = (data) => {
    if (Array.isArray(data)) return false;
    const validatedData = {};
    CHARACTERS.forEach(character => {
        const { id } = character;
        const currentCharacterData = data[id];
        if (currentCharacterData) {
            const validatedCharacterData = {}
            const { combos, fav_moves, notes } = currentCharacterData;

            if (notes && Array.isArray(notes)) {
                const validNotes = notes.map(validateNote).filter(Boolean);
                validatedCharacterData.notes = validNotes;
            }
            if (fav_moves) {
                const { movelist: { all_moves } } = character;
                const validFavMoves = fav_moves.filter(favMove => validateFavMove(favMove, all_moves));
                validatedCharacterData.fav_moves = validFavMoves;
            }
            if (combos) {
                const validCombos = combos.map(validateCombo).filter(Boolean);
                validatedCharacterData.combos = validCombos;
            }
            validatedData[id] = validatedCharacterData;
        }
    })
    return validatedData;
}

export default validateImportData;