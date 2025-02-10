import CHARACTERS_JSON from '../characters-data';

const CHARACTERS = [];
const CHARACTER_IDS = [];
const CHARACTER_ID_TO_NAME = {};
const ATTACK_LEVELS = [];
const ATTACK_LEVELS_ID_TO_NAME = {};
const ATTACK_LEVELS_NAME_TO_ID = {};
const ATTACK_LEVEL_IDS = [];

const MOVELIST_FILTER_OPTIONS = [];
const MOVELIST_SORT_OPTIONS = [
    {
        id: 'default',
        name: 'Default',
        dir: 'asc'
    }
];
const COMBO_FILTER_OPTIONS = [
    {
        id: 'wall',
        name: 'Wall',
        prefix: 'tags'
    },
    {
        id: 'ch',
        name: 'Counter Hit',
        prefix: 'tags'
    },
    {
        id: 'side',
        name: 'Side',
        prefix: 'tags'
    }
];

const COMBOS_SORT_OPTIONS = [
    {
        id: 'command',
        name: 'Command',
        dir: 'asc'
    },
    {
        id: 'name',
        name: 'Name',
        dir: 'asc'
    },
    {
        id:'launcher',
        name: 'Launcher',
        dir: 'asc'
    },
    {
        id: 'damage',
        name: 'Damage',
        dir: 'asc'
    },
    {
        id: 'character_tags',
        name: 'Characters',
        dir: 'asc'
    },
    {
        id: 'tags',
        name: 'Tags',
        dir: 'asc'
    },
    {
        id: 'note',
        name: 'Note',
        dir: 'asc'
    }
];

const MATHCHUPS_SORT_OPTIONS = [
    {
        id: 'name',
        name: 'Name',
        dir:'asc' 
    },
    {
        id: 'wins',
        name: 'Wins',
        dir:'asc' 
    },
    {
        id: 'loses',
        name: 'Loses',
        dir:'asc' 
    },
    {
        id: 'total',
        name: 'Total',
        dir:'asc' 
    },
    {
        id: 'win_rate',
        name: 'Win Rate',
        dir:'asc' 
    },
    {
        id: 'note',
        name: 'Note',
        dir:'asc' 
    },
]

Object.keys(CHARACTERS_JSON)
    .forEach(CHARACTER => {
        const { id, name, attack_levels } = CHARACTERS_JSON[CHARACTER];
        attack_levels.forEach(attack_level => {
            if (!!ATTACK_LEVELS.find(A_L => A_L.id === attack_level.id)) return;
            ATTACK_LEVELS.push({ id: attack_level.id, name: attack_level.name })
            ATTACK_LEVELS_ID_TO_NAME[attack_level.id] = attack_level.name;
            ATTACK_LEVELS_NAME_TO_ID[attack_level.name] = attack_level.id;
            const attackLevelMatch = attack_level.id;
            MOVELIST_FILTER_OPTIONS.push({
                id: attackLevelMatch,
                prefix: 'attack_level',
                name: attack_level.name
            });
            COMBO_FILTER_OPTIONS.push({
                id: attackLevelMatch,
                prefix: 'tags',
                name: attack_level.name
            });
        })
        COMBO_FILTER_OPTIONS.push({
            id: CHARACTER,
            prefix: 'character_tags',
            name: name
        });
        CHARACTER_IDS.push(CHARACTER);
        CHARACTERS.push(CHARACTERS_JSON[CHARACTER])
        CHARACTER_ID_TO_NAME[id] = name;
        CHARACTERS_JSON[CHARACTER].move_key_props.forEach(moveKey => {
            if (MOVELIST_SORT_OPTIONS.find(option => option.id === moveKey.id)) return;
            MOVELIST_SORT_OPTIONS.push({ ...moveKey, dir: 'asc' });
        })

    });

export {
    ATTACK_LEVELS,
    ATTACK_LEVELS_ID_TO_NAME,
    ATTACK_LEVELS_NAME_TO_ID,
    ATTACK_LEVEL_IDS,
    MATHCHUPS_SORT_OPTIONS,
    MOVELIST_FILTER_OPTIONS,
    MOVELIST_SORT_OPTIONS,
    CHARACTERS,
    COMBO_FILTER_OPTIONS,
    COMBOS_SORT_OPTIONS,
    CHARACTER_ID_TO_NAME,
    CHARACTER_IDS,
    CHARACTERS_JSON,
}

export default CHARACTERS;