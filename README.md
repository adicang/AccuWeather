

## AccuWeather React Project

##### **IMPORTANT:** Please notice that the Accuweather API has only 50 calls. 

## App architecture seperated by components
The following tree shows the structure of the components in the whole app.

- App
  - Router
    - MyNav
	- Switch
	  - MainScreen (Route)
	    - CurrWeatherContainer
		    - AddToFavorites
			  - ForecastDayCard
		  - SearchBar
	  - FavoritesScreen (Route)
	      - FavoriteItem


## Tech stack
1. React
2. Redux (react-redux)
3. Semantic-UI for react
4. React - Bootstrap 4

##### Semantic-UI for react
I used it for the whole Grid system of the app and other UI elements.

##### React - Bootstrap 4
Used for creating Responsive navbar and UI layout.

##### Redux
The state manager has been used for managing globaly the whole state of the app.
The state contains:
1. **currWeather** object containing all of the relevant information about the weather currently displaying on the main page.
2. **favorites** array containing all the favorites weathers added by the users. 
3. **tempUnit** is a boolean value and it will determinate the temperature unit accross the whole app.
    *True*: Farenheit.
    *False*: Celsius
4. **fetchState** is going to show the state of the fetch calls to the Accuweather API. 
Posible values are: *FETCHING* | *SUCCESS* | *FAILED*.

## Redux reducers and actions
### Actions:
- **fetchWeather.js**: This action will send a new object of the current weather that was fetched.
- **addToFavorites.js**: This action will send a weather object given as parameter.
- **removeFromFavorites.js**: This action will remove a favorite weather which equals the weather id passed as parameter.
- **temperatureUnit.js**: This action will toggle the temperature unit
- **fetchSuccessed.js/fetchFailed**: Both actions will determine the state of the api on the app.

### Reducers:
- **fetchedWeatherReducer.js**: This reducer will handle the *FETCH_MAIN_WEATHER*, *ADD_FAVORITE* and *REMOVE_FAVORITE* actions.
- **favoritesReducer.js**: This reducer will handle the *FETCH_FAVORITES*, *ADD_FAVORITE* and *REMOVE_FAVORITE* actions.
- **temperatureReducer.js**: This reduce will handle the *TEMPERATURE_UNIT* action.
- **fetchReducer.js**: This reduce will handle the *FETCH_FAILED*  and *FETCH_SUCCESSED*  actions.

## External Api's
- Accuweather API
- Geolocation API
- Semantic UI
- Bootstrap
- react-loader-spinner: For making a spinner when loading updated list.
- react-redux
- redux
- react-reveal
- sweetalert

## Device adaptation
The app is adapted for large screen size as well as for mobile screen size.

## Things to improve in the app
- The project do not include local storage part.
- I could have made an auto refresh function of the main weather and the favorite weathers for refreshing each x period of time the current weather.
- In mobile, the navbar is not clossing when we click on any item. 

## Web URL
https://adicang.github.io/weather-app-react/


