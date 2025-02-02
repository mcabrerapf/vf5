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
    
    return list
        .filter(listItem => {
            const { characterTags, tags } = listItem;
            
            const stringifiedCharacters = characterTags.join(' ');
            let hasCharacterMatch = characterFilters.length ? false : true;
            let hasTagMatch = otherFilters.length ? false : true;

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
            return hasCharacterMatch && hasTagMatch;
        })

}

export {
    filterCombos,
    sortCombos
}