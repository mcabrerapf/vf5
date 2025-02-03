import { CHARACTERS, MOVE_LEVEL_MATCH } from "../../../constants";

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

const getLauncherType = (launcher, character) => {
    const stringLauncher = launcher.join(' ');
    const CHARACTERDATA = CHARACTERS.find(char => char.id === character);
    const characterMoves = CHARACTERDATA.movelist['allMoves'];
    const moveMatch = characterMoves.find(move => move.command.join(' ') === stringLauncher);
    if (!moveMatch) return null;
    const { level } = moveMatch;
    return MOVE_LEVEL_MATCH[level];


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

const getTagsFromCommand = (command, character, tags) => {
    const launcher = getLauncher(command);
    const launcherTag = getLauncherType(launcher, character);
    const extraTags = getExtraTags(command);
    const finalTags = [...tags, ...extraTags, launcherTag].filter(Boolean);
    return [...new Set(finalTags)];
}

export {
    getTagsFromCommand
}