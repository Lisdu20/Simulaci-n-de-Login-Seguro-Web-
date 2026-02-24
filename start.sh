#!/bin/bash
# Script para iniciar rápidamente el proyecto

echo "╔════════════════════════════════════════════════════════╗"
echo "║  Sistema de Autenticación Segura - INICIO RÁPIDO     ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""

# Verificar si Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js no está instalado"
    echo "📥 Descargalo desde: https://nodejs.org/"
    exit 1
fi

echo "✓ Node.js encontrado: $(node --version)"
echo "✓ npm encontrado: $(npm --version)"
echo ""

# Verificar si node_modules existe
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependencias..."
    npm install
    echo ""
fi

echo "✓ Dependencias instaladas"
echo ""

# Iniciar servidor
echo "🚀 Iniciando servidor..."
echo ""

npm start
