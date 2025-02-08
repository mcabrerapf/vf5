const sortMatchups = (list, sort) => {
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
                
            if (typeof firstValue ==='number') {
                return firstValue - secondValue;
            }
            return firstValue.localeCompare(secondValue)
        });
}

export {
    sortMatchups
}