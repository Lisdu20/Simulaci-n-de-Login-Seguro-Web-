# 📂 Estructura del Proyecto

```
SimulacionLoginSeguroWeb/
│
├── 📄 Archivos de Configuración
│   ├── package.json              # Dependencias y scripts npm
│   ├── .gitignore               # Archivos ignorados por git
│   └── server.js                # Servidor Node.js con autenticación
│
├── 🌐 Páginas HTML
│   ├── index.html               # Página de Login (inicio)
│   ├── registro.html            # Página de Registro
│   └── bienvenida.html          # Página de Bienvenida (post-login)
│
├── 🎨 Estilos
│   └── style.css                # Hoja de estilos CSS (todas las páginas)
│
├── 🔧 Scripts JavaScript
│   ├── client.js                # Lógica de cliente (validación, AJAX)
│   └── test.js                  # Pruebas unitarias de seguridad
│
└── 📚 Documentación
    ├── README.md                # Documentación general del proyecto
    ├── SECURITY.md              # Documentación detallada de seguridad
    ├── GUIDE.md                 # Guía de instalación y uso
    └── STRUCTURE.md             # Este archivo
```

## 📋 Descripción de Archivos

### Configuración

#### `package.json`
- Define dependencias del proyecto
- Scripts para iniciar (`npm start`)
- Metadatos del proyecto

**Dependencias:**
- `express`: Framework web para Node.js

---

#### `server.js`
- **Líneas**: ~320
- **Puerto**: 3000
- **Funciones principales**:
  - `generateSalt()` - Genera sal aleatoria de 16 bytes
  - `hashPassword(password, salt)` - Hashea con HMAC-SHA256
  - `verifyPassword(password, salt, hash)` - Verifica contraseña
  - `validateUsername(username)` - Valida nombre de usuario
  - `validatePassword(password)` - Valida fortaleza de contraseña
  - `detectSQLInjection(input)` - Detecta inyecciones SQL
  
- **Rutas**:
  - `POST /registro` - Registra nuevo usuario
  - `POST /login` - Autentica usuario
  - `GET /` - Sirve index.html
  - `GET /bienvenida.html` - Sirve página de bienvenida

---

### Páginas HTML

#### `index.html`
- **Propósito**: Página de inicio de sesión
- **Campos**: Username, Password
- **Botones**: Iniciar Sesión, Enlace a Registro
- **Características**:
  - Validación en tiempo real
  - Mensajes de error/éxito
  - Requisitos de contraseña mostrados
  - Responsive design

---

#### `registro.html`
- **Propósito**: Página de registro de nuevo usuario
- **Campos**: Username, Password, Confirm Password
- **Características**:
  - Validación de requisitos en vivo
  - Indicadores visuales de fortaleza
  - Verificación de coincidencia de contraseñas
  - Límites de caracteres mostrados
  - Enlace a login

---

#### `bienvenida.html`
- **Propósito**: Página de bienvenida post-autenticación
- **Contenido**:
  - Saludo personalizado con nombre de usuario
  - Ícono de éxito animado
  - Información sobre la seguridad aplicada
  - Botón de cierre de sesión

---

### Estilos CSS

#### `style.css`
- **Líneas**: ~400
- **Características**:
  - Diseño moderno y gradientes
  - Animaciones suaves
  - Responsive (móvil, tablet, desktop)
  - Temas de color (purpura/azul)
  - Estados de botones (hover, active, disabled)
  - Estilos para mensajes (error, success, warning, info)
  
- **Componentes**:
  - `.container` - Contenedor principal
  - `.auth-container` - Contenedor del formulario
  - `.auth-form` - Formulario
  - `.form-group` - Grupo de campo
  - `.message` - Mensajes de estado
  - `.btn-submit`, `.btn-logout` - Botones
  - `.welcome-container` - Página de bienvenida

---

### Scripts JavaScript

#### `client.js`
- **Líneas**: ~300
- **Propósito**: Lógica del lado del cliente
- **Funciones principales**:
  - `initLoginForm()` - Inicializa formulario de login
  - `initRegistroForm()` - Inicializa formulario de registro
  - `initWelcomePage()` - Inicializa página de bienvenida
  - `handleLoginSubmit(e)` - Maneja envío de login
  - `handleRegistroSubmit(e)` - Maneja envío de registro
  - `showMessage()` - Muestra mensajes al usuario
  - `sanitizeInput()` - Limpia entrada para prevenir XSS
  - `sanitizeOutput()` - Limpia salida
  - `trackFailedAttempt()` - Implementa rate limiting
  - `updatePasswordRequirements()` - Actualiza indicadores en vivo

- **Características**:
  - Validación de formularios
  - Comunicación con servidor (fetch)
  - Prevención de XSS
  - Rate limiting de intentos
  - Manejo de sesiones con sessionStorage

---

#### `test.js`
- **Líneas**: ~300
- **Propósito**: Pruebas unitarias de seguridad
- **Pruebas**:
  - Generación de sal (4 pruebas)
  - Hashing (6 pruebas)
  - Verificación (4 pruebas)
  - Seguridad (3 pruebas)
  - Rendimiento (1 prueba)
  - **Total**: 18 pruebas

- **Ejecución**:
```bash
node test.js
```

---

### Documentación

#### `README.md`
- Descripción general del proyecto
- Características implementadas
- Instalación y ejecución
- Estructura del proyecto
- Guía de uso
- Ejemplos de prueba
- Notas importantes
- Conceptos de seguridad

#### `SECURITY.md`
- Documentación detallada de seguridad
- Explicación de cada medida implementada
- Ejemplos de código
- Ventajas de cada técnica
- Mejoras futuras
- Referencias a estándares (OWASP, NIST)

#### `GUIDE.md`
- Guía paso a paso de instalación
- Verificación de requisitos
- 10 pruebas de funcionamiento
- Depuración
- Problemas comunes y soluciones
- Conceptos clave aprendidos

---

## 🔄 Flujo de Datos

### Registro
```
Usuario rellena form
         ↓
client.js valida
         ↓
Sanitiza entrada
         ↓
Fetch POST /registro
         ↓
server.js valida
         ↓
Genera salt aleatorio
         ↓
Hashea password + salt
         ↓
Almacena en memoria
         ↓
Respuesta exitosa
         ↓
Redirige a login
```

### Login
```
Usuario rellena form
         ↓
client.js valida
         ↓
Sanitiza entrada
         ↓
Fetch POST /login
         ↓
server.js busca usuario
         ↓
Recupera salt
         ↓
Hashea password ingresado + salt
         ↓
Compara con hash almacenado
         ↓
Si coinciden: éxito
Si no: error genérico
         ↓
sessionStorage.setItem()
         ↓
Redirige a bienvenida
```

---

## 🔐 Capas de Seguridad

```
┌─────────────────────────────────────────────┐
│     Navegador del Usuario                   │
├─────────────────────────────────────────────┤
│  Validación en Cliente (client.js)          │
│  - Validación de formato                    │
│  - Rate limiting local                      │
│  - Prevención XSS                           │
├─────────────────────────────────────────────┤
│  Sanitización (client.js)                   │
│  - textContent para entrada                 │
│  - Escapado de caracteres                   │
├─────────────────────────────────────────────┤
│  Comunicación (HTTPS en producción)         │
│                                             │
├─────────────────────────────────────────────┤
│     Servidor Node.js (server.js)            │
│                                             │
│  Validación en Servidor                     │
│  - Verificación de tipo de dato             │
│  - Límites de longitud                      │
│  - Patrones permitidos                      │
├─────────────────────────────────────────────┤
│  Detección de Ataques                       │
│  - SQL injection patterns                   │
│  - Caracteres sospechosos                   │
├─────────────────────────────────────────────┤
│  Procesamiento Seguro                       │
│  - Hashing SHA-256                          │
│  - Salting aleatorio (16 bytes)             │
│  - HMAC para integridad                     │
├─────────────────────────────────────────────┤
│  Almacenamiento Seguro                      │
│  - Nunca contraseña en texto plano          │
│  - Salt + Hash almacenados separados        │
│  - En memoria (persistencia en prod.)       │
└─────────────────────────────────────────────┘
```

---

## 📊 Estadísticas del Código

| Archivo | Líneas | Función |
|---------|--------|---------|
| `server.js` | ~320 | Backend principal |
| `client.js` | ~300 | Frontend principal |
| `test.js` | ~300 | Pruebas |
| `index.html` | ~45 | Página login |
| `registro.html` | ~70 | Página registro |
| `bienvenida.html` | ~40 | Página bienvenida |
| `style.css` | ~400 | Estilos |
| **Total** | **~1,475** | **Líneas de código** |

---

## 🎯 Cumplimiento de Requisitos

- ✅ **Archivos HTML**: index.html, registro.html, bienvenida.html
- ✅ **Diseño CSS**: style.css (interfaz amigable y responsiva)
- ✅ **Campos Login**: username, password
- ✅ **Campos Registro**: username, password, confirm password
- ✅ **Hashing**: SHA-256 con HMAC
- ✅ **Salting**: Aleatorio (16 bytes por usuario)
- ✅ **Autenticación**: Comparación de hashes
- ✅ **Redirección**: Éxito → bienvenida, Error → mensaje genérico
- ✅ **Rate Limiting**: 5 intentos en 15 minutos
- ✅ **Mensajes Genéricos**: No revela información
- ✅ **Validación**: Entrada sanitizada en cliente y servidor
- ✅ **Prevención SQL Injection**: Detección de patrones
- ✅ **Prevención XSS**: Sanitización de entrada/salida
- ✅ **Pruebas**: 18 pruebas unitarias incluidas
- ✅ **Documentación**: README, SECURITY, GUIDE

---

**Documento de Estructura v1.0**  
Febrero 2026
