const checkIsCombiStart = (command, index) => {
    return command[index + 1] === '[+]' && command[index - 1] !== '[+]';
}

const checkIsCombiEnd = (command, index) => {
    return command[index - 1] === '[+]' && command[index + 1] !== '[+]';
}

export {
    checkIsCombiStart,
    checkIsCombiEnd
}