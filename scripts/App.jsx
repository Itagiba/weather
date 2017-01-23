import React, { Component } from 'react';
import { render } from 'react-dom';
const Timestamp = require('react-timestamp');
import superagent from 'superagent';
import styles from './app.css';
import Temp from 'Temp';
import WeatherIcon from 'WeatherIcon';
const  WeatherData = 'http://api.openweathermap.org/data/2.5/forecast/daily?q=London,gb&APPID=84b6f7953e0bfd92f96369ca9de13c54&cnt=5'


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

                      console.log(JSON.stringify(this.state.everyDay))

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
        const forecastsPerDay = everyDay.map((list, i) => {
            return (
                <div key={i} className="oneDay">
                    <h2><Timestamp time={list.dt} format='date'/> </h2>
                    <h3>{list.weather[0].description}&nbsp;</h3>
                      <ul>
                        <li>Min:&nbsp;
                        <Temp temp={list.temp.min} displayUnits={this.state.displayUnits} clickHandler={this.toggleDisplayUnits.bind(this)}/>
                        </li>
                        <li>Max:&nbsp;
                        <Temp temp={list.temp.max} displayUnits={this.state.displayUnits} clickHandler={this.toggleDisplayUnits.bind(this)}/>
                        </li>
                      </ul>
                    <WeatherIcon weather={list.weather[0].main} />
              </div>
            );
        });

        return (
            <div>

                <h1><span>5-day Weather Forecast for&nbsp;</span> {city.name}</h1>
                <div className="everyDay">{forecastsPerDay}</div>
            </div>
        );
    }


}
