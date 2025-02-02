import {
    AKIRA,
    AOI,
    BRAD,
    EILEEN,
    EL_BLAZE,
    GOH,
    JACKY,
    JEAN,
    JEFFRY,
    KAGE,
    LAU,
    LEI,
    LION,
    PAI,
    SARAH,
    SHUN,
    TAKA,
    VANESSA,
    WOLF
} from './characters';

const B_URL = 'https://afternoon-gorge-77049-a1de8dd15ce4.herokuapp.com';

const CHARACTERS = [
    AKIRA,
    AOI,
    BRAD,
    EILEEN,
    EL_BLAZE,
    GOH,
    JACKY,
    JEAN,
    JEFFRY,
    KAGE,
    LAU,
    LEI,
    LION,
    PAI,
    SARAH,
    SHUN,
    TAKA,
    VANESSA,
    WOLF
];

const MOVE_LEVEL_MATCH = {
    'H': 'high',
    'H*': 'ex-high',
    'M': 'mid',
    'M*': 'ex-mid',
    'L': 'low',
    'L*': 'ex-low',
    // 
    'HT': 'high-throw',
    'LT': 'low-throw',
    'HCT': 'high-catch-throw',
    'LCT': 'low-catch-throw',
    'AT': 'attack-throw',
    'DT': 'downed-throw',
    // 
    'TC': 'throw-combo',
    'DA': 'downed-attack',
    'Sabaki': 'sabaki',
    'Special': 'special',
    'Rev': 'reversal',
    'Rev Combo': 'rev-combo',
    '-': 'no-category'
}

const NOTATION_TO_ICON = {
    '[9]': 'upRight',
    '[8]': 'up',
    '[8_]': 'up',
    '[7]': 'upLeft',
    '[6]': 'right',
    '[6_]': 'right',
    '[5]': null,
    '[4]': 'left',
    '[4_]': 'left',
    '[3]': 'downRight',
    '[2]': 'down',
    '[2_]': 'down',
    '[1]': 'downLeft'
}

const NOTATION_CHARACTERS = [
    '[9]',
    '[8]',
    '[8_]',
    '[7]',
    '[6]',
    '[6_]',
    '[5]',
    '[4]',
    '[4_]',
    '[3]',
    '[2]',
    '[2_]',
    '[1]',
    '[P]',
    '[K]',
    '[G]',
    '[+]',
];

const LOCAL_KEYS = {
    SELECTED_CHARACTER: 'vf5_selected-character',
    SELECTED_CHARACTER_VIEW: 'vf5_selected-character-view',
    SELECTED_MOVE_TYPE: 'vf5_selected-move-type',
    SELECTED_MOVELIST_SORT: 'vf5_selected-movelist-sort',
    SELECTED_MOVELIST_FILTERS: 'vf5_selected-movelist-filters',
    CHARACTER_COMBOS: 'vf5_character_combos_',
    CHARACTER_FAV_MOVES: 'vf5_character_fav_moves_',
    CHARACTER_FAV_COMBOS: 'vf5_character_fav_combos_'
}

const SORT_OPTIONS = [
    ['', 'Default'],
    ['name', 'Name'],
    ['command', 'Command'],
    ['commandType', 'Category'],
    ['level', 'Type'],
    ['damage', 'Damage'],
    ['exe', 'Startup'],
    ['normal_hit_stats', 'On hit'],
    ['counter_hit_stats', 'On ch'],
    ['guard_stats', 'On block'],
    ['escape', 'Escape'],
    ['sober', 'Sober'],
]


export {
    B_URL,
    CHARACTERS,
    LOCAL_KEYS,
    MOVE_LEVEL_MATCH,
    NOTATION_CHARACTERS,
    NOTATION_TO_ICON,
    SORT_OPTIONS
}