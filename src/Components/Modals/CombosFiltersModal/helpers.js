
const getLaunchers = (combos) => {
    if (!combos || !combos.length) return [];
    const stringLaunchers = combos.map(combo => {
        return combo.launcher.join('-');
    });
    const uniqueLaunchers = [
        ...new Set(stringLaunchers)
    ]
        .map(launcher => launcher.split('-'));

    return uniqueLaunchers
}

export {
    getLaunchers
}