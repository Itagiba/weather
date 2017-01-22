import React, { Component } from 'react';
import { render } from 'react-dom';

export default class Temp extends React.Component {
  handleClicked() {
    console.log('clicked');
    this.props.clickHandler();
  }
  calculateTemp(degreesK, displayUnits) {
    if (displayUnits === 'C') return Math.floor(degreesK - 273);
    else return Math.floor((degreesK - 273) * 9 / 5 + 32);
  }
  render() {
    var {
      displayUnits,
      temp
    } = this.props;
    return (
      <span className="temp" onClick={this.handleClicked.bind(this)}>
        {this.calculateTemp(temp, displayUnits) }
        <strong>&deg;{displayUnits}</strong>
      </span>
    );
  }
}
