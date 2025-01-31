const checkIsCombiStart = (command, index) => {
    return (command[index + 1] === '[+]' && command[index - 1] !== '[+]') ||
        (command[index + 1] === 'or' && command[index - 1] !== 'or');
}

const checkIsCombiEnd = (command, index) => {
    return (command[index - 1] === '[+]' && command[index + 1] !== '[+]') ||
        (command[index - 1] === 'or' && command[index + 1] !== 'or');
}

export {
    checkIsCombiStart,
    checkIsCombiEnd
}