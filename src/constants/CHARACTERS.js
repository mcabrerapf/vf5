import CHARACTERS_JSON from '../characters-data';

const CHARACTERS = [];
const CHARACTER_IDS = [];
const ATTACK_LEVELS = [];
const ATTACK_LEVELS_OBJ = {};
const ATTACK_LEVELS_NAME_TO_ID = {};
const ATTACK_LEVEL_IDS = [];

const MOVELIST_FILTER_OPTIONS = [];
const COMBO_FILTER_OPTIONS = [
    {
        id:'wall',
        name:'Wall',
        prefix:'other'
    },
    {
        id:'ch',
        name:'Counter Hit',
        prefix:'other'
    },
    {
        id:'side',
        name:'Side',
        prefix:'other'
    }
];

Object.keys(CHARACTERS_JSON)
    .forEach(CHARACTER => {
        const { name, attack_levels } = CHARACTERS_JSON[CHARACTER];
        attack_levels.forEach(attack_level => {
            if (!!ATTACK_LEVELS.find(A_L => A_L.id === attack_level.id)) return;
            ATTACK_LEVELS.push({ id: attack_level.id, name: attack_level.name })
            ATTACK_LEVELS_OBJ[attack_level.id] = attack_level.name;
            ATTACK_LEVELS_NAME_TO_ID[attack_level.name] = attack_level.id;
            const attackLevelMatch = attack_level.id;
            MOVELIST_FILTER_OPTIONS.push({
                id: attackLevelMatch,
                prefix: 'attack_level',
                name: attack_level.name
            });
            COMBO_FILTER_OPTIONS.push({
                id: attackLevelMatch,
                prefix: 'other',
                name: attack_level.name
            });
        })
        COMBO_FILTER_OPTIONS.push({
            id: CHARACTER,
            prefix: 'character',
            name: name
        });
        CHARACTER_IDS.push(CHARACTER);
        CHARACTERS.push(CHARACTERS_JSON[CHARACTER])
    });

export {
    ATTACK_LEVELS,
    ATTACK_LEVELS_OBJ,
    ATTACK_LEVELS_NAME_TO_ID,
    ATTACK_LEVEL_IDS,
    MOVELIST_FILTER_OPTIONS,
    CHARACTERS,
    COMBO_FILTER_OPTIONS,
    CHARACTER_IDS,
    CHARACTERS_JSON,
}
export default CHARACTERS;