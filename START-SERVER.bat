@echo off
echo Starting Casa de Corona local server...
echo.
echo Open in your browser:  http://localhost:8080
echo.
echo Press Ctrl+C to stop the server.
echo.
cd /d "%~dp0"
python -m http.server 8080
pause
