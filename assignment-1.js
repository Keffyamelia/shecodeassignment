const apiKey = "a8fb175c18ad71f184901bc857538639";

const forecastApiKey = "3t73c07fb0d10559a4994af32c0bo4f8";

const units = "metric";

const searchInput = document.getElementById("weather--input--1");
const searchButton = document.getElementById("weather--input--2");
const currentButton = document.getElementById("current--weather");
const cityText = document.querySelector(".city--text");

let temperatureText = document.querySelector(".temperature--value");
let humidityText = document.querySelector(".weather--humidity");
let pressureText = document.querySelector(".weather--pressure");
let windText = document.querySelector(".weather--wind");

let descriptionText = document.querySelector(".weather--description");

let weatherImage = document.querySelector(".weather--image");

let weatherEmoji = document.querySelector(".weather__emoji");

let weatherData = document.querySelector(".weather__data");
let weatherDays = document.querySelector(".weather__days--1");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function showTemperature(response) {
  const responseData = response.data;
  const temperature = Math.round(responseData.main.temp);
  const city = responseData.name;
  const humidity = responseData.main.humidity;
  const pressure = responseData.main.pressure;
  const wind = Math.round(responseData.wind.speed);
  const description = responseData.weather[0].description;
  const weatherIcon = responseData.weather[0].icon;

  temperatureText.innerText = `${temperature}`;
  cityText.innerText = city;
  humidityText.innerText = humidity;
  pressureText.innerText = pressure;
  windText.innerText = wind;
  descriptionText.innerText = description;
  weatherImage.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${weatherIcon}.png`
  );
  //weatherEmoji.innerHTML = "<span>&#x26C5;</span";
}

function showForecast(response) {
  const responseData = response.data;
  const dailyForecastArray = responseData.daily;
  weatherData.innerHTML = "";
  dailyForecastArray.forEach(function (item) {
    const weatherDaysClone = weatherDays.cloneNode();
    weatherDays.innerHTML = "";
    const day = item.time;
    const date = new Date(day * 1000);
    const dateParagraph = document.createElement("p");
    dateParagraph.innerText = days[date.getDay()];
    weatherDaysClone.appendChild(dateParagraph);
    const temperatureIcon = document.createElement("img");
    temperatureIcon.setAttribute("src", item.condition.icon_url);
    weatherDaysClone.appendChild(temperatureIcon);
    const temperatureParagraph = document.createElement("p");
    const minTemp = Math.round(item.temperature.minimum);
    const maxTemp = Math.round(item.temperature.maximum);
    temperatureParagraph.innerText = `${minTemp}°C / ${maxTemp}°C`;
    weatherDaysClone.appendChild(temperatureParagraph);
    weatherData.appendChild(weatherDaysClone);
  });
}

navigator.geolocation.getCurrentPosition(showLocation);

function showLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(function (res) {
    showTemperature(res);
    fetchAndShowForecastByCity(res.data.name);
  });
}

function showLocationByCity(city) {
  let units = "metric";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

function fetchAndShowForecastByCity(city) {
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${forecastApiKey}&units=${units}`;
  axios.get(apiUrl).then(showForecast);
}

searchButton.addEventListener("click", function () {
  const searchValue = searchInput.value;

  if (searchValue !== "") {
    cityText.innerText = searchValue;
  }
  showLocationByCity(searchValue);
  fetchAndShowForecastByCity(searchValue);
});

currentButton.addEventListener("click", showLocation);

let now = new Date();

let weatherDate = document.querySelector(".weather__date");

let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();

if (hours < 10) {
  hours = `0${hours}`;
}

if (minutes < 10) {
  minutes = `0${minutes}`;
}

let day = days[now.getDay()];

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

let month = months[now.getMonth()];

weatherDate.innerHTML = `${day} ${hours}:${minutes}`;

let temperatureType = document.querySelector(".temperature--type");

temperatureType.addEventListener("click", function () {
  const temperatureValueStr = temperatureText.innerText;
  const temperatureValueInt = parseInt(temperatureValueStr);
  if (temperatureType.innerText === "°C") {
    temperatureType.innerText = "°F";
    temperatureText.innerText = celsiusToFahrenheit(temperatureValueInt);
  } else {
    temperatureType.innerText = "°C";
    temperatureText.innerText = fahrenheitToCelsius(temperatureValueInt);
  }
});

function celsiusToFahrenheit(celsiusValue) {
  const fahrenheitValue = (celsiusValue * 9) / 5 + 32;
  return Math.round(fahrenheitValue);
}

function fahrenheitToCelsius(fahrenheitValue) {
  const celsiusValue = ((fahrenheitValue - 32) * 5) / 9;
  return Math.round(celsiusValue);
}
