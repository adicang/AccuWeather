import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {
  geoLocationEndPoint,
  currConditionEndPoint,
  fiveDaysEndPoint
} from "./include/generateEndPoints";
import { generateObjectMain } from "./include/generateObjectMain";
import fetchWeather from "./stateManager/actions/fetchWeather";
import fetchSucceed from "./stateManager/actions/fetchSucceed";
import fetchFailed from "./stateManager/actions/fetchFailed";
import MainScreen from "./components/mainScreen/MainScreen";
import FavoritesScreen from "./components/favorites/FavoritesScreen";
import MyNav from "./components/nav/MyNav";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/semantic-ui-css/semantic.min.css";
import swal from "sweetalert";
import "./App.css";

class App extends React.Component {
  componentDidMount() {
    if (window.innerWidth > 767) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          this.getWeather(position.coords.latitude, position.coords.longitude);
          return;
        });
      }
    }
    this.getWeather(32.0853, 34.7818);
  }

  handleError(error) {
    this.props.fetchFailed();
    swal({
      title: "An error was caught!",
      text: "You may have exceeded the allowed API calls",
      icon: "error",
      button: "ok"
    });
  }

  async getWeather(lat, long) {
    //get location info
    var geoUrl = geoLocationEndPoint(lat, long);
    var geoObject = await fetch(geoUrl)
      .then(res => res.json())
      .catch(error => this.handleError(error));
    if (!geoObject) {
      return;
    } else {
      var cityKey = geoObject.Key;
      var cityName = geoObject.LocalizedName;
      var countryName = geoObject.Country.LocalizedName;

      //get city current weather
      var currWeatherUrl = currConditionEndPoint(cityKey);
      var currWeatherObj = await fetch(currWeatherUrl)
        .then(res => res.json())
        .catch(error => this.handleError(error));
      if (!currWeatherObj) {
        return;
      } else {
        //get city 5 days forecast
        var fiveDaysUrl = fiveDaysEndPoint(cityKey);
        var fiveDayObj = await fetch(fiveDaysUrl)
          .then(res => res.json())
          .catch(error => this.handleError(error));
        if (!fiveDayObj) {
          return;
        } else {
          //create new main object
          var currentWeatherObj = generateObjectMain(
            cityKey,
            cityName,
            countryName,
            currWeatherObj,
            fiveDayObj,
            false
          );
          this.props.fetchWeather(currentWeatherObj);
          this.props.fetchSucceed();
        }
      }
    }
  }

  render() {
    return (
      <Router>
        <div className="App">
          <MyNav />
          <Switch>
            <Route path="/" exact component={MainScreen}></Route>
            <Route path="/favorites" component={FavoritesScreen}></Route>
          </Switch>
          <footer></footer>
        </div>
      </Router>
    );
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchWeather: fetchWeather,
      fetchSucceed: fetchSucceed,
      fetchFailed: fetchFailed
    },
    dispatch
  );
}

export default connect(null, matchDispatchToProps)(App);
