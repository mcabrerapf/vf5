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

export {
    sortMovelist
}