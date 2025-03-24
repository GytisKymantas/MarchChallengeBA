export const generateCurrentDate = () => {
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");
  const seconds = String(currentDate.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export const getLocalStorageItem = (key) => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

export const setLocalStorageItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const removeLocalStorageItem = (key) => {
  localStorage.removeItem(key);
};

export const throttleCallback = (callback, delay) => {
  let lastRefreshTime = 0;

  return (event) => {
    if (event.code === "Space") {
      event.preventDefault();

      const now = Date.now();
      if (now - lastRefreshTime >= delay) {
        callback();
        lastRefreshTime = now;
      }
    }
  };
};

export const sortByDatetime = (data) => {
  return data.sort((a, b) => {
    const dateA = new Date(a.featured_gif?.import_datetime);
    const dateB = new Date(b.featured_gif?.import_datetime);
    return dateA - dateB; // Sort in ascending order (oldest first)
  });
};
