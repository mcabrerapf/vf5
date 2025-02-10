const validateCustomMove = (customMove) => {
    return {
        id: customMove.id,
        favourite: customMove.favourite || false,
        note: customMove.note || ''
    }
}

export default validateCustomMove;