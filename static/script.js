// Konfiguracja tłumaczeń
const translations = {
    en: {
        title: "Clock and Weather",
        feelsLike: "Wind speed",
        humidity: "Humidity",
        forecastToday: "Today's Forecast",
        forecastTomorrow: "Tomorrow's Forecast",
        popupMessage: "Message",
        timeZoneError: "Error fetching time",
        unknownWeather: "Unknown weather condition"
    },
    pl: {
        title: "Zegar i Pogodynka",
        feelsLike: "Prędkość wiatru",
        humidity: "Wilgotność",
        forecastToday: "Prognoza dzisiaj",
        forecastTomorrow: "Prognoza na jutro",
        popupMessage: "Wiadomość",
        timeZoneError: "Błąd pobierania czasu",
        unknownWeather: "Nieznane warunki pogodowe"
    }
};

// Function to fetch configuration from config.json file
async function fetchConfig() {
    console.log("Fetching configuration from /static/config.json...");
    try {
        const response = await fetch('/static/config.json');
        if (!response.ok) {
            throw new Error(`Failed to load config: ${response.statusText}`);
        }
        const config = await response.json();
        console.log("Configuration loaded:", config);

        // Setting constants based on the configuration
        window.REFRESH_INTERVAL = config.REFRESH_INTERVAL || 3600000;
        window.CLOCK_UPDATE_INTERVAL = config.CLOCK_UPDATE_INTERVAL || 60000;
        window.WEATHER_UPDATE_INTERVAL = config.WEATHER_UPDATE_INTERVAL || 3600000;
        window.POPUP_MESSAGE_INTERVAL = config.POPUP_MESSAGE_INTERVAL || 30000;
        window.LOCATION_LAT = config.LOCATION_LAT || 52.2297;
        window.LOCATION_LON = config.LOCATION_LON || 14.4407;
        window.POPUP_MESSAGE_TEXT = config.POPUP_MESSAGE_TEXT || "";
        window.shouldShowPopup = config.SHOULD_SHOW_POPUP || false;
        window.TIME_ZONE = config.TIME_ZONE || 'Europe/Warsaw';

        console.log("Configuration applied successfully.");
    } catch (error) {
        console.error('Error fetching config:', error);
        // Setting default values if the configuration fails to load
        window.REFRESH_INTERVAL = 3600000;
        window.CLOCK_UPDATE_INTERVAL = 60000;
        window.WEATHER_UPDATE_INTERVAL = 3600000;
        window.POPUP_MESSAGE_INTERVAL = 30000;
        window.LOCATION_LAT = 52.2297;
        window.LOCATION_LON = 21.0122;
        window.POPUP_MESSAGE_TEXT = "";
        window.shouldShowPopup = false;
        window.TIME_ZONE = 'Europe/Warsaw'; // Default time zone value

        console.log("Default configuration applied due to error.");
    }
}

function applyTheme(theme) {
    const body = document.body;
    const elements = {
        clock: document.getElementById('clock'),
        date: document.getElementById('date'),
        weatherIcon: document.getElementById('weather-icon'),
        currentTemperature: document.getElementById('current-temperature'),
        currentCondition: document.getElementById('current-condition'),
        currentDetails: document.getElementById('current-details'),
        forecastToday: document.getElementById('forecast-today'),
        forecastTomorrow: document.getElementById('forecast-tomorrow'),
        themeIcon: document.getElementById('theme-icon')
    };

    // Remove existing theme classes
    body.classList.remove('bg-gray-100', 'bg-gray-900', 'bg-blue-900', 'bg-green-900', 'bg-pink-200');
    body.classList.remove('text-gray-900', 'text-gray-100', 'text-blue-100', 'text-green-100', 'text-pink-900');
    body.classList.remove('text-gray-600', 'text-gray-300', 'text-blue-600', 'text-blue-300', 'text-green-600', 'text-green-300', 'text-pink-600', 'text-pink-300');

    for (const key in elements) {
        if (elements[key]) {
            elements[key].classList.remove(
                'text-gray-600', 'text-gray-300',
                'text-blue-600', 'text-blue-300',
                'text-green-600', 'text-green-300',
                'text-pink-600', 'text-pink-300'
            );
        }
    }

    // Remove existing theme icon class
    if (elements.themeIcon) {
        elements.themeIcon.classList.remove('fa-sun', 'fa-moon', 'fa-water', 'fa-heart');
    }

    // Apply new theme classes
    switch (theme) {
        case 'dark':
            body.classList.add('bg-gray-900', 'text-gray-100');
            if (elements.themeIcon) {
                elements.themeIcon.classList.add('fa-moon');
            }
            for (const key in elements) {
                if (elements[key]) {
                    elements[key].classList.add('text-gray-300');
                }
            }
            break;
        case 'light':
            body.classList.add('bg-gray-100', 'text-gray-900');
            if (elements.themeIcon) {
                elements.themeIcon.classList.add('fa-sun');
            }
            for (const key in elements) {
                if (elements[key]) {
                    elements[key].classList.add('text-gray-600');
                }
            }
            break;
        case 'ocean':
            body.classList.add('bg-blue-900', 'text-blue-100');
            if (elements.themeIcon) {
                elements.themeIcon.classList.add('fa-water');
            }
            for (const key in elements) {
                if (elements[key]) {
                    elements[key].classList.add('text-blue-300');
                }
            }
            break;
        case 'pastel':
            body.classList.add('bg-pink-200', 'text-pink-900');
            if (elements.themeIcon) {
                elements.themeIcon.classList.add('fa-heart');
            }
            for (const key in elements) {
                if (elements[key]) {
                    elements[key].classList.add('text-pink-600');
                }
            }
            break;
        default:
            console.error('Unknown theme:', theme);
            break;
    }

    console.log(`Theme applied: ${theme}`);

    // Force a reflow to ensure new styles are applied
    body.offsetHeight; // Trigger a reflow
}

function toggleTheme() {
    const body = document.body;
    const currentTheme = body.classList.contains('bg-gray-900') ? 'dark' :
                         body.classList.contains('bg-gray-100') ? 'light' :
                         body.classList.contains('bg-blue-900') ? 'ocean' :
                         body.classList.contains('bg-pink-200') ? 'pastel' : 'light';

    const themes = ['light', 'dark', 'ocean', 'pastel'];
    const currentThemeIndex = themes.indexOf(currentTheme);
    const newTheme = themes[(currentThemeIndex + 1) % themes.length];

    console.log(`Toggling theme from ${currentTheme} to ${newTheme}`);
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    console.log(`Theme toggled and saved: ${newTheme}`);

    // Trigger update for weather and clock to apply new theme styles
    updateWeather();
    updateClock();
}

function setInitialTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        console.log(`Applying saved theme: ${savedTheme}`);
        applyTheme(savedTheme);
    } else {
        applyTheme('light'); // Default to light theme if no saved theme exists
    }
}

// Function to update the clock
async function updateClock() {
    console.log("Updating clock...");
    try {
        const response = await fetch(`https://timeapi.io/api/Time/current/zone?timeZone=${window.TIME_ZONE}`);
        if (!response.ok) {
            throw new Error(translations[localStorage.getItem('lang') || 'pl'].timeZoneError);
        }
        const data = await response.json();

        const hours = String(data.hour).padStart(2, '0');
        const minutes = String(data.minute).padStart(2, '0');
        
        // Update elements with hours and minutes
        document.getElementById('hours').textContent = hours;
        document.getElementById('minutes').textContent = minutes;

        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const dateString = new Date(`${data.year}-${data.month}-${data.day}`).toLocaleDateString(localStorage.getItem('lang') || 'pl', options);

        document.getElementById('date').textContent = dateString;

        console.log(`Clock updated for time zone ${window.TIME_ZONE}: ${hours}:${minutes}, Date: ${dateString}`);
    } catch (error) {
        console.error('Error fetching time from API:', error);
        document.getElementById('hours').textContent = translations[localStorage.getItem('lang') || 'pl'].timeZoneError;
        document.getElementById('minutes').textContent = '';
    }
}

// Function to update the weather
async function updateWeather() {
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
                        ${getWeatherIcon(weatherCode)} ${temp}°C ${translateWeatherCode(weatherCode)}, Chance of precipitation: ${precipitationProbability}%
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
                        ${getWeatherIcon(weatherCode)} ${temp}°C ${translateWeatherCode(weatherCode)}, Chance of precipitation: ${precipitationProbabilityMax}%
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
function translateWeatherCode(code) {
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
function getWeatherIcon(code) {
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

function updateWeatherIcon(elementId, weatherCode) {
    console.log(`Updating weather icon for element ${elementId} with code ${weatherCode}`);
    document.getElementById(elementId).innerHTML = getWeatherIcon(weatherCode);
}

// Function to display a popup message
function fetchMessage() {
    console.log("Fetching popup message...");
    if (!shouldShowPopup) {
        console.log("Popup is disabled. Skipping message fetch.");
        return; // Check if the popup should be displayed
    }
    
    // Display the message in the popup
    showPopup(POPUP_MESSAGE_TEXT);
}

function showPopup(message) {
    console.log(`Showing popup with message: ${message}`);
    document.getElementById('popupMessage').textContent = message;
    document.getElementById('popup').classList.remove('hidden');
}

// Function to close the popup
document.getElementById('closePopup').addEventListener('click', () => {
    console.log("Closing popup.");
    document.getElementById('popup').classList.add('hidden');
});

// Function to automatically refresh the page every hour
function reloadPage() {
    console.log("Reloading the page...");
    window.location.reload();
}

// Language toggle function
function toggleLanguage() {
    const currentLang = localStorage.getItem('lang') || 'pl';
    const newLang = currentLang === 'pl' ? 'en' : 'pl';
    localStorage.setItem('lang', newLang);
    applyLanguage(newLang);
    updateClock(); // Ensure clock and date are updated immediately
    updateWeather(); // Ensure weather is updated immediately
}

function applyLanguage(lang) {
    document.querySelector('title').textContent = translations[lang].title;
    document.getElementById('forecast-today').previousElementSibling.textContent = translations[lang].forecastToday;
    document.getElementById('forecast-tomorrow').previousElementSibling.textContent = translations[lang].forecastTomorrow;
    document.getElementById('popupMessage').textContent = translations[lang].popupMessage;
}

// Function to initialize after loading configuration
async function initialize() {
    console.log("Initializing application...");
    await fetchConfig(); // Wait for configuration to load

    setInitialTheme();
    document.getElementById('toggleTheme').addEventListener('click', toggleTheme);

    const savedLang = localStorage.getItem('lang') || 'pl';
    applyLanguage(savedLang);
    document.getElementById('toggleLanguage').addEventListener('click', toggleLanguage);

    updateClock();
    updateWeather();
    
    setInterval(updateClock, window.CLOCK_UPDATE_INTERVAL); // Update the clock every minute
    setInterval(updateWeather, window.WEATHER_UPDATE_INTERVAL); // Update the weather every hour

    setInterval(fetchMessage, window.POPUP_MESSAGE_INTERVAL); // Trigger popup every 30 seconds

    setInterval(reloadPage, window.REFRESH_INTERVAL); // Automatically refresh the page every hour

    console.log("Application initialized.");
}

// Initialize functions after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initialize);
