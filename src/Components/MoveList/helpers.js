const sortMovelist = (list, sort) => {
    if (!sort || !sort.id || !sort.dir) return list;
    const { id: sortKey, dir: sortDir } = sort;
    if (sortKey === 'default') return list;
    
    return list
        .map(listItem => listItem)
        .sort((itemA, itemB) => {
            const firstValue = sortDir === 'asc' ?
                itemA[sortKey] : itemB[sortKey];
            const secondValue = sortDir === 'asc' ?
                itemB[sortKey] : itemA[sortKey];


            if (['damage', 'startup', 'hit', 'c_hit', 'gd', 'sober'].includes(sortKey)) {
                const numA = typeof firstValue === "number" ? firstValue : 0;
                const numB = typeof secondValue === "number" ? secondValue : 0;
                return numA - numB;
            }

            if (Array.isArray(firstValue)) return firstValue.join('').localeCompare(secondValue.join(''))

            return firstValue.localeCompare(secondValue)
        });
}

const filterMovelist = (list, filters, favMoves) => {

    if (!filters.length) return list;

    const commandFilters = filters
        .filter(filter => filter.prefix === 'command')
    const attackLevelFilters = filters.filter(filter => filter.prefix === 'attack_level');
    const hasFavFilter = filters.find(filter => filter.id === 'fav');

    return list.filter(move => {
        const isValid = attackLevelFilters.length ?
            attackLevelFilters.find(parsedType => parsedType.name === move.attack_level) : true;
        let hasCommandMatch = commandFilters.length ? false : true;
        const stringCommand = move.command.join('')
        const hasFavMatch = !hasFavFilter ? true : favMoves.includes(move.id);
        commandFilters.forEach(commandFilter => {
            if (stringCommand.includes(commandFilter.id)) {
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