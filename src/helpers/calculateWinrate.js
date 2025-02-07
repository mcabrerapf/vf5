const calculateWinRate = (loses, wins) => {
    if (wins + loses === 0) return 100;
    return ((wins / (wins + loses)) * 100).toFixed(0);
}

export default calculateWinRate;