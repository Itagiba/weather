import React, { Component } from 'react';
import { render } from 'react-dom';
import Temp from 'Temp';
import WeatherIcon from 'WeatherIcon';

//forecast

export default class MyForecast extends React.Component {

  constructor(props) {
   super(props);
   this.state = {
     displayUnits: props.displayUnits
  };
}



  render() {

    return (
      <div>
        <h1>Weather for&nbsp;{this.props.city}</h1>
        <h3> on {this.props.dateFor}</h3>
        <h2>
            {this.props.weatherSummaryDescription} &nbsp;
            <Temp temp={this.props.locTemp} displayUnits={this.props.displayUnits} clickHandler={this.toggleDisplayUnits.bind(this)}/>
        </h2>
        <WeatherIcon weather={this.props.weatherSummary} />
        <p>The ID for this day is <strong>{this.props.dayID}</strong></p>
      </div>);
  }


  toggleDisplayUnits() {
    this.state.displayUnits === 'F' ? this.setState({
      displayUnits: 'C'
    }) : this.setState({
      displayUnits: 'F'
    });
  }

}



//--/Forecast
