async function updateWeather(latitude = 44.3894, longitude = -79.6903, locationName = "Barrie, Ontario") {

    const weather = document.getElementById("weather");

    if (!weather) return;

    weather.innerHTML = "Loading weather...";

    try {

        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code&daily=temperature_2m_max,temperature_2m_min&timezone=auto`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Weather request failed");
        }

        const data = await response.json();

        const current = data.current;
        const daily = data.daily;

        weather.innerHTML = `
            <h3>📍 ${locationName}</h3>

            <h1>${current.temperature_2m}°C</h1>

            <p>Feels like ${current.apparent_temperature}°C</p>

            <p>💨 Wind: ${current.wind_speed_10m} km/h</p>

            <p>💧 Humidity: ${current.relative_humidity_2m}%</p>

            <p>
                ⬆ ${daily.temperature_2m_max[0]}°C
                &nbsp;&nbsp;
                ⬇ ${daily.temperature_2m_min[0]}°C
            </p>

            <small>Updated ${new Date().toLocaleTimeString()}</small>
        `;

    } catch (error) {

        weather.innerHTML = "Unable to load weather.";

        console.error(error);

    }

}

function startWeather() {

    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(

            position => {

                updateWeather(
                    position.coords.latitude,
                    position.coords.longitude,
                    "Current Location"
                );

            },

            () => {

                updateWeather();

            }

        );

    } else {

        updateWeather();

    }

}

document.addEventListener("DOMContentLoaded", () => {

    startWeather();

    setInterval(startWeather, 1800000);

});