import getPseudoLaunchers from "./get-pseudo-launchers";

const filterList = (list, filters, customMoves = []) => {
    if (!filters.length) return list;
    let hasFavFilter = false;
    let textFilter;
    const otherFilters = [];

    filters.forEach(filter => {
        if (filter.key === 'favourite') {
            hasFavFilter = true
        } else if (filter.key === 'text_search') {
            textFilter = filter;
        } else {
            otherFilters.push(filter);
        }
    });

    return list.filter(listItem => {
        const filterMatchesObj = {};
        otherFilters.forEach(fOption => {
            const { key: fKey, value: fValue } = fOption;
            if (!filterMatchesObj[fKey]) filterMatchesObj[fKey] = [];
            const moveValue = listItem[fKey];
            if(fKey.includes('guarantees_on')) {
                filterMatchesObj[fKey].push(!!moveValue);
                return;
            }
            if (fKey === 'launcher') {
                const stringifiedValue = moveValue.join('-');
                filterMatchesObj[fKey].push(stringifiedValue === fValue);
                return;
            }
            if (fKey === 'pseudo-launcher') {
                const pseudoLauncher = getPseudoLaunchers([listItem]);
                const stringifiedValue = pseudoLauncher.join('-');
                filterMatchesObj[fKey].push(stringifiedValue === fValue);
                return;
            }
            if (Array.isArray(moveValue)) {
                filterMatchesObj[fKey].push(moveValue.join('-').includes(fValue));
                return;
            }
            filterMatchesObj[fKey].push(moveValue === fValue);
            return;
        });

        const stringCommand = listItem.command.join('-')
        const hasFavMatch = !hasFavFilter ?
            true : listItem.favourite || !!customMoves.find(cMove => cMove.id === listItem.id && cMove.favourite);

        let hasTextMatch = textFilter?.value ? false : true;
        if (textFilter?.value) {
            hasTextMatch =
                listItem.name?.toLocaleLowerCase().includes(textFilter.value) ||
                stringCommand?.toLocaleLowerCase().includes(textFilter.value) ||
                listItem.character_tags?.join('-').toLocaleLowerCase().includes(textFilter.value) ||
                listItem.tags?.join('-').toLocaleLowerCase().includes(textFilter.value) ||
                listItem.notes?.toLocaleLowerCase().includes(textFilter.value) ||
                listItem.note?.toLocaleLowerCase().includes(textFilter.value);
        }
        const otherFiltersMatches = Object.keys(filterMatchesObj).map(key => {
            return filterMatchesObj[key].includes(true);
        })
        const hasFiltersMatch = !!otherFilters.length ? !otherFiltersMatches.includes(false) : true;
        return hasFavMatch && hasTextMatch && hasFiltersMatch;
    })
}

export default filterList;