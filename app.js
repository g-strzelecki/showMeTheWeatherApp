import * as ELEMENTS from './elements.js';
import {
  Http
} from './http.js';
import {
  WeatherData,
  WEATHER_PROXY_HANDLER
} from './weather-data.js';

const APP_ID = '09e089ef41731ae9491cf0f023be11a7';

ELEMENTS.ELEMENT_SEARCH_BUTTON.addEventListener('click', searchWeather);

function searchWeather() {
  const CITY_NAME = ELEMENTS.ELEMENT_SEARCHED_CITY.value.trim();
  if (CITY_NAME.length == 0) {
    return alert('Please enter a city name');
  }
  ELEMENTS.ELEMENT_LOADING_TEXT.style.display = 'block';
  ELEMENTS.ELEMENT_WEATHER_BOX.style.display = 'none';
  const URL = 'http://api.openweathermap.org/data/2.5/weather?q=' + CITY_NAME + '&units=metric&appid=' + APP_ID;

  Http.fetchData(URL)
    .then(responseData => {
      const WEATHER_DATA = new WeatherData(CITY_NAME, responseData.weather[0].description.toUpperCase());
      console.log(WEATHER_DATA);
      const WEATHER_PROXY = new Proxy(WEATHER_DATA, WEATHER_PROXY_HANDLER);
      WEATHER_PROXY.temperature = responseData.main.temp;
      WEATHER_DATA.description = responseData.weather[0].description.toUpperCase();
      WEATHER_DATA.cityName = responseData.name;
      updateWeather(WEATHER_PROXY);
    })
    .catch(error => alert(error));
}

function updateWeather(weatherData) {
  ELEMENTS.ELEMENT_WEATHER_CITY.textContent = weatherData.cityName;
  ELEMENTS.ELEMENT_WEATHER_DESCRIPTION.textContent = weatherData.description;
  ELEMENTS.ELEMENT_WEATHER_TEMPERATURE.textContent = parseInt(weatherData.temperature).toFixed(1) + 'F, ' + parseInt((weatherData.temperature - 32) / 1.8).toFixed(1) + 'C';

  ELEMENTS.ELEMENT_LOADING_TEXT.style.display = 'none';
  ELEMENTS.ELEMENT_WEATHER_BOX.style.display = 'block';
}
