import { generateClient } from 'aws-amplify/api';
import {
    GET_ALL_COMBOS,
    GET_COMBO,
} from '../graphql/queries';
import { CREATE_COMBO, DELETE_COMBO, UPDATE_COMBO } from '../graphql/mutations';
const client = generateClient();

const buildFilters = (characterId, orOptions = []) => {
    const orFilters = orOptions.map(char => {
        if (!char.value) return null;
        return { character_tags: { contains: char.value } };
    })
        .filter(Boolean)
    if (!orFilters.length) return {
        characterId: { eq: characterId },
    }
    return {
        // filter by saved ids as well
        characterId: { eq: characterId },
        or: orFilters
    }
}


const getAllCombos = async ({
    characterId,
    characterFilters = []
}) =>
    client
        .graphql({
            query: GET_ALL_COMBOS,
            variables: {
                filter: buildFilters(characterId, characterFilters)
            }
        })
        .then((res) => {
            const {
                data: {
                    listCombos: {
                        items
                    }
                }
            } = res;
            return items;
        })
        .catch((err) => {
            console.log(err);
            return err;
        });


const updateCombo = async ({
    combo,
}) =>
    client
        .graphql({
            query: GET_COMBO,
            variables: {
                id: combo.oId
            }
        })
        .then((res) => {
            const {
                data: {
                    getCombo: comboMatch
                }
            } = res;
            if (comboMatch.lId !== combo.id) {
                throw new Error("No combo match");
            }
            return client
                .graphql({
                    query: UPDATE_COMBO,
                    variables: {
                        input: {
                            id: comboMatch.id,
                            lId: combo.id,
                            characterId: combo.characterId,
                            favourite: combo.favourite,
                            name: combo.name,
                            damage: combo.damage,
                            character_tags: combo.character_tags,
                            tags: combo.tags,
                            launcher: combo.launcher,
                            command: combo.command,
                            note: combo.note,
                            likes: comboMatch.likes,
                            dislikes: comboMatch.dislikes
                        }
                    }
                })
        })
        .then((res) => {
            const {
                data: {
                    updateCombo
                }
            } = res;
            return updateCombo;
        })
        .catch((err) => {
            console.log(err);
            return combo;
        });

const deleteAwsCombo = async ({
    combo,
}) =>
    client
        .graphql({
            query: GET_COMBO,
            variables: {
                id: combo.oId
            }
        })
        .then((res) => {
            const {
                data: {
                    getCombo: comboMatch
                }
            } = res;
            if (comboMatch.lId !== combo.id) {
                throw new Error("No combo match");
            }
            return client
                .graphql({
                    query: DELETE_COMBO,
                    variables: {
                        input: {
                            id: comboMatch.id,
                        }
                    }
                })
        })
        .then((res) => {
            const {
                data: {
                    deleteCombo
                }
            } = res;
            return deleteCombo;
        })
        .catch((err) => {
            console.log(err);
            return combo;
        });

const createCombo = async ({
    combo
}) =>
    client
        .graphql({
            query: CREATE_COMBO,
            variables: {
                input: {
                    lId: combo.id,
                    characterId: combo.characterId,
                    favourite: false,
                    name: combo.name,
                    damage: combo.damage,
                    character_tags: combo.character_tags,
                    tags: combo.tags,
                    launcher: combo.launcher,
                    command: combo.command,
                    note: combo.note,
                    likes: 0,
                    dislikes: 0
                }
            }
        })
        .then((res) => {
            const {
                data: {
                    createCombo
                }
            } = res;
            return createCombo;
        })
        .catch((err) => {
            console.log(err);
            return err;
        });

export {
    getAllCombos,
    createCombo,
    updateCombo,
    deleteAwsCombo
};
