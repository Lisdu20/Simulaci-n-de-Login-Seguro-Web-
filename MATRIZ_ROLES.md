# Matriz de Roles y Permisos

## Sistema de Autenticación Segura

---

## Roles del Sistema

| Rol | Descripción | Nivel de Acceso |
|-----|-------------|-----------------|
| **Invitado** | Usuario no autenticado | Ninguno |
| **Usuario Registrado** | Usuario con cuenta creada | Básico |
| **Usuario Activo** | Usuario logueado actualmente | Completo |

---

## Matriz de Permisos por Rol

### Acceso a Páginas

| Página/Recurso | Invitado | Usuario Registrado | Usuario Activo |
|----------------|:--------:|:------------------:|:--------------:|
| `index.html` (Login) | ✓ | ✓ | ✓ |
| `registro.html` | ✓ | ✓ | ✗ |
| `bienvenida.html` | ✗ | ✗ | ✓ |
| `styles.css` | ✓ | ✓ | ✓ |
| `app.js` | ✓ | ✓ | ✓ |
| `auth.js` | ✓ | ✓ | ✓ |

### Funcionalidades

| Función | Invitado | Usuario Registrado | Usuario Activo |
|---------|:--------:|:------------------:|:--------------:|
| Registrarse | ✓ | ✗ | ✗ |
| Iniciar sesión | ✓ | ✓ | ✗ |
| Cerrar sesión | ✗ | ✗ | ✓ |
| Ver contenido protegido | ✗ | ✗ | ✓ |
| Acceder a datos de usuario | ✗ | ✗ | ✓ |

---

## Permisos de Sesión

| Acción | Permiso |
|--------|---------|
| Crear sesión | Solo tras login exitoso |
| Leer sesión | Solo usuario activo |
| Modificar sesión | Solo sistema |
| Eliminar sesión | Solo logout o expiración |

---

## Validaciones por Rol

### Invitado → Usuario Registrado
- ✓ Registro con username/password válidos
- ✓ Redirección a login tras registro exitoso

### Usuario Registrado → Usuario Activo
- ✓ Validación de credenciales
- ✓ Creación de sesión con token único

### Usuario Activo → Invitado
- ✓ Cierre de sesión
- ✓ Limpieza de datos en cliente
- ✓ Redirección a login

---

## Notas de Seguridad

- Los roles se determinan por la presencia de sesión activa
- No hay verificación del lado del servidor para permisos de archivos estáticos
- La protección real se implementa en las validaciones de JavaScript
- La sesión expira tras inactividad (configurable)

---

**Matriz de Roles v1.0**  
Marzo 2026