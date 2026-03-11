# 📚 Índice de Documentación

Bienvenido al Sistema de Autenticación Segura. Esta documentación te guiará a través de todo lo que necesitas saber.

## 🚀 Empezar Ahora

**¿Prisa?** Lee esto primero:
- **[QUICKSTART.md](QUICKSTART.md)** - Instala y ejecuta en 3 minutos

## 📖 Documentación Principal

### Para Usuarios/Testers
1. **[README.md](README.md)** - Descripción general del proyecto
   - Características implementadas
   - Estructura del proyecto
   - Guía de uso básica

2. **[GUIDE.md](GUIDE.md)** - Guía detallada de instalación y prueba
   - Requisitos previos
   - Instalación paso a paso
   - 10 casos de prueba predefinidos
   - Solución de problemas

### Para Desarrolladores
3. **[SECURITY.md](SECURITY.md)** - Análisis detallado de seguridad
   - Explicación de cada medida de seguridad
   - Implementación de hashing y salting
   - Prevención de ataques
   - Mejoras futuras

4. **[STRUCTURE.md](STRUCTURE.md)** - Estructura y organización del código
   - Descripción de cada archivo
   - Flujo de datos
   - Capas de seguridad
   - Estadísticas del código

### Para QA/Testers
5. **[TEST_CASES.md](TEST_CASES.md)** - Casos de prueba completos
   - 73 casos de prueba documentados
   - Casos de éxito y fracaso
   - Pruebas de seguridad específicas
   - Criterios de éxito

6. **[MATRIZ_ROLES.md](MATRIZ_ROLES.md)** - Matriz de roles y permisos
   - Definición de roles del sistema
   - Permisos por rol
   - Acceso a páginas y funcionalidades
   - Validaciones de transición entre roles

## 🗂️ Estructura de Archivos

```
SimulacionLoginSeguroWeb/
│
├── 📘 DOCUMENTACIÓN
│   ├── README.md          ← Empieza aquí
│   ├── QUICKSTART.md      ← Para prisa
│   ├── GUIDE.md           ← Guía completa
│   ├── SECURITY.md        ← Seguridad detallada
│   ├── STRUCTURE.md       ← Estructura del código
│   ├── TEST_CASES.md      ← Casos de prueba
│   ├── MATRIZ_ROLES.md    ← Matriz de roles
│   └── INDEX.md           ← Este archivo
│
├── 🚀 CONFIGURACIÓN
│   ├── package.json       - Dependencias npm
│   ├── .gitignore         - Archivos ignorados git
│   ├── start.sh           - Script inicio (Linux/Mac)
│   ├── start.bat          - Script inicio (Windows)
│   └── server.js          - Servidor Node.js
│
├── 🌐 PÁGINAS HTML
│   ├── index.html         - Página de login
│   ├── registro.html      - Página de registro
│   └── bienvenida.html    - Página de bienvenida
│
├── 🎨 ESTILOS
│   └── style.css          - Hoja de estilos
│
├── 🔧 SCRIPTS
│   ├── client.js          - Lógica del navegador
│   └── test.js            - Pruebas unitarias
```

## 🎯 Rutas de Lectura Recomendadas

### 👨‍💼 Gerente de Proyecto
1. README.md - Resumen ejecutivo
2. SECURITY.md (Sección 1-2) - Conceptos clave
3. TEST_CASES.md - Validación

### 👨‍💻 Desarrollador Frontend
1. GUIDE.md - Requisitos y setup
2. STRUCTURE.md - Archivos HTML/CSS/JS
3. client.js - Leer código comentado
4. style.css - Entender diseño

### 🔐 Especialista en Seguridad
1. SECURITY.md - Todo
2. server.js - Revisar implementación
3. TEST_CASES.md - Casos de seguridad
4. test.js - Pruebas unitarias

### 🧪 QA/Tester
1. QUICKSTART.md - Setup rápido
2. GUIDE.md - Pruebas manuales
3. TEST_CASES.md - Casos predefinidos
4. MATRIZ_ROLES.md - Permisos y roles
5. test.js - Ejecutar pruebas unitarias

### 🎓 Estudiante
1. README.md - Contexto
2. GUIDE.md - Prácticas
3. STRUCTURE.md - Arquitectura
4. SECURITY.md - Aprendizaje profundo

## 🔗 Referencias Cruzadas

### ¿Cómo funciona el hashing?
→ [SECURITY.md - Sección 1](SECURITY.md#1-hashing-y-salting)

### ¿Cómo prevenir SQL injection?
→ [SECURITY.md - Sección 3](SECURITY.md#3-prevención-de-inyecciones-sql)

### ¿Cómo está organizados los archivos?
→ [STRUCTURE.md - Descripción de Archivos](STRUCTURE.md#-descripción-de-archivos)

### ¿Cuáles son los requisitos del sistema?
→ [GUIDE.md - Requisitos Previos](GUIDE.md#-requisitos-previos)

### ¿Cómo funcionan los roles y permisos?
→ [MATRIZ_ROLES.md - Roles del Sistema](MATRIZ_ROLES.md#roles-del-sistema)

### ¿Cómo instalar y ejecutar?
→ [GUIDE.md - Instalación](GUIDE.md#-instalación-del-proyecto)

### ¿Cómo probar la seguridad?
→ [TEST_CASES.md - Casos de Seguridad](TEST_CASES.md#-seguridad---casos-de-prueba)

## 📊 Matriz de Requisitos Implementados

| Requisito | Archivo | Estado |
|-----------|---------|--------|
| Formularios HTML | index.html, registro.html | ✅ |
| Campos login/registro | HTML templates | ✅ |
| Diseño CSS | style.css | ✅ |
| Hashing SHA-256 | server.js | ✅ |
| Salting aleatorio | server.js | ✅ |
| Autenticación | server.js + client.js | ✅ |
| Rate limiting | client.js + server.js | ✅ |
| Validación entrada | client.js + server.js | ✅ |
| Prevención SQL | server.js | ✅ |
| Prevención XSS | client.js | ✅ |
| Mensajes genéricos | server.js | ✅ |
| Control de roles | client.js + MATRIZ_ROLES.md | ✅ |
| Pruebas | test.js | ✅ |

## 🆘 Necesitas Ayuda?

### Mi servidor no arranca
→ [GUIDE.md - Problemas Comunes](GUIDE.md#-problemas-comunes)

### Quiero probar la seguridad
→ [TEST_CASES.md - Pruebas de Seguridad](TEST_CASES.md#-seguridad---casos-de-prueba)

### No entiendo cómo funciona el hashing
→ [SECURITY.md - Hashing y Salting](SECURITY.md#1-hashing-y-salting)

### Necesito ejecutar pruebas automáticas
→ [GUIDE.md - Pruebas Unitarias](GUIDE.md#-ejecución-de-pruebas-unitarias)

### Quiero mejorar la seguridad
→ [SECURITY.md - Mejoras Futuras](SECURITY.md#10-mejoras-futuras)

## 📈 Progreso de Lectura

Use este checklist para rastrear su lectura:

```
Documentación Básica
☐ README.md
☐ QUICKSTART.md
☐ GUIDE.md

Documentación Técnica
☐ SECURITY.md
☐ STRUCTURE.md
☐ TEST_CASES.md
☐ MATRIZ_ROLES.md

Código Fuente
☐ server.js
☐ client.js
☐ test.js
☐ style.css

Pruebas
☐ Pruebas manuales (GUIDE.md)
☐ Pruebas unitarias (node test.js)
☐ Pruebas de seguridad (TEST_CASES.md)
```

## 🎓 Conceptos Clave

Después de leer la documentación, deberías entender:

1. **Hashing** - Transformación irreversible de contraseñas
2. **Salting** - Adición de datos aleatorios para mayor seguridad
3. **Validación** - Verificación de entrada en cliente y servidor
4. **Sanitización** - Limpieza de entrada para prevenir ataques
5. **Rate Limiting** - Limitación de intentos para frenar fuerza bruta
6. **Mensajes Genéricos** - No revelar información del sistema
7. **XSS Prevention** - Escapado de caracteres especiales
8. **SQL Injection Prevention** - Detección de patrones SQL

## 📞 Información de Contacto

**Asignatura**: Desarrollo de Software Seguro  
**Semestre**: 6to Semestre  
**Año**: 2026  
**Institución**: Universidad  

## 📄 Historial de Cambios

| Versión | Fecha | Cambios |
|---------|-------|---------|
| 1.0 | Feb 12, 2026 | Versión inicial completa |
| 1.1 | Mar 10, 2026 | Agregada matriz de roles y permisos |

---

**Último actualizado**: Marzo 10, 2026  
**Versión de Documentación**: 1.1
