import { CHARACTERS, STRINGS } from "../../../constants";

const getLauncherData = (launcher, character, combosFilterOptions) => {
    const stringLauncher = launcher.join('');
    const cleanLauncher = stringLauncher.replace(/\b(⊙|or|ch|side|wb|w|hit)\b/g, "").replace('[]', '');
    const characterMoves = CHARACTERS
        .find(char => char.id === character).movelist['all_moves'];
    const moveMatch = characterMoves
        .find(move => move.command.join('') === cleanLauncher);

    if (!moveMatch) return {};
    const { attack_level, name } = moveMatch;
    return { attackLevel: attack_level, name: name };
}

const getExtraTags = (command) => {
    const extraTags = [];
    command.forEach(notation => {
        if (notation === '[ch]') extraTags.push('ch');
        if (notation === '[side]') extraTags.push('side');
        if (notation === '[wb]') extraTags.push('wall')
        if (notation === '[w]') extraTags.push('wall')
    })

    return extraTags;
}

const getCommandData = (launcher, comboNotation, character, tags, combosFilterOptions) => {
    const { attackLevel, name } = getLauncherData(launcher, character, combosFilterOptions);
    const extraTags = getExtraTags(comboNotation);
    const finalTags = [...tags, attackLevel, ...extraTags,].filter(Boolean);
    return [[...new Set(finalTags)], name];
}

const checkNameRecusively = (name, comboNames, increment = 0) => {
    const numberSuffix = increment ? `(${increment})` : '';
    const nameWithSuffix = `${name}${numberSuffix}`;
    if (comboNames.includes(nameWithSuffix)) return checkNameRecusively(name, comboNames, increment + 1);
    return increment ? nameWithSuffix : name;
}

const getUniqueComboName = (comboId, comboName, launcherName, combos) => {
    let nameToCheck;

    const allComboNames = combos
        .filter(com => com.id !== comboId)
        .map(com => com.name);

    if (!comboId) {
        nameToCheck = comboName === STRINGS.DEFAULT_COMBO_NAME && launcherName ?
            launcherName : comboName;
    } else {
        nameToCheck = !comboName ? launcherName || STRINGS.DEFAULT_COMBO_NAME : comboName;
    }
    const finalName = checkNameRecusively(nameToCheck, allComboNames);
    return finalName.trim();
}

export {
    getCommandData,
    getUniqueComboName
}