function formatDay(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  console.log(response);
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#display-weather-forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col-2">
      <div class="forecast-date">${formatDay(forecastDay.dt)}</div>
      <img
        src="https://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png"
        alt=""
        width="42" /><div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}º </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}º </span>
        </div></>
    </div>
`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "46fac47dd8b8fa26d1b6852218ad3dfe";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showCurrentWeatherData(response) {
  let showCityTemp = document.querySelector("#display-current-temperature");
  let showCity = document.querySelector("#display-current-city");
  let showCityHumidity = document.querySelector("#display-current-humidity");
  let showCityWindspeed = document.querySelector("#display-current-windspeed");
  let showCityWeatherDescription = document.querySelector(
    "#display-current-discription"
  );
  let currentIcon = document.querySelector("#display-current-icon");

  tempCity = response.data.main.temp;

  showCityTemp.innerHTML = Math.round(tempCity);
  showCity.innerHTML = response.data.name;
  showCityHumidity.innerHTML = response.data.main.humidity;
  showCityWindspeed.innerHTML = Math.round(response.data.wind.speed * 3.6);
  showCityWeatherDescription.innerHTML = response.data.weather[0].description;
  currentIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  currentIcon.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function valueCity(city) {
  let apiKey = "6bfa54f242cbb59343d4e58db578dc61";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showCurrentWeatherData);
}

function clickSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#type-city");
  valueCity(searchInput.value);
}

let submitCity = document.querySelector("#display-search-city");
submitCity.addEventListener("submit", clickSubmit);

valueCity("Copenhagen");
