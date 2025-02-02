const getLocalStorageSize = () =>{
    let total = 0;

    for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
            total += (localStorage[key].length * 2); // Each character is ~2 bytes
        }
    }
    const parsedTotal  = (total / 1024).toFixed(2);
    console.log(`Local Storage Used: ${parsedTotal} KB`);
    return parsedTotal;
}

export default getLocalStorageSize;