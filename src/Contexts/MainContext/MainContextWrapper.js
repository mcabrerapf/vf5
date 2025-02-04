import React, { useState } from 'react';
import { MainContextProvider } from './MainContext';
import { CHARACTERS_DATA_KEY, SELECTED_CHARACTER_KEY, SELECTED_MOVE_CATEGORY_KEY, STRINGS } from '../../constants';
import getFromLocal from '../../helpers/getFromLocal';
import setLocalStorage from '../../helpers/setLocalStorage';


function MainContextWrapper({
  children,
}) {
  const localSelectedCharacter = getFromLocal(SELECTED_CHARACTER_KEY)
  const localFavorites = getFromLocal(
    CHARACTERS_DATA_KEY,
    localSelectedCharacter,
    STRINGS.FAV_MOVES
  );

  const [contextData, setContextData] = useState({
    selectedCharacter: localSelectedCharacter,
    favouriteMoves: localFavorites
  });

  const { selectedCharacter } = contextData;


  const setSelectedCharacter = (character) => {
    const newLocalFavs = getFromLocal(
      CHARACTERS_DATA_KEY,
      character,
      STRINGS.FAV_MOVES
    );
    setLocalStorage(SELECTED_MOVE_CATEGORY_KEY, 'all_moves');
    setLocalStorage(SELECTED_CHARACTER_KEY, character);
    setContextData({ ...contextData, selectedCharacter: character, favouriteMoves: newLocalFavs });
  }

  const setFavouriteMoves = (updatedFavorites) => {
    setLocalStorage(
      CHARACTERS_DATA_KEY,
      updatedFavorites,
      selectedCharacter,
      STRINGS.FAV_MOVES
    );
    setContextData({ ...contextData, favouriteMoves: updatedFavorites });
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
