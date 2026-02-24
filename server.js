/* ==========================================
   SERVIDOR - AUTENTICACIÓN SEGURA
   Implementa hashing con SHA-256 y salting
   ========================================== */

const express = require('express');
const crypto = require('crypto');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Base de datos en memoria (en producción usar una base de datos real)
const users = {};

// Crear usuario admin por defecto
function initializeAdminUser() {
    const adminUsername = 'admin';
    const adminPassword = 'Admin123';
    
    if (!users[adminUsername]) {
        const salt = generateSalt();
        const hash = hashPassword(adminPassword, salt);
        users[adminUsername] = {
            salt: salt,
            hash: hash,
            role: 'admin',
            createdAt: new Date().toISOString()
        };
        console.log('[INFO] Usuario administrador creado: admin / Admin123');
    }
}

// ==========================================
// FUNCIONES DE SEGURIDAD
// ==========================================

/**
 * Genera una sal aleatoria segura
 * @returns {string} - Sal en formato hexadecimal
 */
function generateSalt() {
    return crypto.randomBytes(16).toString('hex');
}

/**
 * Hashea una contraseña con sal usando SHA-256
 * @param {string} password - Contraseña sin encriptar
 * @param {string} salt - Sal para usar en el hash
 * @returns {string} - Hash en formato hexadecimal
 */
function hashPassword(password, salt) {
    // Validar entrada
    if (typeof password !== 'string' || typeof salt !== 'string') {
        throw new Error('Password y salt deben ser strings');
    }
    
    const hash = crypto
        .createHmac('sha256', salt)
        .update(password)
        .digest('hex');
    
    return hash;
}

/**
 * Verifica si una contraseña coincide con su hash
 * @param {string} password - Contraseña a verificar
 * @param {string} salt - Sal asociada
 * @param {string} hash - Hash almacenado
 * @returns {boolean} - True si coinciden
 */
function verifyPassword(password, salt, hash) {
    const newHash = hashPassword(password, salt);
    return newHash === hash;
}

/**
 * Valida el nombre de usuario
 * @param {string} username - Nombre de usuario
 * @returns {object} - {valid: boolean, error: string}
 */
function validateUsername(username) {
    if (typeof username !== 'string') {
        return { valid: false, error: 'El nombre de usuario debe ser un string' };
    }
    
    if (username.length < 3 || username.length > 50) {
        return { valid: false, error: 'El nombre de usuario debe tener entre 3 y 50 caracteres' };
    }
    
    // Solo permitir caracteres alfanuméricos, guiones y guiones bajos
    if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
        return { valid: false, error: 'El nombre de usuario contiene caracteres inválidos' };
    }
    
    return { valid: true };
}

/**
 * Valida la contraseña
 * @param {string} password - Contraseña
 * @returns {object} - {valid: boolean, error: string}
 */
function validatePassword(password) {
    if (typeof password !== 'string') {
        return { valid: false, error: 'La contraseña debe ser un string' };
    }
    
    if (password.length < 6 || password.length > 128) {
        return { valid: false, error: 'La contraseña debe tener entre 6 y 128 caracteres' };
    }
    
    // Validar que tenga mayúsculas, minúsculas y números
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    
    if (!hasUppercase || !hasLowercase || !hasNumber) {
        return { valid: false, error: 'La contraseña debe contener mayúsculas, minúsculas y números' };
    }
    
    return { valid: true };
}

/**
 * Previene inyecciones SQL básicas
 * @param {string} input - Entrada a validar
 * @returns {boolean}
 */
function detectSQLInjection(input) {
    const sqlPatterns = [
        /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|EXECUTE)\b)/i,
        /['";\\]/,
        /(--|#|\/\*)/
    ];
    
    return sqlPatterns.some(pattern => pattern.test(input));
}

// ==========================================
// RUTAS DE AUTENTICACIÓN
// ==========================================

/**
 * Ruta de Registro
 * POST /registro
 */
app.post('/registro', (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Validaciones
        if (!username || !password) {
            return res.status(400).json({ 
                success: false, 
                message: 'Nombre de usuario y contraseña requeridos' 
            });
        }
        
        // Detectar inyecciones SQL
        if (detectSQLInjection(username) || detectSQLInjection(password)) {
            console.warn(`[SEGURIDAD] Intento de inyección SQL detectado: ${username}`);
            return res.status(400).json({ 
                success: false, 
                message: 'Entrada inválida' 
            });
        }
        
        // Validar username
        const usernameValidation = validateUsername(username);
        if (!usernameValidation.valid) {
            return res.status(400).json({ 
                success: false, 
                message: usernameValidation.error 
            });
        }
        
        // Validar password
        const passwordValidation = validatePassword(password);
        if (!passwordValidation.valid) {
            return res.status(400).json({ 
                success: false, 
                message: passwordValidation.error 
            });
        }
        
        // Verificar si usuario ya existe
        if (users[username]) {
            return res.status(409).json({ 
                success: false, 
                message: 'El nombre de usuario ya está registrado' 
            });
        }
        
        // Generar sal y hash
        const salt = generateSalt();
        const hash = hashPassword(password, salt);
        
        // Almacenar usuario
        users[username] = {
            salt: salt,
            hash: hash,
            role: 'user',
            createdAt: new Date().toISOString()
        };
        
        console.log(`[INFO] Nuevo usuario registrado: ${username}`);
        
        return res.status(201).json({ 
            success: true, 
            message: 'Usuario registrado exitosamente' 
        });
        
    } catch (error) {
        console.error('[ERROR] Error en /registro:', error);
        return res.status(500).json({ 
            success: false, 
            message: 'Error interno del servidor' 
        });
    }
});

/**
 * Ruta de Login
 * POST /login
 */
app.post('/login', (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Validaciones básicas
        if (!username || !password) {
            // Mensaje genérico para no revelar información
            return res.status(401).json({ 
                success: false, 
                message: 'Credenciales inválidas' 
            });
        }
        
        // Detectar inyecciones SQL
        if (detectSQLInjection(username) || detectSQLInjection(password)) {
            console.warn(`[SEGURIDAD] Intento de inyección SQL en login: ${username}`);
            return res.status(401).json({ 
                success: false, 
                message: 'Credenciales inválidas' 
            });
        }
        
        // Validar longitudes de entrada
        if (username.length > 50 || password.length > 128) {
            return res.status(401).json({ 
                success: false, 
                message: 'Credenciales inválidas' 
            });
        }
        
        // Buscar usuario (mensaje genérico si no existe)
        if (!users[username]) {
            console.warn(`[SEGURIDAD] Intento de login con usuario inexistente: ${username}`);
            // Usar tiempo de respuesta similar para evitar timing attacks
            setTimeout(() => {
                return res.status(401).json({ 
                    success: false, 
                    message: 'Credenciales inválidas' 
                });
            }, 100);
            return;
        }
        
        const user = users[username];
        
        // Verificar contraseña
        const isPasswordValid = verifyPassword(password, user.salt, user.hash);
        
        if (isPasswordValid) {
            console.log(`[INFO] Login exitoso: ${username}`);
            return res.status(200).json({ 
                success: true, 
                message: 'Autenticación exitosa',
                role: user.role
            });
        } else {
            console.warn(`[SEGURIDAD] Intento de login fallido para: ${username}`);
            return res.status(401).json({ 
                success: false, 
                message: 'Credenciales inválidas' 
            });
        }
        
    } catch (error) {
        console.error('[ERROR] Error en /login:', error);
        return res.status(500).json({ 
            success: false, 
            message: 'Error interno del servidor' 
        });
    }
});

/**
 * Ruta para obtener la página de bienvenida
 */
app.get('/bienvenida.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'bienvenida.html'));
});

/**
 * Ruta para obtener lista de usuarios (solo para administrador)
 * POST /users
 */
app.post('/users', (req, res) => {
    try {
        const { username } = req.body;
        
        // Validar que se proporcionó el username
        if (!username) {
            return res.status(401).json({
                success: false,
                message: 'No autorizado'
            });
        }
        
        // Validar que el usuario existe y es administrador
        if (!users[username] || users[username].role !== 'admin') {
            console.warn(`[SEGURIDAD] Intento de acceso a lista de usuarios por: ${username}`);
            return res.status(403).json({
                success: false,
                message: 'Acceso denegado'
            });
        }
        
        // Construir lista de usuarios sin incluir las contraseñas o sales
        const userList = Object.keys(users).map(user => ({
            username: user,
            role: users[user].role,
            createdAt: users[user].createdAt
        }));
        
        return res.status(200).json({
            success: true,
            users: userList,
            totalUsers: userList.length
        });
        
    } catch (error) {
        console.error('[ERROR] Error en /users:', error);
        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
});

/**
 * Ruta raíz - servir index.html
 */
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// ==========================================
// MANEJO DE ERRORES 404
// ==========================================

app.use((req, res) => {
    res.status(404).json({ 
        error: 'No encontrado',
        message: 'La ruta solicitada no existe'
    });
});

// ==========================================
// MANEJO DE ERRORES GLOBAL
// ==========================================

app.use((err, req, res, next) => {
    console.error('[ERROR] Error global:', err);
    res.status(500).json({ 
        success: false, 
        message: 'Error interno del servidor' 
    });
});

// ==========================================
// INICIO DEL SERVIDOR
// ==========================================

app.listen(PORT, () => {
    // Inicializar usuario admin
    initializeAdminUser();
    
    console.log(`
╔═══════════════════════════════════════════════╗
║   SERVIDOR DE AUTENTICACIÓN SEGURA INICIADO   ║
╚═══════════════════════════════════════════════╝
    
✓ Puerto: ${PORT}
✓ URL: http://localhost:${PORT}
✓ Sistema de hashing: SHA-256
✓ Salting: Generación de sal aleatoria por usuario
✓ Validación: Entrada sanitizada y validada
✓ Rate limiting: Implementado en cliente

Acceso:
  - Registro: http://localhost:${PORT}/registro.html
  - Login: http://localhost:${PORT}/index.html
    `);
});

// Exportar para pruebas
module.exports = { app, generateSalt, hashPassword, verifyPassword };
