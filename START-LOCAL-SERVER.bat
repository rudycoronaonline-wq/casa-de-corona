@echo off
cd /d "%~dp0"
echo.
echo Starting server for Casa de Corona...
echo.
echo  >>>  Open in your browser:  http://localhost:8080  <<<
echo.
echo Press Ctrl+C to stop the server.
echo.
python -m http.server 8080
pause
