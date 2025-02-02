const sortCombos = (list) => {


    return list
        .map(listItem => listItem)
        .sort((a, b) => {
            return a.command.length - b.command.length
        });
}

export {
    sortCombos
}