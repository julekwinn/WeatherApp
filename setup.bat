@echo off
setlocal ENABLEDELAYEDEXPANSION

:: Definiowanie kolorow
set COLOR_DEFAULT=0F
set COLOR_PROMPT=0B
set COLOR_SUCCESS=0A
set COLOR_ERROR=0C
set COLOR_WARNING=0E
set COLOR_INFO=0D

:: Wybór języka
:choose_language
cls
echo.
echo *************************************
echo *          Choose Language          *
echo *************************************
echo 1. English
echo 2. Polski
echo *************************************
echo.
set /p lang_choice=Choose language [1-2]:

if "%lang_choice%"=="1" set "LANG=en" & goto start
if "%lang_choice%"=="2" set "LANG=pl" & goto start

goto choose_language

:start
:: Definicja tekstow w zaleznosci od jezyka
if "%LANG%"=="en" (
    set MENU_TITLE=Setup Menu
    set OPTION_1=Edit config.json file
    set OPTION_2=Create virtual environment
    set OPTION_3=Activate virtual environment, install dependencies, and run Flask server
    set OPTION_4=Exit
    set MSG_FILE_NOT_EXIST=config.json file does not exist.
    set MSG_CREATING_FILE=Creating file with default values...
    set MSG_FILE_CREATED=File config.json created.
    set MSG_EDIT_CONFIG=Edit the config.json file
    set MSG_CREATE_VENV=Create virtual environment
    set MSG_ENV_EXISTS=Virtual environment already exists.
    set MSG_CREATING_VENV=Creating virtual environment...
    set MSG_VENV_CREATED=Virtual environment created.
    set MSG_ENV_NOT_EXISTS=Virtual environment does not exist. Please create the virtual environment first.
    set MSG_ACTIVATING_ENV=Activating virtual environment...
    set MSG_ERROR_ACTIVATING_ENV=Error activating the virtual environment.
    set MSG_INSTALLING_DEPS=Installing required packages...
    set MSG_ERROR_INSTALLING_DEPS=Error installing packages.
    set MSG_DEPS_INSTALLED=Packages successfully installed.
    set MSG_RUNNING_FLASK=Running Flask server...
    set MSG_ERROR_RUNNING_FLASK=Error running Flask server.
    set MSG_EXIT=Script execution finished.
    set MSG_ENTER_VALUE=Enter value for
    set MSG_DEFAULT_VALUE=default
    set MSG_CONFIG_UPDATED=File config.json has been updated.
    set MSG_INPUT_PROMPT=Choose option [1-4]:
    set MSG_INPUT_ERROR=Invalid option. Please try again.
) else (
    set MENU_TITLE=Menu Konfiguracji
    set OPTION_1=Edytuj plik config.json
    set OPTION_2=Tworz srodowisko wirtualne
    set OPTION_3=Aktywuj srodowisko wirtualne, zainstaluj zaleznosci i uruchom serwer Flask
    set OPTION_4=Wyjdz
    set MSG_FILE_NOT_EXIST=Plik config.json nie istnieje.
    set MSG_CREATING_FILE=Tworzenie pliku z domyslnymi wartosciami...
    set MSG_FILE_CREATED=Plik config.json utworzony.
    set MSG_EDIT_CONFIG=Edytuj plik config.json
    set MSG_CREATE_VENV=Tworz srodowisko wirtualne
    set MSG_ENV_EXISTS=Srodowisko wirtualne juz istnieje.
    set MSG_CREATING_VENV=Tworzenie srodowiska wirtualnego...
    set MSG_VENV_CREATED=Srodowisko wirtualne utworzone.
    set MSG_ENV_NOT_EXISTS=Srodowisko wirtualne nie istnieje. Najpierw utworz srodowisko wirtualne.
    set MSG_ACTIVATING_ENV=Aktywacja srodowiska wirtualnego...
    set MSG_ERROR_ACTIVATING_ENV=Blad podczas aktywacji srodowiska wirtualnego.
    set MSG_INSTALLING_DEPS=Instalacja wymaganych pakietow...
    set MSG_ERROR_INSTALLING_DEPS=Blad podczas instalacji pakietow.
    set MSG_DEPS_INSTALLED=Pakiety zainstalowane pomyslnie.
    set MSG_RUNNING_FLASK=Uruchamianie serwera Flask...
    set MSG_ERROR_RUNNING_FLASK=Blad podczas uruchamiania serwera Flask.
    set MSG_EXIT=Zakonczono dzialanie skryptu.
    set MSG_ENTER_VALUE=Podaj wartosc dla
    set MSG_DEFAULT_VALUE=domyslnie
    set MSG_CONFIG_UPDATED=Plik config.json zostal zaktualizowany.
    set MSG_INPUT_PROMPT=Wybierz opcje [1-4]:
    set MSG_INPUT_ERROR=Nieprawidlowa opcja. Sprobuj ponownie.
)

:: Zmiana koloru konsoli na domyslny
color %COLOR_DEFAULT%

:: Ustawienie sciezki do pliku config.json
set CONFIG_FILE=static\config.json

:: Sprawdzenie, czy plik config.json istnieje
if not exist "%CONFIG_FILE%" (
    echo.
    echo %MSG_FILE_NOT_EXIST%
    echo %MSG_CREATING_FILE%
    mkdir static 2>nul
    (
        echo {
        echo     "REFRESH_INTERVAL": 3600000,
        echo     "CLOCK_UPDATE_INTERVAL": 60000,
        echo     "WEATHER_UPDATE_INTERVAL": 3600000,
        echo     "POPUP_MESSAGE_INTERVAL": 30000,
        echo     "LOCATION_LAT": 52.2297,
        echo     "LOCATION_LON": 21.0122,
        echo     "POPUP_MESSAGE_TEXT": "",
        echo     "SHOULD_SHOW_POPUP": false,
        echo     "TIME_ZONE": "Europe/Warsaw"
        echo }
    ) > "%CONFIG_FILE%"
    echo %MSG_FILE_CREATED%
)

:menu
cls
echo.
echo *************************************
echo *           %MENU_TITLE%            *
echo *************************************
echo 1. %OPTION_1%
echo 2. %OPTION_2%
echo 3. %OPTION_3%
echo 4. %OPTION_4%
echo *************************************
echo.
set /p choice=%MSG_INPUT_PROMPT%

if "%choice%"=="1" goto edit_config
if "%choice%"=="2" goto create_venv
if "%choice%"=="3" goto setup_and_run_flask
if "%choice%"=="4" goto end

color %COLOR_ERROR%
echo %MSG_INPUT_ERROR%
color %COLOR_DEFAULT%
pause
goto menu

:edit_config
echo.
call :edit_value "REFRESH_INTERVAL" "3600000"
call :edit_value "CLOCK_UPDATE_INTERVAL" "60000"
call :edit_value "WEATHER_UPDATE_INTERVAL" "3600000"
call :edit_value "POPUP_MESSAGE_INTERVAL" "30000"
call :edit_value "LOCATION_LAT" "52.2297"
call :edit_value "LOCATION_LON" "21.0122"
call :edit_value "POPUP_MESSAGE_TEXT" ""
call :edit_value "SHOULD_SHOW_POPUP" "false"
call :edit_value "TIME_ZONE" "Europe/Warsaw"

:: Zapisanie nowego config.json
(
    echo {
    echo     "REFRESH_INTERVAL": !REFRESH_INTERVAL!,
    echo     "CLOCK_UPDATE_INTERVAL": !CLOCK_UPDATE_INTERVAL!,
    echo     "WEATHER_UPDATE_INTERVAL": !WEATHER_UPDATE_INTERVAL!,
    echo     "POPUP_MESSAGE_INTERVAL": !POPUP_MESSAGE_INTERVAL!,
    echo     "LOCATION_LAT": !LOCATION_LAT!,
    echo     "LOCATION_LON": !LOCATION_LON!,
    echo     "POPUP_MESSAGE_TEXT": "!POPUP_MESSAGE_TEXT!",
    echo     "SHOULD_SHOW_POPUP": !SHOULD_SHOW_POPUP!,
    echo     "TIME_ZONE": "!TIME_ZONE!"
    echo }
) > "%CONFIG_FILE%"
echo.
color %COLOR_SUCCESS%
echo %MSG_CONFIG_UPDATED%
color %COLOR_DEFAULT%
echo.
pause
goto menu

:create_venv
if exist venv (
    color %COLOR_WARNING%
    echo %MSG_ENV_EXISTS%
) else (
    echo %MSG_CREATING_VENV%...
    python -m venv venv
    if errorlevel 1 (
        color %COLOR_ERROR%
        echo %MSG_ERROR_ACTIVATING_ENV%
        color %COLOR_DEFAULT%
        pause
        goto menu
    )
    color %COLOR_SUCCESS%
    echo %MSG_VENV_CREATED%
)
echo.
color %COLOR_DEFAULT%
pause
goto menu

:setup_and_run_flask
if not exist venv (
    color %COLOR_WARNING%
    echo %MSG_ENV_NOT_EXISTS%
    color %COLOR_DEFAULT%
    pause
    goto menu
)

echo %MSG_ACTIVATING_ENV%...
call venv\Scripts\activate
if errorlevel 1 (
    color %COLOR_ERROR%
    echo %MSG_ERROR_ACTIVATING_ENV%
    color %COLOR_DEFAULT%
    pause
    goto menu
)

echo %MSG_INSTALLING_DEPS%...
pip install --upgrade pip
pip install flask
if errorlevel 1 (
    color %COLOR_ERROR%
    echo %MSG_ERROR_INSTALLING_DEPS%
    color %COLOR_DEFAULT%
    pause
    goto menu
)
echo.
color %COLOR_SUCCESS%
echo %MSG_DEPS_INSTALLED%
echo.

echo %MSG_RUNNING_FLASK%...
flask run
if errorlevel 1 (
    color %COLOR_ERROR%
    echo %MSG_ERROR_RUNNING_FLASK%
    color %COLOR_DEFAULT%
    pause
    goto menu
)
goto menu

:end
echo.
color %COLOR_INFO%
echo %MSG_EXIT%
color %COLOR_DEFAULT%
echo.
pause
exit /b

:: Funkcja do edycji wartosci
:edit_value
setlocal
set "key=%~1"
set "default_value=%~2"

:: Pobranie aktualnej wartosci z pliku JSON
for /f "tokens=2 delims=:, " %%a in ('type "%CONFIG_FILE%" ^| findstr /i "\"%key%\" "') do (
    set "current_value=%%~a"
)

:: Usuniecie cudzyslowow z wartosci, jesli wystepuja
set current_value=%current_value:"=%
if not defined current_value set "current_value=%default_value%"

:: Zapytanie uzytkownika o nowa wartosc
color %COLOR_PROMPT%
set /p new_value=%MSG_ENTER_VALUE% %key% [%MSG_DEFAULT_VALUE%: %default_value%]: 
color %COLOR_DEFAULT%

:: Jesli uzytkownik nie poda nowej wartosci, zachowaj domyslna
if not defined new_value set "new_value=%default_value%"

:: Ustawienie nowej wartosci
endlocal & set "%key%=%new_value%"
exit /b
