export class WeatherData {
  contructor(cityName, description) {
    this.cityName = cityName;
    this.description = description;
    this.temperature = '';
  }
}

export const WEATHER_PROXY_HANDLER = {
  get: function (target, property) {
    return Reflect.get(target, property);
  },
  set: function (target, property, value) {
    //Zamiana jednostek stopni temperatury z C na F
    const newValue = (value * 1.8 + 32).toFixed(2);
    return Reflect.set(target, property, newValue);
  }
};
