import ALL_CHARACTERS from '../characters-data';

const CHARACTERS = [];
Object.keys(ALL_CHARACTERS).forEach(CHARACTER => CHARACTERS.push(ALL_CHARACTERS[CHARACTER]))

export default CHARACTERS;