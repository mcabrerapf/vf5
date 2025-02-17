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

export { CREATE_COMBO };
