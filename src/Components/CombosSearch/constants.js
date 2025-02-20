import { COMBOS_SORT_OPTIONS } from "../../constants";

const COMBO_SEARCH_SORT_OPTIONS = [
    ...COMBOS_SORT_OPTIONS,
    {
        id: "likes",
        name: "Likes",
        short_name: "Likes",
        key: "likes",
        dir: "dsc",
        type: "number",
        order: COMBOS_SORT_OPTIONS.length
    }
];

export {
    COMBO_SEARCH_SORT_OPTIONS
}