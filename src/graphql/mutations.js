const CREATE_COMBO = `
mutation createCombo($input: CreateComboInput!) {
  createCombo(input: $input) {
      id
      lId
      characterId
      name
      character_tags
      command
      createdAt
      damage
      dislikes
      favourite
      launcher
      likes
      note
      tags
      game_version
  }
}
`;

const UPDATE_COMBO = `
mutation updateOnlineCombo($input: UpdateComboInput!) {
  updateCombo(input: $input) {
      id
      lId
      characterId
      name
      character_tags
      command
      createdAt
      damage
      dislikes
      favourite
      launcher
      likes
      note
      tags
      game_version
  }
}
`;

const DELETE_COMBO = `
mutation deleteCombo($input: DeleteComboInput!) {
  deleteCombo(input: $input) {
    id
    lId
    game_version
  }
}

`
export { CREATE_COMBO, UPDATE_COMBO, DELETE_COMBO };
