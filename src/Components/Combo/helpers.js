import { NOT_VALID_INPUTS } from "./constants";

const getLauncher = (command) => {
    let startIndex = 0;
    let endIndex = command.length;
    let foundStart = false;
    let foundEnd = false;
    command.forEach((notation, index) => {
        if (!foundStart && !NOT_VALID_INPUTS.includes(notation)) {
            foundStart = true;
            startIndex = index;
        }
        if (foundStart && !foundEnd && NOT_VALID_INPUTS.includes(notation)) {
            foundEnd = true;
            endIndex = index;
        }
    })
    return [
        command.slice(startIndex, endIndex),
        command.slice(endIndex)
    ];
}

export {
    getLauncher
}