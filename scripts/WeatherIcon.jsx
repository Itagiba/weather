import React, { Component } from 'react';
import { render } from 'react-dom';
export default class WeatherIcon extends React.Component {

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
