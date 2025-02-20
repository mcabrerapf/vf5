import { generateClient } from 'aws-amplify/api';
import {
    GET_ALL_COMBOS,
    GET_COMBO,
} from '../graphql/queries';
import { CREATE_COMBO, DELETE_COMBO, UPDATE_COMBO } from '../graphql/mutations';
const client = generateClient();
const buildFilters = ({
    characterId,
    andLids = [],
    orLids = [],
}) => {
    const filters = {};
    const andFilters = [];
    const orFilters = [];
    orLids.forEach(lId => {
        orFilters.push({ lId: { eq: lId } })
    })
    andLids.forEach(lId => {
        andFilters.push({ lId: { ne: lId } })
    })
    if (andFilters.length) filters.and = andFilters;
    if (orFilters.length) filters.or = orFilters;
    if (characterId) filters.characterId = { eq: characterId };
    return filters;
}

const getAllOnlineCombos = async ({
    characterId,
    lIds = [],
}) =>
    client
        .graphql({
            query: GET_ALL_COMBOS,
            variables: {
                filter: buildFilters({ characterId, andLids: lIds })
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

const getMyOnlineCombos = async ({
    characterId,
    lIds = [],
}) =>
    client
        .graphql({
            query: GET_ALL_COMBOS,
            variables: {
                filter: buildFilters({ characterId, orLids: lIds })
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


const getOnlineCombo = async ({
    comboId,
}) =>
    client
        .graphql({
            query: GET_COMBO,
            variables: {
                id: comboId
            }
        })
        .then((res) => {
            const {
                data: {
                    getCombo: comboMatch
                }
            } = res;

            return comboMatch;
        })
        .catch((err) => {
            console.log(err);
            return null;
        });

const updateOnlineCombo = async ({
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
                            dislikes: comboMatch.dislikes,
                            game_version: combo.game_version
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

const updateOnlineComboLikes = async ({
    comboId,
    increase,
}) =>
    getOnlineCombo({ comboId: comboId })
        .then(combo =>
            client.graphql({
                query: UPDATE_COMBO,
                variables: {
                    input: {
                        id: combo.id,
                        likes: increase ? combo.likes + 1 : combo.likes - 1,
                    }
                }
            }))
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
            return null;
        });


const deleteOnlineCombo = async ({
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
                    dislikes: 0,
                    game_version: combo.game_version
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
    getAllOnlineCombos,
    getMyOnlineCombos,
    getOnlineCombo,
    createCombo,
    updateOnlineCombo,
    updateOnlineComboLikes,
    deleteOnlineCombo
};
