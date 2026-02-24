<!-- 
Casos de Prueba - Sistema de Autenticación Segura
Este archivo contiene casos de prueba predefinidos para validar
la seguridad y funcionalidad del sistema.
-->

# 📋 Casos de Prueba

## Tabla de Pruebas

### REGISTRO - Casos Exitosos

| # | Caso | Username | Password | Confirm | Esperado |
|---|------|----------|----------|---------|----------|
| 1 | Registro básico | Usuario123 | Segura123 | Segura123 | ✓ Éxito, redirige a login |
| 2 | Con guiones | User-Name | Contraseña123 | Contraseña123 | ✓ Éxito |
| 3 | Con guiones bajos | User_Name | Segura456 | Segura456 | ✓ Éxito |
| 4 | Máximo caracteres | Usuariolargonombrelargonombrelargonomb0 | Valida123 | Valida123 | ✓ Éxito (50 chars exactos) |
| 5 | Números en username | Usuario2024 | Prueba789 | Prueba789 | ✓ Éxito |

### REGISTRO - Casos Fallidos (Username)

| # | Caso | Username | Esperado |
|---|------|----------|----------|
| 6 | Muy corto | ab | ✗ Mínimo 3 caracteres |
| 7 | Muy largo | Usuariomuylargoconmuchoscaracteresqueexcedeelmaximo123 | ✗ Máximo 50 caracteres |
| 8 | Con espacios | Usuario 123 | ✗ Caracteres inválidos |
| 9 | Con especiales | User@123 | ✗ Caracteres inválidos |
| 10 | Con # | User#123 | ✗ Caracteres inválidos |
| 11 | Con $ | User$123 | ✗ Caracteres inválidos |
| 12 | Con comilla | User'123 | ✗ Caracteres inválidos |
| 13 | Con punto | User.123 | ✗ Caracteres inválidos |
| 14 | Vacío | (vacío) | ✗ Campo requerido |

### REGISTRO - Casos Fallidos (Password)

| # | Caso | Password | Confirm | Esperado |
|---|------|----------|---------|----------|
| 15 | Muy corta | Pass12 | Pass12 | ✓ Valida (6 caracteres mínimo) |
| 16 | Muy corta | abc123 | abc123 | ✗ Sin mayúscula |
| 17 | Solo minúsculas | minusculas123 | minusculas123 | ✗ Requiere mayúscula |
| 18 | Solo mayúsculas | MAYUSCULAS123 | MAYUSCULAS123 | ✗ Requiere minúscula |
| 19 | Sin números | Mayusculas | Mayusculas | ✗ Requiere número |
| 20 | No coinciden | Correcta123 | Incorrecta123 | ✗ No coinciden las contraseñas |
| 21 | Muy larga | Contraseña123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456 | | ✗ Máximo 128 caracteres |
| 22 | Vacía | (vacío) | (vacío) | ✗ Campo requerido |

---

### LOGIN - Casos Exitosos

| # | Caso | Username | Password | Esperado |
|---|------|----------|----------|----------|
| 23 | Login válido | Usuario123 | Segura123 | ✓ Éxito, redirige a bienvenida |
| 24 | Usuario recién registrado | User-Name | Contraseña123 | ✓ Éxito (si fue registrado) |

### LOGIN - Casos Fallidos

| # | Caso | Username | Password | Esperado |
|---|------|----------|----------|----------|
| 25 | Contraseña incorrecta | Usuario123 | Incorrecta | ✗ Credenciales inválidas |
| 26 | Usuario no existe | NoExiste | Cualquier123 | ✗ Credenciales inválidas |
| 27 | Ambos vacíos | (vacío) | (vacío) | ✗ Campo requerido |
| 28 | Username vacío | (vacío) | Segura123 | ✗ Campo requerido |
| 29 | Password vacía | Usuario123 | (vacío) | ✗ Campo requerido |
| 30 | Usuario incorrecta ortografía | Usuaario123 | Segura123 | ✗ Credenciales inválidas |

---

## 🛡️ SEGURIDAD - Casos de Prueba

### Pruebas de Inyección SQL

| # | Caso | Username | Esperado |
|---|------|----------|----------|
| 31 | DROP TABLE | admin'; DROP TABLE users; -- | ✗ Detecta SQL injection |
| 32 | SELECT * | '; SELECT * FROM users; -- | ✗ Detecta SQL injection |
| 33 | UNION SELECT | ' UNION SELECT * -- | ✗ Detecta SQL injection |
| 34 | Comentario SQL | admin'-- | ✗ Detecta SQL injection |
| 35 | Número símbolo | admin'#' | ✗ Detecta SQL injection |
| 36 | Múltiples comillas | admin''''' | ✗ Rechaza (contiene comillas) |

### Pruebas de XSS

| # | Caso | Username | Esperado |
|---|------|----------|----------|
| 37 | Alert script | <script>alert('XSS')</script> | ✗ Detecta caracteres inválidos |
| 38 | Img src | <img src=x onerror=alert('XSS')> | ✗ Detecta caracteres inválidos |
| 39 | Event handler | User" onclick="alert('XSS') | ✗ Detecta caracteres inválidos |
| 40 | SVG payload | <svg onload=alert(1)> | ✗ Detecta caracteres inválidos |

### Pruebas de Rate Limiting

| # | Caso | Intentos | Esperado |
|---|------|----------|----------|
| 41 | Primer intento fallido | 1 | ✓ Activo, contador = 1 |
| 42 | Segundo intento fallido | 2 | ✓ Activo, contador = 2 |
| 43 | Tercer intento fallido | 3 | ✓ Activo, contador = 3 |
| 44 | Cuarto intento fallido | 4 | ✓ Activo, contador = 4 |
| 45 | Quinto intento fallido | 5 | ✗ Bloqueado, mensaje de límite |
| 46 | Sexto intento bloqueado | 6 | ✗ Formulario deshabilitado |
| 47 | Después de 15 minutos | 7 (después de wait) | ✓ Contador reiniciado, activo |

---

## 🔐 HASHING - Casos de Prueba Unitarias

| # | Prueba | Descripción | Esperado |
|---|--------|-------------|----------|
| 48 | Salt generation | Genera sal única | ✓ 32 caracteres hex |
| 49 | Salt randomness | Cada sal es diferente | ✓ salt1 ≠ salt2 |
| 50 | Hash length | SHA-256 retorna 64 hex | ✓ 64 caracteres exactos |
| 51 | Hash deterministic | Mismo input = mismo hash | ✓ hash(pwd,salt) = hash(pwd,salt) |
| 52 | Hash different passwords | Diferentes contraseñas = diferentes hashes | ✓ hash1 ≠ hash2 |
| 53 | Hash different salts | Diferentes sales = diferentes hashes | ✓ hash1 ≠ hash2 |
| 54 | Verify correct | Verifica contraseña correcta | ✓ Retorna true |
| 55 | Verify incorrect | Verifica contraseña incorrecta | ✓ Retorna false |
| 56 | Verify wrong salt | Verifica con sal incorrecta | ✓ Retorna false |
| 57 | Performance | 100 hashes en < 1 segundo | ✓ Completadas rápido |

---

## 💻 INTERFAZ - Casos de Prueba

| # | Caso | Descripción | Esperado |
|---|------|-------------|----------|
| 58 | Responsive mobile | Abre en móvil (360px) | ✓ Se adapta correctamente |
| 59 | Responsive tablet | Abre en tablet (768px) | ✓ Se adapta correctamente |
| 60 | Responsive desktop | Abre en desktop (1920px) | ✓ Se adapta correctamente |
| 61 | Input focus | Al enfocar input | ✓ Cambia color (azul) |
| 62 | Button hover | Al pasar mouse en botón | ✓ Sube y tiene sombra |
| 63 | Message animation | Se muestra mensaje | ✓ Aparece con animación |
| 64 | Form validation | Falta campo requerido | ✓ No permite envío |
| 65 | Password show/hide | (Futuro) Toggle mostrar contraseña | - |

---

## 📱 FUNCIONALIDAD - Casos de Prueba

| # | Caso | Descripción | Esperado |
|---|------|-------------|----------|
| 66 | Page load | Carga index.html | ✓ Página visible |
| 67 | Link a registro | Clic "Regístrate aquí" | ✓ Va a registro.html |
| 68 | Link a login | Clic "Inicia sesión aquí" | ✓ Va a index.html |
| 69 | Logout button | Clic "Cerrar Sesión" | ✓ Va a index.html, limpia sesión |
| 70 | Session persistence | Recarga página bienvenida | ✓ Se mantiene sesión en pestaña |
| 71 | Nueva pestaña | Abre bienvenida en pestaña nueva | ✗ Redirecciona a login (no hay sesión) |
| 72 | Validación en vivo | Escribe en password | ✓ Indicadores se actualizan |
| 73 | Prevención autocomplete | Campo password | ✓ Gestión automática del navegador |

---

## 📊 RESUMEN DE CASOS

| Categoría | Cantidad | Estado |
|-----------|----------|--------|
| Registro Exitoso | 5 | ✓ |
| Registro Fallido | 9 | ✓ |
| Login Exitoso | 2 | ✓ |
| Login Fallido | 6 | ✓ |
| SQL Injection | 6 | ✓ |
| XSS | 4 | ✓ |
| Rate Limiting | 7 | ✓ |
| Hashing | 10 | ✓ |
| Interfaz | 8 | ✓ |
| Funcionalidad | 8 | ✓ |
| **TOTAL** | **73** | **✓** |

---

## 📝 Ejecución de Pruebas

### 1. Pruebas Manuales Rápidas
```bash
# Ejecuta el servidor
npm start

# Abre http://localhost:3000
# Ejecuta los casos 1, 23, 25, 31, 41, 47
```

### 2. Pruebas Unitarias Automáticas
```bash
node test.js
```

### 3. Pruebas de Seguridad Completas
- Ejecuta todos los casos 31-56
- Verifica mensajes en consola del servidor

### 4. Pruebas de Interfaz
- Ejecuta casos 58-65
- Usa DevTools (F12)

---

## ✅ Criterios de Éxito

El sistema es **SEGURO** si:
- ✓ Todas las pruebas de inyección (31-36) se rechazan
- ✓ Todas las pruebas de XSS (37-40) se rechazan  
- ✓ Rate limiting funciona correctamente (41-47)
- ✓ Todas las pruebas de hashing pasan (48-57)
- ✓ No se revela información en mensajes de error
- ✓ Las contraseñas nunca aparecen en logs/red

El sistema es **FUNCIONAL** si:
- ✓ Registro y login funcionan (1-30)
- ✓ Redirecciones correctas (66-72)
- ✓ Interfaz responsive (58-65)
- ✓ Mensajes claros y útiles

---

**Documento de Casos de Prueba v1.0**  
Febrero 2026
