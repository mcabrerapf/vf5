import { CHARACTERS } from "../constants";

const characterIdToName = (characterId, returnShortName) => {
    if (!characterId) return '';
    const characterMatch = CHARACTERS
        .find(character => character.id === characterId);
    return returnShortName ? characterMatch?.short_name : characterMatch?.name;
}

export default characterIdToName;