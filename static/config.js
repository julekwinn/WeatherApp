// config.js

// Function to fetch configuration from config.json file
export async function fetchConfig() {
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
