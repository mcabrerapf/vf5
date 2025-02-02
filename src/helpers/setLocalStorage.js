import getLocalStorageSize from "./getLocalStorageSize";

const setLocalStorage  = (key, value)=> {
    const totalUsed = getLocalStorageSize();
    if(totalUsed >  5000)  {
        console.log("Local Storage is full!!!");
        return;
    }
    localStorage.setItem(key, value);
}

export default setLocalStorage;