import React, { Component } from "react";
import { Card, Col, ListGroup } from "react-bootstrap";
import { generateIconUrl } from "../../include/generateIconUrl";
import "./ForecastDayCard.css";

export default class ForecastDayCard extends Component {
  render() {
    return (
      <Col sm>
        <a
          href={this.props.dayObject.Link}
          target="_blank"
          className="link-to-weather"
        >
          <Card className="day-card">
            <ListGroup variant="flush">
              <ListGroup.Item className="header-day">
                <h2>{this.getDay(this.props.dayObject.EpochDate)}</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <img
                  className="img-day-forecast"
                  src={generateIconUrl(this.props.dayObject.Day.Icon)}
                />
                <p className="day-temp">
                  {this.props.temperatureUnit === false
                    ? this.fromFToC(
                        this.props.dayObject.Temperature.Maximum.Value
                      ) + "° "
                    : this.props.dayObject.Temperature.Maximum.Value + "° "}
                  |
                  {this.props.temperatureUnit === false
                    ? " " +
                      this.fromFToC(
                        this.props.dayObject.Temperature.Minimum.Value
                      ) +
                      "° "
                    : " " +
                      this.props.dayObject.Temperature.Minimum.Value +
                      "° "}
                </p>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </a>
      </Col>
    );
  }

  getDay(epochDate) {
    var date = new Date(epochDate * 1000).toLocaleDateString("en-us", {
      weekday: "long"
    });
    return date;
  }

  fromFToC(temp) {
    return (((temp - 32) * 5) / 9).toFixed(1);
  }
}
