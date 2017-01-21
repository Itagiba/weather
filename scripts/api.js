import superagent from 'superagent';
import jsonp from 'superagent-jsonp';

//Use coordinates to get the weather data from OpenWeatherMap
export function getWeatherData(units, coords) {
  var deferred = Promise.defer();
  var parsedUnits = units === 'C' ? 'metric' : 'imperial';

 superagent.get('http://api.openweathermap.org/data/2.5/weather?lat=${this.state.lat}&lon=${this.state.lon}&APPID=84b6f7953e0bfd92f96369ca9de13c54&cnt=5')
  //superagent.get('http://api.openweathermap.org/data/2.5/weather')
    .query({
      units: parsedUnits,
      lat: coords.lat,
      lon: coords.lon,
      appid: 'YOUR_API_KEY'
    })
    .use(jsonp)
    .end((error, weatherData) => {
      if (error) {
          deferred.reject(error);
      } else {
          deferred.resolve(weatherData);
      }
    });

  return deferred.promise;
}

//get the location coordinates
export function getLocationCoords() {
  var deferred = Promise.defer();

  if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
          (location) => {
              deferred.resolve({
                  lat: location.coords.latitude,
                  lon: location.coords.longitude
              });
          },
          (error) => {
              deferred.reject(error);
          }
      );
  } else {
      superagent.get('http://ipinfo.io/json')
          .use(jsonp) // We use superagent-jsonp
          .end((error, locationData) => {
              if (error) {
                  deferred.reject(error);
              } else {
                  deferred.resolve(locationData);
              }
          });
  }

  return deferred.promise;
}
