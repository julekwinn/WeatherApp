// weather.js
import { translations } from './language.js';


// Function to update the weather
export async function updateWeather() {
    console.log("Updating weather...");
    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${LOCATION_LAT}&longitude=${LOCATION_LON}&current_weather=true&hourly=temperature_2m,precipitation,precipitation_probability,weathercode,cloudcover,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,weathercode&timezone=Europe%2FWarsaw`);
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json();

        const currentWeather = data.current_weather;
        const hourlyForecast = data.hourly;
        const dailyForecast = data.daily;

        // Update current weather
        document.getElementById('current-temperature').textContent = `${currentWeather.temperature}°C`;
        document.getElementById('current-condition').textContent = translateWeatherCode(currentWeather.weathercode);
        document.getElementById('current-details').textContent = `${translations[localStorage.getItem('lang') || 'pl'].feelsLike}: ${currentWeather.windspeed} km/h`;

        // Update weather icon
        updateWeatherIcon('weather-icon', currentWeather.weathercode);

        // Determine color class based on theme
        const themeClass = document.body.classList.contains('bg-gray-900') ? 'text-gray-300' :
                           document.body.classList.contains('bg-gray-100') ? 'text-gray-600' :
                           document.body.classList.contains('bg-blue-900') ? 'text-blue-300' :
                           document.body.classList.contains('bg-green-900') ? 'text-green-300' :
                           document.body.classList.contains('bg-pink-200') ? 'text-pink-600' : 'text-gray-600';

        // Update today's forecast
        const forecastToday = document.getElementById('forecast-today');
        forecastToday.innerHTML = ''; // Clear previous data

        for (let i = 12; i <= 18; i += 3) {
            const hourIndex = i;
            const temp = hourlyForecast.temperature_2m[hourIndex];
            const weatherCode = hourlyForecast.weathercode[hourIndex];
            const time = `${hourIndex}:00`;
            const precipitationProbability = hourlyForecast.precipitation_probability[hourIndex];

            forecastToday.innerHTML += `
                <div class="mx-4">
                    <p class="text-xl font-semibold ${themeClass}">${time}</p>
                    <p class="text-lg ${themeClass}">
                        ${getWeatherIcon(weatherCode)} ${temp}°C ${translateWeatherCode(weatherCode)}, ${translations[localStorage.getItem('lang') || 'pl'].chanceOfPrecipitation}: ${precipitationProbability}%
                    </p>
                </div>
            `;
        }

        // Update tomorrow's forecast
        const forecastTomorrow = document.getElementById('forecast-tomorrow');
        forecastTomorrow.innerHTML = ''; // Clear previous data

        const timesOfDay = [7, 12, 15]; // Times: 7:00 AM, 12:00 PM, 3:00 PM
        const labels = localStorage.getItem('lang') === 'en' ? ['Morning', 'Afternoon', 'Evening'] : ['Rano', 'Południe', 'Wieczór'];

        for (let i = 0; i < timesOfDay.length; i++) {
            const hourIndex = timesOfDay[i];
            const temp = hourlyForecast.temperature_2m[hourIndex];
            const weatherCode = hourlyForecast.weathercode[hourIndex];
            const precipitationProbabilityMax = hourlyForecast.precipitation_probability[hourIndex];
            const timeOfDay = labels[i];

            forecastTomorrow.innerHTML += `
                <div class="mx-4">
                    <p class="text-lg font-semibold ${themeClass}">${timeOfDay}</p>
                    <p class="text-xl ${themeClass}">
                        ${getWeatherIcon(weatherCode)} ${temp}°C ${translateWeatherCode(weatherCode)}, ${translations[localStorage.getItem('lang') || 'pl'].chanceOfPrecipitation}: ${precipitationProbabilityMax}%
                    </p>
                </div>
            `;
        }

        console.log("Weather updated.");

    } catch (error) {
        console.error('Error fetching weather from API:', error);
    }
}


// Translating weather codes to text
export function translateWeatherCode(code) {
    const lang = localStorage.getItem('lang') || 'pl';
    const weatherConditions = {
        0: lang === 'en' ? 'Clear' : 'Bezchmurnie',
        1: lang === 'en' ? 'Mostly clear' : 'Przeważnie bezchmurnie',
        2: lang === 'en' ? 'Partly cloudy' : 'Częściowe zachmurzenie',
        3: lang === 'en' ? 'Cloudy' : 'Zachmurzenie',
        45: lang === 'en' ? 'Fog' : 'Mgła',
        48: lang === 'en' ? 'Dense fog' : 'Gęsta mgła',
        51: lang === 'en' ? 'Drizzle' : 'Mżawka',
        53: lang === 'en' ? 'Drizzle' : 'Mżawka',
        55: lang === 'en' ? 'Heavy drizzle' : 'Intensywna mżawka',
        61: lang === 'en' ? 'Light rain' : 'Lekki deszcz',
        63: lang === 'en' ? 'Rain' : 'Deszcz',
        65: lang === 'en' ? 'Heavy rain' : 'Intensywny deszcz',
        71: lang === 'en' ? 'Light snow' : 'Lekki śnieg',
        73: lang === 'en' ? 'Snow' : 'Śnieg',
        75: lang === 'en' ? 'Heavy snow' : 'Intensywny śnieg',
        80: lang === 'en' ? 'Light showers' : 'Lekka mżawka',
        81: lang === 'en' ? 'Showers' : 'Przelotne opady',
        82: lang === 'en' ? 'Heavy showers' : 'Intensywne opady',
        95: lang === 'en' ? 'Thunderstorm' : 'Burza',
        96: lang === 'en' ? 'Thunderstorm with hail' : 'Burza z gradem',
        99: lang === 'en' ? 'Severe thunderstorm with hail' : 'Silna burza z gradem'
    };
    console.log(`Translating weather code: ${code} -> ${weatherConditions[code] || translations[lang].unknownWeather}`);
    return weatherConditions[code] || translations[lang].unknownWeather;
}

// Weather icons
export function getWeatherIcon(code) {
    const icons = {
        0: '<i class="fas fa-sun text-yellow-500"></i>',
        1: '<i class="fas fa-sun text-yellow-400"></i>',
        2: '<i class="fas fa-cloud-sun text-gray-400"></i>',
        3: '<i class="fas fa-cloud text-gray-500"></i>',
        45: '<i class="fas fa-smog text-gray-600"></i>',
        48: '<i class="fas fa-smog text-gray-700"></i>',
        51: '<i class="fas fa-cloud-rain text-blue-400"></i>',
        53: '<i class="fas fa-cloud-rain text-blue-500"></i>',
        55: '<i class="fas fa-cloud-showers-heavy text-blue-600"></i>',
        61: '<i class="fas fa-cloud-rain text-blue-400"></i>',
        63: '<i class="fas fa-cloud-rain text-blue-500"></i>',
        65: '<i class="fas fa-cloud-showers-heavy text-blue-600"></i>',
        71: '<i class="fas fa-snowflake text-blue-300"></i>',
        73: '<i class="fas fa-snowflake text-blue-400"></i>',
        75: '<i class="fas fa-snowflake text-blue-500"></i>',
        80: '<i class="fas fa-cloud-rain text-blue-400"></i>',
        81: '<i class="fas fa-cloud-rain text-blue-500"></i>',
        82: '<i class="fas fa-cloud-showers-heavy text-blue-600"></i>',
        95: '<i class="fas fa-bolt text-yellow-600"></i>',
        96: '<i class="fas fa-bolt text-yellow-700"></i>',
        99: '<i class="fas fa-bolt text-yellow-800"></i>'
    };
    console.log(`Getting weather icon for code: ${code}`);
    return icons[code] || '<i class="fas fa-question"></i>';
}

export function updateWeatherIcon(elementId, weatherCode) {
    console.log(`Updating weather icon for element ${elementId} with code ${weatherCode}`);
    document.getElementById(elementId).innerHTML = getWeatherIcon(weatherCode);
}
