const storageManager = (() => {
  const saveToLocalStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const loadFromLocalStorage = (key) => {
    const loadedData = localStorage.getItem(key);
    return loadedData ? JSON.parse(loadedData) : null;
  };

  return {
    saveToLocalStorage,
    loadFromLocalStorage,
  };
})();

export default storageManager;
