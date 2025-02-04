import CHARACTERS_JSON from '../characters-data';

const CHARACTERS = [];
Object.keys(CHARACTERS_JSON).forEach(CHARACTER => CHARACTERS.push(CHARACTERS_JSON[CHARACTER]));
export {
    CHARACTERS_JSON
}
export default CHARACTERS;