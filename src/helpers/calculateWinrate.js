const calculateWinRate = (loses, wins) => {
    if (wins + loses === 0) return 0;
    return Number(((wins / (wins + loses)) * 100).toFixed(0));
}

export default calculateWinRate;