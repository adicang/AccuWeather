import React, { Component } from "react";

import { Icon } from "semantic-ui-react";
import ReactTooltip from "react-tooltip";

export default class AddToFavorites extends Component {
  constructor(props) {
    super(props);

    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick() {
    this.props.toggleFavorites();
    setTimeout(ReactTooltip.hide, 100);
  }

  render() {
    return (
      <div className="add-to-favorite-wrapper">
        {this.props.isFavorite ? (
          <div>
            <Icon
              color="red"
              name="heart"
              size="huge"
              onClick={this.handleOnClick}
              data-tip="Click to remove from favorites"
            />
            <ReactTooltip
              place="left"
              type="light"
              effect="solid"
              afterShow={() => {
                setTimeout(ReactTooltip.hide, 9000);
              }}
            />
          </div>
        ) : (
          <div>
            <Icon
              name="heart outline"
              size="huge"
              onClick={this.handleOnClick}
              data-tip="Click to add to favorites"
            />
            <ReactTooltip
              place="left"
              type="light"
              effect="solid"
              afterShow={() => {
                setTimeout(ReactTooltip.hide, 9000);
              }}
            />
          </div>
        )}
      </div>
    );
  }
}
