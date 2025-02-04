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
        .filter(filter => filter.includes('character/'))
        .map(filter => filter.split('character/')[1]);
    const otherFilters = filters
        .filter(filter => filter.includes('other/'))
        .map(filter => filter.split('other/')[1]);
    const launcherFilters = filters
        .filter(filter => filter.includes('launcher/'))
        .map(filter => filter.split('launcher/')[1]);
    const commandFilters = filters
        .filter(filter => filter.includes('command/'))
        .map(command => command.split('/')[1]);

    return list
        .filter(listItem => {
            const { characterTags, tags, command } = listItem;
            const stringifiedCharacters = characterTags.join(' ');

            let hasCharacterMatch = characterFilters.length ? false : true;
            let hasTagMatch = otherFilters.length ? false : true;
            let hasLauncherMatch = launcherFilters.length ? false : true;

            characterFilters.forEach(filter => {
                if (stringifiedCharacters.includes(filter)) {
                    hasCharacterMatch = true;
                }
            })

            tags.forEach(tag => {
                if (!!otherFilters.includes(tag)) {
                    hasTagMatch = true;
                }
            })

            launcherFilters.forEach(launcherFilter => {
                const [launcher] = getLauncher(command);
                const stringLauncher = launcher.join('');

                if (stringLauncher === launcherFilter) {
                    hasLauncherMatch = true;
                }
            })

            let hasCommandMatch = commandFilters.length ? false : true;
            const stringCommand = command.join('')
            commandFilters.forEach(commandFilter => {
                if (stringCommand.includes(commandFilter)) {
                    hasCommandMatch = true;
                }
            })
            return hasCharacterMatch && hasTagMatch && hasLauncherMatch && hasCommandMatch;
        })

}

export {
    filterCombos,
    sortCombos
}