# EVALUACIÓN DE SEGURIDAD DEL SISTEMA DE LOGIN
## Análisis basado en ISO/IEC 27001

---

## 📋 TABLA DE CONTENIDOS
1. [Introducción](#introducción)
2. [Descripción del Sistema](#descripción-del-sistema)
3. [Sobre ISO/IEC 27001](#sobre-isoiec-27001)
4. [Matriz de Riesgos Completada](#matriz-de-riesgos-completada)
5. [Análisis Detallado de Riesgos](#análisis-detallado-de-riesgos)
6. [Hallazgos Positivos](#hallazgos-positivos)
7. [Recomendaciones de Mejora](#recomendaciones-de-mejora)
8. [Conclusiones](#conclusiones)

---

## 🎯 INTRODUCCIÓN

Este documento presenta una evaluación exhaustiva de seguridad del sistema de autenticación y login desarrollado, utilizando como referencia la matriz de riesgos basada en la norma **ISO/IEC 27001**. El análisis incluye identificación de vulnerabilidades potenciales, evaluación de controles implementados y recomendaciones para mejorar la postura de seguridad.

**Fecha de Evaluación:** Febrero 23, 2026  
**Sistema Evaluado:** Sistema de Autenticación Segura con Panel de Administrador  
**Versión:** 1.0

---

## 🏗️ DESCRIPCIÓN DEL SISTEMA

### Arquitectura General

El sistema está compuesto por los siguientes componentes:

#### **Backend (Node.js/Express)**
- **Servidor:** Express.js en Puerto 3000
- **Autenticación:** Basada en credenciales de usuario/contraseña
- **Almacenamiento:** Base de datos en memoria (no persistente)
- **Funciones Principales:**
  - Registro de nuevos usuarios
  - Autenticación de usuarios existentes
  - Panel de administrador con lista de usuarios

#### **Frontend (HTML/CSS/JavaScript)**
- **Páginas:** Login, Registro, Bienvenida
- **Validación:** Lado cliente y lado servidor
- **Protección:** Prevención de XSS mediante sanitización
- **Sesión:** Uso de sessionStorage para datos de sesión

#### **Flujo de Seguridad**

```
Usuario → Registro/Login → Validación Cliente → Servidor
         ↓
         Validación Entrada (SQL Injection)
         ↓
         Verificación Credenciales
         ↓
         Hash SHA-256 + Salt
         ↓
         Respuesta Segura
         ↓
         SessionStorage (No localStorage)
         ↓
         Panel Bienvenida/Admin
```

### Características de Seguridad Implementadas

| Característica | Implementación |
|---|---|
| **Hashing de Contraseñas** | SHA-256 con HMAC |
| **Salting** | Generación aleatoria de 16 bytes por usuario |
| **Validación de Entrada** | Validación de tipo, longitud y caracteres |
| **Detección de Inyección SQL** | Patrones de detectores de comandos SQL |
| **Prevención de XSS** | Sanitización de entrada/salida |
| **Rate Limiting** | Bloqueo tras 5 intentos fallidos |
| **Mensajes Genéricos** | Sin revelación de información del usuario |
| **Timing Attack Mitigation** | Delay simulado en respuestas |
| **Control de Acceso** | Validación de rol (admin/user) |
| **HTTPS Recomendado** | No implementado en desarrollo local |

---

## 📚 SOBRE ISO/IEC 27001

### ¿Qué es ISO/IEC 27001?

**ISO/IEC 27001** es la norma internacional de mejores prácticas para **Sistemas de Gestión de Seguridad de la Información (SGSI)**. Establece un marco de referencia para proteger la información de una organización contra riesgos de confidencialidad, integridad y disponibilidad.

### Objetivo Principal

Proporcionar un conjunto sistemático de requisitos, procesos y controles para:
- ✅ Proteger la información sensible
- ✅ Identificar y gestionar riesgos de seguridad
- ✅ Implementar medidas de control efectivas
- ✅ Monitorear y mejorar continuamente la seguridad

### ¿Qué es un Sistema de Gestión de Seguridad de la Información (SGSI)?

El **SGSI** es un conjunto integrado de:

1. **Políticas de Seguridad:** Directivas claras y documentadas
2. **Procedimientos:** Procesos definidos para implementar políticas
3. **Controles Técnicos:** Herramientas y sistemas de protección
4. **Controles Administrativos:** Roles, responsabilidades y gobernanza
5. **Controles Físicos:** Acceso a infraestructura crítica
6. **Monitoreo:** Auditoría y evaluación continua
7. **Mejora Continua:** Ciclo PDCA (Plan-Do-Check-Act)

### Aplicación en Desarrollo de Software

En nuestro sistema de login, se aplican principios ISO/IEC 27001:

```
PLAN (Planificación):
├─ Identificar activos (credenciales de usuario)
├─ Evaluar riesgos
└─ Definir controles necesarios

DO (Implementación):
├─ Hashing con SHA-256 y salt
├─ Validación de entrada
├─ Detección de inyecciones SQL
└─ Prevención de XSS

CHECK (Verificación):
├─ Pruebas de seguridad
├─ Análisis de vulnerabilidades
└─ Evaluación de riesgos

ACT (Mejora):
├─ Implementar recomendaciones
├─ Aumentar nivel de protección
└─ Mantener cumplimiento normativo
```

---

## 📊 MATRIZ DE RIESGOS COMPLETADA

### Leyenda de Evaluación

**Impacto:**
- 🔴 **CRÍTICO (5):** Pérdida completa de confidencialidad/integridad
- 🟠 **ALTO (4):** Compromiso significativo de seguridad
- 🟡 **MEDIO (3):** Impacto notable pero controlable
- 🟢 **BAJO (2):** Impacto limitado
- ⚪ **MÍNIMO (1):** Impacto negligible

**Probabilidad:**
- 🔴 **MUY ALTA (5):** 80-100%
- 🟠 **ALTA (4):** 60-80%
- 🟡 **MEDIA (3):** 40-60%
- 🟢 **BAJA (2):** 20-40%
- ⚪ **MUY BAJA (1):** 0-20%

**Nivel de Riesgo = Impacto × Probabilidad**

### Matriz Completa

| # | Riesgo | Impacto | Probab. | Nivel | Estado | Medidas de Mitigación |
|---|--------|---------|---------|-------|--------|----------------------|
| 1 | **Fuga de Información / Comunicación No Cifrada** | 🔴 Crítico (5) | 🟠 Alta (4) | 🔴 **20 - CRÍTICO** | ⚠️ Parcial | HTTPS obligatorio, TLS 1.3+ |
| 2 | **Inyección SQL** | 🔴 Crítico (5) | 🟢 Baja (2) | 🟡 **10 - MEDIO** | ✅ Controlado | Validación de entrada + Detección de patrones |
| 3 | **Ataques de Fuerza Bruta** | 🟠 Alto (4) | 🟡 Medio (3) | 🟠 **12 - ALTO** | ⚠️ Parcial | Rate limiting + Bloqueo temporal |
| 4 | **XSS (Cross-Site Scripting)** | 🔴 Crítico (5) | 🟢 Baja (2) | 🟡 **10 - MEDIO** | ✅ Controlado | Sanitización de entrada/salida |
| 5 | **CSRF (Cross-Site Request Forgery)** | 🟠 Alto (4) | 🟡 Medio (3) | 🟠 **12 - ALTO** | ⚠️ No implementado | Tokens CSRF + SameSite cookies |
| 6 | **Almacenamiento Inseguro de Contraseñas** | 🔴 Crítico (5) | ⚪ Muy Baja (1) | 🟢 **5 - BAJO** | ✅ Controlado | SHA-256 + HMAC + Salt aleatorio |
| 7 | **Control de Acceso Débil** | 🟠 Alto (4) | 🟢 Baja (2) | 🟡 **8 - MEDIO** | ✅ Implementado | Validación de rol (admin/user) |

---

## 🔍 ANÁLISIS DETALLADO DE RIESGOS

### 1. 🔒 COMUNICACIÓN NO CIFRADA

#### Descripción
El sistema opera sin cifrado TLS/SSL (HTTPS). Los datos se transmiten en texto plano, permitiendo que un atacante intercepte credenciales mediante ataques de Man-in-the-Middle (MITM).

#### Evaluación Actual
```
Impacto:      🔴 CRÍTICO (5)     - Acceso a todas las credenciales
Probabilidad: 🟠 ALTA (4)        - Fácil de ejecutar en redes abiertas
Nivel Riesgo: 🔴 20 - CRÍTICO
Estado:       ⚠️ NO IMPLEMENTADO
```

#### Evidencia en Código
```javascript
// El servidor actualmente corre en HTTP
app.listen(PORT, () => {
    console.log(`✓ URL: http://localhost:${PORT}`);  // ❌ HTTP, no HTTPS
});
```

#### Impacto Real
- ✋ **Red Local:** Riesgo moderado (difícil de interceptar)
- 🌍 **Internet Público:** Riesgo crítico (fácil de interceptar)
- 📱 **WiFi Público:** Riesgo extremadamente alto

#### Medidas de Mitigación

**Implementación Recomendada (Producción):**
```javascript
const https = require('https');
const fs = require('fs');

// Cargar certificado SSL
const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
};

https.createServer(options, app).listen(PORT);
```

**Alternativas:**
- 🔐 Let's Encrypt (Gratuito)
- 🔐 Cloudflare (Proxy HTTPS)
- 🔐 AWS Certificate Manager
- 🔐 Nginx con SSL reverso

**Configuración Segura:**
```
- Mínimo TLS 1.2
- Preferible TLS 1.3
- Certificados válidos (no autofirmados en producción)
- HSTS (HTTP Strict Transport Security)
- Secure flag en cookies
- HttpOnly flag en cookies
```

---

### 2. 🛡️ INYECCIÓN SQL

#### Descripción
Técnica donde un atacante inserta comandos SQL maliciosos para acceder, modificar o eliminar datos de la base de datos.

#### Evaluación Actual
```
Impacto:      🔴 CRÍTICO (5)     - Acceso/Eliminación de datos
Probabilidad: 🟢 BAJA (2)        - Controles detectables implementados
Nivel Riesgo: 🟡 10 - MEDIO
Estado:       ✅ CONTROLADO
```

#### Protecciones Implementadas

**1. Validación de Entrada:**
```javascript
function detectSQLInjection(input) {
    const sqlPatterns = [
        /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|EXECUTE)\b)/i,
        /['";\\]/,
        /(--|#|\/\*)/
    ];
    
    return sqlPatterns.some(pattern => pattern.test(input));
}
```

**2. Validación de Username:**
```javascript
if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
    return { valid: false, error: 'El nombre de usuario contiene caracteres inválidos' };
}
```

**3. Limitación de Longitud:**
```javascript
if (username.length > 50 || password.length > 128) {
    return res.status(401).json({ success: false });
}
```

#### Ejemplos de Intentos Bloqueados
```sql
-- ❌ BLOQUEADO
admin' OR '1'='1
admin'; DROP TABLE users;--
admin' UNION SELECT password FROM users;--
```

#### Limitaciones Actuales
- ⚠️ Basado en patrones regex (no 100% confiable)
- ⚠️ Base de datos en memoria (no SQL real)
- ⚠️ No usa prepared statements (en memoria)

#### Recomendaciones
```javascript
// Mejor práctica (usando base de datos real):
const query = 'SELECT * FROM users WHERE username = ?';
const result = await db.query(query, [username]);  // Parametrizado

// NUNCA:
const query = `SELECT * FROM users WHERE username = '${username}'`;
```

---

### 3. 🔓 ATAQUES DE FUERZA BRUTA

#### Descripción
Un atacante intenta adivinar la contraseña probando múltiples combinaciones rápidamente.

#### Evaluación Actual
```
Impacto:      🟠 ALTO (4)        - Acceso no autorizado a cuenta
Probabilidad: 🟡 MEDIA (3)       - Parcialmente controlado
Nivel Riesgo: 🟠 12 - ALTO
Estado:       ⚠️ PARCIALMENTE IMPLEMENTADO
```

#### Protecciones Implementadas

**1. Rate Limiting (Cliente):**
```javascript
function trackFailedAttempt() {
    let attempts = parseInt(localStorage.getItem('failedAttempts') || '0', 10);
    attempts++;
    
    if (attempts >= 5) {
        const timeSinceLastAttempt = Date.now() - lastAttempt;
        const fifteenMinutes = 15 * 60 * 1000;
        
        if (timeSinceLastAttempt < fifteenMinutes) {
            // Bloquear acceso
            form.style.pointerEvents = 'none';
        }
    }
}
```

**2. Delay en Respuesta:**
```javascript
if (!users[username]) {
    setTimeout(() => {
        return res.status(401).json({ success: false });
    }, 100);  // Delay para evitar timing attacks
}
```

**3. Mensajes Genéricos:**
```javascript
// ✅ SEGURO - No revela si usuario existe
showMessage('Nombre de usuario o contraseña incorrectos');

// ❌ INSEGURO - Revela información
showMessage('Usuario no encontrado');
showMessage('Contraseña incorrecta');
```

#### Limitaciones
- ⚠️ Rate limiting solo en cliente (fácil de eludir)
- ⚠️ localStorage puede ser limpiado por usuario
- ⚠️ Sin límite de intentos en servidor
- ⚠️ Sin CAPTCHA implementado

#### Mejoras Recomendadas

```javascript
// Rate limiting en SERVIDOR (más seguro)
const attemptTracker = new Map();

app.post('/login', (req, res) => {
    const clientIP = req.ip;
    const now = Date.now();
    const ATTEMPT_TIMEOUT = 15 * 60 * 1000;  // 15 minutos
    
    if (!attemptTracker.has(clientIP)) {
        attemptTracker.set(clientIP, []);
    }
    
    const attempts = attemptTracker.get(clientIP);
    const recentAttempts = attempts.filter(t => now - t < ATTEMPT_TIMEOUT);
    
    if (recentAttempts.length >= 5) {
        return res.status(429).json({  // 429 Too Many Requests
            success: false,
            message: 'Demasiados intentos. Intenta más tarde.'
        });
    }
    
    recentAttempts.push(now);
    attemptTracker.set(clientIP, recentAttempts);
    
    // Resto de lógica de login...
});
```

---

### 4. 🚨 XSS (CROSS-SITE SCRIPTING)

#### Descripción
Un atacante inyecta código JavaScript malicioso que se ejecuta en el navegador de otros usuarios, permitiendo robo de sesiones o credenciales.

#### Evaluación Actual
```
Impacto:      🔴 CRÍTICO (5)     - Robo de sesión y cookies
Probabilidad: 🟢 BAJA (2)        - Protecciones implementadas
Nivel Riesgo: 🟡 10 - MEDIO
Estado:       ✅ CONTROLADO
```

#### Protecciones Implementadas

**1. Sanitización de Entrada:**
```javascript
function sanitizeInput(input) {
    if (typeof input !== 'string') return '';
    
    const div = document.createElement('div');
    div.textContent = input;  // textContent no interpreta HTML
    return div.innerHTML;
}
```

**2. Sanitización de Salida:**
```javascript
usernameDisplay.textContent = `¡Hola, ${sanitizeOutput(username)}!`;
// NO: usernameDisplay.innerHTML = ...username...;
```

**3. Validación de Caracteres:**
```javascript
if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
    // Rechazar cualquier forma de script
}
```

**4. ContentSecurityPolicy (Recomendado):**
```html
<!-- En bienvenida.html -->
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; script-src 'self'">
```

#### Ejemplos de Intentos Bloqueados
```javascript
// ❌ BLOQUEADO - Username XSS
username: "<script>alert('XSS')</script>"
username: "javascript:alert('XSS')"
username: "<img src=x onerror='alert(1)'>"

// ✅ BLOQUEADO - Por validación de caracteres
```

#### Mejoras Adicionales
```javascript
// Usar librerías especializadas
const xss = require('xss');
const sanitized = xss(userInput, {
    whiteList: {},
    stripIgnoredTag: true
});

// O DOMPurify en frontend
import DOMPurify from 'dompurify';
const clean = DOMPurify.sanitize(userInput);
```

---

### 5. 🔄 CSRF (CROSS-SITE REQUEST FORGERY)

#### Descripción
Un atacante engaña a un usuario autenticado para que realice acciones no intencionales en otro sitio (cambiar contraseña, transferir dinero, etc.).

#### Evaluación Actual
```
Impacto:      🟠 ALTO (4)        - Acciones no autorizadas
Probabilidad: 🟡 MEDIA (3)       - Depende del contexto
Nivel Riesgo: 🟠 12 - ALTO
Estado:       ⚠️ NO IMPLEMENTADO
```

#### Escenario Vulnerable

```html
<!-- malicious-site.com -->
<img src="http://localhost:3000/admin/delete-user" style="display:none">
<!-- Si el usuario ya está autenticado, solicitud se envía automáticamente -->
```

#### Medidas de Mitigación

**1. CSRF Tokens:**
```javascript
// En servidor
const csrfToken = crypto.randomBytes(32).toString('hex');
session.csrfToken = csrfToken;

// En respuesta
res.json({ csrfToken: csrfToken });

// En cliente
<form>
    <input type="hidden" name="_csrf" value="${csrfToken}">
</form>

// Validar en servidor
app.post('/action', (req, res) => {
    if (req.body._csrf !== session.csrfToken) {
        return res.status(403).json({ error: 'CSRF validation failed' });
    }
});
```

**2. SameSite Cookies:**
```javascript
res.cookie('sessionId', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'Strict'  // Solo enviar en solicitudes del mismo sitio
});
```

**3. Validar Origin/Referer:**
```javascript
const origin = req.headers.origin;
const referer = req.headers.referer;

if (!origin.includes('localhost:3000')) {
    return res.status(403).json({ error: 'Invalid origin' });
}
```

---

### 6. 🔐 ALMACENAMIENTO INSEGURO DE CONTRASEÑAS

#### Descripción
Almacenamiento de contraseñas en texto plano o con cifrado reversible, permitiendo recuperación fácil si la base de datos es comprometida.

#### Evaluación Actual
```
Impacto:      🔴 CRÍTICO (5)     - Acceso a todas las cuentas
Probabilidad: ⚪ MUY BAJA (1)    - Implementación segura
Nivel Riesgo: 🟢 5 - BAJO
Estado:       ✅ CONTROLADO
```

#### Implementación Segura

**1. Hash + Salt:**
```javascript
function generateSalt() {
    return crypto.randomBytes(16).toString('hex');  // 16 bytes = 128 bits
}

function hashPassword(password, salt) {
    const hash = crypto
        .createHmac('sha256', salt)
        .update(password)
        .digest('hex');
    return hash;
}

// Almacenar:
users[username] = {
    salt: salt,          // ✅ Único por usuario
    hash: hash,          // ✅ No reversible
    role: 'user'
};
```

**2. Verificación Segura:**
```javascript
function verifyPassword(password, salt, hash) {
    const newHash = hashPassword(password, salt);
    return newHash === hash;  // Comparación constante en producción
}

// ⚠️ Mejorable: Usar timing-safe comparison
const crypto = require('crypto');
crypto.timingSafeEqual(
    Buffer.from(hash1),
    Buffer.from(hash2)
);
```

#### Comparación de Métodos

| Método | Seguridad | Velocidad | Uso |
|--------|-----------|-----------|-----|
| Texto Plano | 🔴 Crítico | ⚡ Muy Rápido | ❌ NUNCA |
| MD5 | 🔴 Crítico | ⚡ Muy Rápido | ❌ NUNCA |
| SHA-1 | 🟠 Débil | ⚡ Rápido | ❌ NUNCA |
| SHA-256 + Salt | 🟡 Bueno | 🐢 Normal | ✅ Aceptable |
| bcrypt | 🟢 Excelente | 🐢 Lento | ✅ RECOMENDADO |
| Argon2 | 🟢 Excelente | 🐢 Lento | ✅ MEJOR |

#### Mejora Recomendada: bcrypt

```javascript
const bcrypt = require('bcrypt');

// Registrar usuario
const salt = await bcrypt.genSalt(10);
const hash = await bcrypt.hash(password, salt);
users[username] = { hash };

// Verificar contraseña
const isValid = await bcrypt.compare(password, user.hash);
```

---

### 7. 🎫 CONTROL DE ACCESO DÉBIL

#### Descripción
Falta de validación apropiada de permisos, permitiendo que usuarios accedan a recursos que no deberían.

#### Evaluación Actual
```
Impacto:      🟠 ALTO (4)        - Exposición de datos confidenciales
Probabilidad: 🟢 BAJA (2)        - Validaciones implementadas
Nivel Riesgo: 🟡 8 - MEDIO
Estado:       ✅ IMPLEMENTADO
```

#### Protecciones Implementadas

**1. Validación de Rol:**
```javascript
app.post('/users', (req, res) => {
    const { username } = req.body;
    
    // ✅ Validar que es administrador
    if (!users[username] || users[username].role !== 'admin') {
        console.warn(`[SEGURIDAD] Intento de acceso por: ${username}`);
        return res.status(403).json({
            success: false,
            message: 'Acceso denegado'
        });
    }
    
    // Proceder con acción privilegiada
    const userList = Object.keys(users).map(user => ({
        username: user,
        role: users[user].role,
        createdAt: users[user].createdAt
    }));
    
    return res.status(200).json({ success: true, users: userList });
});
```

**2. Usuarios Normales No Pueden:**
- ❌ Ver lista de usuarios
- ❌ Eliminar otros usuarios
- ❌ Modificar roles
- ❌ Cambiar configuración del sistema

**3. Sesión Validada:**
```javascript
if (!username) {
    window.location.href = '/index.html';  // Redirigir si no autenticado
}
```

#### Mejoras Recomendadas

```javascript
// Usar middleware de autenticación
function requireAuth(req, res, next) {
    if (!req.session.user) {
        return res.status(401).json({ error: 'Not authenticated' });
    }
    next();
}

function requireRole(role) {
    return (req, res, next) => {
        if (req.session.user.role !== role) {
            return res.status(403).json({ error: 'Forbidden' });
        }
        next();
    };
}

// Usar en rutas
app.get('/admin/users', requireAuth, requireRole('admin'), (req, res) => {
    // Solo administradores autenticados
});
```

---

## ✅ HALLAZGOS POSITIVOS

### Seguridad Implementada Correctamente

| Aspecto | Implementación | Calificación |
|--------|---|---|
| **Hashing de Contraseñas** | SHA-256 + HMAC + Salt aleatorio | ⭐⭐⭐⭐ Muy Bueno |
| **Validación de Entrada** | Validación de tipo, longitud y caracteres | ⭐⭐⭐⭐ Muy Bueno |
| **Prevención de XSS** | Sanitización entrada/salida | ⭐⭐⭐⭐ Muy Bueno |
| **Detección de Inyección SQL** | Patrones regex + validación | ⭐⭐⭐ Bueno |
| **Control de Acceso** | Validación de rol admin/user | ⭐⭐⭐⭐ Muy Bueno |
| **Rate Limiting** | Bloqueo tras 5 intentos | ⭐⭐⭐ Bueno |
| **Mensajes Seguros** | No revelan información del usuario | ⭐⭐⭐⭐ Muy Bueno |
| **SessionStorage** | No usar localStorage (más seguro) | ⭐⭐⭐⭐ Muy Bueno |
| **Generación de Salt** | crypto.randomBytes (16 bytes) | ⭐⭐⭐⭐ Muy Bueno |

### Mejores Prácticas Aplicadas

✅ Validación en cliente Y servidor  
✅ Manejo de errores sin revelar detalles internos  
✅ Uso de funciones criptográficas estándares  
✅ Sanitización de salida en HTML  
✅ Estructuración clara del código con comentarios  
✅ Logs de seguridad para eventos importantes  

---

## 🚀 RECOMENDACIONES DE MEJORA

### Prioridad 🔴 CRÍTICA (Implementar Inmediatamente)

#### 1. Implementar HTTPS/TLS

**Impacto:** Reduce riesgo de comunicación no cifrada de CRÍTICO a BAJO

```javascript
// Usar módulo https
const https = require('https');
const fs = require('fs');
const path = require('path');

const options = {
    key: fs.readFileSync(path.join(__dirname, 'certs', 'server.key')),
    cert: fs.readFileSync(path.join(__dirname, 'certs', 'server.crt'))
};

https.createServer(options, app).listen(PORT, () => {
    console.log(`✓ Servidor seguro en https://localhost:${PORT}`);
});
```

**Para Desarrollo Local:**
```bash
# Generar certificado autofirmado
openssl req -x509 -newkey rsa:4096 -nodes -out cert.pem -keyout key.pem -days 365

# Generar con parámetros específicos
openssl req -nodes -new -x509 -keyout server.key -out server.crt -days 365 -keyalg RSA -newkey rsa:4096
```

**Para Producción:**
- Usar Let's Encrypt (gratuito, automático)
- CloudFlare (proxy HTTPS)
- AWS Certificate Manager
- Digicert o similar

#### 2. Implementar Rate Limiting en Servidor

**Impacto:** Reduce riesgo de fuerza bruta de ALTO a BAJO

```javascript
npm install express-rate-limit
```

```javascript
const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,  // 15 minutos
    max: 5,                     // máx 5 intentos
    message: 'Demasiados intentos de login. Intenta más tarde.',
    standardHeaders: true,
    legacyHeaders: false,
    // Usar IP o sesión para identificar cliente
    keyGenerator: (req, res) => {
        return req.ip || req.connection.remoteAddress;
    }
});

app.post('/login', loginLimiter, (req, res) => {
    // Lógica de login...
});
```

#### 3. Implementar CSRF Tokens

**Impacto:** Reduce riesgo de CSRF de ALTO a BAJO

```javascript
const csrf = require('csurf');
const session = require('express-session');

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure: true,      // Solo HTTPS
        httpOnly: true,    // No accesible desde JS
        sameSite: 'Strict' // No enviar en cross-site
    }
}));

const csrfProtection = csrf({ cookie: false });

app.get('/login', csrfProtection, (req, res) => {
    res.json({ csrfToken: req.csrfToken() });
});

app.post('/login', csrfProtection, (req, res) => {
    // Token ya validado automáticamente
    // Proceder con login...
});
```

En cliente:
```javascript
// Obtener token
const csrfResponse = await fetch('/login');
const { csrfToken } = await csrfResponse.json();

// Incluir en formulario
document.querySelector('form').innerHTML += 
    `<input type="hidden" name="_csrf" value="${csrfToken}">`;
```

---

### Prioridad 🟠 ALTA (Implementar en Primera Actualización)

#### 4. Mejorar Algoritmo de Hashing: Usar bcrypt

**Impacto:** Aumenta seguridad de almacenamiento de contraseñas

```javascript
npm install bcrypt
```

```javascript
const bcrypt = require('bcrypt');

// Registrar usuario
const SALT_ROUNDS = 10;
const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
users[username] = {
    hash: hashedPassword,
    role: 'user',
    createdAt: new Date().toISOString()
};

// Verificar contraseña
const isPasswordValid = await bcrypt.compare(password, user.hash);
```

**Ventajas de bcrypt sobre SHA-256:**
- ✅ Función más lenta (resistencia a fuerza bruta)
- ✅ Salt automático incorporado
- ✅ Factor de trabajo adaptable (aumentar con hardware más rápido)
- ✅ Estándar de la industria

#### 5. Persistencia de Datos en Base de Datos Real

**Impacto:** Mejora disponibilidad y escalabilidad

**Opción A: SQLite (Simple)**
```javascript
npm install sqlite3

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

db.run(`CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    hash TEXT NOT NULL,
    role TEXT DEFAULT 'user',
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
)`);
```

**Opción B: MongoDB (NoSQL)**
```javascript
npm install mongoose

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    hash: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
```

**Opción C: PostgreSQL (Robusto)**
```javascript
npm install pg

const { Client } = require('pg');
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'login_system',
    password: process.env.DB_PASSWORD,
    port: 5432
});
```

#### 6. Implementar Autenticación de Dos Factores (2FA)

**Impacto:** Reduce riesgo de acceso no autorizado

```javascript
npm install speakeasy qrcode
```

```javascript
const speakeasy = require('speakeasy');
const QRCode = require('qrcode');

// Generar secreto 2FA
function generate2FASecret(username) {
    const secret = speakeasy.generateSecret({
        name: `LoginSeguro (${username})`,
        issuer: 'Sistema de Autenticación',
        length: 32
    });
    
    return {
        secret: secret.base32,
        qrCode: QRCode.toDataURL(secret.otpauth_url)
    };
}

// Verificar código 2FA
function verify2FA(secret, token) {
    return speakeasy.totp.verify({
        secret: secret,
        encoding: 'base32',
        token: token,
        window: 2  // Permitir desviación de ±2*30s
    });
}
```

En formulario:
```html
<div id="2fa-container" style="display:none;">
    <p>Escanea con tu app de autenticación:</p>
    <img id="qr-code" src="">
    <input type="text" id="2fa-code" placeholder="Código de 6 dígitos">
    <button type="submit">Verificar</button>
</div>
```

---

### Prioridad 🟡 MEDIA (Implementar en Próximas Versiones)

#### 7. Content Security Policy (CSP)

```html
<!-- En head de cada HTML -->
<meta http-equiv="Content-Security-Policy" 
      content="
        default-src 'self';
        script-src 'self' 'unsafe-inline';
        style-src 'self' 'unsafe-inline';
        img-src 'self' data:;
        font-src 'self';
        connect-src 'self';
        frame-ancestors 'none';
        base-uri 'self';
        form-action 'self'
      ">
```

#### 8. Implementar Logging y Auditoría

```javascript
const fs = require('fs');

class SecurityLogger {
    static log(event, details, severity = 'INFO') {
        const timestamp = new Date().toISOString();
        const logEntry = {
            timestamp,
            event,
            details,
            severity
        };
        
        const logFile = `logs/security-${new Date().toISOString().split('T')[0]}.json`;
        fs.appendFileSync(logFile, JSON.stringify(logEntry) + '\n');
        console.log(`[${severity}] ${event}:`, details);
    }
}

// Uso
SecurityLogger.log('Login_Success', { username: 'user1' }, 'INFO');
SecurityLogger.log('SQL_Injection_Attempt', { username: 'attacker', input: "admin'; DROP" }, 'CRITICAL');
SecurityLogger.log('Brute_Force_Attempt', { ip: '192.168.1.1', attempts: 5 }, 'WARNING');
```

#### 9. Implementar Recuperación de Contraseña Segura

```javascript
// Enviar email con token temporal
const crypto = require('crypto');

app.post('/forgot-password', (req, res) => {
    const { email } = req.body;
    
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenHash = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');
    
    // Guardar hash (no el token)
    user.resetToken = resetTokenHash;
    user.resetTokenExpiry = Date.now() + 3600000; // 1 hora
    
    // Enviar email con link: /reset-password?token=resetToken
    sendEmail(email, `Reset password: http://localhost:3000/reset-password?token=${resetToken}`);
    
    res.json({ success: true, message: 'Revisa tu email' });
});
```

#### 10. Implementar Manejo de Sesiones Seguras

```javascript
npm install express-session

const session = require('express-session');

app.use(session({
    secret: process.env.SESSION_SECRET || 'dev-secret-change-in-prod',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',  // HTTPS solo en prod
        httpOnly: true,  // No accesible desde JavaScript
        sameSite: 'Strict',  // Prevenir CSRF
        maxAge: 30 * 60 * 1000  // 30 minutos
    }
}));

// En lugar de sessionStorage, usar servidor
app.post('/login', async (req, res) => {
    // Validación y autenticación...
    if (isValid) {
        req.session.user = {
            username: username,
            role: user.role
        };
        res.json({ success: true });
    }
});
```

---

## 📋 TABLA DE RECOMENDACIONES

| # | Recomendación | Prioridad | Esfuerzo | Impacto | Plazo |
|---|---|---|---|---|---|
| 1 | HTTPS/TLS | 🔴 Crítica | Bajo | Muy Alto | Inmediato |
| 2 | Rate Limiting Servidor | 🔴 Crítica | Bajo | Muy Alto | 1 semana |
| 3 | CSRF Tokens | 🔴 Crítica | Medio | Muy Alto | 1 semana |
| 4 | bcrypt en lugar de SHA-256 | 🟠 Alta | Bajo | Alto | 2 semanas |
| 5 | Base de Datos Real | 🟠 Alta | Alto | Muy Alto | 1 mes |
| 6 | Autenticación 2FA | 🟠 Alta | Medio | Muy Alto | 1 mes |
| 7 | CSP Headers | 🟡 Media | Bajo | Medio | 2 semanas |
| 8 | Logging y Auditoría | 🟡 Media | Medio | Alto | 2 semanas |
| 9 | Recuperación Contraseña | 🟡 Media | Medio | Medio | 1 mes |
| 10 | Sesiones Servidor | 🟡 Media | Medio | Alto | 2 semanas |

---

## 🔒 CHECKLIST DE SEGURIDAD

### Implementado ✅

- [x] Hashing de contraseñas (SHA-256 + Salt)
- [x] Validación de entrada (tipo, longitud, caracteres)
- [x] Prevención XSS (sanitización)
- [x] Detección inyección SQL
- [x] Control de acceso (roles admin/user)
- [x] Rate limiting cliente
- [x] Mensajes de error genéricos
- [x] Uso de sessionStorage

### No Implementado ❌

- [ ] HTTPS/TLS
- [ ] Rate limiting servidor
- [ ] CSRF Tokens
- [ ] 2FA (Autenticación de dos factores)
- [ ] Base de datos persistente
- [ ] bcrypt (más que SHA-256)
- [ ] Content Security Policy
- [ ] Logging de seguridad
- [ ] Recuperación de contraseña
- [ ] Sesiones lado servidor

### En Progreso 🟠

- 🟠 Mejorar detección inyección SQL
- 🟠 Aumentar factor de complejidad de contraseña

---

## 📚 REFERENCIAS Y RECURSOS

### Normativa
- 📖 **ISO/IEC 27001:2022** - Information Security Management
- 📖 **ISO/IEC 27002** - Code of practice for information security controls
- 📖 **NIST SP 800-63B** - Authentication and Lifecycle Management

### Seguridad Web
- 🔗 **OWASP Top 10** - owasp.org/www-project-top-ten/
- 🔗 **OWASP Authentication Cheat Sheet** - cheatsheetseries.owasp.org
- 🔗 **OWASP Session Management Cheat Sheet**

### Herramientas
- 🔧 **bcrypt** - npm i bcrypt
- 🔧 **express-rate-limit** - npm i express-rate-limit
- 🔧 **csurf** - npm i csurf
- 🔧 **helmet** - npm i helmet (headers de seguridad HTTP)

### Lecturas Recomendadas
- 📄 "Web Application Security" - Andrew Hoffman
- 📄 "The Web Application Hacker's Handbook" - Stuttard & Pinto
- 📄 "OAuth 2.0 and OpenID Connect" - Para autenticación avanzada

---

## 🎯 CONCLUSIONES

### Resumen General

El sistema de autenticación desarrollado implementa **medidas fundamentales de seguridad** que protegen contra las vulnerabilidades más comunes. Sin embargo, hay oportunidades de mejora significativas, especialmente en comunicación cifrada y protección contra ataques específicos.

**Puntuación Actual:** 6.5/10

### Por Área

| Área | Puntuación | Estado |
|---|---|---|
| **Almacenamiento de Contraseñas** | 8/10 | ✅ Muy Bueno |
| **Prevención XSS** | 8/10 | ✅ Muy Bueno |
| **Prevención Inyección SQL** | 7/10 | ✅ Bueno |
| **Control de Acceso** | 8/10 | ✅ Muy Bueno |
| **Protección Comunicación** | 2/10 | ❌ Crítico |
| **Rate Limiting** | 6/10 | ⚠️ Parcial |
| **CSRF Protection** | 0/10 | ❌ No Implementado |
| **Criptografía** | 7/10 | ✅ Bueno |

### Recomendación Final

**El sistema es ADECUADO para:**
- ✅ Entorno de desarrollo/educación
- ✅ Demostraciones de seguridad
- ✅ Prototipado de autenticación
- ✅ Referencia para mejores prácticas

**NO es RECOMENDABLE para:**
- ❌ Producción sin modificaciones
- ❌ Manejar datos muy sensibles
- ❌ Usuarios geograficamente distribuidos
- ❌ Requisitos de cumplimiento normativo

### Próximos Pasos

1. **Inmediato:** Implementar HTTPS y rate limiting servidor
2. **Corto Plazo (2-4 semanas):** Agregar CSRF, 2FA, bcrypt
3. **Mediano Plazo (1-2 meses):** Base de datos real, sesiones servidor, auditoría
4. **Largo Plazo:** Cumplimiento total ISO 27001, penetration testing

---

## 📄 DOCUMENTO FIRMADO

**Evaluador:** Sistema Automatizado de Seguridad  
**Fecha:** Febrero 23, 2026  
**Validez:** 6 meses (re-evaluar periódicamente)  
**Clasificación:** Interno/Educativo

---

*Este documento fue generado como parte de la evaluación de seguridad del sistema de login en base a la norma ISO/IEC 27001.*
