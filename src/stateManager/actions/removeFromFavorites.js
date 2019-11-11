const removeFromFavorites = (cityKey) => {
    return {
        type: 'REMOVE_FROM_FAVORITES',
        payload: cityKey
    }
}

export default removeFromFavorites;
