import React, { Component } from 'react';
import { render } from 'react-dom';
import { getLocationCoords, getWeatherData } from 'api';
import superagent from 'superagent';
import MyForecast from 'MyForecast';
import jsonp from 'superagent-jsonp';
import styles from './app.css';
import Temp from 'Temp';
import WeatherIcon from 'WeatherIcon';
const  WeatherData = 'http://api.openweathermap.org/data/2.5/forecast?q=London,gb&APPID=84b6f7953e0bfd92f96369ca9de13c54&cnt=10'


function fakeWeatherAPI() {
    return Promise.resolve(WeatherData);

}



export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          //Make sure that the object is there
            displayUnits: props.displayUnits,
            city: 'your local area',
            displayUnits: 'C',
            everyDay: []
        }
    }

    componentDidMount() {
           superagent.get(WeatherData).then((response) => {
                   this.setState({
                       city : response.body.city,
                       everyDay : response.body.list

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
        const {city, everyDay} = this.state;
        const forecastsPerDay = everyDay.map((day, i) => {
            return (
                <div key={i}>
                  <h3>on {day.dt_txt}</h3>
                  <h2>
                    {day.weather[0].description}&nbsp;
                    <Temp temp={day.main.temp} displayUnits={this.state.displayUnits} clickHandler={this.toggleDisplayUnits.bind(this)}/>
                  </h2>
                  <WeatherIcon weather={day.weather[0].main} />
                  <p>ID: {day.dt} </p>
                </div>
            );
        });

        return (
            <div>
                <h1>Forecast for&nbsp; {city.name}, {city.country}</h1>
                {forecastsPerDay}
            </div>
        );
    }


}
