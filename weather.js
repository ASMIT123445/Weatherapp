//function to retrieve weather information using OperweatherMap API.
function getWeather(city) {
  //variable for openweathermap API key
  const apiKey = "a9a7d13cc08dbd793b0101b61f8bad34";

  //error if no input is given
  if (!city) {
    alert("Please enter a city");
    return;
  }
  //establish API URL for provided city
  const currentweather = `https://api.openweathermap.org/data/2.5/weather?q=${city.toLowerCase()}&appid=${apiKey}&units=metric`;

  //fetch current weather data from the given API
  fetchUrl(currentweather)
    .then((res) => {
      //Etracting following information from the API response
      const cityName = res.name;
      const temp = res.main.temp;
      const datetime = new Date(
        res.dt * 1000 - res.timezone * 1000
      ).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        weekday: "short",
      });
      const humid = res.main.humidity;
      const weather = res.weather[0].main;
      const wind = res.wind.speed;
      const _pressure = res.main.pressure;
      const icon = res.weather[0].icon;
      //create HTML content for displaying weather information
      const weatherHTML = `<h1>${cityName}</h1>
      <p>${datetime}</p>
      <p class="weather-title">${weather}</p>
      <div><img src="http://openweathermap.org/img/w/${icon}.png" width="150px" height:"150px"></div>
      <div style="display:flex; flex-direction: column; gap:10px ">
      <div class="weather-selector"><i class="fa-solid fa-temperature-full"></i>
      <p class="title">Temperature: ${temp.toFixed()} &deg;C</p></div>
      <div class="weather-selector"><i class="fa-solid fa-droplet"></i>
      <p class="title">Humidity: ${humid} %</p></div>
      <div class="weather-selector"><i class="fa-solid fa-wind"></i>
      <p class="title">Wind speed: ${wind} km/s</p></div>
      <div class="weather-selector"><i class="fa-solid fa-gauge-high"></i>
      <p>Pressure: ${_pressure}hPa</p></div></div>`;

      document.getElementById("output").innerHTML = weatherHTML;
    })
    //handle error if the weather information cannot be retrieved
    .catch(
      (err) =>
        (document.getElementById(
          "output"
        ).innerHTML = `<strong style="color: red;">Cannot find weather info for "${city}". Please try again. </strong>`)
    );
}
// Async function to fetch from API
async function fetchUrl(url) {
  const res = await fetch(url);
  return await res.json();
}
//Set as the default weather information for the website.
window.onload = getWeather("Parbhani");

//press enter to access weather data
document.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    //Get value entered in the id "places" and calling the getweather function
    const city = document.getElementById("places").value;
    getWeather(city);
  }
});
