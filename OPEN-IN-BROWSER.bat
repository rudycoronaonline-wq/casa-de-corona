@echo off
cd /d "%~dp0"
start "" "index.html"
echo.
echo Opening Casa de Corona in your default browser...
echo If nothing opened, double-click index.html in this folder.
echo.
timeout /t 3 >nul
