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
  }
}
`;

const UPDATE_COMBO = `
mutation updateCombo($input: UpdateComboInput!) {
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
  }
}
`;

const DELETE_COMBO = `
mutation deleteCombo($input: DeleteComboInput!) {
  deleteCombo(input: $input) {
    id
    lId
  }
}

`
export { CREATE_COMBO, UPDATE_COMBO, DELETE_COMBO };
