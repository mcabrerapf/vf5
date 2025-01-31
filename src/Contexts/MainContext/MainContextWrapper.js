import React, { useEffect, useState } from 'react';
import { MainContextProvider } from './MainContext';
import { B_URL, CHARACTERS } from '../../constants';


function MainContextWrapper({
  children,
}) {
  const [contextData, setContextData] = useState({
    characters: {}, 
    selectedCharacter: CHARACTERS[0][0]
  });
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    async function init() {
      const promises = CHARACTERS.map(character => fetch(`${B_URL}/vf/char/${character[0]}`));
      const characters = {};
      await Promise
        .all(promises)
        .then(results => {
          results.forEach((res, i) => {
            res.json()
              .then(json => {
                characters[CHARACTERS[i][0]] = json;
              })
          })
          setContextData({ characters, selectedCharacter: CHARACTERS[0][0] })
          setIsLoading(false)
        })
        .catch(error => {
          console.error('One of the promises failed:', error);
          setContextData({ characters: {}, selectedCharacter: CHARACTERS[0][0] });
          setIsLoading(false);
          setErrorMessage(error);
        });

    }

    init();
  },
    [])

  const setSelectedCharacter = (character) => {
    setContextData({ ...contextData, selectedCharacter: character });
  }

  if (isLoading) return null;
  if (errorMessage) return <div>Oops</div>

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
