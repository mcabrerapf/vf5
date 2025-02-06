import React, { useState } from 'react';
import { MainContextProvider } from './MainContext';
import { CHARACTERS_DATA_KEY, SELECTED_CHARACTER_KEY, SELECTED_MOVE_CATEGORY_KEY, STRINGS } from '../../constants';
import getFromLocal from '../../helpers/getFromLocal';
import setLocalStorage from '../../helpers/setLocalStorage';


function MainContextWrapper({
  children,
}) {
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
      character,
      STRINGS.CUSTOM_MOVES
    );
    setLocalStorage(SELECTED_MOVE_CATEGORY_KEY, 'all_moves');
    setLocalStorage(SELECTED_CHARACTER_KEY, character);
    setContextData({
      ...contextData,
      selectedCharacter: character,
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
  
  return (
    <MainContextProvider
      value={{
        ...contextData,
        setSelectedCharacter,
        setFavouriteMoves
      }}
    >
      {children}
    </MainContextProvider>

  );
}

export default MainContextWrapper;
