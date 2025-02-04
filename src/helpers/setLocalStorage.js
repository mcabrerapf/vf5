import { CHARACTERS_DATA_KEY } from "../constants";
import getLocalStorageSize from "./getLocalStorageSize";

const setLocalStorage = (key, value, character, characterKey) => {
    const totalUsed = getLocalStorageSize();
    if (totalUsed > 5000) {
        console.log("Local Storage is full!!!");
        return;
    }
    switch (key) {
        case CHARACTERS_DATA_KEY:
            const localData = localStorage.getItem(CHARACTERS_DATA_KEY);
            const parsedLocalData = localData ? JSON.parse(localData): null;
            
            if (!parsedLocalData) {
                const newData = {
                    [character]: {
                        [characterKey]: value
                    }
                }
                const stringifiedData = JSON.stringify(newData);
                localStorage.setItem(key, stringifiedData);
            } else {
                const updatedData = {
                    ...parsedLocalData,
                    [character]: {
                        ...parsedLocalData[character],
                        [characterKey]: value
                    }
                }
                const stringifiedData = JSON.stringify(updatedData);
                localStorage.setItem(key, stringifiedData);
            }
            break;
        default:
            localStorage.setItem(key, value);
    }

}

export default setLocalStorage;