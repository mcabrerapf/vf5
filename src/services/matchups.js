import { CHARACTERS_DATA_KEY } from "../constants";

const getMatchups = (characterId) => {
    try {
        const allCharactersData = localStorage.getItem(CHARACTERS_DATA_KEY);
        const characterData = JSON.parse(allCharactersData)[characterId];
        return characterData.matchups;

    } catch (error) {
        console.log(error);
        return [];
    }
}

const updateMatchups = (characterId, matchup) => {
    try {
        const allCharactersData = localStorage.getItem(CHARACTERS_DATA_KEY);
        const parsedAllCharacters = JSON.parse(allCharactersData);
        const oldMatchups = parsedAllCharacters[characterId].matchups;
        parsedAllCharacters[characterId].matchups = oldMatchups
            .map(oMachup => {
                if (oMachup.id === matchup.id) return matchup;
                return oMachup;
            })

        localStorage.setItem(
            CHARACTERS_DATA_KEY,
            JSON.stringify(parsedAllCharacters)
        );
        return parsedAllCharacters[characterId].matchups;

    } catch (error) {
        console.log(error);
        return [];
    }
}

export {
    getMatchups,
    updateMatchups
}