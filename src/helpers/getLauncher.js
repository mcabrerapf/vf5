import { INVALID_LAUNCHER_NOTATIONS } from "../constants";

const getLauncher = (command) => {
    let startIndex = 0;
    let endIndex = command.length;
    let foundStart = false;
    let foundEnd = false;
    command.forEach((notation, index) => {
        if (!foundStart && !INVALID_LAUNCHER_NOTATIONS.includes(notation)) {
            foundStart = true;
            startIndex = index;
        }
        if (foundStart && !foundEnd && INVALID_LAUNCHER_NOTATIONS.includes(notation)) {
            foundEnd = true;
            endIndex = index;
        }
    })
    return [
        command.slice(startIndex, endIndex),
        command.slice(endIndex),
        command.slice(0, endIndex),
    ];
}

export default getLauncher;