
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

const NOTATION_TO_ICON = {
    [NOTATION_CHARACTERS[0]]: 'upRight',
    [NOTATION_CHARACTERS[1]]: 'up',
    [NOTATION_CHARACTERS[2]]: 'up',
    [NOTATION_CHARACTERS[3]]: 'upLeft',
    [NOTATION_CHARACTERS[4]]: 'right',
    [NOTATION_CHARACTERS[5]]: 'right',
    [NOTATION_CHARACTERS[6]]: null,
    [NOTATION_CHARACTERS[7]]: 'left',
    [NOTATION_CHARACTERS[8]]: 'left',
    [NOTATION_CHARACTERS[9]]: 'downRight',
    [NOTATION_CHARACTERS[10]]: 'down',
    [NOTATION_CHARACTERS[11]]: 'down',
    [NOTATION_CHARACTERS[12]]: 'downLeft'
}

const INVALID_LAUNCHER_NOTATIONS = [
    'or',
    'ch',
    'side',
    'wb',
    'w',
    'hit',
    '⊙'
];

const NOTATIONS = {
    NOTATION_CHARACTERS,
    NOTATION_TO_ICON,
    INVALID_LAUNCHER_NOTATIONS
}
export {
    INVALID_LAUNCHER_NOTATIONS,
    NOTATION_CHARACTERS,
    NOTATION_TO_ICON,
}
export default NOTATIONS