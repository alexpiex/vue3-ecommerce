// Add a product to a localStorage
export const addFavoriteToLocalStorage = (product) => {
    const favorites = getFavoritesFromLocalStorage();
    if (!favorites.some((p) => p._id === product._id)) {
        favorites.push(product);
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }
};

// Remove  product from a localStorage
export const removeFavoriteFromLocalStorage = (productId) => {
    const favorites = getFavoritesFromLocalStorage();
    const updateFavorites = favorites.filter(
        (product) => product._id !== productId
    );

    localStorage.setItem("favorites", JSON.stringify(updateFavorites));
};

// Retrive favorites from a localStorage
export const getFavoritesFromLocalStorage = () => {
    const favoritesJSON = localStorage.getItem("favorites");
    return favoritesJSON ? JSON.parse(favoritesJSON) : [];
};

export const getItem = (key) => {
    try {
        return JSON.parse(localStorage.getItem(key));
    } catch (e) {
        console.error('Error in getting data from localStorage', e);
        return null;
    }
};

export const setItem = (key, data) => {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
        console.error('Error in setting data to localStorage', e);
    }
};

export function localGet (key) {
    try {
        const value = window.localStorage.getItem(key)
        return JSON.parse(window.localStorage.getItem(key))
    } catch (error) {
        return value
    }
}

export function localSet (key, value) {
    window.localStorage.setItem(key, JSON.stringify(value))
}

export function localRemove (key) {
    window.localStorage.removeItem(key)
}