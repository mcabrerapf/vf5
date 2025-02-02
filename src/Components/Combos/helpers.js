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
    
    return list
        .filter(listItem => {

            const { characterTags } = listItem;

            const stringifiedCharacters = characterTags.join(' ');
            let hasCharacterMatch = characterFilters.length ? false : true;
            
            characterFilters.forEach(filter => {
                if (stringifiedCharacters.includes(filter)) {
                    hasCharacterMatch = true;
                }
            })
            return hasCharacterMatch;
        })

}

export {
    filterCombos,
    sortCombos
}