# 🚀 INICIO RÁPIDO

¿Quieres empezar ya? Sigue estos pasos:

## 1️⃣ Instalar Dependencias

Abre una terminal en este directorio y ejecuta:

```bash
npm install
```

## 2️⃣ Iniciar el Servidor

### Windows
```bash
npm start
```
O haz doble clic en: `start.bat`

### Mac/Linux
```bash
npm start
```
O ejecuta: `bash start.sh`

## 3️⃣ Acceder a la Aplicación

Abre tu navegador en:
```
http://localhost:3000
```

---

## 📋 Usuarios de Prueba

### Registro de Nuevo Usuario
1. Haz clic en "Regístrate aquí"
2. Ingresa un nombre de usuario (ej: `Usuario123`)
3. Ingresa una contraseña segura (ej: `Segura123`)
4. Confirma la contraseña
5. ¡Registrado!

### Pruebas de Seguridad

**Test 1: Intenta contraseña incorrecta**
- Usuario: `Usuario123`
- Contraseña: `Incorrecta123`
- Resultado: ❌ Error genérico

**Test 2: Rate Limiting**
- Falla 5 veces seguidas
- La 5ª vez: Bloqueado 15 minutos

**Test 3: SQL Injection**
- Usuario: `admin'; DROP TABLE users; --`
- Resultado: ❌ Rechazado

---

## 🧪 Ejecutar Pruebas

```bash
node test.js
```

Deberías ver: `✓ ¡TODAS LAS PRUEBAS PASARON! 🎉`

---

## 📚 Documentación

- **README.md** - Descripción general
- **GUIDE.md** - Guía detallada de uso
- **SECURITY.md** - Explicación de seguridad
- **STRUCTURE.md** - Estructura del proyecto

---

## ⛔ Problemas Comunes

**Puerto ya en uso:**
```bash
PORT=3001 npm start
```

**npm install falla:**
```bash
npm cache clean --force
npm install
```

**Página no carga:**
- Actualiza: `Ctrl+R`
- Limpia caché: `Ctrl+Shift+Delete`

---

## 🎯 ¿Qué Aprendrás?

✓ Hashing con SHA-256  
✓ Salting aleatorio  
✓ Validación segura  
✓ Prevención de ataques  
✓ Rate limiting  
✓ Diseño web seguro  

---

**¡Listo!** El servidor está corriendo en http://localhost:3000
