const buildClassName = (classes = []) => {
    if (!classes || !classes.length) return '';
    return classes
        .filter(Boolean)
        .join(' ');
}

export default buildClassName;