import { CHARACTERS_DATA_KEY } from "../constants";
import { validateCustomMove } from "./utils";

const getCustomMoves = (characterId) => {
    try {
        const allCharactersData = localStorage.getItem(CHARACTERS_DATA_KEY);
        const characterData = JSON.parse(allCharactersData)[characterId];
        return characterData.custom_moves;
    } catch (error) {
        console.log(error);

    }
}

const updateCustomMoves = (characterId, move, isNew) => {
    try {
        const allCharactersData = localStorage.getItem(CHARACTERS_DATA_KEY);
        const parsedAllCharacters = JSON.parse(allCharactersData);
        const characterData = parsedAllCharacters[characterId];
        
        const updatedCustomMoves = isNew ?
            [...characterData.custom_moves, validateCustomMove(move)] :
            characterData.custom_moves
                .map(oMove => {
                    if (oMove.id === move.id) return move;
                    return oMove;
                })

        characterData.custom_moves = updatedCustomMoves;
        parsedAllCharacters[characterId] = characterData;
        localStorage.setItem(
            CHARACTERS_DATA_KEY,
            JSON.stringify(parsedAllCharacters)
        );
        return updatedCustomMoves;

    } catch (error) {
        console.log(error);

    }
}

const deleteCustomMove = (characterId, moveId) => {
    try {
        const allCharactersData = localStorage.getItem(CHARACTERS_DATA_KEY);
        const parsedAllCharacters = JSON.parse(allCharactersData);
        const characterData = parsedAllCharacters[characterId];
        const updatedCustomMoves = characterData.custom_moves
            .filter(oMove => oMove.id !== moveId);
        characterData.custom_moves = updatedCustomMoves;
        parsedAllCharacters[characterId] = characterData;
        localStorage.setItem(
            CHARACTERS_DATA_KEY,
            JSON.stringify(parsedAllCharacters)
        );
        return updatedCustomMoves;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export {
    getCustomMoves,
    deleteCustomMove,
    updateCustomMoves
}