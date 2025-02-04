// TODO add High (Unblockable)
const MOVE_LEVEL_MATCHES = {
    'High': 'high',
    'Special High': 'ex-high',
    'Middle': 'mid',
    //PARSING DOUBLE VALUE FORM API
    'MiddleMiddle':'mid',
    //PARSING DOUBLE VALUE FORM API
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
    'Other (Special Action)': 'special',
    'Atemi': 'reversal',
    'Atemi Combo': 'rev-combo',
    '-': 'no-category'
}

export default MOVE_LEVEL_MATCHES;