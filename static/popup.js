// popup.js

// Function to display a popup message
export function fetchMessage() {
    console.log("Fetching popup message...");
    if (!shouldShowPopup) {
        console.log("Popup is disabled. Skipping message fetch.");
        return; // Check if the popup should be displayed
    }
    
    // Display the message in the popup
    showPopup(POPUP_MESSAGE_TEXT);
}

export function showPopup(message) {
    console.log(`Showing popup with message: ${message}`);
    document.getElementById('popupMessage').textContent = message;
    document.getElementById('popup').classList.remove('hidden');
}

// Function to close the popup
document.getElementById('closePopup').addEventListener('click', () => {
    console.log("Closing popup.");
    document.getElementById('popup').classList.add('hidden');
});
