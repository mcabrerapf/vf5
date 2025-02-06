const getMovePropText = (value, doFrameCheck) => {
    if (doFrameCheck && typeof value === 'number') {
        return value > 0 ? `+${value}` : value;
    }
    return value;
}

export {
    getMovePropText
}