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
    return [
        command.slice(startIndex, endIndex),
        command.slice(endIndex)
    ];
}

export {
    getLauncher
}