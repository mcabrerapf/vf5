const sortList = (list, sort) => {
    if (!sort || !sort.key || !sort.dir) return list;
    const { key: sortKey, dir: sortDir } = sort;

    return list
        .map(listItem => listItem)
        .sort((itemA, itemB) => {
            const firstValue = sortDir === 'asc' ?
                itemA[sortKey] : itemB[sortKey];
            const secondValue = sortDir === 'asc' ?
                itemB[sortKey] : itemA[sortKey];


            if (typeof firstValue === "number") {
                const numA = typeof firstValue === "number" ? firstValue : 0;
                const numB = typeof secondValue === "number" ? secondValue : 0;
                return numA - numB;
            }

            if (Array.isArray(firstValue)) return firstValue.join('').localeCompare(secondValue.join(''))

            return firstValue.localeCompare(secondValue)
        });
}

export default sortList;