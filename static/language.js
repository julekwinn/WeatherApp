// language.js

import { updateClock } from './clock.js';
import { updateWeather } from './weather.js';
// Konfiguracja tłumaczeń
export const translations = {
    en: {
        title: "Clock and Weather",
        feelsLike: "Wind speed",
        humidity: "Humidity",
        forecastToday: "Today's Forecast",
        forecastTomorrow: "Tomorrow's Forecast",
        popupMessage: "Message",
        timeZoneError: "Error fetching time",
        unknownWeather: "Unknown weather condition",
        chanceOfPrecipitation: "Chance of precipitation" // Dodano tłumaczenie dla angielskiego
    },
    pl: {
        title: "Zegar i Pogodynka",
        feelsLike: "Prędkość wiatru",
        humidity: "Wilgotność",
        forecastToday: "Prognoza dzisiaj",
        forecastTomorrow: "Prognoza na jutro",
        popupMessage: "Wiadomość",
        timeZoneError: "Błąd pobierania czasu",
        unknownWeather: "Nieznane warunki pogodowe",
        chanceOfPrecipitation: "Szansa opadów" // Dodano tłumaczenie dla polskiego
    }
};

// Language toggle function
export function toggleLanguage() {
    const currentLang = localStorage.getItem('lang') || 'pl';
    const newLang = currentLang === 'pl' ? 'en' : 'pl';
    localStorage.setItem('lang', newLang);
    applyLanguage(newLang);
    updateClock(); // Ensure clock and date are updated immediately
    updateWeather(); // Ensure weather is updated immediately
}

export function applyLanguage(lang) {
    document.querySelector('title').textContent = translations[lang].title;
    document.getElementById('forecast-today').previousElementSibling.textContent = translations[lang].forecastToday;
    document.getElementById('forecast-tomorrow').previousElementSibling.textContent = translations[lang].forecastTomorrow;
    document.getElementById('popupMessage').textContent = translations[lang].popupMessage;
}
