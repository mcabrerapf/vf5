import React, { useEffect, useState } from 'react';
import { MainContextProvider } from './MainContext';
import { CHARACTERS, LOCAL_KEYS } from '../../constants';


function MainContextWrapper({
  children,
}) {
  const [contextData, setContextData] = useState({});
  // const [isLoading, setIsLoading] = useState(true);
  // const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    async function init() {
      const selectedCharacterFromLocal = localStorage.getItem(LOCAL_KEYS.SELECTED_CHARACTER);
      const isValidCharacter = !!CHARACTERS
        .find(character => character.id === selectedCharacterFromLocal);
      if (!isValidCharacter) localStorage.setItem(LOCAL_KEYS.SELECTED_CHARACTER, CHARACTERS[0].id);
      const selectedChar = isValidCharacter ? selectedCharacterFromLocal : CHARACTERS[0].id;
      // const promises = CHARACTERS.map(character => fetch(`${B_URL}/vf/char/${character[0]}`));
      // const characters = {};

      // await Promise
      //   .all(promises)
      //   .then(results => {
      //     results.forEach((res, i) => {
      //       res.json()
      //         .then(json => {
      //           characters[CHARACTERS[i][0]] = json;
      //         })
      //     })
      //     setContextData({ characters, selectedCharacter: selectedChar })
      //     setIsLoading(false)
      //   })
      //   .catch(error => {
      //     console.error('One of the promises failed:', error);
      //     setContextData({ characters: {}, selectedCharacter: selectedChar });
      //     setIsLoading(false);
      //     setErrorMessage(error);
      //   });
      setContextData({ selectedCharacter: selectedChar })

    }

    init();
  },
    []
  )

  const setSelectedCharacter = (character) => {
    localStorage.setItem(LOCAL_KEYS.SELECTED_CHARACTER, character);
    setContextData({ ...contextData, selectedCharacter: character });
  }

  if (!contextData.selectedCharacter) return null;
  // if (errorMessage) return <div>Oops</div>

  return (
    <MainContextProvider
      value={{
        ...contextData,
        setSelectedCharacter
      }}
    >
      {children}
    </MainContextProvider>

  );
}

export default MainContextWrapper;
