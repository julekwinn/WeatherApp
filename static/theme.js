// theme.js
import { updateWeather } from './weather.js';
import { updateClock } from './clock.js';

export function applyTheme(theme) {
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

export function toggleTheme() {
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

export function setInitialTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        console.log(`Applying saved theme: ${savedTheme}`);
        applyTheme(savedTheme);
    } else {
        applyTheme('light'); // Default to light theme if no saved theme exists
    }
}
