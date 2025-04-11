const key = "860709e742a4d58de25888faf155424d"; // Clave de API
const defaultCity = "Los Angeles"; // Ciudad por defecto

const weatherIcons = {
    "Clear" : "/clear_sky.svg",
    "Clouds" : "/clouds.svg",
    "Drizzle" : "/shower_rain.svg",
    "Rain" : "/rain.svg",
    "Thunderstorm" : "/thunderstorm.svg",
    "Snow": "/snow.svg",
}

function getWeatherIcon(weather){
    let icon = "./weatherIcons" + weatherIcons[weather];
    return icon;
}



// Función para obtener y mostrar el clima
function getWeather(city = defaultCity) {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;

    fetch(url)
        .then(res => {
            if (!res.ok) {
                throw new Error("Ciudad no encontrada");
            }
            return res.json();
        })
        .then(data => {
            console.log(data);

            let cityName = data.name;
            let country = data.sys.country;
            document.getElementById("location").innerText = `${cityName}, ${country}`;
            document.getElementById("nav-location").innerText = `${cityName}, ${country}`;

            let temperature = (data.main.temp - 273.15).toFixed(0);
            document.getElementById("temp").innerText = `${temperature} °C`;

            let weatherDesc = data.weather[0].description;
            let weatherMain = data.weather[0].main;
            weatherDesc = weatherDesc.charAt(0).toUpperCase() + weatherDesc.slice(1);
            document.getElementById("weatherDesc").innerText = `${weatherDesc}`;

            document.getElementById("weatherIcon").src = getWeatherIcon(weatherMain);

            let tempMax = (data.main.temp_max - 273.15).toFixed(0);
            let tempMin = (data.main.temp_min - 273.15).toFixed(0);
            document.getElementById("maxMin").innerText = `Max: ${tempMax} °C | Min: ${tempMin} °C`;

            let feelsLike = (data.main.feels_like - 273.15).toFixed(0);
            document.getElementById("feelsLike").innerText = `${feelsLike} °C`;

            let wind = (data.wind.speed).toFixed(0);
            document.getElementById("wind").innerText = `${wind} km/h`;

            let humidity = (data.main.humidity).toFixed(0);
            document.getElementById("humidity").innerText = `${humidity} %`;

            document.getElementById("cityInput").value = "";

        })
        .catch(error => {
            console.log(error);
            alert("No se encontró la ciudad. Intenta de nuevo.");
        });
}

function searchCity() {
    let cityInput = document.getElementById("cityInput").value.trim();
    if (cityInput !== "") {
        getWeather(cityInput);
    } else {
        alert("Por favor ingresa una ciudad.");
    }
}

// Llamamos la función al cargar la página con la ciudad por defecto
document.addEventListener("DOMContentLoaded", () => {
    getWeather();
});



