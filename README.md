# Sistema de Autenticación Segura

Un sistema completo de registro e inicio de sesión implementando mejores prácticas de seguridad con hashing SHA-256 y salting aleatorio.

## 📋 Características Implementadas

### 1. **Interfaz HTML/CSS Amigable**
- Formulario de registro con validación en tiempo real
- Formulario de login intuitivo
- Página de bienvenida post-autenticación
- Diseño responsivo y moderno
- Indicadores visuales de requisitos de contraseña

### 2. **Hashing y Salting Seguro**
- Generación de sal aleatoria (16 bytes) para cada usuario
- Algoritmo SHA-256 para hashing robusto
- Concatenación de sal + contraseña antes del hash
- Almacenamiento seguro de sal y hash por usuario

### 3. **Autenticación Segura**
- Recuperación de sal del usuario
- Hash de la contraseña con la sal almacenada
- Comparación segura de hashes
- Redirección a bienvenida o mensaje de error genérico

### 4. **Medidas de Seguridad Adicionales**
- **Rate Limiting**: Limitación de 5 intentos fallidos en 15 minutos
- **Mensajes Genéricos**: No revela si el usuario existe o contraseña es incorrecta
- **Validación de Entrada**:
  - Validación de longitud (username: 3-50, password: 6-128)
  - Solo caracteres alfanuméricos, guiones y guiones bajos en username
  - Requisitos de fortaleza en password (mayúsculas, minúsculas, números)
- **Prevención de Inyecciones SQL**: Detección de patrones SQL maliciosos
- **Prevención de XSS**: Sanitización de entrada/salida con `textContent` y `innerHTML`
- **Timing Attack Prevention**: Respuestas de tiempo similar para usuarios inexistentes

### 5. **Validación Robusta**
- Validación tanto en cliente como en servidor
- Sanitización de entrada del usuario
- Escapado de caracteres especiales
- Límites de longitud para prevenir desbordamientos

## 🚀 Instalación y Ejecución

### Requisitos
- Node.js (versión 14 o superior)
- npm

### Pasos de Instalación

1. **Navega al directorio del proyecto**
```bash
cd SimulacionLoginSeguroWeb
```

2. **Instala las dependencias**
```bash
npm install
```

3. **Inicia el servidor**
```bash
npm start
```

4. **Accede a la aplicación**
```
http://localhost:3000
```

## 📁 Estructura del Proyecto

```
SimulacionLoginSeguroWeb/
├── server.js              # Servidor Node.js con lógica de autenticación
├── client.js              # Script del cliente para manejo de formularios
├── index.html             # Página de login
├── registro.html          # Página de registro
├── bienvenida.html        # Página de bienvenida post-login
├── style.css              # Estilos de la aplicación
├── package.json           # Dependencias del proyecto
└── README.md              # Este archivo
```

## 🔐 Funciones de Seguridad Clave

### Hashing y Salting
```javascript
// Generar sal aleatoria
const salt = crypto.randomBytes(16).toString('hex');

// Hash con HMAC-SHA256
const hash = crypto
    .createHmac('sha256', salt)
    .update(password)
    .digest('hex');
```

### Verificación de Contraseña
```javascript
// Rehacer el hash con la sal almacenada
const newHash = hashPassword(password, storedSalt);

// Comparar hashes
const isValid = newHash === storedHash;
```

### Validación de Entrada
```javascript
// Solo caracteres seguros en username
/^[a-zA-Z0-9_-]+$/.test(username)

// Requisitos de contraseña
/[A-Z]/.test(password)  // Mayúsculas
/[a-z]/.test(password)  // Minúsculas
/[0-9]/.test(password)  // Números
```

## 📝 Guía de Uso

### Registro de Nuevo Usuario

1. Accede a `http://localhost:3000/registro.html`
2. Ingresa un nombre de usuario (3-50 caracteres)
3. Crea una contraseña (mínimo 6 caracteres):
   - Debe contener mayúsculas
   - Debe contener minúsculas
   - Debe contener números
4. Confirma la contraseña
5. Haz clic en "Registrarse"
6. Se te redirigirá al login

### Inicio de Sesión

1. Accede a `http://localhost:3000` (o `index.html`)
2. Ingresa tu nombre de usuario
3. Ingresa tu contraseña
4. Haz clic en "Iniciar Sesión"
5. Si las credenciales son correctas, serás redirigido a la página de bienvenida
6. Si fallas más de 5 veces en 15 minutos, se bloqueará temporalmente

### Ejemplos de Prueba

**Usuario válido:**
- Username: `Usuario123`
- Password: `Segura123`

**Usuario válido:**
- Username: `Admin_2024`
- Password: `Password@123` (con símbolo, aunque no es obligatorio)

## 🛡️ Medidas Anti-Ataque

### Contra Fuerza Bruta
- Limitación de 5 intentos fallidos en 15 minutos
- Bloqueo temporal después de límite alcanzado

### Contra Inyecciones SQL
```javascript
const sqlPatterns = [
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE)\b)/i,
    /['";\\]/,
    /(--|#|\/\*)/
];
```

### Contra XSS
- Uso de `textContent` para entrada
- Sanitización de salida con `innerHTML`
- No se permite ejecución de scripts

### Contra Timing Attacks
- Respuestas de tiempo similar para todos los escenarios
- Uso de `setTimeout` para simular procesamiento

## 🔍 Depuración y Pruebas

### Consola del Servidor
El servidor registra todos los eventos importantes:
```
[INFO] Nuevo usuario registrado: usuario123
[INFO] Login exitoso: usuario123
[SEGURIDAD] Intento de inyección SQL detectado: ...
[SEGURIDAD] Intento de login con usuario inexistente: ...
```

### Consola del Navegador
Verifica la consola del navegador para mensajes de validación y errores.

## 🚨 Notas Importantes

1. **Base de Datos en Memoria**: Los usuarios se almacenan solo en memoria. Al reiniciar el servidor, se pierden todos los datos. En producción, usar una base de datos persistente.

2. **HTTPS**: En producción, **siempre** usar HTTPS para proteger las credenciales en tránsito.

3. **Tokens de Sesión**: En producción, implementar JWT o sesiones seguras en lugar de sessionStorage.

4. **Rate Limiting Mejorado**: Implementar en servidor con base de datos para mayor robustez.

5. **Logs de Seguridad**: Registrar todos los intentos de ataque en una base de datos para análisis.

## 📚 Conceptos de Seguridad Implementados

- **Hashing**: Transformación unidireccional de contraseñas
- **Salting**: Adición de datos aleatorios para evitar rainbow tables
- **SHA-256**: Función de hash criptográfica robusta
- **Rate Limiting**: Limitación de intentos para prevenir fuerza bruta
- **Validación de Entrada**: Verificación de datos antes de procesarlos
- **Mensajes Genéricos**: No revelar información sobre usuarios o contraseñas
- **Sanitización**: Limpieza de entrada para prevenir inyecciones

## 📞 Soporte

Para reportar problemas o sugerencias, contacta al equipo de desarrollo.

## 📄 Licencia

MIT - Libre para uso educativo y comercial

---

**Última actualización**: Febrero 2026  
**Versión**: 1.0.0
