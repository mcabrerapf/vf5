import { ATTACK_LEVELS, CHARACTERS } from "../constants";
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
    if (typeof favMove !== 'object') return false;
    return !!characterMoves.find(move => move.id === favMove);
}

const validateCombo = (combo) => {
    if (typeof combo !== 'object' || !combo.id || typeof combo.id !== 'string') return null;
    const { id, favourite, damage, characterTags, command, tags, note } = combo;

    const validTags = Array.isArray(tags) ?
        tags.filter(tag => {
            return typeof tag === 'string' && ATTACK_LEVELS.find(attackLevel => attackLevel.id === tag);
        }) :
        [];
    const validCharacterTags = Array.isArray(characterTags) ?
        characterTags.filter(cTag => {
            return typeof cTag === 'string' && !!CHARACTERS.find(ch => ch.id === cTag);
        }) :
        [];
    const validCommand = Array.isArray(command) ?
        command.filter(notation => typeof notation === 'string') :
        [];
    const validNote = typeof note === 'string' ? note : '';
    const validDamage = typeof damage === 'number' ? damage : 1;

    return {
        id,
        favourite: favourite,
        damage: validDamage,
        command: validCommand,
        tags: [...new Set(validTags)],
        characterTags: [...new Set(validCharacterTags)],
        note: validNote
    };
}

const validateImportData = (data) => {
    if (Array.isArray(data) || typeof data !== 'object') return [false];
    const validatedData = {};
    let isValid = false;

    CHARACTERS.forEach(character => {
        const { id } = character;
        const currentCharacterData = data[id];
        if (currentCharacterData) {
            const validatedCharacterData = { combos: [], custom_moves: [], notes: [] };
            const { combos, custom_moves, notes } = currentCharacterData;

            if (notes && Array.isArray(notes)) {
                const validNotes = notes.map(validateNote).filter(Boolean);
                validatedCharacterData.notes = validNotes;
            }
            if (custom_moves) {
                const { movelist: { all_moves } } = character;
                const validFavMoves = custom_moves.filter(favMove => validateFavMove(favMove, all_moves));
                validatedCharacterData.custom_moves = validFavMoves;
            }
            if (combos) {
                const validCombos = combos.map(validateCombo).filter(Boolean);
                validatedCharacterData.combos = validCombos;
            }
            if (
                !validatedCharacterData.notes.length &&
                !validatedCharacterData.custom_moves.length &&
                !validatedCharacterData.combos.length
            ) {
                return;
            }
            isValid = true;
            validatedData[id] = validatedCharacterData;
        }
    })
    return [isValid, validatedData];
}

export default validateImportData;