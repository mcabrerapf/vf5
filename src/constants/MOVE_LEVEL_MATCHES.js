// TODO add High (Unblockable)
const MOVE_LEVELS = [
    "high",
    "ex-high",
    "mid",
    "mid",
    "ex-mid",
    "low",
    "ex-low",
    "high-throw",
    "low-throw",
    "high-catch-throw",
    "low-catch-throw",
    "attack-throw",
    "downed-throw",
    "throw-combo",
    "downed-attack",
    "sabaki",
    "special",
    "reversal",
    "rev-combo",
    "no-category",
    "wall",
    "ch",
    "side"
];

const MOVE_LEVEL_MATCHES = {
    'High': 'high',
    'Special High': 'ex-high',
    'Middle': 'mid',
    'Special Middle': 'ex-mid',
    'Low': 'low',
    'Special Low': 'ex-low',
    // 
    'High Throw': 'high-throw',
    'Low Throw': 'low-throw',
    'High Catch Throw': 'high-catch-throw',
    'Low Catch Throw': 'low-catch-throw',
    'Hit Throw': 'attack-throw',
    'Down Throw': 'downed-throw',
    // 
    'Throw Combo': 'throw-combo',
    'Down Attacks': 'downed-attack',
    'Deflect': 'sabaki',
    'Other (Special Action)': 'other',
    'Atemi': 'reversal',
    'Atemi Combo': 'rev-combo',
    '-': 'other',
    '.': 'other'
}
export { MOVE_LEVELS, MOVE_LEVEL_MATCHES }
export default MOVE_LEVEL_MATCHES;