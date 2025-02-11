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

const filterMovelist = (list, filters, customMoves) => {

    if (!filters.length) return list;

    const commandFilters = filters
        .filter(filter => filter.prefix === 'command')
    const attackLevelFilters = filters.filter(filter => filter.prefix === 'attack_level');
    const hasFavFilter = filters.find(filter => filter.id === 'fav');
    const dodgeFilter = filters.find(filter => filter.prefix === 'dodge');
    const textFilter = filters.find(filter => filter.prefix === 'text_search');

    return list.filter(move => {
        const isValid = attackLevelFilters.length ?
            attackLevelFilters.find(parsedType => parsedType.name === move.attack_level) : true;
        let hasCommandMatch = commandFilters.length ? false : true;
        const stringCommand = move.command.join('-')
        const hasFavMatch = !hasFavFilter ?
            true : !!customMoves.find(cMove => cMove.id === move.id && cMove.favourite);
        const hasDodgeMatch = dodgeFilter ?
            move.dodge_direction === dodgeFilter.id : true;
        commandFilters.forEach(commandFilter => {
            if (stringCommand.includes(commandFilter.id)) {
                hasCommandMatch = true;
            }
        })

        let hasTextMatch = textFilter?.id ? false : true;
        if (textFilter?.id) {
            hasTextMatch =
                move.move_name.toLocaleLowerCase().includes(textFilter.id) ||
                stringCommand.toLocaleLowerCase().includes(textFilter.id) ||
                move.notes.toLocaleLowerCase().includes(textFilter.id);
        }

        return isValid && hasCommandMatch && hasFavMatch && hasDodgeMatch && hasTextMatch;
    })
}

const getLaunchers = (combos) => {
    return combos.map(combo => {
        if (!combo.launcher || !combo.launcher.length) return null;
        return combo.launcher.map(notation => {
            if (['⊙', 'or', 'ch', 'side', 'wb', 'w', 'hit'].includes(notation)) return null;
            return notation;
        })
            .filter(Boolean)
            .join('-')

    })
        .filter(Boolean);
}

export {
    sortMovelist,
    filterMovelist,
    getLaunchers
}