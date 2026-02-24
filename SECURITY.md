# 🔐 Documentación de Seguridad

Este documento describe las medidas de seguridad implementadas en el sistema de autenticación.

## 1. Hashing y Salting

### ¿Por qué es importante?
Las contraseñas nunca deben almacenarse en texto plano. Si una base de datos es comprometida, los atacantes podrían acceder directamente a todas las contraseñas.

### Implementación

#### a) Generación de Sal Aleatoria
```javascript
function generateSalt() {
    return crypto.randomBytes(16).toString('hex');
}
```

- **16 bytes (128 bits)**: Tamaño suficiente para prevenir colisiones
- **Generada con `randomBytes()`**: Utiliza el generador de números aleatorios del SO
- **Única por usuario**: Cada usuario tiene su propia sal

#### b) Hashing con SHA-256
```javascript
function hashPassword(password, salt) {
    const hash = crypto
        .createHmac('sha256', salt)
        .update(password)
        .digest('hex');
    return hash;
}
```

- **HMAC**: Utiliza la sal como clave secreta
- **SHA-256**: Función de hash criptográfica robusta (256 bits de salida)
- **Determinístico**: La misma contraseña + sal = siempre el mismo hash

#### c) Verificación de Contraseña
```javascript
function verifyPassword(password, salt, hash) {
    const newHash = hashPassword(password, salt);
    return newHash === hash;
}
```

1. Se rehashea la contraseña proporcionada con la sal almacenada
2. Se compara el nuevo hash con el hash almacenado
3. Si coinciden, la contraseña es correcta

### Ventajas del Salting
- **Previene Rainbow Tables**: Aunque dos usuarios tengan la misma contraseña, sus hashes serán diferentes
- **Aumenta Complejidad**: Requiere precalcular hashes para cada combinación de sal posible
- **Por Usuario**: Hace que cada contraseña sea única en el sistema

## 2. Validación de Entrada

### Validación del Nombre de Usuario
```javascript
function validateUsername(username) {
    // 1. Debe ser string
    if (typeof username !== 'string') return { valid: false };
    
    // 2. Longitud entre 3 y 50 caracteres
    if (username.length < 3 || username.length > 50) return { valid: false };
    
    // 3. Solo caracteres alfanuméricos, guiones y guiones bajos
    if (!/^[a-zA-Z0-9_-]+$/.test(username)) return { valid: false };
    
    return { valid: true };
}
```

**Beneficios:**
- Previene inyecciones SQL
- Limita tamaño para evitar desbordamientos
- Solo caracteres seguros

### Validación de Contraseña
```javascript
function validatePassword(password) {
    // 1. Longitud entre 6 y 128 caracteres
    if (password.length < 6 || password.length > 128) return { valid: false };
    
    // 2. Requisitos de fortaleza
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    
    if (!hasUppercase || !hasLowercase || !hasNumber) return { valid: false };
    
    return { valid: true };
}
```

**Requisitos de Fortaleza:**
- ✓ Mayúsculas
- ✓ Minúsculas
- ✓ Números
- ✓ Mínimo 6 caracteres (recomendación: 8+)

## 3. Prevención de Inyecciones SQL

### Detección de Patrones SQL
```javascript
function detectSQLInjection(input) {
    const sqlPatterns = [
        /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC)\b)/i,
        /['";\\]/,
        /(--|#|\/\*)/
    ];
    
    return sqlPatterns.some(pattern => pattern.test(input));
}
```

**Patrones detectados:**
- Palabras clave SQL: `SELECT`, `INSERT`, `UPDATE`, `DELETE`, etc.
- Caracteres especiales: `'`, `"`, `;`, `\`
- Comentarios: `--`, `#`, `/* */`

### Validación Adicional
- Solo caracteres seguros en username
- Límites de longitud
- Uso de parámetros en consultas (en base de datos real)

## 4. Prevención de XSS (Cross-Site Scripting)

### En el Cliente
```javascript
// ✓ CORRECTO: Usar textContent para entrada
div.textContent = userInput;

// ✓ CORRECTO: Sanitizar antes de innerHTML
const sanitized = div.innerHTML; // Escapa automáticamente

// ✗ INCORRECTO: innerHTML directo con entrada del usuario
div.innerHTML = userInput; // VULNERABLE a XSS
```

### Sanitización Implementada
```javascript
function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input; // Escapa caracteres especiales
    return div.innerHTML;    // Retorna versión escapada
}

function sanitizeOutput(output) {
    if (typeof output !== 'string') return '';
    const div = document.createElement('div');
    div.textContent = output;
    return div.innerHTML;
}
```

**Lo que hace:**
- Convierte caracteres especiales a entidades HTML
- `<` → `&lt;`
- `>` → `&gt;`
- `&` → `&amp;`
- etc.

## 5. Rate Limiting (Limitación de Intentos)

### Implementación
```javascript
function trackFailedAttempt() {
    let attempts = parseInt(localStorage.getItem('failedAttempts') || '0');
    attempts++;
    localStorage.setItem('failedAttempts', attempts.toString());
    localStorage.setItem('lastFailedAttempt', Date.now().toString());
    
    if (attempts >= 5) {
        const lastAttempt = parseInt(localStorage.getItem('lastFailedAttempt'));
        const timeSinceLastAttempt = Date.now() - lastAttempt;
        const fifteenMinutes = 15 * 60 * 1000;
        
        if (timeSinceLastAttempt < fifteenMinutes) {
            // Bloquear entrada
        }
    }
}
```

**Política:**
- Máximo 5 intentos fallidos en 15 minutos
- Bloqueo temporal después del límite
- Contador se reinicia después del período

### Limitación Anti-Ataque de Fuerza Bruta
- **Previene diccionarios**: Reduce intentos por unidad de tiempo
- **Aumenta costo**: Cada ataque requiere esperar 15 minutos
- **Ralentiza ataques**: 5 intentos en 15 min = muy lento para probar muchas contraseñas

## 6. Mensajes Genéricos de Error

### Problema
```javascript
// ✗ VULNERABLE: Revela información del usuario
if (!users[username]) {
    return res.status(401).json({
        message: 'El usuario no existe'  // ¡NO HACER ESTO!
    });
}

if (!isPasswordValid) {
    return res.status(401).json({
        message: 'La contraseña es incorrecta'  // ¡NO HACER ESTO!
    });
}
```

### Solución Implementada
```javascript
// ✓ SEGURO: Mensaje genérico
return res.status(401).json({
    success: false,
    message: 'Credenciales inválidas'  // No especifica qué falló
});
```

**Beneficios:**
- Los atacantes no saben si el usuario existe
- No pueden enumerar usuarios válidos
- Dificulta ataques de enumeración

## 7. Prevención de Timing Attacks

### Problema
```javascript
// ✗ VULNERABLE: Tiempo diferente si usuario existe
if (!users[username]) {
    return res.status(401).json(...);  // Retorna inmediatamente
}

const isValid = verifyPassword(...);  // Tarda más en verificar
```

### Solución
```javascript
// ✓ SEGURO: Mismo tiempo para ambos casos
if (!users[username]) {
    setTimeout(() => {
        return res.status(401).json(...);  // Espera un poco
    }, 100);
    return;
}
```

**Impacto:**
- Los tiempos de respuesta no revelan información
- Los atacantes no pueden distinguir usuarios válidos

## 8. Almacenamiento Seguro

### Estructura de Base de Datos
```javascript
users[username] = {
    salt: "a1b2c3d4...",  // Sal aleatoria (32 hex)
    hash: "f8e9d0c1...",  // SHA-256 hash (64 hex)
    createdAt: "2024-02-12T..."
}
```

**NUNCA almacenar:**
- Contraseña en texto plano
- Contraseña encriptada (sin sal)
- Hash sin sal

## 9. Configuración de Seguridad en Servidor

### Headers Seguro
```javascript
// En producción, agregar headers:
app.use((req, res, next) => {
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
});
```

### HTTPS Obligatorio
```javascript
// En producción, redirigir HTTP a HTTPS
app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https') {
        res.redirect(`https://${req.header('host')}${req.url}`);
    } else {
        next();
    }
});
```

## 10. Mejoras Futuras

### Críticas
- [ ] Base de datos persistente (MongoDB, PostgreSQL)
- [ ] HTTPS obligatorio
- [ ] JWT o sesiones seguras en servidor
- [ ] Rate limiting en servidor (no solo cliente)

### Importantes
- [ ] Autenticación de dos factores (2FA)
- [ ] Recuperación de contraseña segura
- [ ] Auditoría de intentos de acceso
- [ ] Encriptación en tránsito

### Recomendadas
- [ ] Web Application Firewall (WAF)
- [ ] Monitoreo de seguridad (SIEM)
- [ ] Pruebas de penetración regulares
- [ ] Certificados SSL/TLS válidos

## 📚 Referencias

- [OWASP Password Storage Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html)
- [Node.js Crypto Documentation](https://nodejs.org/api/crypto.html)
- [NIST Digital Identity Guidelines](https://pages.nist.gov/800-63-3/)
- [CWE-256: Unprotected Storage of Credentials](https://cwe.mitre.org/data/definitions/256.html)

---

**Documento de Seguridad v1.0**  
**Última actualización**: Febrero 2026
