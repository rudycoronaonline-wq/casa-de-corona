@echo off
cd /d "%~dp0"
echo.
echo  Casa de Corona - Deploy to Vercel
echo  ==================================
echo.
echo  Step 1: Log in (only needed once)
echo  ----------------------------------
call npx vercel login
if errorlevel 1 (
  echo Login failed or was cancelled.
  pause
  exit /b 1
)
echo.
echo  Step 2: Deploy
echo  --------------
call npx vercel
echo.
echo  Done. Check https://vercel.com/dashboard for your project.
echo.
pause
