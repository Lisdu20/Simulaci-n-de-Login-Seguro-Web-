# Guía de Implementación - Google OAuth 2.0 con Token ID

## ✅ Implementación Completada - Token ID Flow

Se ha integrado exitosamente la autenticación con **Google OAuth 2.0 usando Token ID Flow** en tu sistema de login seguro.

## 🔑 Diferencia con Authorization Code Flow

**Antes:** Usaba Authorization Code Flow (más seguro pero complejo)
**Ahora:** Usa Token ID Flow (más simple, token ID disponible directamente)

### Ventajas del Token ID Flow:
- ✅ Token ID disponible inmediatamente después de autenticación
- ✅ Menos pasos en el flujo de autenticación
- ✅ Token ID se puede usar para verificar identidad del usuario
- ✅ Información del usuario incluida en el JWT token

### Desventajas del Token ID Flow:
- ⚠️ Menos seguro que Authorization Code Flow
- ⚠️ Token ID expone información del usuario en la URL
- ⚠️ Recomendado solo para aplicaciones de confianza

## 📦 Cambios Realizados

### 1. **Dependencias Instaladas**
- `passport@^0.7.0` - Middleware de autenticación
- `passport-google-oauth20@^2.0.0` - Estrategia de Google OAuth
- `express-session@^1.17.3` - Gestión de sesiones
- `dotenv@^16.3.1` - Variables de entorno

### 2. **Archivos Creados/Modificados**

#### `.env` (NUEVO)
```env
GOOGLE_CLIENT_ID=tu_google_client_id_aqui
GOOGLE_CLIENT_SECRET=tu_google_client_secret_aqui
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback
PORT=3000
NODE_ENV=development
SESSION_SECRET=tu_secret_session_muy_seguro_aqui_2024
```

#### `server.js` (MODIFICADO)
**Cambios:**
- Importadas librerías: `dotenv`, `passport`, `express-session`, `GoogleStrategy`
- Configuradas sesiones con `express-session`
- Inicializado Passport con estrategia Google OAuth **Token ID Flow**
- Agregadas rutas:
  - `GET /auth/google` - Inicia autenticación con Google (Token ID Flow)
  - `GET /auth/google/callback` - Callback después de autenticación con token ID
  - `GET /auth/user` - Obtiene información del usuario autenticado + token ID
  - `GET /auth/token` - **NUEVA:** Obtiene solo el token ID
  - `GET /logout` - Cierra sesión

#### `index.html` (MODIFICADO)
- Agregado separador visual "O"
- Agregado botón "Iniciar sesión con Google"
- El botón redirige a `/auth/google`

#### `style.css` (MODIFICADO)
- Agregados estilos para `.divider` con línea horizontal
- Agregados estilos para `.btn-google` con efecto hover azul (color Google)
- Estilos responsivos para dispositivos móviles

#### `client.js` (MODIFICADO)
- Actualizada función `initWelcomePage()` para detectar usuarios de Google
- Agregada función `loadGoogleAuthUser()` para obtener datos del servidor
- Actualizada función `logout()` para manejar logout de Passport

## 🔐 Credenciales Google - Token ID Flow

Tus credenciales están configuradas para **Token ID Flow** en el archivo `.env`:

```
Client ID: [TU_CLIENT_ID_DE_GOOGLE]
Client Secret: [TU_CLIENT_SECRET_DE_GOOGLE]
Redirect URI: http://localhost:3000/auth/google/callback
```

**Scopes solicitados:** `openid`, `profile`, `email`
**Response Type:** `code token id_token`

⚠️ **IMPORTANTE DE SEGURIDAD:** 
- El archivo `.env` contiene credenciales reales y **NO debe commiterse a Git**
- Las credenciales mostradas arriba son placeholders - usa las reales solo en tu `.env` local
- Si accidentalmente commiteas credenciales, **revócalas inmediatamente** en Google Cloud Console

## 🚀 Cómo Probar

### 1. **Iniciar el servidor:**
```bash
npm start
# O
node server.js
```

### 2. **Abrir en el navegador:**
```
http://localhost:3000
```

### 3. **Probar autenticación con Google:**
- Haz clic en el botón "Iniciar sesión con Google"
- Serás redirigido a Google para autenticarte
- Después de autenticarte, serás redirigido a `bienvenida.html`
- Verás tu nombre de Google en la página

### 4. **Probar logout:**
- Haz clic en "Cerrar Sesión"
- Serás redirigido a la página de login

## 📝 Flujo de Autenticación - Token ID Flow

```
Usuario hace clic en "Iniciar sesión con Google"
        ↓
GET /auth/google (Passport inicia flujo Token ID)
        ↓
Redirige a Google OAuth con scopes: openid, profile, email
        ↓
Usuario se autentica en Google
        ↓
Google redirige a /auth/google/callback con:
  - Authorization Code
  - Access Token
  - ID Token (JWT)
        ↓
Passport valida y decodifica el ID Token
        ↓
Se crea sesión del usuario con token ID
        ↓
Se redirige a /bienvenida.html
        ↓
Cliente obtiene datos de /auth/user (incluye token ID)
        ↓
Se muestra página de bienvenida con nombre de Google
```

## 🔍 Cómo Obtener el Token ID

### Opción 1: Desde `/auth/user`
```javascript
fetch('/auth/user')
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      console.log('Token ID:', data.tokenId);
      console.log('Usuario:', data.user);
    }
  });
```

### Opción 2: Desde `/auth/token` (solo token)
```javascript
fetch('/auth/token')
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      console.log('Token ID:', data.tokenId);
      console.log('Usuario:', data.user);
    }
  });
```

## 🔧 Configuración de Google Cloud Console

**Tu configuración ya está lista. Los parámetros configurados en Google Cloud son:**

- **Authorized JavaScript origins:**
  - `http://localhost:3000`

- **Authorized redirect URIs:**
  - `http://localhost:3000/auth/google/callback`

## 🎯 Funcionalidades Implementadas

✅ Autenticación tradicional (usuario/contraseña) - YA EXISTÍA
✅ Autenticación con Google OAuth 2.0 **Token ID Flow** - NUEVA
✅ **Token ID disponible** después de autenticación
✅ Gestión de sesiones con token ID almacenado
✅ Logout automático
✅ Detección de tipo de usuario (tradicional vs Google)
✅ Información de usuario en página de bienvenida
✅ **Nueva ruta `/auth/token`** para obtener solo el token ID

## ⚠️ Notas Importantes

1. **Variables de Entorno:** El archivo `.env` NO debe commiterse a Git
2. **Producción:** En producción, cambia:
   - `NODE_ENV=production`
   - Usa HTTPS en lugar de HTTP
   - Usa una URL de producción en lugar de localhost:3000
   - Actualiza las URLs en Google Cloud Console
3. **Seguridad:** La sesión tiene `httpOnly: true` y se destruye al hacer logout

## 📚 Rutas Disponibles

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/` | Página de login |
| POST | `/login` | Autenticación tradicional |
| POST | `/registro` | Registro de usuario |
| GET | `/auth/google` | Inicia Google OAuth Token ID Flow |
| GET | `/auth/google/callback` | Callback de Google con token ID |
| GET | `/auth/user` | Obtiene usuario autenticado + token ID |
| GET | `/auth/token` | **NUEVA:** Obtiene solo el token ID |
| GET | `/logout` | Cierra sesión |
| POST | `/users` | Lista usuarios (admin) |

## 🐛 Troubleshooting

**Problema:** "Error: GOOGLE_CLIENT_ID no está definido"
- **Solución:** Asegúrate de que el archivo `.env` está en la raíz del proyecto

**Problema:** "Unauthorized redirect_uri"
- **Solución:** Verifica que la URL en `.env` coincide con la configurada en Google Cloud Console

**Problema:** No funciona en HTTPS
- **Solución:** Google OAuth requiere HTTPS en producción. En desarrollo usa HTTP.

---

¡Tu sistema de autenticación segura ahora soporta Google OAuth! 🎉
