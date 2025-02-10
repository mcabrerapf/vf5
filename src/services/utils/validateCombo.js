import { CHARACTERS, STRINGS } from "../../constants";
import { getLauncher } from "../../helpers";

const validateCombo = (combo) => {
    const { id,
        name,
        damage,
        favourite,
        launcher = [],
        command = [],
        character_tags,
        characterTags,
        tags = []
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
        name: name || STRINGS.DEFAULT_COMBO_NAME,
        damage: damage || 1,
        favourite: favourite || false,
        launcher: validatedLauncher,
        command: validatedCommand,
        character_tags: !!characterTagsToCheck.length ?
            characterTagsToCheck : [CHARACTERS[0].id],
        tags: tags || []

    };
}

export default validateCombo;