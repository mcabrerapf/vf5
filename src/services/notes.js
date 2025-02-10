import { CHARACTERS_DATA_KEY } from "../constants";
import { generateId } from "../helpers";

const getNotes = (characterId) => {
    try {
        try {
            const allCharactersData = localStorage.getItem(CHARACTERS_DATA_KEY);
            const characterData = JSON.parse(allCharactersData)[characterId];
            return characterData.notes;

        } catch (error) {
            console.log(error);
            return [];
        }

    } catch (error) {
        console.log(error);

    }
}

const updateNotes = (characterId, note) => {
    try {
        const allCharactersData = localStorage.getItem(CHARACTERS_DATA_KEY);
        const parsedAllCharacters = JSON.parse(allCharactersData);
        const characterData = parsedAllCharacters[characterId];
        const isNew = !note.id;

        const updatedCombos = !isNew ?
            characterData.notes
                .map(oNote => {
                    if (oNote.id === note.id) return note;
                    return oNote;
                }) :
            [...characterData.notes, { ...note, id: generateId() }];

        characterData.notes = updatedCombos;
        parsedAllCharacters[characterId] = characterData;
        localStorage.setItem(
            CHARACTERS_DATA_KEY,
            JSON.stringify(parsedAllCharacters)
        );
        console.log(updatedCombos);
        return updatedCombos;

    } catch (error) {
        console.log(error);

    }
}

const deleteNote = (characterId, noteId) => {
    try {
        const allCharactersData = localStorage.getItem(CHARACTERS_DATA_KEY);
        const parsedAllCharacters = JSON.parse(allCharactersData);
        const characterData = parsedAllCharacters[characterId];
        const updatedNotes = characterData.notes
            .filter(note => note.id !== noteId);

        characterData.notes = updatedNotes;
        parsedAllCharacters[characterId] = characterData;
        localStorage.setItem(
            CHARACTERS_DATA_KEY,
            JSON.stringify(parsedAllCharacters)
        );
        console.log(updatedNotes);
        return updatedNotes;
    } catch (error) {
        console.log(error);

    }
}

export {
    getNotes,
    updateNotes,
    deleteNote
}