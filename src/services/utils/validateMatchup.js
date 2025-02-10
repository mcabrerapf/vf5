const validateMatchup = (matchup) => {
    const { id, name,loses, wins, total, win_rate } = matchup;
    const parsesdTotal = total ? Number(total) : loses + wins;
    return {
        id: id,
        name: name,
        loses: Number(loses),
        wins: Number(wins),
        total: parsesdTotal,
        win_rate: parsesdTotal === 0 || !parsesdTotal ? 0 : Number(win_rate),
    };
}

export default validateMatchup;