import React, { useState } from 'react';
import { MainContextProvider } from './MainContext';
import {
  CHARACTERS_DATA_KEY,
  LIST_VIEW_KEY,
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
  const localListView = getFromLocal(LIST_VIEW_KEY)
  const localCustomMoves = getFromLocal(
    CHARACTERS_DATA_KEY,
    localSelectedCharacter,
    STRINGS.CUSTOM_MOVES
  );

  const [contextData, setContextData] = useState({
    selectedCharacter: localSelectedCharacter,
    customMoves: localCustomMoves,
    listView: localListView
  });

  const { selectedCharacter, listView } = contextData;


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

  const setListView = () => {
    const newListView = listView === 'F' ? 'S' : 'F';
    setLocalStorage(
      LIST_VIEW_KEY,
      newListView
    );
    setContextData({
      ...contextData,
      listView: newListView
    });
  }

  return (
    <MainContextProvider
      value={{
        ...contextData,
        setSelectedCharacter,
        setFavouriteMoves,
        setCharacterNotes,
        setListView
      }}
    >
      {children}
    </MainContextProvider>

  );
}

export default MainContextWrapper;
