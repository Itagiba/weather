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


### Usage
The server.js file can be found at the root directory
```
npm install
npm start
Open http://localhost:5000
```

## The Weather APP
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



