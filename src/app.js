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
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  }

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showCurrentWeatherData);
}

let submitCity = document.querySelector("#display-search-city");
submitCity.addEventListener("submit", clickSubmit);
