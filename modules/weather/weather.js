/*
==================================================
File:
    weather.js

Version:
    Ben OS v2.0

Purpose:
    Displays live local weather conditions on the
    Ben OS dashboard.

Responsibilities:
    - Detect user location via geolocation, with a
      fallback location if unavailable
    - Fetch current and daily weather data from the
      Open-Meteo API
    - Render weather conditions into the DOM
    - Refresh weather data on a recurring interval

Dependencies:
    BenOS Core

Used By:
    Application UI

Future Improvements:
    - Storage integration
    - Event integration
    - Logger integration for weather updates

Last Updated:
    Ben OS v2.0
==================================================
*/


BenOS.modules.weather = {

    /*
    ------------------------------------
    Update Weather
    ------------------------------------
    */

    async updateWeather(latitude = 44.3894, longitude = -79.6903, locationName = "Barrie, Ontario") {

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
            <h3>🌤 ${locationName}</h3>

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

    },


    /*
    ------------------------------------
    Start Weather
    ------------------------------------
    */

    startWeather() {

        if (navigator.geolocation) {

            navigator.geolocation.getCurrentPosition(

                position => {

                    this.updateWeather(
                        position.coords.latitude,
                        position.coords.longitude,
                        "Current Location"
                    );

                },

                () => {

                    this.updateWeather();

                }

            );

        } else {

            this.updateWeather();

        }

    },


    /*
    ------------------------------------
    Initialize Weather
    ------------------------------------
    */

    init() {

        this.startWeather();

        setInterval(() => this.startWeather(), 1800000);

        if (BenOS.logger) {

            BenOS.logger.info(
                "Weather module initialized"
            );

        }

    }


};


document.addEventListener("DOMContentLoaded", () => {

    BenOS.modules.weather.init();

});
