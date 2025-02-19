const GET_ALL_COMBOS = `
query getAllCombos($filter: ModelComboFilterInput) {
  listCombos(filter: $filter) {
    nextToken
    items {
      id
      characterId
      name
      character_tags
      command
      createdAt
      damage
      dislikes
      favourite
      lId
      launcher
      likes
      note
      tags
      game_version
    }
  }
}
`;

const GET_COMBO = `
query getCombo($id: ID!) {
  getCombo(id: $id) {
    characterId
    character_tags
    command
    createdAt
    damage
    favourite
    id
    lId
    likes
    dislikes
    launcher
    name
    note
    tags
    game_version
  }
}
`

export { GET_ALL_COMBOS, GET_COMBO };
