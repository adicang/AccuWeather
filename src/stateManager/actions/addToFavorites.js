const addToFavorites = (favoriteObj) => {
    return {
        type: 'ADD_TO_FAVORITES',
        payload: favoriteObj
    }
}

export default addToFavorites;
