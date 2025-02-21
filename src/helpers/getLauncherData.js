import { CHARACTERS } from "../constants";

const getLauncherData = (launcher, character) => {
    const stringLauncher = launcher.join('');
    const cleanLauncher = stringLauncher.replace(/\b(⊙|or|ch|side|wb|w|hit)\b/g, "").replace('[]', '');
    const characterMoves = CHARACTERS
        .find(char => char.id === character).movelist['all_moves'];
    const moveMatch = characterMoves
        .find(move => move.command.join('') === cleanLauncher);

    if (!moveMatch) return {};
    const { attack_level, name, category } = moveMatch;
    return { attackLevel: attack_level, name: name, category };
}

export default getLauncherData;