const initialState = {
    cityKey: 0,
    cityName: "",
    countryName: "",
    weatherCurrObject: [{}],
    weatherFiveObject: {
        Headline: {},
        DailyForecasts: []
    },
    isFavorite: false
}

const currWeather = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_WEATHER':
            return action.payload
        case 'ADD_TO_FAVORITES':
            return Object.assign({}, state, {
                isFavorite: true
            });
        case 'REMOVE_FROM_FAVORITES':
            if (state.cityKey === action.payload) {
                return Object.assign({}, state, {
                    isFavorite: false
                });
            } else {
                return state
            }
        default:
            return state
    }
}

export default currWeather;
