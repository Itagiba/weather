# Weather Forecast Example

An example of API implementation with ReactJS using the following technologies:
* [React](https://github.com/facebook/react)
* [Babel 6](http://babeljs.io)
* [Webpack](http://webpack.github.io) for bundling
* [Webpack Dev Server](http://webpack.github.io/docs/webpack-dev-server.html)
* [React Transform](https://github.com/gaearon/react-transform-hmr) for hot reloading React components in real time.

This project is built on the top of a basic react starter kit which can be found at: [react-es6-webpack-boilerplate](https://github.com/vasanthk/react-es6-webpack-boilerplate)

### Weather API
This project uses the [Open Weather Map API](http://openweathermap.org/). It combines URL parametres in order to get the desired forecast result for 5 days. 

* The API call selects the results on daily basis: http://api.openweathermap.org/data/2.5/forecast/daily?
* It uses a pre-set (q) city name and an unique openweathermap key
* The call is stored in a `WeatherData` constant at the top of your APP page

### Usage
The server.js file can be found at the root directory
```
npm install
npm start
Open http://localhost:5000
```


### File Location

    .
    ├── ...
    ├── scripts                 
    │   ├── App-single.jsx      # An example of retrieving the weather for the current day/time
    │   ├── app.css             # Required Styles
    │   ├── App.jsx             # Key JSX file containing call to API and required funcions
    │   ├── index.js            # The root destination for the rendered APP
    │   ├── Temp.jsx            # Temperature converter   
    │   └── WeatherIcon.jsx     # Weather icon generator
    └── ...

### Linting

ESLint with React linting options have been enabled.

```
npm run lint
```

####Webpack configuration
Output directory for the project.The bundle.js file can be found in index.html
```
  output: {
    path: __dirname,
    filename: 'bundle.js',
    publicPath: '/public/'
  }
```
####Loaders
style-loader and css-loader have been added to this project.

```
  loaders: [
      {
        exclude: /node_modules/,
        test: /\.jsx?$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'scripts')
      },
      {
        test: /\.css/,
        loaders: ['style', 'css'],
        include: __dirname + '/scripts'
    }],
```

## The Weather APP

##Documentation

####1. Assign the API callback into a constant variable
```
const  WeatherData = 'http://api.openweathermap.org/data/2.5/forecast/daily?q=London,gb&APPID=84b6f7953e0bfd92f96369ca9de13c54&cnt=5'
```
####2. Sets the state for inital objects and makes sure that `everyDay` is set as an array. Use `componentDidMount()` and [superagent](https://visionmedia.github.io/superagent/) to get the values from the API call and reset the state with the response object. 

```
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
```


####3. Drill through `WeatherData` and render the values into `UI`elements using `map.get`:


```
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
```


    
    
    
####4. Import the Temp class into App.jsx and toggle between celsius and fahrenheit using the function below:


```
import Temp from 'Temp';

...

toggleDisplayUnits() {
    this.state.displayUnits === 'F' ? this.setState({
      displayUnits: 'C'
    }) : this.setState({
      displayUnits: 'F'
    });
  }
```
  
  
####5. Import the WeatherIcon (adapted existing) class and convert the values of `WeatherData` into "animated weather icons"

```
import WeatherIcon from 'WeatherIcon';

...

toggleDisplayUnits() {
    this.state.displayUnits === 'F' ? this.setState({
      displayUnits: 'C'
    }) : this.setState({
      displayUnits: 'F'
    });
  }
```
  
####7. Use [react-timestamp](https://github.com/nathanhoad/react-timestamp) to convert the dt value in `WeatherData` to a readable format.


```
const Timestamp = require('react-timestamp');
...
 <h2><Timestamp time={list.dt} format='date'/> </h2>
```






