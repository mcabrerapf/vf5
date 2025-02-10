const getLauncher = (command) => {
    if (!command.length) return [
        ['⊙'],
        []
    ]
    let launcherEnd = 0;
    command.forEach((notation, index) => {
        if (!launcherEnd && notation === '⊙') {
            launcherEnd = index;
        }
    })
    
    if (!launcherEnd) return [
        command,
        []
    ]

    return [
        command.slice(0, launcherEnd),
        command.slice(launcherEnd + 1),
    ];
}

export default getLauncher;