# Configuración Local - Google OAuth

## 🚀 Configuración Inicial

Después de clonar el repositorio, necesitas configurar tus credenciales de Google OAuth:

### 1. Copia el archivo .env.example
```bash
cp .env.example .env
```

### 2. Configura tus credenciales en `.env`
```env
GOOGLE_CLIENT_ID=tu_google_client_id_real_aqui
GOOGLE_CLIENT_SECRET=tu_google_client_secret_real_aqui
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback
PORT=3000
NODE_ENV=development
SESSION_SECRET=tu_secret_session_muy_seguro_aqui_2024
```

### 3. Instala dependencias
```bash
npm install
```

### 4. Inicia el servidor
```bash
npm start
```

## 🔐 Obteniendo Credenciales de Google

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita la API de Google+ API
4. Ve a "Credenciales" → "Crear credenciales" → "ID de cliente OAuth"
5. Configura:
   - Tipo de aplicación: "Aplicación web"
   - Orígenes de JavaScript autorizados: `http://localhost:3000`
   - URI de redireccionamiento autorizados: `http://localhost:3000/auth/google/callback`

## ⚠️ Importante
- **NUNCA** commiteas el archivo `.env` con credenciales reales
- El archivo `.env` está en `.gitignore` por seguridad
- Si expones credenciales accidentalmente, revócalas inmediatamente en Google Cloud Console

## 📚 Documentación
Lee `GOOGLE_OAUTH_GUIDE.md` para información detallada sobre la implementación.