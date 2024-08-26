// main.js

// Import necessary modules
import { fetchConfig } from './config.js';
import { setInitialTheme, toggleTheme } from './theme.js';
import { updateClock } from './clock.js';
import { updateWeather } from './weather.js';
import { toggleLanguage, applyLanguage } from './language.js';
import { fetchMessage } from './popup.js';

// Function to automatically refresh the page every hour
function reloadPage() {
    console.log("Reloading the page...");
    window.location.reload();
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

    // Add event listeners for the full-screen effect on button clicks
    document.getElementById('toggleTheme').addEventListener('click', () => {
        triggerFullscreenEffect('bg-black/50 backdrop-blur-sm');
    });

    document.getElementById('toggleLanguage').addEventListener('click', () => {
        triggerFullscreenEffect('bg-white/50 backdrop-blur-sm');
    });

    console.log("Application initialized.");
}

// Initialize functions after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initialize);
