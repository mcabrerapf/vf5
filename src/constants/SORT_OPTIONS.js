

const MOVELIST_SORT_OPTIONS = [
    ['', 'Default'],
    ['move_name', 'Name'],
    ['command', 'Command'],
    ['category', 'Category'],
    ['attack_level', 'Type'],
    ['damage', 'Damage'],
    ['startup', 'Startup'],
    ['hit', 'On hit'],
    ['c_hit', 'On ch'],
    ['gd', 'On block'],
    ['dodge_direction', 'Dodge'],
    ['sober', 'Sober'],
]

const COMBOS_SORT_OPTIONS = []

const SORT_OPTIONS = {
    COMBOS_SORT_OPTIONS,
    MOVELIST_SORT_OPTIONS,
}

export {
    COMBOS_SORT_OPTIONS, 
    MOVELIST_SORT_OPTIONS
}
export default SORT_OPTIONS;
