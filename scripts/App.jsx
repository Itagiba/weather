import React, { Component } from 'react';
import { render } from 'react-dom';
import { getLocationCoords, getWeatherData } from 'api';
//get data from different location
import superagent from 'superagent';
import jsonp from 'superagent-jsonp';
import styles from './app.css';
const  myApi = 'http://api.openweathermap.org/data/2.5/forecast?q=London,gb&APPID=84b6f7953e0bfd92f96369ca9de13c54&cnt=5'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: '',
      lon: '',
      locationName: 'your local area',
      displayUnits: 'F'
    };
  }
  componentWillMount() {
      superagent.get(myApi).then((response) => {
        console.log(response.body.list[0].main.temp)
        console.log(response.body.list[0].weather[0].main)
        this.setState({
          locationName: response.body.city.name,
          locTemp: response.body.list[0].main.temp,
          humidity: response.body.list[0].main.humidity,
          weatherSummary: response.body.list[0].weather[0].main,
          weatherSummaryDescription: response.body.list[0].weather[0].description

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
        <h1>Weather for&nbsp;{this.state.locationName} </h1>
        <h2>
            {this.state.weatherSummaryDescription} &nbsp;
            <Temp temp={this.state.locTemp} displayUnits={this.state.displayUnits} clickHandler={this.toggleDisplayUnits.bind(this)}/>
        </h2>
        <WeatherIcon weather={this.state.weatherSummary} />
      </div>

    );
  }

}

class WeatherIcon extends React.Component {

  generateIcon(weather) {
    if (weather === 'Clear') {
      return (
        <div className="icon sunny">
          <div className="sun">
            <div className="rays"></div>
          </div>
        </div>)

    }

    if (weather === 'Rain' || weather === 'Drizzle') {
      return (
        <div className="icon rainy">
          <div className="cloud"></div>
          <div className = "rain"> </div>
        </div>
      )
    }
    if (weather === 'Snow') {
      return (
        <div className="icon flurries">
          <div className="cloud"></div>
          <div className="snow">
            <div className="flake"></div>
            <div className="flake"></div>
          </div>
        </div>)
    }
    if (weather === "Clouds") {
      return (
        <div className="icon cloudy">
          <div className="cloud"></div>
          <div className="cloud"></div>
        </div>)
    }
    if (weather === "Thunderstorm") {
      return (
        <div className="icon thunder-storm">
          <div className="cloud"></div>
          <div className="lightning">
            <div className="bolt"></div>
            <div className="bolt"></div>
          </div>
        </div>
      )
    } else return <div></div>
  }

  render() {
    return (
      <div className="icon-wrap">
      {this.generateIcon(this.props.weather)}
    </div>)
  }
}

class Temp extends React.Component {
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
