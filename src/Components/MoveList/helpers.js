import { MOVE_LEVEL_MATCHES } from "../../constants";

const sortMovelist = (list, sort) => {
    const parsedSort = sort.split('/');
    if (parsedSort[0] === '' || !parsedSort[0]) return list;

    return list
        .map(listItem => listItem)
        .sort((itemA, itemB) => {
            const firstValue = parsedSort[1] === 'asc' ?
                itemA[parsedSort[0]] : itemB[parsedSort[0]];
            const secondValue = parsedSort[1] === 'asc' ?
                itemB[parsedSort[0]] : itemA[parsedSort[0]];

            // BROKEN FIX
            if (Array.isArray(firstValue)) return firstValue.join('').localeCompare(secondValue.join(''))
            if (typeof firstValue === "number" && !isNaN(firstValue)) return firstValue > secondValue;
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
        const parsedType = `level/${MOVE_LEVEL_MATCHES[move.attack_level]}`
        const isValid = levelFilters.length ? levelFilters.includes(parsedType) : true;
        let hasCommandMatch = commandFilters.length ? false : true;
        const stringCommand = move.command.join('')
        const hasFavMatch = !hasFavFilter ? true : favMoves.includes(move.id);
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