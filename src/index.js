function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let index = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[index];
  let time = document.querySelector("#currentTime");
  time.innerHTML = `${day} ${hours}:${minutes}`;
}

function showTemperature(response) {
  formatDate(new Date());
  let temperature = Math.round(response.data.main.temp);
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;
  let currentCondition = document.querySelector("#conditions");
  currentCondition.innerHTML = response.data.weather[0].description;
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${temperature}°C`;
  let humidity = document.querySelector("#currentHumidity");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  let windSpeed = document.querySelector("#currentWind");
  windSpeed.innerHTML = `Wind: ${response.data.wind.speed}km/h`;
}

function citySearch(event) {
  event.preventDefault();
  let citySelected = document.querySelector("#cityToSearch");
  document.getElementById("cityEntered").innerHTML = citySelected.value;
  let apiKey = "21fd182fccb9e77383ba25f615e7b658";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
  let finalUrl = `${apiUrl}${citySelected.value}&APPID=${apiKey}&units=metric`;
  axios.get(finalUrl).then(showTemperature);
}

function currentCitySearch(event) {
  let currentLocation = navigator.geolocation.getCurrentPosition(
    handlePosition
  );
}

function handlePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "21fd182fccb9e77383ba25f615e7b658";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
  let finalUrl = `${apiUrl}lat=${latitude}&lon=${longitude}&APPID=${apiKey}&units=metric`;
  axios.get(finalUrl).then(showTemperature);
}

let searchButton = document.querySelector("form #search");
searchButton.addEventListener("click", citySearch);

let currentLocationButton = document.querySelector("form #currentCity");
currentLocationButton.addEventListener("click", currentCitySearch);
