let currentTempInC = 0;
let showCityTemp = document.querySelector("#display-current-temperature");
function showFahrenheit(event) {
  event.preventDefault();

  showCityTemp.innerHTML = `${Math.round(currentTempInC * (9 / 5) + 32)}`;
}

let temperatureFahrenheit = document.querySelector("#fahrenheit");
temperatureFahrenheit.addEventListener("click", showFahrenheit);

function showCelcius(event) {
  event.preventDefault();
  showCityTemp.innerHTML = `${currentTempInC}`;
}

let temperatureCelcius = document.querySelector("#celcius");
temperatureCelcius.addEventListener("click", showCelcius);

function clickSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#type-city");
  let city = document.querySelector("#display-current-city");
  let valueCity = `${searchInput.value}`;
  city.innerHTML = `${valueCity}`;

  let apiKey = "6bfa54f242cbb59343d4e58db578dc61";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${valueCity}&units=metric`;

  function showCurrentWeatherData(response) {
    console.log(response.data);
    let tempCity = Math.round(response.data.main.temp);
    currentTempInC = tempCity;
    let showCityTemp = document.querySelector("#display-current-temperature");
    let cityHumidity = response.data.main.humidity;
    let showCityHumidity = document.querySelector("#display-current-humidity");
    let cityWindspeed = Math.round(response.data.wind.speed);
    let showCityWindspeed = document.querySelector(
      "#display-current-windspeed"
    );
    let cityWeatherDescription = response.data.weather[0].main;
    let showCityWeatherDescription = document.querySelector(
      "#display-current-discription"
    );
    let currentIcon = document.querySelector("#display-current-icon");

    showCityTemp.innerHTML = `${tempCity}`;
    showCityHumidity.innerHTML = `Humidity: ${cityHumidity}%`;
    showCityWindspeed.innerHTML = `Wind ${cityWindspeed} km/h`;
    showCityWeatherDescription.innerHTML = `${cityWeatherDescription}`;
    currentIcon.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  }

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showCurrentWeatherData);
}

let submitCity = document.querySelector("#display-search-city");
submitCity.addEventListener("submit", clickSubmit);

function showLocation(event) {
  event.preventDefault();
  function showPosition(position) {
    let lat = position.coords.latitude.toFixed(2);
    let lon = position.coords.longitude.toFixed(2);

    let apiKeyGeo = "6a48a550fc04f170639e60d52b8a6bc5";
    let apiUrlGeo = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5`;

    function showGeoCity(response) {
      let geoCity = response.data[0].name;
      let showGeoCity = document.querySelector("#display-current-city");
      showGeoCity.innerHTML = `${geoCity}`;

      let apiKeyGeoWeather = "40b745c14eadad7b7c4e6e4bf3b70103";
      let apiUrlGeoWeather = `https://api.openweathermap.org/data/2.5/weather?q=${geoCity}&units=metric`;

      function showGeoWeatherData(response) {
        let tempGeoCity = Math.round(response.data.main.temp);
        currentTempInC = tempGeoCity;
        let showGeoCity = document.querySelector(
          "#display-current-temperature"
        );
        let cityHumidityGeo = response.data.main.humidity;
        let showCityHumidityGeo = document.querySelector(
          "#display-current-humidity"
        );
        let cityWindspeedGeo = Math.round(response.data.wind.speed);
        let showCityWindspeedGeo = document.querySelector(
          "#display-current-windspeed"
        );
        let cityWeatherDescriptionGeo = response.data.weather[0].main;
        let showCityWeatherDescriptionGeo = document.querySelector(
          "#display-current-discription"
        );
        let currentIcon = document.querySelector("#display-current-icon");

        showGeoCity.innerHTML = `${tempGeoCity}`;
        showCityHumidityGeo.innerHTML = `Humidity: ${cityHumidityGeo}%`;
        showCityWindspeedGeo.innerHTML = `Wind ${cityWindspeedGeo} km/h`;
        showCityWeatherDescriptionGeo.innerHTML = `${cityWeatherDescriptionGeo}`;
        currentIcon.setAttribute(
          "src",
          `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
        );
      }

      axios
        .get(`${apiUrlGeoWeather}&appid=${apiKeyGeoWeather}`)
        .then(showGeoWeatherData);
    }
    axios.get(`${apiUrlGeo}&appid=${apiKeyGeo}`).then(showGeoCity);
  }
  navigator.geolocation.getCurrentPosition(showPosition);
}
let geoButton = document.querySelector("#dispaly-current-bt-location");
geoButton.addEventListener("click", showLocation);
geoButton.click();
