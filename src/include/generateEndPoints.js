const apiKey = "mDraqEik5YWHwTHYQB4hQohB9GqEEZsa";

export const geoLocationEndPoint = (lat,long) => {
    return "https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=" + apiKey + "&q=" + lat + "%2C" + long;
}

export const autoCompleteEndPoint = (q) => {
    return "https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=" + apiKey + "&q="+q;
}

export const currConditionEndPoint = (cityKey) => {
    return "https://dataservice.accuweather.com/currentconditions/v1/" + cityKey + "?apikey=" + apiKey;
}

export const fiveDaysEndPoint = (cityKey) => {
    return "https://dataservice.accuweather.com/forecasts/v1/daily/5day/" + cityKey + "?apikey=" + apiKey;
}
