const stringToNotation = (string) => {
    if (string[0] !== '[' && string[string.length - 1] !== ']') return string;
    const upperString = string.toLocaleUpperCase();
    let result = [];
    let chars = upperString.slice(1, -1).split("");

    for (let i = 0; i < chars.length; i++) {
        if (chars[i] === "_") {
            result[result.length - 1] = `${result[result.length - 1]}_`;
        } else {
            result.push(`${chars[i]}`);
        }
    }

    return result.map(ele => `[${ele.replace('.', '⊙')}]`);
}

export default stringToNotation;