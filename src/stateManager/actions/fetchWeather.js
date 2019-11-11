const fetchWeather = (weatherObj) => {
    return {
        type: 'FETCH_WEATHER',
        payload: weatherObj
    }
}

export default fetchWeather;
