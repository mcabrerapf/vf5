import { CHARACTERS_DATA_KEY, LIKED_COMBOS } from "../constants";

const getCombos = (characterId) => {
    try {
        const allCharactersData = localStorage.getItem(CHARACTERS_DATA_KEY);
        const characterData = JSON.parse(allCharactersData)[characterId];
        return characterData.combos;

    } catch (error) {
        console.log(error);
        return [];
    }
}

const getLikedCombos = () => {
    try {
        const likedCombos = localStorage.getItem(LIKED_COMBOS);
        const parsedCombos = JSON.parse(likedCombos);
        return parsedCombos;

    } catch (error) {
        console.log(error);
        return [];
    }
}

const updateLikedCombos = (comboId) => {
    try {
        const likedCombos = localStorage.getItem(LIKED_COMBOS);
        const parsedCombos = JSON.parse(likedCombos);
        const filteredCombos = parsedCombos.filter(pCombo => pCombo !== comboId);
        console.log(parsedCombos, filteredCombos);
        let updatedCombos;
        if (filteredCombos.length === parsedCombos.length) {
            updatedCombos = [...parsedCombos, comboId];
        } else {
            updatedCombos = filteredCombos;
        }
        console.log(updatedCombos);
        localStorage.setItem(LIKED_COMBOS, JSON.stringify(updatedCombos));
        return updatedCombos;
    } catch (error) {
        console.log(error);
        return [];
    }
}

const updateCombos = (characterId, combo) => {
    try {
        const allCharactersData = localStorage.getItem(CHARACTERS_DATA_KEY);
        const parsedAllCharacters = JSON.parse(allCharactersData);
        const characterData = parsedAllCharacters[characterId];
        const comboMatch = characterData.combos
            .find(oCombo => oCombo.id === combo.id);
        const updatedCombos = !!comboMatch ?
            characterData.combos
                .map(oCombo => {
                    if (oCombo.id === combo.id) return combo;
                    return oCombo;
                }) :
            [...characterData.combos, combo];

        characterData.combos = updatedCombos;
        parsedAllCharacters[characterId] = characterData;
        localStorage.setItem(
            CHARACTERS_DATA_KEY,
            JSON.stringify(parsedAllCharacters)
        );
        return [updatedCombos, combo];
    } catch (error) {
        console.log(error);
        return [];
    }
}

const deleteCombo = (characterId, comboId) => {
    try {
        const allCharactersData = localStorage.getItem(CHARACTERS_DATA_KEY);
        const parsedAllCharacters = JSON.parse(allCharactersData);
        const characterData = parsedAllCharacters[characterId];
        const updatedCombos = characterData.combos
            .filter(combo => combo.id !== comboId);

        characterData.combos = updatedCombos;
        parsedAllCharacters[characterId] = characterData;
        localStorage.setItem(
            CHARACTERS_DATA_KEY,
            JSON.stringify(parsedAllCharacters)
        );
        return updatedCombos;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export {
    getCombos,
    getLikedCombos,
    updateLikedCombos,
    deleteCombo,
    updateCombos
}