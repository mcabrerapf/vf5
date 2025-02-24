import { STRINGS } from "../../../constants"

const getInitialCharacterMatchupView =(hasNotes, hasMoves, hasCombos)=> {
    if(hasNotes) return STRINGS.NOTES;
    if(hasCombos) return STRINGS.COMBOS;
    if(hasMoves) return STRINGS.MOVES;
    return STRINGS.NOTES;
}

export {
    getInitialCharacterMatchupView
}