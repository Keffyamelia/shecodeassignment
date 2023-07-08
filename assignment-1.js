// let weather = {
//   paris: {
//     temp: 19.7,
//     humidity: 80,
//   },
//   tokyo: {
//     temp: 17.3,
//     humidity: 50,
//   },
//   lisbon: {
//     temp: 30.2,
//     humidity: 20,
//   },
//   "san francisco": {
//     temp: 20.9,
//     humidity: 100,
//   },
//   oslo: {
//     temp: -5,
//     humidity: 20,
//   },
// };

// //   // write your code here

// let city = prompt("Enter a city");

// if (city in weather) {
//   let temperatureC = Math.round(weather[city].temp);
//   let temperatureF = Math.round((temperatureC * 9) / 5 + 32);
//   let humidity = Math.round(weather[city].humidity);

//   alert(
//     "It is currently " +
//       temperatureC +
//       "°C (" +
//       temperatureF +
//       "°F) in " +
//       city +
//       " with a humidity of " +
//       humidity +
//       "%"
//   );
// } else {
//   alert(
//     "Sorry we don't know the weather for this city, try going to https://www.google.com/search?q=weather+" +
//       city
//   );
// }
const apiKey = "a8fb175c18ad71f184901bc857538639";

const units = "metric";

const searchInput = document.getElementById("weather--input--1");
const searchButton = document.getElementById("weather--input--2");
const currentButton = document.getElementById("current--weather");
const cityText = document.querySelector(".city--text");

let temperatureText = document.querySelector(".weather__text--1.degrees");
let humidityText = document.querySelector(".weather--humidity");
let precipationText = document.querySelector(".weather--precipation");
let windText = document.querySelector(".weather--wind");

function showTemperature(response) {
  const responseData = response.data;
  const temperature = Math.round(responseData.main.temp);
  const city = responseData.name;
  const humidity = responseData.main.humidity;
  const wind = responseData.wind.speed;

  temperatureText.innerText = `${temperature}°C`;
  cityText.innerText = city;
  humidityText.innerText = humidity;
  windText.innerText = wind;
}

navigator.geolocation.getCurrentPosition(showLocation);

function showLocation(position) {
  
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

function showLocationByCity(city) {
  
  let units = "metric";
 
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

searchButton.addEventListener("click", function () {
  const searchValue = searchInput.value;

  if (searchValue !== "") {
    cityText.innerText = searchValue;
  }
  showLocationByCity(searchValue);
});

 currentButton.addEventListener("click", showLocation);

 let now = new Date();

 let weatherText = document.querySelector(".weather__text--1");

 let date = now.getDate();
 let hours = now.getHours();
 let minutes = now.getMinutes();
 let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
 let day = days[now.getDay()];

 let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

 let month = months[now.getMonth()];
 if (hours === 12) {
   hours = "00";
 } else if (hours > 12) {
   hours -= 12;
 }

 weatherText.innerHTML = `${day} ${hours}:${minutes}`;

// let celsiusLink = document.querySelector(".celsius");
// let fahrenheitLink = document.querySelector(".fahrenheit");

// let degreesElement = document.querySelector(".degrees");

// celsiusLink.addEventListener("click", function(event) {
//   event.preventDefault();
//   let celsiusTemperature = parseFloat(degreesElement.innerText);
//   let fahrenheitTemperature = Math.ceil((celsiusTemperature * 9) / 5 + 32);
//   degreesElement.innerHTML = `&nbsp;${fahrenheitTemperature} °<span><a href=''
//   class="celsius text-decoration-none text-dark">C</a> | <a href='' class="fahrenheit text-decoration-none text-dark">F</a>`
// });

// fahrenheitLink.addEventListener("click", function(event) {
//   event.preventDefault();
//   let fahrenheitTemperature = parseFloat(degreesElement.innerText);
//   let celsiusTemperature = Math.ceil(fahrenheitTemperature * 1.8 + 32);
//   degreesElement.innerHTML = `&nbsp;${celsiusTemperature} °<span><a href=''
//   class="celsius text-decoration-none text-dark">F</a> | <a href='' class="fahrenheit text-decoration-none text-dark">C</a>`
// });

// function search(event) {
//   event.preventDefault();
//   let searchInput = document.querySelector(".weather--input--1");

//   let h2 = document.querySelector("h2");
//   if (searchInput.value) {
//     h2.innerHTML = `Searching for ${searchInput.value}...`;
//   } else {
//     h2.innerHTML = null;
//     alert("Please type a city");
//   }
// }
// let form = document.querySelector("input");

// input.addEventListener("submit", search);
