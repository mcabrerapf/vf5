import { CHARACTERS, COMBO_FILTER_OPTIONS } from "../../../constants";

const notValidCharacters = ['or', 'ch', 'side', 'wb', 'w', 'hit', '⊙'];

const getLauncher = (command) => {
    let startIndex = 0;
    let endIndex = command.length;
    let foundStart = false;
    let foundEnd = false;

    command.forEach((notation, index) => {
        if (!foundStart && !notValidCharacters.includes(notation)) {
            foundStart = true;
            startIndex = index;
        }
        if (foundStart && !foundEnd && notValidCharacters.includes(notation)) {
            foundEnd = true;
            endIndex = index;
        }
    })
    return command.slice(startIndex, endIndex);
}

const getLauncherData = (launcher, character) => {
    const stringLauncher = launcher.join('');

    const characterMoves = CHARACTERS.find(char => char.id === character).movelist['all_moves'];
    const moveMatch = characterMoves.find(move => move.command.join('') === stringLauncher);
    
    if (!moveMatch) return {};
    const { attack_level, move_name } = moveMatch;

    const { id: validatedLauncerType } = COMBO_FILTER_OPTIONS
        .find(option => option.name === attack_level) || {};

    return { attackLevel: validatedLauncerType, name: move_name };
}

const getExtraTags = (command) => {
    const extraTags = [];
    command.forEach(notation => {
        if (notation === 'ch') extraTags.push(notation);
        if (notation === 'side') extraTags.push(notation);
        if (notation === 'wb') extraTags.push('wall')
        if (notation === 'w') extraTags.push('wall')
    })

    return extraTags;
}

const getCommandData = (command, character, tags) => {
    const launcher = getLauncher(command);
    const { attackLevel, name } = getLauncherData(launcher, character);
    const extraTags = getExtraTags(command);
    const finalTags = [...tags, ...extraTags, attackLevel].filter(Boolean);
    return [[...new Set(finalTags)], name];
}

export {
    getCommandData
}