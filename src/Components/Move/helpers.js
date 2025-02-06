const getMovePropText = (value, doFrameCheck) => {
    if (doFrameCheck && typeof value === 'number') {
        return value > 0 ? `+${value}` : value;
    }
    return value;
}
const getDodgeValue = (value) => {
    switch (value) {
        case 'Front':
            return 'F';
        case 'Back':
            return 'B';

        default:
            return value;
    }
}
export {
    getDodgeValue,
    getMovePropText
}