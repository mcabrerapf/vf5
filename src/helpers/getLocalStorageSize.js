const getLocalStorageSize = () =>{
    let total = 0;

    for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
            total += (localStorage[key].length * 2);
        }
    }
    // LOCAL STORAGE IN KB
    const parsedTotal  = (total / 1024).toFixed(2);
    
    return parsedTotal;
}

export default getLocalStorageSize;