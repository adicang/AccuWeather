import { combineReducers } from 'redux';
import currWeather from './fetchedWeatherReducer';
import favorites from './favoritesReducer';
import tempUnit from './temperatureReducer';
import fetchState from './fetchReducer';

const allReducers = combineReducers({
    currWeather: currWeather,
    favorites: favorites,
    tempUnit: tempUnit,
    fetchState: fetchState
})

export default allReducers;
