### WeatherApp

Welcome to **WeatherApp**, your go-to solution for real-time weather updates and seamless time display. Designed with a sleek, responsive interface, WeatherApp offers a variety of features to enhance your weather-watching experience. Whether you want to stay updated with the latest weather conditions, keep track of time across different time zones, or personalize the app’s appearance and language settings, WeatherApp has got you covered.

![GIF(1)](https://github.com/user-attachments/assets/3d2f138f-8900-4e5c-ac46-5b5d4a461c34)


![Weather_screen_1](https://github.com/user-attachments/assets/6212bf56-e26c-49f1-852a-5e834c581b49)

![obraz](https://github.com/user-attachments/assets/97536a9d-9013-4821-b539-7e516655336f)


---

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Flask](https://img.shields.io/badge/framework-Flask-red)
![Tailwind CSS](https://img.shields.io/badge/css-Tailwind-blue)
![License](https://img.shields.io/badge/license-MIT-green)

---

### Key Features

| 🌦️ **Real-time Weather Updates**  | Fetches and displays current weather conditions, ensuring you stay informed about the latest weather developments. |
|----------------------------------|------------------------------------------------------------------------------------------------------------|
| 🌡️ **Clock Display**              | Shows the current time, adjusting seamlessly to your selected timezone for accurate timekeeping.            |
| 🌍 **Language Toggle**            | Supports switching between English and Polish, allowing users to choose their preferred language.           |
| 🎨 **Theme Toggle**               | Easily switch between light, dark, ocean, and pastel themes to personalize your app experience.            |

---

WeatherApp is built using the lightweight and powerful **Flask** framework. Flask is utilized primarily to allow users to easily host the application themselves, providing a simple and flexible way to run the app on any machine. The use of Flask ensures that the application remains straightforward in operation—just set it up and run it, with no complex configurations required.

### Why Choose WeatherApp?

- **Simplicity in Operation**: With minimal setup required, WeatherApp is designed to be easy to deploy and run. Just clone the repository, install dependencies, and you're good to go!
- **Self-Hosting Capability**: Host WeatherApp on your own server or local machine with ease, giving you complete control over your data and settings.
- **Elegant Design**: The app features a modern, visually appealing interface, making it both functional and a pleasure to use.
- **Responsive and Customizable**: WeatherApp is fully responsive, adapting to various screen sizes, and offers multiple themes and language options to suit your preferences.

Whether you're a developer looking to host a simple weather app on your server or a user seeking an attractive and customizable weather dashboard, WeatherApp is the perfect choice, combining ease of use with powerful features.


# WeatherApp Documentation

Welcome to the WeatherApp documentation! This guide will help you understand the structure, functionality, and setup process of the application. The application is designed to provide weather updates and a clock display using the Flask framework.

## Table of Contents
1. [Introduction](#introduction)
2. [Features](#features)
3. [Project Structure](#project-structure)
4. [Installation](#installation)
5. [Configuration](#configuration)
6. [Running the Application](#running-the-application)
7. [Scripts](#scripts)
   - [Batch Script](#batch-script-windows)
   - [Bash Script](#bash-script-unix-based-systems)
8. [Frontend](#frontend)
   - [HTML](#html)
   - [JavaScript](#javascript)
   - [CSS](#css)
9. [API Integration](#api-integration)
10. [License](#license)


## Introduction

WeatherApp is a Flask-based web application designed to display real-time weather updates and a clock. It includes language and theme toggles, customizable settings, and supports multiple time zones.

## Features

- **Real-time Weather Updates**: Fetches current weather data and displays hourly and daily forecasts.
- **Clock Display**: Shows the current time with smooth transitions.
- **Language Toggle**: Supports English and Polish languages.
- **Theme Toggle**: Switches between light, dark, ocean, and pastel themes.
- **Popup Messages**: Displays customizable popup messages at defined intervals.
- **Responsive Design**: Mobile-friendly and adaptable to various screen sizes.

## Project Structure

```plaintext
├── app.py
├── static
│   ├── config.json
│   ├── main.js
│   ├── clock.js
│   ├── config.js
│   ├── language.js
│   ├── popup.js
│   ├── theme.js
│   └── weather.js
├── templates
│   └── index.html
├── scripts
│   ├── setup.bat
│   └── setup.sh
└── README.md 
```

- `app.py`: The main Flask application file.
- `static/`: Directory containing static files like JavaScript modules and configuration.
- `templates/`: Directory containing HTML templates.
- `scripts/`: Directory containing setup scripts.

## Installation

Before you start with the installation, ensure that you have **Python 3.7+** installed on your system. The WeatherApp is built using the Flask framework, and all necessary dependencies will be managed within a Python virtual environment. To make the setup process straightforward, we have provided both a batch script for Windows and a bash script for Linux/macOS. These scripts will handle everything from creating the virtual environment to installing dependencies and running the Flask server.

## Configuration

The application offers flexible configuration options to tailor its behavior to your specific needs. You can configure the application in two main ways: directly editing the `config.json` file or using provided scripts.

### 1. Configuration via `config.json`

The `config.json` file is the main configuration file for the application. It contains various settings that control how the application behaves. Below is an overview of the key configuration options available in this file:

- **REFRESH_INTERVAL**: Defines the interval (in milliseconds) at which the entire page should refresh automatically. For example, setting this to `3600000` will refresh the page every hour.
- **CLOCK_UPDATE_INTERVAL**: Specifies how often (in milliseconds) the clock should update. A common setting is `60000` (1 minute).
- **WEATHER_UPDATE_INTERVAL**: Determines how often (in milliseconds) the weather information should be updated. A typical setting is `3600000` (1 hour).
- **POPUP_MESSAGE_INTERVAL**: Sets the interval (in milliseconds) for displaying popup messages. This could be used for reminders or alerts.
- **LOCATION_LAT**: The latitude coordinate of your location, used for fetching accurate weather data.
- **LOCATION_LON**: The longitude coordinate of your location, used for fetching accurate weather data.
- **POPUP_MESSAGE_TEXT**: The text that will be displayed in the popup message, if popups are enabled.
- **SHOULD_SHOW_POPUP**: A boolean value (`true` or `false`) that determines whether popup messages should be displayed.
- **TIME_ZONE**: The time zone that the clock will use to display the current time. This should be set according to your local time zone, e.g., `"Europe/Warsaw"`.

#### Example `config.json`:

```json
{
    "REFRESH_INTERVAL": 3600000,
    "CLOCK_UPDATE_INTERVAL": 60000,
    "WEATHER_UPDATE_INTERVAL": 3600000,
    "POPUP_MESSAGE_INTERVAL": 30000,
    "LOCATION_LAT": 52.2297,
    "LOCATION_LON": 21.0122,
    "POPUP_MESSAGE_TEXT": "Remember to stay hydrated!",
    "SHOULD_SHOW_POPUP": false,
    "TIME_ZONE": "Europe/Warsaw"
}
```
To manually edit the configuration:

1. Open the `config.json` file in a text editor.
2. Adjust the values as needed.
3. Save the file and restart the application to apply the changes.

## Configuration via Scripts

The application includes scripts that automate the configuration process. These scripts can be particularly useful if you prefer a guided setup or need to configure the application in different environments (e.g., Windows vs. Unix-based systems).


## Scripts


### Batch Script

The batch script (`.bat` file) is used for automating tasks on Windows. Below is a brief overview of the script provided:

- **Language Selection**: The script allows the user to choose between English and Polish for the setup process.
- **Menu Options**:
  - **Edit `config.json` file**: Modify the application's configuration.
  - **Create virtual environment**: Sets up a Python virtual environment.
  - **Activate virtual environment, install dependencies, and run Flask server**: This option activates the virtual environment, installs necessary dependencies, and runs the Flask server.
  - **Exit**: Ends the script execution.
- **Error Handling**: The script includes error handling to ensure smooth execution.

### Bash Script

The bash script (`.sh` file) is used for automating tasks on Unix-based systems. Below is a brief overview of the script provided:

- **Language Selection**: The script allows the user to choose between English and Polish.
- **Menu Options**:
  - **Edit `config.json` file**: Modify the application's configuration.
  - **Create virtual environment**: Sets up a Python virtual environment.
  - **Activate virtual environment, install dependencies, and run Flask server**: This option activates the virtual environment, installs necessary dependencies, and runs the Flask server.
  - **Exit**: Ends the script execution.
- **Error Handling**: The script includes error handling to ensure smooth execution.

To run the script:

#### Batch Script (Windows)

To run the batch script:

1. **Locate the Script**: Find the `.bat` file in your application directory.
2. **Run the Script**: Double-click the `.bat` file, or open a command prompt and navigate to the directory containing the script, then run the script by typing its name and pressing `Enter`.

    setup.bat

3. **Follow the Instructions**: The script will present a menu where you can select options to edit the `config.json` file, create a virtual environment, install dependencies, and run the Flask server.

#### Bash Script (Unix-based Systems)

To run the bash script:

1. **Open a Terminal**: Open your terminal.
2. **Navigate to the Script Directory**: Use the `cd` command to navigate to the directory containing the script.

    cd /path/to/your/script

3. **Run the Script**: Execute the script by typing `./` followed by the script name and pressing `Enter`.

    ./setup.sh

4. **Follow the Instructions**: The script will present a menu where you can select options to edit the `config.json` file, create a virtual environment, install dependencies, and run the Flask server.


## Frontend

### HTML

The HTML file is the structure of the web application. It defines the layout, headings, and where content and scripts will be displayed or executed. This includes elements like the clock, weather display, and any other UI components.

### JavaScript

The JavaScript files control the interactive aspects of the web application. Key functionalities include:

- **Weather Updates**: Fetches and displays the current weather conditions using the Open-Meteo API.
- **Clock Updates**: Fetches and displays the current time based on the specified timezone.
- **Theme Management**: Allows users to switch between different themes (e.g., light, dark, ocean, pastel).
- **Language Toggle**: Switches the application language between English and Polish.

### CSS

The CSS file defines the visual styling of the application, including colors, fonts, layout, and responsive design. This application utilizes **Tailwind CSS**, a utility-first CSS framework that allows for rapid UI development. 

- **Tailwind CSS Utility Classes**: The application heavily relies on Tailwind's utility classes for styling. These classes are used to control layout, spacing, typography, colors, and more directly in the HTML.
- **Dynamic Theme Application**: Tailwind CSS classes are dynamically applied based on the selected theme. This means that when a user switches between themes (e.g., light, dark, ocean, pastel), the appropriate Tailwind classes are added or removed to adjust the appearance of the application without the need for additional CSS files.
- **Responsive Design**: Tailwind's responsive utilities ensure that the application is fully responsive, providing an optimal viewing experience across a wide range of devices, from mobile phones to desktop computers.

Using Tailwind CSS allows for a highly customizable, yet consistent and maintainable style across the entire application.


## API Integration

The application integrates with several APIs to fetch real-time data:

- **Open-Meteo API**: Used to fetch weather data based on the user's location.
- **Time API**: Fetches the current time for a specified timezone.

These integrations are handled through asynchronous JavaScript functions, which ensure that the application remains responsive while fetching data.

## License

This application is licensed under the MIT License. This means you are free to use, modify, and distribute the software, provided that the original copyright notice and this permission notice are included in all copies or substantial portions of the software.


## Author

**Juliusz Winnicki**

- GitHub: [github.com/julekwinn](https://github.com/julekwinn)
- Email: julekwinn@gmail.com
