async function updateWeather() {

    const weather = document.getElementById("weather");

    if (!weather) return;

    weather.innerHTML = "Loading weather...";

    try {

        const url = "https://api.open-meteo.com/v1/forecast?latitude=44.3894&longitude=-79.6903&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min&timezone=auto";

        const response = await fetch(url);

        const data = await response.json();

        const current = data.current;
        const daily = data.daily;

        weather.innerHTML = `
            <h3>📍 Barrie, Ontario</h3>
            <p><strong>${current.temperature_2m}°C</strong></p>
            <p>Feels like ${current.apparent_temperature}°C</p>
            <p>💨 Wind: ${current.wind_speed_10m} km/h</p>
            <p>💧 Humidity: ${current.relative_humidity_2m}%</p>
            <p>⬆ High: ${daily.temperature_2m_max[0]}°C &nbsp;&nbsp; ⬇ Low: ${daily.temperature_2m_min[0]}°C</p>
        `;

    } catch (error) {

        weather.innerHTML = "Unable to load weather.";

        console.error(error);

    }

}

document.addEventListener("DOMContentLoaded", updateWeather);