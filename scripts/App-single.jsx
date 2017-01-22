import React, { Component } from 'react';
import { render } from 'react-dom';
import { getLocationCoords, getWeatherData } from 'api';
//get data from different location
import superagent from 'superagent';
import MyForecast from 'MyForecast';
import jsonp from 'superagent-jsonp';
import styles from './app.css';
import Temp from 'Temp';
import WeatherIcon from 'WeatherIcon';
const  myApi = 'http://api.openweathermap.org/data/2.5/forecast?q=London,gb&APPID=84b6f7953e0bfd92f96369ca9de13c54&cnt=5'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locationName: 'your local area',
      displayUnits: 'C',
    };
  }
  componentWillMount() {
      superagent.get(myApi).then((response) => {
        console.log('RESPONSE BODY IS' + response.body.city.name)
        this.setState({
          locationName: response.body.city.name,
          locTemp: response.body.list[0].main.temp,
          humidity: response.body.list[0].main.humidity,
          weatherSummary: response.body.list[0].weather[0].main,
          weatherSummaryDescription: response.body.list[0].weather[0].description,
          dayID: response.body.list[0].dt,
          dateFor: response.body.list[0].dt_txt,
          everyDay: response.body

        })


      });

  }
  toggleDisplayUnits() {
    this.state.displayUnits === 'F' ? this.setState({
      displayUnits: 'C'
    }) : this.setState({
      displayUnits: 'F'
    });
  }


  render() {
    return (
      <div>
        <h1>Today's weather for: {this.state.locationName} </h1>
        <p>{this.state.dayID}</p>
        <h2>{this.state.weatherSummaryDescription} <Temp temp={this.state.locTemp} displayUnits={this.state.displayUnits} clickHandler={this.toggleDisplayUnits.bind(this)}/></h2>

        <WeatherIcon weather={this.state.weatherSummary} />
      </div>

    );
  }

}
