import { getLauncher } from "../../helpers";

const sortCombos = (list) => {
    return list
        .map(listItem => listItem)
        .sort((a, b) => {
            return a.command.length - b.command.length
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
                if (!!otherFilters.find(oFilter => oFilter.name === tag)) {
                    hasTagMatch = true;
                }
            })

            launcherFilters.forEach(launcherFilter => {
                const [launcher] = getLauncher(command);
                const stringLauncher = launcher.join('');

                if (stringLauncher === launcherFilter.id) {
                    hasLauncherMatch = true;
                }
            })

            let hasCommandMatch = commandFilters.length ? false : true;
            const stringCommand = command.join('')
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