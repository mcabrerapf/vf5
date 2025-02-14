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
        const filterMatches = otherFilters.map(fOption => {
            const moveValue = listItem[fOption.key];
            if (fOption.key === 'launcher') {
                const stringifiedValue = moveValue.join('-');
                return stringifiedValue === fOption.value;
            }
            if (fOption.key === 'pseudo-launcher') {
                const pseudoLauncher = getPseudoLaunchers([listItem]);
                const stringifiedValue = pseudoLauncher.join('-');
                return stringifiedValue === fOption.value;
            }
            if (Array.isArray(moveValue)) return moveValue.join('-').includes(fOption.value);
            return moveValue === fOption.value;
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

        const hasFiltersMatch = !filterMatches.includes(false);
        return hasFavMatch && hasTextMatch && hasFiltersMatch;
    })
}

export default filterList;