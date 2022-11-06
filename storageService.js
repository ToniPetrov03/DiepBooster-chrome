const chromeStorage = chrome.storage;
const localStorage = chromeStorage.local

export const setStorage = (value) => localStorage.set(value);

export let storage = getStorage();

function getStorage() {
  return localStorage
    .get()
    .then((res) => storage = res);
}

chromeStorage.onChanged.addListener(getStorage);
