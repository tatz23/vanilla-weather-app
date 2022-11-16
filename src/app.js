function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
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
  return `${day}, ${hours}:${minutes}`;
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

//let apiKey = "2afbc670a6b48bo2065e3872ftab04ec";
//let apiUrl = `https://api.shecodes.io/weather/v1/current?query={city}&key=${apiKey}&units=metric`;

function showWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.city;
  let currentTemperature = document.querySelector("#current-temperature");
  let weatherDescription = document.querySelector("#weather-description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let feelsLike = document.querySelector(".feels-like");
  let weatherIcon = document.querySelector("#icon");
  let iconImage = response.data.condition.icon_url;

  celsiusTemperature = response.data.temperature.current;

  currentTemperature.innerHTML = Math.round(response.data.temperature.current);
  weatherDescription.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = response.data.temperature.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  feelsLike.innerHTML = Math.round(response.data.temperature.feels_like);
  weatherIcon.setAttribute("src", iconImage);
}

function searchCity(city) {
  let apiKey = "2afbc670a6b48bo2065e3872ftab04ec";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  searchCity(cityInputElement.value);
}

function searchLocation(position) {
  let apiKey = "2afbc670a6b48bo2065e3872ftab04ec";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${position.coords.longitude}&lat=${position.coords.latitude}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function showCelsius(event) {
  event.preventDefault();
  let celsiusElement = document.querySelector("#current-temperature");
  celsiusElement.innerHTML = Math.round(repsonse.data.temperature.main);
}

//function showFahrenheit (event){
//  event.preventDefault();
// let fahrenheitElement = (response.data.temperature.main)*4
// .5 + 32;
//
//}

let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

//let fahrenheitButton = document.querySelector("#fahrenheit-button");
//fahrenheitButton.addEventListener("click", celsiusToFahrenheit);

//let celsiusButton = document.querySelector("#celsius-button");
//celsiusButton.addEventListener("click", fahrenheitToCelsius);

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Porto");
