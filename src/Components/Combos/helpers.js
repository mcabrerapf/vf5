import { getLauncher } from "../../helpers";

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
            
            if (sortKey === 'launcher') {
                const firstLauncher = sortDir === 'asc' ?
                    itemA.command : itemB.command;
                const secondLauncher = sortDir === 'asc' ?
                    itemB.command : itemA.command;
                const [launcherA] = getLauncher(firstLauncher);
                const [launcherB] = getLauncher(secondLauncher);

                const stringLauncherA = launcherA.join('');
                const stringLauncherB = launcherB.join('');
                
                return stringLauncherA.localeCompare(stringLauncherB)
            }

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
    const characterFilters = filters
        .filter(filter => filter.prefix === 'character')
    const otherFilters = filters
        .filter(filter => filter.prefix === 'other')

    const launcherFilters = filters
        .filter(filter => filter.prefix === 'launcher')

    const commandFilters = filters
        .filter(filter => filter.prefix === 'command')

    const hasFavFilter = filters.find(filter => filter.id === 'fav')

    return list
        .filter(listItem => {
            const { characterTags, tags, command, favourite } = listItem;
            const stringifiedCharacters = characterTags.join(' ');

            let hasCharacterMatch = characterFilters.length ? false : true;
            let hasTagMatch = otherFilters.length ? false : true;
            let hasLauncherMatch = launcherFilters.length ? false : true;

            characterFilters.forEach(filter => {
                if (stringifiedCharacters.includes(filter.id)) {
                    hasCharacterMatch = true;
                }
            })

            tags.forEach(tag => {
                if (!!otherFilters.find(oFilter => oFilter.id === tag)) {
                    hasTagMatch = true;
                }
            })

            launcherFilters.forEach(launcherFilter => {
                const [launcher] = getLauncher(command);
                const stringLauncher = launcher.join('-');

                if (stringLauncher === launcherFilter.id) {
                    hasLauncherMatch = true;
                }
            })

            let hasCommandMatch = commandFilters.length ? false : true;
            const stringCommand = command.join('-')
            commandFilters.forEach(commandFilter => {
                if (stringCommand.includes(commandFilter.id)) {
                    hasCommandMatch = true;
                }
            })

            const hasFavMatch = hasFavFilter ? favourite : true
            return hasCharacterMatch && hasTagMatch && hasLauncherMatch && hasCommandMatch && hasFavMatch;
        })

}

export {
    filterCombos,
    sortCombos
}