const validateCustomMove = (customMove) => {
    if(!customMove) return null;
    if(!customMove.favourite && !customMove.note) return null;
    
    return {
        id: customMove.id,
        favourite: customMove.favourite || false,
        note: customMove.note || ''
    }
}

export default validateCustomMove;