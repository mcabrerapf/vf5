import { CHARACTERS, STRINGS } from "../../constants";
import { getLauncher } from "../../helpers";

const validateCombo = (combo) => {
    if (!combo) return null;
    const {
        id,
        oId = null,
        name = '',
        damage = 1,
        favourite = false,
        launcher = [],
        command = [],
        character_tags,
        characterTags,
        tags = [],
        note = ''
    } = combo;
    const characterTagsToCheck = character_tags || characterTags || [];
    let validatedLauncher = launcher;
    let validatedCommand = command;
    if (!launcher.length) {
        const validated = getLauncher([...launcher, ...command]);
        validatedLauncher = validated[0];
        validatedCommand = validated[1];
    }

    return {
        id,
        oId,
        name: name || STRINGS.DEFAULT_COMBO_NAME,
        damage: damage || 1,
        favourite: favourite || false,
        launcher: validatedLauncher,
        command: validatedCommand,
        character_tags: !!characterTagsToCheck.length ?
            characterTagsToCheck : [CHARACTERS[0].id],
        tags: tags || [],
        note: note || ''
    };
}

export default validateCombo;