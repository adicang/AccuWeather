import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { generateIconUrl } from "../../include/generateIconUrl";
import { generateTempWithUnit } from "../../include/generateTempWithUnit";
import ForecastDayCard from "./ForecastDayCard";
import removeFromFavorites from "../../stateManager/actions/removeFromFavorites";
import addToFavorites from "../../stateManager/actions/addToFavorites";
import AddToFavorites from "./AddToFavorites";

import "./CurrWeatherContainer.css";
import { Row, Col, Card, ListGroup, Container, Image } from "react-bootstrap";
import Bounce from "react-reveal/Bounce";
import Loader from "react-loader-spinner";

class CurrWeatherContainer extends Component {

  toggleFavorites() {
    if (this.props.isFavorite) {
      this.props.removeFromFavorites(this.props.cityKey);
    } else {
      this.props.addToFavorites({
        cityKey: this.props.cityKey,
        cityName: this.props.cityName,
        countryName: this.props.countryName,
        weatherObject: this.props.weatherObject,
        fiveDayForecastObject: this.props.fiveDayForecastObject
      });
    }
  }

  renderLoader() {
    return (
      <Loader
        type="TailSpin"
        color="black"
        className="loader-spinner"
        height={80}
        width={80}
      />
    );
  }

  renderMessageFailed() {
    return (
      <div class="no-fav-wrapper">
        <h1 className="no-fav-header">Could Not Fetch Weather :(</h1>
      </div>
    );
  }

  renderMainContainer() {
    return (
      <Container className="main-container">
        <Bounce top>
          <Card className="main-card">
            <ListGroup variant="flush">
              <ListGroup.Item className="no-border">
                <Row className="top-row">
                  <Col sm className="city-and-country">
                    <p>
                      <b>{this.props.cityName}</b>
                      <br />
                      {this.props.countryName}
                      <br />
                      {this.props.weatherObject.LocalObservationDateTime.substring(
                        0,
                        10
                      )}
                    </p>
                  </Col>
                  <Col sm className="weather-center">
                    <a target="_blank" href={this.props.weatherObject.Link}>
                      <Image
                        className="weather-icon"
                        src={generateIconUrl(
                          this.props.weatherObject.WeatherIcon
                        )}
                      />
                      <p className="temp-and-text">
                        <b>
                          {generateTempWithUnit(
                            this.props.weatherObject,
                            this.props.tempUnit
                          )}
                        </b>
                        <br />
                        {this.props.weatherObject.WeatherText}
                      </p>
                    </a>
                  </Col>
                  <Col sm className="add-favorites">
                    <AddToFavorites
                      isFavorite={this.props.isFavorite}
                      toggleFavorites={() => this.toggleFavorites()}
                    />
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item className="no-border">
                <Row>
                  {this.props.fiveDayForecastObject.DailyForecasts.map(day => (
                    <ForecastDayCard
                      key={day.EpochDate}
                      dayObject={day}
                      temperatureUnit={this.props.tempUnit}
                    />
                  ))}
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Bounce>
      </Container>
    );
  }

  render() {
    return (
      <Row>
        {this.props.fetchState === "fetching"
          ? this.renderLoader()
          : this.props.fetchState === "failed"
          ? this.renderMessageFailed()
          : this.renderMainContainer()}
      </Row>
    );
  }
}

function mapStateToProps(state) {
  const currWeatherObj = state.currWeather;
  const tempUnit = state.tempUnit;
  return {
    cityKey: currWeatherObj.cityKey,
    cityName: currWeatherObj.cityName,
    countryName: currWeatherObj.countryName,
    weatherObject: currWeatherObj.weatherCurrObject[0],
    isFavorite: currWeatherObj.isFavorite,
    fiveDayForecastObject: currWeatherObj.weatherFiveObject,
    tempUnit: tempUnit,
    fetchState: state.fetchState
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addToFavorites: addToFavorites,
      removeFromFavorites: removeFromFavorites
    },
    dispatch
  );
}

export default connect(mapStateToProps,matchDispatchToProps)(CurrWeatherContainer);
