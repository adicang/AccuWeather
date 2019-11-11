export const generateObjectMain = (cityKey, cityName, countryName, weatherCurrObject, weatherFiveObject, isFavorite) => {
    return {
        cityKey: cityKey,
        cityName: cityName,
        countryName: countryName,
        weatherCurrObject: weatherCurrObject,
        weatherFiveObject: weatherFiveObject,
        isFavorite: isFavorite
    }
}
