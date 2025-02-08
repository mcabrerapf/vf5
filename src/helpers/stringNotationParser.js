import stringNotationSpliter from "./stringNotationSpliter";
import stringToNotation from "./stringToNotation";

const stringNotationParser = (string) => {
    if (!string || typeof string !== 'string') return string;
    const splitString = stringNotationSpliter(string);
    const withNotation = splitString.map(ele => stringToNotation(ele));
    if (!withNotation || !withNotation.length) return '';
    return withNotation;
}

export default stringNotationParser;