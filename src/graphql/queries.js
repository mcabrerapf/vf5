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
    }
  }
}
`;

export { GET_ALL_COMBOS };
