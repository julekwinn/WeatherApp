#!/bin/bash

# Definiowanie kolorów
COLOR_DEFAULT="\033[0m"
COLOR_PROMPT="\033[0;34m"
COLOR_SUCCESS="\033[0;32m"
COLOR_ERROR="\033[0;31m"
COLOR_WARNING="\033[0;33m"
COLOR_INFO="\033[0;36m"

# Wybór języka
choose_language() {
    clear
    echo
    echo "*************************************"
    echo "*          Choose Language          *"
    echo "*************************************"
    echo "1. English"
    echo "2. Polski"
    echo "*************************************"
    echo
    read -p "Choose language [1-2]: " lang_choice

    case $lang_choice in
        1) LANG="en" ;;
        2) LANG="pl" ;;
        *) choose_language ;;
    esac
}

choose_language

# Definicja tekstów w zależności od języka
if [ "$LANG" = "en" ]; then
    MENU_TITLE="Setup Menu"
    OPTION_1="Edit config.json file"
    OPTION_2="Create virtual environment"
    OPTION_3="Activate virtual environment, install dependencies, and run Flask server"
    OPTION_4="Exit"
    MSG_FILE_NOT_EXIST="config.json file does not exist."
    MSG_CREATING_FILE="Creating file with default values..."
    MSG_FILE_CREATED="File config.json created."
    MSG_EDIT_CONFIG="Edit the config.json file"
    MSG_CREATE_VENV="Create virtual environment"
    MSG_ENV_EXISTS="Virtual environment already exists."
    MSG_CREATING_VENV="Creating virtual environment..."
    MSG_VENV_CREATED="Virtual environment created."
    MSG_ENV_NOT_EXISTS="Virtual environment does not exist. Please create the virtual environment first."
    MSG_ACTIVATING_ENV="Activating virtual environment..."
    MSG_ERROR_ACTIVATING_ENV="Error activating the virtual environment."
    MSG_INSTALLING_DEPS="Installing required packages..."
    MSG_ERROR_INSTALLING_DEPS="Error installing packages."
    MSG_DEPS_INSTALLED="Packages successfully installed."
    MSG_RUNNING_FLASK="Running Flask server..."
    MSG_ERROR_RUNNING_FLASK="Error running Flask server."
    MSG_EXIT="Script execution finished."
    MSG_ENTER_VALUE="Enter value for"
    MSG_DEFAULT_VALUE="default"
    MSG_CONFIG_UPDATED="File config.json has been updated."
    MSG_INPUT_PROMPT="Choose option [1-4]:"
    MSG_INPUT_ERROR="Invalid option. Please try again."
else
    MENU_TITLE="Menu Konfiguracji"
    OPTION_1="Edytuj plik config.json"
    OPTION_2="Twórz środowisko wirtualne"
    OPTION_3="Aktywuj środowisko wirtualne, zainstaluj zależności i uruchom serwer Flask"
    OPTION_4="Wyjdź"
    MSG_FILE_NOT_EXIST="Plik config.json nie istnieje."
    MSG_CREATING_FILE="Tworzenie pliku z domyślnymi wartościami..."
    MSG_FILE_CREATED="Plik config.json utworzony."
    MSG_EDIT_CONFIG="Edytuj plik config.json"
    MSG_CREATE_VENV="Twórz środowisko wirtualne"
    MSG_ENV_EXISTS="Środowisko wirtualne już istnieje."
    MSG_CREATING_VENV="Tworzenie środowiska wirtualnego..."
    MSG_VENV_CREATED="Środowisko wirtualne utworzone."
    MSG_ENV_NOT_EXISTS="Środowisko wirtualne nie istnieje. Najpierw utwórz środowisko wirtualne."
    MSG_ACTIVATING_ENV="Aktywacja środowiska wirtualnego..."
    MSG_ERROR_ACTIVATING_ENV="Błąd podczas aktywacji środowiska wirtualnego."
    MSG_INSTALLING_DEPS="Instalacja wymaganych pakietów..."
    MSG_ERROR_INSTALLING_DEPS="Błąd podczas instalacji pakietów."
    MSG_DEPS_INSTALLED="Pakiety zainstalowane pomyślnie."
    MSG_RUNNING_FLASK="Uruchamianie serwera Flask..."
    MSG_ERROR_RUNNING_FLASK="Błąd podczas uruchamiania serwera Flask."
    MSG_EXIT="Zakończono działanie skryptu."
    MSG_ENTER_VALUE="Podaj wartość dla"
    MSG_DEFAULT_VALUE="domyślnie"
    MSG_CONFIG_UPDATED="Plik config.json został zaktualizowany."
    MSG_INPUT_PROMPT="Wybierz opcję [1-4]:"
    MSG_INPUT_ERROR="Nieprawidłowa opcja. Spróbuj ponownie."
fi

# Zmiana koloru konsoli na domyślny
echo -e "$COLOR_DEFAULT"

# Ustawienie ścieżki do pliku config.json
CONFIG_FILE="static/config.json"

# Sprawdzenie, czy plik config.json istnieje
if [ ! -f "$CONFIG_FILE" ]; then
    echo
    echo "$MSG_FILE_NOT_EXIST"
    echo "$MSG_CREATING_FILE"
    mkdir -p static
    cat <<EOL > "$CONFIG_FILE"
{
    "REFRESH_INTERVAL": 3600000,
    "CLOCK_UPDATE_INTERVAL": 60000,
    "WEATHER_UPDATE_INTERVAL": 3600000,
    "POPUP_MESSAGE_INTERVAL": 30000,
    "LOCATION_LAT": 52.2297,
    "LOCATION_LON": 21.0122,
    "POPUP_MESSAGE_TEXT": "",
    "SHOULD_SHOW_POPUP": false,
    "TIME_ZONE": "Europe/Warsaw"
}
EOL
    echo "$MSG_FILE_CREATED"
fi

# Menu główne
menu() {
    clear
    echo
    echo "*************************************"
    echo "*           $MENU_TITLE            *"
    echo "*************************************"
    echo "1. $OPTION_1"
    echo "2. $OPTION_2"
    echo "3. $OPTION_3"
    echo "4. $OPTION_4"
    echo "*************************************"
    echo
    read -p "$MSG_INPUT_PROMPT" choice

    case $choice in
        1) edit_config ;;
        2) create_venv ;;
        3) setup_and_run_flask ;;
        4) end_script ;;
        *) echo -e "$COLOR_ERROR$MSG_INPUT_ERROR$COLOR_DEFAULT"; sleep 2; menu ;;
    esac
}

# Funkcja do edycji wartości
edit_value() {
    local key="$1"
    local default_value="$2"

    # Pobranie aktualnej wartości z pliku JSON
    current_value=$(grep "\"$key\"" "$CONFIG_FILE" | awk -F: '{gsub(/[",]/, "", $2); print $2}')
    [ -z "$current_value" ] && current_value="$default_value"

    # Zapytanie użytkownika o nową wartość
    echo -e "$COLOR_PROMPT"
    read -p "$MSG_ENTER_VALUE $key [$MSG_DEFAULT_VALUE: $default_value]: " new_value
    echo -e "$COLOR_DEFAULT"

    # Jeśli użytkownik nie poda nowej wartości, zachowaj domyślną
    [ -z "$new_value" ] && new_value="$default_value"

    # Zastąpienie wartości w zmiennej
    sed -i "s/\"$key\": .*/\"$key\": $new_value,/" "$CONFIG_FILE"
}

edit_config() {
    echo
    edit_value "REFRESH_INTERVAL" "3600000"
    edit_value "CLOCK_UPDATE_INTERVAL" "60000"
    edit_value "WEATHER_UPDATE_INTERVAL" "3600000"
    edit_value "POPUP_MESSAGE_INTERVAL" "30000"
    edit_value "LOCATION_LAT" "52.2297"
    edit_value "LOCATION_LON" "21.0122"
    edit_value "POPUP_MESSAGE_TEXT" "\"\""
    edit_value "SHOULD_SHOW_POPUP" "false"
    edit_value "TIME_ZONE" "\"Europe/Warsaw\""

    # Zapisanie nowego config.json
    echo
    echo -e "$COLOR_SUCCESS$MSG_CONFIG_UPDATED$COLOR_DEFAULT"
    echo
    read -p "Press any key to return to menu..." -n1 -s
    menu
}

create_venv() {
    if [ -d "venv" ]; then
        echo -e "$COLOR_WARNING$MSG_ENV_EXISTS$COLOR_DEFAULT"
    else
        echo "$MSG_CREATING_VENV..."
        python3 -m venv venv
        if [ $? -ne 0 ]; then
            echo -e "$COLOR_ERROR$MSG_ERROR_ACTIVATING_ENV$COLOR_DEFAULT"
            read -p "Press any key to return to menu..." -n1 -s
            menu
        fi
        echo -e "$COLOR_SUCCESS$MSG_VENV_CREATED$COLOR_DEFAULT"
    fi
    read -p "Press any key to return to menu..." -n1 -s
    menu
}

setup_and_run_flask() {
    if [ ! -d "venv" ]; then
        echo -e "$COLOR_WARNING$MSG_ENV_NOT_EXISTS$COLOR_DEFAULT"
        read -p "Press any key to return to menu..." -n1 -s
        menu
    fi

    echo "$MSG_ACTIVATING_ENV..."
    source venv/bin/activate
    if [ $? -ne 0 ]; then
        echo -e "$COLOR_ERROR$MSG_ERROR_ACTIVATING_ENV$COLOR_DEFAULT"
        read -p "Press any key to return to menu..." -n1 -s
        menu
    fi

    echo "$MSG_INSTALLING_DEPS..."
    pip install --upgrade pip
    pip install flask
    if [ $? -ne 0 ]; then
        echo -e "$COLOR_ERROR$MSG_ERROR_INSTALLING_DEPS$COLOR_DEFAULT"
        read -p "Press any key to return to menu..." -n1 -s
        menu
    fi
    echo -e "$COLOR_SUCCESS$MSG_DEPS_INSTALLED$COLOR_DEFAULT"
    echo

    echo "$MSG_RUNNING_FLASK..."
    flask run
    if [ $? -ne 0 ]; then
        echo -e "$COLOR_ERROR$MSG_ERROR_RUNNING_FLASK$COLOR_DEFAULT"
        read -p "Press any key to return to menu..." -n1 -s
        menu
    fi
    menu
}

end_script() {
    echo
    echo -e "$COLOR_INFO$MSG_EXIT$COLOR_DEFAULT"
    echo
    exit 0
}

menu
