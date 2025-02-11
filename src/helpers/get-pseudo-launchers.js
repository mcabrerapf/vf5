const getPseudoLaunchers = (combos) => {
    return combos.map(combo => {
        if (!combo.launcher || !combo.launcher.length) return null;
        return combo.launcher.map(notation => {
            if (['[⊙]', '[or]', '[ch]', '[side]', '[wb]', '[w]', '[hit]'].includes(notation)) return null;
            return notation;
        })
            .filter(Boolean)
            .join('-')

    })
        .filter(Boolean);
}

export default getPseudoLaunchers; 