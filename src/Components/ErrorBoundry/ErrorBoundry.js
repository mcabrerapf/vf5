import React from "react";
import { CHARACTERS_DATA_KEY } from "../../constants";
import { getFromLocal } from "../../helpers";

function ErrorFallback({ error, resetErrorBoundary }) {
    // const copyToClipboard = () => {
    //     ;
    //     console.log({allCharacterData})
    //     copyToClipboard(allCharacterData);
    // }
    const allCharacterData = getFromLocal('ALL')
    console.log(allCharacterData)
    return (
        <div role="alert">
            <h2>Oops! Something went wrong.</h2>
            <p>{error.message}</p>
            <div>{allCharacterData}</div>
            <button onClick={()=>{}}>Copy to clipboard</button>
            {/* <button onClick={resetErrorBoundary}>Try Again</button> */}
        </div>
    );
}

export default ErrorFallback;