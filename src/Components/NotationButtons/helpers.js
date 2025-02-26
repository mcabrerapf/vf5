
const getValidCategories = (characterId, categories) => {
    if (characterId === 'vanessa') return [
        {
            "id": "defensive_style",
            "name": "Defensive Style",
        },
        {
            "id": "offensive_style",
            "name": "Offensive Style",
        },
        {
            "id": "intruder_step",
            "name": "Intruder Step",
        },
        {
            "id": "intercept_position",
            "name": "Intercept Position",
        },
        {
            "id": "takedown",
            "name": "Takedown",
        },
        {
            "id": "arm_hold",
            "name": "Arm Hold",
        }
    ]
    return categories.filter(mCategory => {
        return mCategory.id !== "all_moves" &&
            !mCategory.id.includes("normal_moves") &&
            !mCategory.id.includes("jump_attacks") &&
            !mCategory.id.includes("rising_attacks") &&
            !mCategory.id.includes("reversals") &&
            !mCategory.id.includes("throws") &&
            !mCategory.id.includes("down_attack") &&
            !mCategory.id.includes("back_attacks") &&
            !mCategory.id.includes("wall_moves") &&
            !mCategory.id.includes("wall_attacks")
    })
}

export {
    getValidCategories
}