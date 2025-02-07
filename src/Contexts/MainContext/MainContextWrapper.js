import React, { useState } from 'react';
import { MainContextProvider } from './MainContext';
import {
  CHARACTERS_DATA_KEY,
  SELECTED_CHARACTER_KEY,
  SELECTED_MOVE_CATEGORY_KEY,
  STRINGS
} from '../../constants';
import getFromLocal from '../../helpers/getFromLocal';
import setLocalStorage from '../../helpers/setLocalStorage';


const MainContextWrapper = ({
  children,
}) => {
  const localSelectedCharacter = getFromLocal(SELECTED_CHARACTER_KEY)
  const localCustomMoves = getFromLocal(
    CHARACTERS_DATA_KEY,
    localSelectedCharacter,
    STRINGS.CUSTOM_MOVES
  );

  const [contextData, setContextData] = useState({
    selectedCharacter: localSelectedCharacter,
    customMoves: localCustomMoves
  });

  const { selectedCharacter } = contextData;


  const setSelectedCharacter = (character) => {
    const newCustomMoves = getFromLocal(
      CHARACTERS_DATA_KEY,
      character.id,
      STRINGS.CUSTOM_MOVES
    );

    setLocalStorage(SELECTED_MOVE_CATEGORY_KEY, 'all_moves');
    setLocalStorage(SELECTED_CHARACTER_KEY, character.id);
    setContextData({
      ...contextData,
      selectedCharacter: character.id,
      customMoves: newCustomMoves
    });
  }

  const setFavouriteMoves = (updatedFavorites) => {
    setLocalStorage(
      CHARACTERS_DATA_KEY,
      updatedFavorites,
      selectedCharacter,
      STRINGS.CUSTOM_MOVES
    );
    setContextData({ ...contextData, customMoves: updatedFavorites });
  }

  const setCharacterNotes = (updatedNotes) => {
    setLocalStorage(
      CHARACTERS_DATA_KEY,
      updatedNotes,
      selectedCharacter,
      STRINGS.CUSTOM_MOVES
    );
    setContextData({ ...contextData, customMoves: updatedNotes });
  }

  return (
    <MainContextProvider
      value={{
        ...contextData,
        setSelectedCharacter,
        setFavouriteMoves,
        setCharacterNotes
      }}
    >
      {children}
    </MainContextProvider>

  );
}

export default MainContextWrapper;
