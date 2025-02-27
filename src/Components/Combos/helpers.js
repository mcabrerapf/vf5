import { getPseudoLaunchers } from "../../helpers";

const sortCombos = (list, sort) => {
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

            if (sortKey === 'damage') {
                const numA = typeof firstValue === "number" ? firstValue : 0;
                const numB = typeof secondValue === "number" ? secondValue : 0;
                return numA - numB;
            }

            if (Array.isArray(firstValue)) return firstValue.join('').localeCompare(secondValue.join(''))

            return firstValue.localeCompare(secondValue)
        });
}

const filterCombos = (list, filters) => {
    const otherFilters = filters.filter(filter => filter.id !== 'fav')
    const hasFavFilter = filters.find(filter => filter.id === 'fav')

    return list
        .filter(listItem => {
            const { favourite } = listItem;
            const hasFavMatch = hasFavFilter ? favourite : true
            if (!otherFilters.length) return hasFavMatch;
            const filterMatches = [];

            otherFilters.forEach(filter => {
                const { key, id } = filter;
                const valueToCheck = listItem[key];
                if (valueToCheck === 'string') {
                } else if (key === 'launcher') {
                    const stringifiedValue = valueToCheck.join('-');
                    filterMatches.push(stringifiedValue === id);
                } else if (key === 'pseudo-launcher') {
                    const pseudoLauncher = getPseudoLaunchers([listItem]);
                    const stringifiedValue = pseudoLauncher.join('-');
                    filterMatches.push(stringifiedValue === id);
                } else if (key === 'command') {
                    const stringifiedValue = valueToCheck.join('-');
                    const stringLauncher = listItem.launcher.join('-');
                    const match = stringifiedValue.includes(id) || stringLauncher.includes(id)
                    filterMatches.push(match);
                } else if (Array.isArray(valueToCheck)) {
                    const isValid = valueToCheck.find(value => value === id)
                    filterMatches.push(!!isValid);
                }
            });
            const allFiltersMatch = !filterMatches.includes(false)
            return hasFavMatch && allFiltersMatch;
        })

}

export {
    filterCombos,
    sortCombos
}