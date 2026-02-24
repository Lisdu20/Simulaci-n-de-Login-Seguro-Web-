# 📖 Guía de Instalación y Uso

Guía detallada para instalar, ejecutar y probar el sistema de autenticación segura.

## 🔧 Requisitos Previos

Asegúrate de tener instalado:
- **Node.js** versión 14.0.0 o superior ([Descargar](https://nodejs.org/))
- **npm** (incluido con Node.js)
- **Git** (opcional, para clonar repositorio)
- Un navegador web moderno (Chrome, Firefox, Edge, Safari)

## ✅ Verificar Requisitos

Abre una terminal y ejecuta:

```bash
node --version    # Debería mostrar v14.0.0 o mayor
npm --version     # Debería mostrar 6.0.0 o mayor
```

## 📥 Instalación del Proyecto

### Opción 1: Desde Terminal

1. **Navega al directorio del proyecto**
```bash
cd "c:\Users\lisdu\OneDrive\Escritorio\6TO_SEMESTRE\DesarrolloDeSoftwareSeguro\1raParcial\SimulacionLoginSeguroWeb"
```

2. **Instala las dependencias**
```bash
npm install
```

Esto instalará Express y otras dependencias necesarias.

### Opción 2: Con VS Code Integrado

1. Abre VS Code
2. Terminal → New Terminal (Ctrl+` en Windows)
3. Pega el comando: `npm install`

## 🚀 Iniciar el Servidor

### Método 1: Con npm
```bash
npm start
```

### Método 2: Directamente con Node
```bash
node server.js
```

### Salida Esperada
```
╔═══════════════════════════════════════════════╗
║   SERVIDOR DE AUTENTICACIÓN SEGURA INICIADO   ║
╚═══════════════════════════════════════════════╝
    
✓ Puerto: 3000
✓ URL: http://localhost:3000
✓ Sistema de hashing: SHA-256
✓ Salting: Generación de sal aleatoria por usuario
✓ Validación: Entrada sanitizada y validada
✓ Rate limiting: Implementado en cliente

Acceso:
  - Registro: http://localhost:3000/registro.html
  - Login: http://localhost:3000/index.html
```

## 🌐 Acceder a la Aplicación

1. Abre tu navegador web
2. Ve a: **http://localhost:3000**
3. Deberías ver la página de login

## 🧪 Pruebas de Funcionamiento

### Prueba 1: Registro de Usuario

**Pasos:**
1. Desde la página de login, haz clic en "Regístrate aquí"
2. Ingresa los siguientes datos:
   - Username: `Usuario123`
   - Password: `Segura123`
   - Confirm Password: `Segura123`
3. Verifica que aparece la indicación visual de requisitos cumplidos
4. Haz clic en "Registrarse"

**Resultado esperado:**
- ✓ Mensaje de éxito
- ✓ Redirección a login después de 2 segundos

**En la consola del servidor:**
```
[INFO] Nuevo usuario registrado: Usuario123
```

### Prueba 2: Login Exitoso

**Pasos:**
1. Está en la página de login
2. Ingresa:
   - Username: `Usuario123`
   - Password: `Segura123`
3. Haz clic en "Iniciar Sesión"

**Resultado esperado:**
- ✓ Mensaje de éxito
- ✓ Redirección a página de bienvenida
- ✓ Se muestra tu nombre de usuario

**En la consola del servidor:**
```
[INFO] Login exitoso: Usuario123
```

### Prueba 3: Login Fallido (Contraseña Incorrecta)

**Pasos:**
1. En la página de login, ingresa:
   - Username: `Usuario123`
   - Password: `WrongPassword123`
2. Haz clic en "Iniciar Sesión"

**Resultado esperado:**
- ✓ Mensaje de error genérico: "Nombre de usuario o contraseña incorrectos"
- ✗ No indica cuál es incorrecto
- Contador de intentos fallidos se incrementa

**En la consola del servidor:**
```
[SEGURIDAD] Intento de login fallido para: Usuario123
```

### Prueba 4: Login Fallido (Usuario Inexistente)

**Pasos:**
1. En la página de login, ingresa:
   - Username: `UsuarioFalso`
   - Password: `Cualquier123`
2. Haz clic en "Iniciar Sesión"

**Resultado esperado:**
- ✓ Mismo mensaje de error que cuando la contraseña es incorrecta
- ✗ No revela que el usuario no existe (seguridad)

**En la consola del servidor:**
```
[SEGURIDAD] Intento de login con usuario inexistente: UsuarioFalso
```

### Prueba 5: Rate Limiting (Protección contra Fuerza Bruta)

**Pasos:**
1. Intenta login 5 veces seguidas con credenciales incorrectas
2. En el 5to intento fallido, se bloqueará el formulario

**Resultado esperado:**
- ✓ Formulario bloqueado (opaco)
- ✓ Mensaje: "Demasiados intentos fallidos. Intenta nuevamente en 15 minuto(s)."
- ✓ Se reactiva después de 15 minutos (o abre nueva pestaña)

## 🛡️ Pruebas de Seguridad

### Prueba 6: Validación de Entrada (Username)

**Caso 1: Username muy corto**
- Ingresa: `ab`
- Resultado: ✗ No se permite (mínimo 3 caracteres)

**Caso 2: Username con caracteres especiales**
- Ingresa: `Usuario@#$`
- Resultado: ✗ No se permite (solo alfanuméricos, guiones, guiones bajos)

**Caso 3: Username vacío**
- Intenta enviar formulario vacío
- Resultado: ✗ El navegador lo detecta (required)

### Prueba 7: Validación de Contraseña

**Caso 1: Contraseña muy corta**
- Intenta: `abc12`
- Resultado: ✗ No se permite (mínimo 6 caracteres)

**Caso 2: Contraseña sin mayúsculas**
- Intenta: `minusculas123`
- Resultado: ✗ No cumple requisito de mayúscula
- La UI muestra: ✗ Contiene mayúscula

**Caso 3: Contraseña sin números**
- Intenta: `Mayusculas`
- Resultado: ✗ No cumple requisito de número
- La UI muestra: ✗ Contiene número

**Caso 4: Contraseña válida**
- Intenta: `Valida123`
- Resultado: ✓ Todos los requisitos cumplidos
- La UI muestra: ✓ Todos indicadores verdes

### Prueba 8: Confirmación de Contraseña

**Pasos:**
1. En registro, ingresa:
   - Password: `Correcta123`
   - Confirm Password: `Diferente456`
2. Intenta enviar

**Resultado esperado:**
- ✗ Mensaje de error: "Las contraseñas no coinciden"

### Prueba 9: Protección XSS

**Pasos:**
1. En registro, intenta username:
   `<script>alert('XSS')</script>`

**Resultado esperado:**
- ✗ Se rechaza (contiene caracteres especiales `<>`)
- ✓ No se ejecuta script

### Prueba 10: Detección de Inyecciones SQL

**Pasos:**
1. En registro, intenta username:
   `admin'; DROP TABLE users; --`

**Resultado esperado:**
- ✗ Se rechaza (contiene palabras clave SQL)
- Consola del servidor muestra: `[SEGURIDAD] Intento de inyección SQL detectado`

## 📊 Ejecución de Pruebas Unitarias

Para ejecutar las pruebas de funciones de seguridad:

```bash
node test.js
```

**Salida esperada:**
```
╔═══════════════════════════════════════════════╗
║         INICIANDO PRUEBAS DE SEGURIDAD       ║
╚═══════════════════════════════════════════════╝

📝 Pruebas de Generación de Sal

✓ Generar sal - retorna string
✓ Generar sal - longitud correcta (32 caracteres hex = 16 bytes)
✓ Generar sal - cada sal es única
✓ Generar sal - es formato hexadecimal válido

📝 Pruebas de Hashing de Contraseña

✓ Hash - retorna string
✓ Hash - longitud correcta (64 caracteres hex para SHA-256)
...

✓ ¡TODAS LAS PRUEBAS PASARON! 🎉
```

## 🔍 Depuración

### Consola del Navegador

**Abre con:**
- Windows/Linux: `F12` o `Ctrl+Shift+I`
- Mac: `Cmd+Option+I`

**Información útil:**
- Errores de validación
- Mensajes de las funciones
- Estado de sessionStorage

**Verifica:**
```javascript
// En la consola del navegador
sessionStorage.getItem('username')  // Muestra usuario logueado
localStorage.getItem('failedAttempts')  // Muestra intentos fallidos
```

### Consola del Servidor

Muestra:
```
[INFO] - Eventos exitosos
[SEGURIDAD] - Intentos de ataque
[ERROR] - Errores de servidor
```

### Verificar Hashing

En la consola del servidor, puedes inspeccionar:
```javascript
// Ver usuarios almacenados (agregar a server.js)
console.log(users);

// Ejemplo:
// {
//   Usuario123: {
//     salt: "a1b2c3d4e5f6...",
//     hash: "f8e9d0c1b2a3...",
//     createdAt: "2024-02-12T..."
//   }
// }
```

## 🛑 Detener el Servidor

En la terminal donde está corriendo:
- Windows/Mac/Linux: `Ctrl+C`

## 🔄 Reiniciar el Servidor

Todos los usuarios en memoria se pierden. Para reiniciar limpio:
1. Detén el servidor (`Ctrl+C`)
2. Inicia nuevamente: `npm start`
3. Los usuarios anteriores no existirán

## 📱 Probar en Dispositivos Móviles

1. Obtén tu IP local:
```bash
ipconfig getifaddr en0  # Mac
ipconfig               # Windows (busca IPv4)
```

2. Desde el móvil, ve a: `http://TU_IP:3000`

## ⚠️ Problemas Comunes

### Error: "Port 3000 is already in use"
**Solución:**
```bash
# Liberar puerto (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# O cambiar puerto
PORT=3001 npm start
```

### Error: "ENOENT: no such file or directory"
**Solución:**
```bash
npm install
```

### Página en blanco
**Solución:**
1. Actualiza: `Ctrl+R` o `Cmd+R`
2. Limpia caché: `Ctrl+Shift+Delete`
3. Revisa consola: `F12`

### Formulario no responde
**Solución:**
1. Abre consola del navegador (`F12`)
2. Busca errores rojo
3. Revisa que el servidor esté corriendo

## 📚 Archivos Importantes

| Archivo | Propósito |
|---------|-----------|
| `server.js` | Servidor Node.js con lógica de autenticación |
| `client.js` | Validación y manejo de formularios en navegador |
| `index.html` | Página de login |
| `registro.html` | Página de registro |
| `bienvenida.html` | Página post-autenticación |
| `style.css` | Estilos de la interfaz |
| `test.js` | Pruebas unitarias |
| `README.md` | Documentación general |
| `SECURITY.md` | Documentación de seguridad |

## 🎓 Aprendizaje

### Conceptos Clave Demostrados

1. **Hashing**: Transformación irreversible de datos
2. **Salting**: Adición de aleatoriedad al hash
3. **Validación**: Verificación de entrada en cliente y servidor
4. **Sanitización**: Limpieza de entrada para prevenir ataques
5. **Rate Limiting**: Limitación de intentos para prevenir fuerza bruta
6. **Mensajes Genéricos**: No revelar información innecesaria
7. **Timing Protection**: Evitar timing attacks

### Para Profundizar

- Lee `SECURITY.md` para entender cada medida
- Estudia `server.js` para ver implementación
- Examina `client.js` para validación en frontend
- Ejecuta `test.js` para ver pruebas de seguridad

---

**Guía v1.0** - Febrero 2026
