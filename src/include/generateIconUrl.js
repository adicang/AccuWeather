export const generateIconUrl = (weatherIconNumber) => {
    if(weatherIconNumber < 10){
        return "https://developer.accuweather.com/sites/default/files/0" + weatherIconNumber + "-s.png";
    } else{
        return "https://developer.accuweather.com/sites/default/files/" + weatherIconNumber + "-s.png";
    }
}
