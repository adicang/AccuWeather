import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { createHashHistory } from "history";

import removeFromFavorites from "../../stateManager/actions/removeFromFavorites";
import fetchWeather from "../../stateManager/actions/fetchWeather";
import { generateObjectMain } from "../../include/generateObjectMain";
import { generateIconUrl } from "../../include/generateIconUrl";
import { generateTempWithUnit } from "../../include/generateTempWithUnit";

import swal from "sweetalert";
import { Col, Card, ListGroup, Button, Image } from "react-bootstrap";
import ReactTooltip from "react-tooltip";
import Fade from "react-reveal/Fade";
import "./FavoriteItem.css";

class FavoriteItem extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.removeCardFromFavorites = this.removeCardFromFavorites.bind(this);
    this.showDetailsOnHomePage = this.showDetailsOnHomePage.bind(this);
  }

  removeCardFromFavorites(key) {
    this.props.removeFromFavorites(key);
  }

  showDetailsOnHomePage(key) {
    if (this.props.mainWeatherDisplayed === key) {
      createHashHistory().goBack();
    } else {
      this.props.fetchWeather(
        generateObjectMain(
          this.props.cityKey,
          this.props.cityName,
          this.props.countryName,
          [this.props.weatherObject],
          this.props.forecastObject,
          true
        )
      );
      createHashHistory().goBack();
    }
  }

  handleClick() {
    swal({
      title: "Pay Attention!",
      text: "Once you remove the item, it will be permanently removed from the favorites list",
      icon: "warning",
      buttons: true
    }).then(willDelete => {
      if (willDelete) {
        this.removeCardFromFavorites(this.props.cityKey);
      }
    });
  }

  render() {
    return (
      <Col sm>
        <Fade>
          <Card className="favorite-card">
            <ListGroup variant="flush">
              <button
                onClick={() => this.showDetailsOnHomePage(this.props.cityKey)}
                className="button-see-full-weather"
                data-tip="Click to see full forecast"
              >
                <ListGroup.Item className="fav-card-city-name">
                  <h2 className="fav-city-name">{this.props.cityName}</h2>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Image
                    src={generateIconUrl(this.props.weatherObject.WeatherIcon)}
                    className="fav-image"
                  />
                  <h2 className="fav-temp">
                    {generateTempWithUnit(
                      this.props.weatherObject,
                      this.props.temperatureUnit
                    )}
                  </h2>
                  <p className="weather-text">
                    {this.props.weatherObject.WeatherText}
                  </p>
                </ListGroup.Item>
              </button>
              <ReactTooltip
                place="top"
                type="info"
                effect="solid"
                className="full-weather-tooltip"
                afterShow={() => {
                  setTimeout(ReactTooltip.hide, 8000);
                }}
              />
              <ListGroup.Item>
                <Button
                  variant="danger"
                  onClick={this.handleClick}
                  className="remove-button"
                >
                  Remove From Favorites
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Fade>
      </Col>
    );
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchWeather: fetchWeather,
      removeFromFavorites: removeFromFavorites
    },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    texto: state.currWeather.cityName
  };
}

export default connect(mapStateToProps, matchDispatchToProps)(FavoriteItem);
