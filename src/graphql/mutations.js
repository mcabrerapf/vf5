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
mutation updateCombo($input: updateComboInput!) {
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

export { CREATE_COMBO, UPDATE_COMBO };
