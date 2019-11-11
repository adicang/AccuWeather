import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import FavoriteItem from "./FavoriteItem";

import { Container, Row, Button } from "react-bootstrap";

class FavoritesScreen extends Component {
  render() {
    return (
      <Container className="margin-from-bottom">
        {this.props.favoritesArray.length !== 0 ? (
          <Row>
            {this.props.favoritesArray.map(fav => (
              <FavoriteItem
                key={fav.cityKey}
                cityKey={fav.cityKey}
                cityName={fav.cityName}
                countryName={fav.countryName}
                weatherObject={fav.weatherObject}
                forecastObject={fav.fiveDayForecastObject}
                mainWeatherDisplayed={this.props.mainWeatherDisplayed}
                temperatureUnit={this.props.temperatureUnit}
              />
            ))}
          </Row>
        ) : (
          <div class="no-fav-wrapper">
            <h1 className="no-fav-header">No Items On Favorites</h1>
            <Link to="/">
              <Button className="no-fav-button">
                Click here and search new favorites cities
              </Button>
            </Link>
          </div>
        )}
      </Container>
    );
  }
}

function mapStateToProps(state) {
  const favorites = state.favorites;
  const mainWeatherDisplayed = state.currWeather.cityKey;
  const tempUnit = state.tempUnit;
  return {
    mainWeatherDisplayed: mainWeatherDisplayed,
    favoritesArray: favorites,
    temperatureUnit: tempUnit
  };
}

export default connect(mapStateToProps, null)(FavoritesScreen);
