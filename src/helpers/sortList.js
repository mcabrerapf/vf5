const numberReplace = (possibleNumber) => {
    switch (possibleNumber) {
        case 'D':
            return 500
        case 'S':
            return 450;
        case '-':
            return 0;
        default:
            return possibleNumber;
    }
}
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

            switch (sort.type) {
                case 'number':
                    const numA = numberReplace(firstValue);
                    const numB = numberReplace(secondValue)
                    return numA - numB;
                case 'string':
                    return firstValue.localeCompare(secondValue);
                case 'array':
                    return firstValue.join('').localeCompare(secondValue.join(''))
                default:
                    return firstValue.localeCompare(secondValue)
            }
        });
}

export default sortList;