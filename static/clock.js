// clock.js

// Function to update the clock
export async function updateClock() {
    console.log("Updating clock...");
    try {
        const response = await fetch(`https://timeapi.io/api/Time/current/zone?timeZone=${window.TIME_ZONE}`);
        if (!response.ok) {
            throw new Error(translations[localStorage.getItem('lang') || 'pl'].timeZoneError);
        }
        const data = await response.json();

        const hours = String(data.hour).padStart(2, '0');
        const minutes = String(data.minute).padStart(2, '0');
        
        // Select hour and minute elements
        const hoursElement = document.getElementById('hours');
        const minutesElement = document.getElementById('minutes');

        // Add transition effect classes before updating time
        hoursElement.classList.add('transition-transform', 'transform', 'scale-125', 'duration-300', 'ease-in-out');
        minutesElement.classList.add('transition-transform', 'transform', 'scale-125', 'duration-300', 'ease-in-out');

        setTimeout(() => {
            // Update elements with hours and minutes
            hoursElement.textContent = hours;
            minutesElement.textContent = minutes;

            // Remove the transition classes after the update
            hoursElement.classList.remove('scale-125');
            minutesElement.classList.remove('scale-125');
        }, 300); // Matches the duration of the transition

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
