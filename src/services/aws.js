import { generateClient } from 'aws-amplify/api';
import {
    GET_ALL_COMBOS,
    GET_COMBO,
} from '../graphql/queries';
import { CREATE_COMBO, DELETE_COMBO, UPDATE_COMBO } from '../graphql/mutations';
const client = generateClient();

// TODO fix this logic
const buildFilters = ({
    characterId,
    orOptions = [],
    lIds = [],
    oIds = [],
    iIds = []
}) => {
    const filters = {
        characterId: { eq: characterId },
    };
    const orFilters = orOptions.map(oOption => {
        if (!oOption.value) return null;
        return { character_tags: { contains: oOption.value } };
    })
        .filter(Boolean)
    const andFilters = lIds.map(lId => {
        if (!lId) return null;
        return { lId: { ne: lId } };
    })
        .filter(Boolean)
    oIds.forEach(oId => {
        if (!oId) return null;
        andFilters.push({ id: { ne: oId } });
    })
    iIds.forEach(iId => {
        if (!iId) return null;
        orFilters.push({ lId: { eq: iId } });
    })
    if (!!orFilters.length) filters.or = orFilters;
    if (!!andFilters.length) filters.and = andFilters;
    console.log(filters)
    return filters;
}

const getCombo = async ({
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

const getAllCombos = async ({
    characterId,
    characterFilters = [],
    lIds = [],
    oIds
}) =>
    client
        .graphql({
            query: GET_ALL_COMBOS,
            variables: {
                filter: buildFilters({
                    characterId, orOptions: characterFilters, lIds, oIds
                })
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

const getMyCombos = async ({
    characterId,
    characterFilters = [],
    lIds = [],
}) =>
    client
        .graphql({
            query: GET_ALL_COMBOS,
            variables: {
                filter: buildFilters({
                    characterId, orOptions: characterFilters, iIds: lIds
                })
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

const updateLikes = async ({
    comboId,
    increase,
}) =>
    getCombo({ comboId: comboId })
        .then(combo => {
            console.log(combo);
            return client
                .graphql({
                    query: UPDATE_COMBO,
                    variables: {
                        input: {
                            id: combo.id,
                            likes: increase ? combo.likes + 1 : combo.likes - 1,
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
            return null;
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
    getAllCombos,
    getMyCombos,
    createCombo,
    updateCombo,
    updateLikes,
    deleteAwsCombo
};
