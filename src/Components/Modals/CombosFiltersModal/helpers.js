import { getLauncher } from "../../../helpers";

const getLaunchers = (combos) => {
    if (!combos || !combos.length) return [];
    const stringLaunchers = combos.map(combo => {
        const [launcher] = getLauncher(combo.command);
        return launcher.join('-');
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