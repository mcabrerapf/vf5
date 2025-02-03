import { getLauncher } from "../../../helpers";

const getLaunchers = (combos) => {
    return combos.map(combo => {
        const [launcher] = getLauncher(combo.command);
        return launcher;
    })
}

export {
    getLaunchers
}