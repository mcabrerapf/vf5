import React from "react";
import { ALL_DATA_KEY } from "../../constants";
import { getFromLocal } from "../../helpers";

function ErrorFallback({ error, resetErrorBoundary }) {
    const copyToClipboard = () => {
        const allCharacterData = getFromLocal(ALL_DATA_KEY);
        if (!allCharacterData) return;
        copyToClipboard(allCharacterData);
    }
    return (
        <div role="alert">
            <h2>Oops! Something went wrong.</h2>
            <p>{error.message}</p>
            <button onClick={copyToClipboard}>Copy to clipboard</button>
            <button onClick={resetErrorBoundary}>Try Again</button>
        </div>
    );
}

export default ErrorFallback;