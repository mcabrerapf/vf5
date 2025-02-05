function getLocalStorageSize(key) {
    if (!key) return 'No data found';
    const item = localStorage.getItem(key);
    if (!item) return 'No data found';

    const sizeInBytes = new Blob([item]).size;
    const sizeInKb = (sizeInBytes / 1024).toFixed(2)
    return `${sizeInKb}Kb`;
}

console.log(getLocalStorageSize("myKey"));


export default getLocalStorageSize;