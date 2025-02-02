import { MOVE_LEVEL_MATCH } from "../../constants";

const sortMovelist = (list, sort) => {
    const parsedSort = sort.split('/');
    if (parsedSort[0] === '' || !parsedSort[0]) return list;

    return list
        .map(listItem => listItem)
        .sort((a, b) => {
            const firstValue = parsedSort[1] === 'asc' ? a[parsedSort[0]] : b[parsedSort[0]];
            const secondValue = parsedSort[1] === 'asc' ? b[parsedSort[0]] : a[parsedSort[0]];
            if (Array.isArray(firstValue)) return firstValue.join('').localeCompare(secondValue.join(''))
            return firstValue.localeCompare(secondValue)
        });
}

const filterMovelist = (list, filters, favMoves) => {

    if (!filters.length) return list;

    const commandFilters = filters
        .filter(filter => filter.includes('command/'))
        .map(command => command.split('/')[1]);
    const levelFilters = filters.filter(filter => filter.includes('level/'));
    const hasFavFilter = filters.includes('fav/');
    

    return list.filter(move => {
        const parsedType = `level/${MOVE_LEVEL_MATCH[move.level]}`
        const isValid = levelFilters.length ? levelFilters.includes(parsedType) : true;
        let hasCommandMatch = commandFilters.length ? false : true;
        const stringCommand = move.command.join('')
        const hasFavMatch = !hasFavFilter ? true : favMoves.includes(stringCommand);
        commandFilters.forEach(commandFilter => {
            if (stringCommand.includes(commandFilter)) {
                hasCommandMatch = true;
            }
        })

        return isValid && hasCommandMatch && hasFavMatch;
    })
}

export {
    sortMovelist,
    filterMovelist
}