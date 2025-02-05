import CHARACTERS_JSON from '../characters-data';

const CHARACTERS = [];
const ATTACK_LEVELS = [];
Object.keys(CHARACTERS_JSON)
    .forEach(CHARACTER => {
        const { attack_levels } = CHARACTERS_JSON[CHARACTER];
        attack_levels.forEach(attack_level => {
            if (!!ATTACK_LEVELS.find(A_L => A_L.id === attack_level.id)) return;
            ATTACK_LEVELS.push({ id: attack_level.id, name: attack_level.name })
        })
        
        CHARACTERS.push(CHARACTERS_JSON[CHARACTER])
    });

export {
    ATTACK_LEVELS,
    CHARACTERS_JSON
}
export default CHARACTERS;