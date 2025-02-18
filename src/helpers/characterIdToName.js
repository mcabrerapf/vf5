import { CHARACTERS_JSON } from "../constants";

const characterIdToName = (characterId, returnShortName) => {
    if (!characterId) return '';
    const characterMatch = CHARACTERS_JSON[characterId];
    return returnShortName ? characterMatch?.short_name : characterMatch?.name;
}

export default characterIdToName;