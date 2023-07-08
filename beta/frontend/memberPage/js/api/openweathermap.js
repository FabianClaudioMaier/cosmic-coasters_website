const apiKey = "5a4d37af1de10373d27c22a544421fc1";
const city = "Vienna";
const units = "metric"; // Use "imperial" for Fahrenheit

const apiCall = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

fetch(apiCall)
    .then(response => response.json())
    .then(data => {
        document.getElementById('temperature').innerHTML = `${data.main.temp}°C`;
        document.getElementById('humidity').innerHTML = `${data.main.humidity}%`;
        document.getElementById('wind-speed').innerHTML = `${data.wind.speed} m/s`;
        document.getElementById('weather').innerHTML = `${data.weather[0].description}`;
    });
