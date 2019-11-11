import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {
  autoCompleteEndPoint,
  currConditionEndPoint,
  fiveDaysEndPoint
} from "../../include/generateEndPoints";
import { generateObjectMain } from "../../include/generateObjectMain";
import fetchWeather from "../../stateManager/actions/fetchWeather";

import { Dropdown } from "semantic-ui-react";
import { Container } from "react-bootstrap";
import swal from "sweetalert";
import { animateScroll as scroll } from "react-scroll";
import "./SearchBar.css";
import Fade from "react-reveal/Fade";

class SearchBar extends Component {
  constructor() {
    super();

    this.state = {
      locations: [],
      autocomplete: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  handleChange(e, { value }) {
    this.updateWeather(value);
    if (window.innerWidth <= 767) {
      scroll.scrollToTop();
    }
  }

  async updateWeather(key) {
    //get current conditions info
    var weatherObj = await fetch(currConditionEndPoint(key))
      .then(res => res.json())
      .catch(error =>
        swal({
          title: "An error was caught!",
          text: "You may have exceeded the allowed API calls",
          icon: "error",
          button: "ok"
        })
      );

    //get five days forecast
    var fiveDayObj = await fetch(fiveDaysEndPoint(key))
      .then(res => res.json())
      .catch(error =>
        swal({
          title: "An error was caught!",
          text: "You may have exceeded the allowed API calls",
          icon: "error",
          button: "ok"
        })
      );

    //get location info by key
    var locationObj = this.state.locations.filter(
      location => location.Key === key
    );

    //create new weather object
    var currWeatherObj = generateObjectMain(
      key,
      locationObj[0].LocalizedName,
      locationObj[0].Country.LocalizedName,
      weatherObj,
      fiveDayObj,
      false
    );

    this.props.fetchWeather(currWeatherObj);
  }

  handleSearchChange(e, { searchQuery }) {
    if (searchQuery !== "") {
      if (!/^[A-Za-z ]+$/.test(searchQuery)) {
        swal({
          title: "Wrong Input",
          text: "Please write only english letters",
          icon: "error",
          button: "ok"
        });
      } else {
        var autoCompleteUrl = autoCompleteEndPoint(searchQuery);
        fetch(autoCompleteUrl)
          .then(res => res.json())
          .then(data => this.displayDropdown(data))
          .catch(error =>
            swal({
              title: "An error was caught!",
              text: "You may have exceeded the allowed API calls",
              icon: "error",
              button: "ok"
            })
          );
      }
    } else {
      this.setState({ autocomplete: [] });
    }
  }

  displayDropdown(data) {
    this.setState({
      autocomplete: data.map(this.returnObject),
      locations: data
    });
  }

  returnObject(data) {
    return {
      key: data.Key,
      text: data.LocalizedName + ", " + data.Country.LocalizedName,
      value: data.Key
    };
  }

  renderSearch() {
    return (
      <Fade>
        <Dropdown
          button
          className="search-bar"
          selectOnNavigation={false}
          floating
          options={this.state.autocomplete}
          search
          text="Type city name..."
          onChange={this.handleChange}
          onSearchChange={this.handleSearchChange}
        />
      </Fade>
    );
  }

  render() {
    return (
      <Container>
        {this.props.fetchState === "fetching" ||
        this.props.fetchState === "failed"
          ? null
          : this.renderSearch()}
      </Container>
    );
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchWeather: fetchWeather
    },
    dispatch
  );
}

function mapStateToProps(state) {
  return { fetchState: state.fetchState };
}

export default connect(mapStateToProps, matchDispatchToProps)(SearchBar);
