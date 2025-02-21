import ALL from '../characters-data';
const CHARACTERS_JSON = ALL.characters;

const CHARACTERS = [];
const CHARACTER_IDS = [];
const CHARACTER_ID_TO_NAME = {};
const ATTACK_LEVELS = [];
const ATTACK_LEVELS_ID_TO_NAME = {};
const ATTACK_LEVELS_NAME_TO_ID = {};
const ATTACK_LEVEL_IDS = [];

const MOVELIST_SORT_OPTIONS = ALL.movelist_sort_options;

const COMBOS_SORT_OPTIONS = ALL.combos_sort_options;

const MATHCHUPS_SORT_OPTIONS = [
    {
        id: 'name',
        name: 'Name',
        dir: 'asc'
    },
    {
        id: 'wins',
        name: 'Wins',
        dir: 'asc'
    },
    {
        id: 'loses',
        name: 'Loses',
        dir: 'asc'
    },
    {
        id: 'total',
        name: 'Total',
        dir: 'asc'
    },
    {
        id: 'win_rate',
        name: 'Win Rate',
        dir: 'asc'
    },
    {
        id: 'note',
        name: 'Note',
        dir: 'asc'
    },
]

const WEIGHT_CLASES = [
    {
        id: 0,
        name: 'Super lightweight',
        short_name: 'SLW',
        characters: ['aoi', 'eileen', 'elblaze']
    },
    {
        id: 1,
        name: 'Lightweight',
        short_name: 'LW',
        characters: ['sarah', 'shun', 'pai', 'lion', 'vanessa']
    },
    {
        id: 2,
        name: 'Midweight',
        short_name: 'MW',
        characters: ['akira', 'lau', 'jacky', 'kage', 'lei', 'brad', 'goh', 'jean']
    },
    {
        id: 3,
        name: 'Heavyweight',
        short_name: 'HW',
        characters: ['wolf', 'jeffry']
    },
    {
        id: 4,
        name: 'Super Heavyweight',
        short_name: 'SHW',
        characters: ['taka']
    }
];

Object.keys(CHARACTERS_JSON)
    .forEach(CHARACTER => {
        const { id, name } = CHARACTERS_JSON[CHARACTER];
        CHARACTER_IDS.push(CHARACTER);
        CHARACTERS.push(CHARACTERS_JSON[CHARACTER])
        CHARACTER_ID_TO_NAME[id] = name;
    });

export {
    ATTACK_LEVELS,
    ATTACK_LEVELS_ID_TO_NAME,
    ATTACK_LEVELS_NAME_TO_ID,
    ATTACK_LEVEL_IDS,
    MATHCHUPS_SORT_OPTIONS,
    MOVELIST_SORT_OPTIONS,
    CHARACTERS,
    COMBOS_SORT_OPTIONS,
    CHARACTER_ID_TO_NAME,
    CHARACTER_IDS,
    CHARACTERS_JSON,
    WEIGHT_CLASES
}

export default CHARACTERS;