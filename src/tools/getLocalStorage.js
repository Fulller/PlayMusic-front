function getLocalStorage(title) {
    let result = localStorage.getItem(title);
    if (result) {
        return JSON.parse(result);
    } else {
        return {};
    }
}
export default getLocalStorage;
