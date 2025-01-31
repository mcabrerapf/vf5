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

const filterMoveList = (list, filters) => {
    if(!filters.length) return list;

    return list.filter(move=> {
        const parsedType = `level/${MOVE_LEVEL_MATCH[move.level]}`
        const isValid = filters.includes(parsedType);
        return isValid;
    })
}

export {
    sortMovelist,
    filterMoveList
}