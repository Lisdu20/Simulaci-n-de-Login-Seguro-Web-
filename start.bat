@echo off
REM Script para iniciar el proyecto en Windows

echo.
echo ╔════════════════════════════════════════════════════════╗
echo ║  Sistema de Autenticación Segura - INICIO RÁPIDO     ║
echo ╚════════════════════════════════════════════════════════╝
echo.

REM Verificar si Node.js está instalado
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Error: Node.js no está instalado
    echo 📥 Descargalo desde: https://nodejs.org/
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i

echo ✓ Node.js encontrado: %NODE_VERSION%
echo ✓ npm encontrado: %NPM_VERSION%
echo.

REM Verificar si node_modules existe
if not exist "node_modules" (
    echo 📦 Instalando dependencias...
    call npm install
    echo.
)

echo ✓ Dependencias instaladas
echo.

REM Iniciar servidor
echo 🚀 Iniciando servidor...
echo.

call npm start
pause
