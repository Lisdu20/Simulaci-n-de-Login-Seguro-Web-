/* ==========================================
   CLIENTE - MANEJO DE FORMULARIOS
   ========================================== */

// Detectar la página actual
const currentPage = window.location.pathname.split('/').pop() || 'index.html';

// Inicializar eventos al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    if (currentPage === 'index.html' || currentPage === '') {
        initLoginForm();
    } else if (currentPage === 'registro.html') {
        initRegistroForm();
    } else if (currentPage === 'bienvenida.html') {
        initWelcomePage();
    }
});

/* ==========================================
   FORMULARIO DE LOGIN
   ========================================== */

function initLoginForm() {
    const form = document.getElementById('loginForm');
    if (form) {
        form.addEventListener('submit', handleLoginSubmit);
    }
}

async function handleLoginSubmit(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const messageDiv = document.getElementById('message');
    
    // Validaciones básicas
    if (!username || !password) {
        showMessage(messageDiv, 'Por favor completa todos los campos', 'error');
        return;
    }
    
    // Validar longitud de entrada
    if (username.length < 3 || username.length > 50) {
        showMessage(messageDiv, 'El nombre de usuario debe tener entre 3 y 50 caracteres', 'error');
        return;
    }
    
    if (password.length < 6) {
        showMessage(messageDiv, 'La contraseña debe tener mínimo 6 caracteres', 'error');
        return;
    }
    
    // Prevenir XSS - sanitizar entrada
    const sanitizedUsername = sanitizeInput(username);
    
    try {
        showMessage(messageDiv, 'Verificando credenciales...', 'info');
        
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: sanitizedUsername,
                password: password
            })
        });
        
        const data = await response.json();
        
        if (response.ok && data.success) {
            showMessage(messageDiv, 'Autenticación exitosa. Redirigiendo...', 'success');
            // Guardar información en sessionStorage (no en localStorage por seguridad)
            sessionStorage.setItem('username', sanitizedUsername);
            sessionStorage.setItem('role', data.role || 'user');
            setTimeout(() => {
                window.location.href = '/bienvenida.html';
            }, 1500);
        } else {
            // Mensaje genérico para no revelar si el usuario existe
            showMessage(messageDiv, 'Nombre de usuario o contraseña incorrectos', 'error');
            // Aplicar limitación de intentos fallidos
            trackFailedAttempt();
        }
    } catch (error) {
        console.error('Error en login:', error);
        showMessage(messageDiv, 'Error al procesar la solicitud. Intenta más tarde.', 'error');
    }
}

/* ==========================================
   FORMULARIO DE REGISTRO
   ========================================== */

function initRegistroForm() {
    const form = document.getElementById('registroForm');
    const passwordInput = document.getElementById('password');
    
    if (form) {
        form.addEventListener('submit', handleRegistroSubmit);
    }
    
    if (passwordInput) {
        passwordInput.addEventListener('input', updatePasswordRequirements);
    }
}

function updatePasswordRequirements() {
    const password = document.getElementById('password').value;
    
    // Validaciones
    const hasLength = password.length >= 6;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    
    // Actualizar UI
    updateRequirement('req-length', hasLength);
    updateRequirement('req-uppercase', hasUppercase);
    updateRequirement('req-lowercase', hasLowercase);
    updateRequirement('req-number', hasNumber);
}

function updateRequirement(elementId, isMet) {
    const element = document.getElementById(elementId);
    if (element) {
        if (isMet) {
            element.classList.add('met');
            element.textContent = element.textContent.replace('✗', '✓');
        } else {
            element.classList.remove('met');
            element.textContent = element.textContent.replace('✓', '✗');
        }
    }
}

async function handleRegistroSubmit(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const messageDiv = document.getElementById('message');
    
    // Validaciones
    if (!username || !password || !confirmPassword) {
        showMessage(messageDiv, 'Por favor completa todos los campos', 'error');
        return;
    }
    
    // Validar nombre de usuario
    if (username.length < 3 || username.length > 50) {
        showMessage(messageDiv, 'El nombre de usuario debe tener entre 3 y 50 caracteres', 'error');
        return;
    }
    
    // Solo permitir caracteres alfanuméricos, guiones y guiones bajos
    if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
        showMessage(messageDiv, 'El nombre de usuario solo puede contener letras, números, guiones y guiones bajos', 'error');
        return;
    }
    
    // Validar contraseña
    if (password.length < 6) {
        showMessage(messageDiv, 'La contraseña debe tener mínimo 6 caracteres', 'error');
        return;
    }
    
    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
        showMessage(messageDiv, 'Las contraseñas no coinciden', 'error');
        return;
    }
    
    // Validar fortaleza de contraseña
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    
    if (!hasUppercase || !hasLowercase || !hasNumber) {
        showMessage(messageDiv, 'La contraseña debe contener mayúsculas, minúsculas y números', 'error');
        return;
    }
    
    // Prevenir XSS
    const sanitizedUsername = sanitizeInput(username);
    
    try {
        showMessage(messageDiv, 'Registrando usuario...', 'info');
        
        const response = await fetch('/registro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: sanitizedUsername,
                password: password
            })
        });
        
        const data = await response.json();
        
        if (response.ok && data.success) {
            showMessage(messageDiv, 'Registro exitoso. Redirigiendo a login...', 'success');
            setTimeout(() => {
                window.location.href = '/index.html';
            }, 2000);
        } else {
            showMessage(messageDiv, data.message || 'Error al registrar usuario', 'error');
        }
    } catch (error) {
        console.error('Error en registro:', error);
        showMessage(messageDiv, 'Error al procesar la solicitud. Intenta más tarde.', 'error');
    }
}

/* ==========================================
   PÁGINA DE BIENVENIDA
   ========================================== */

function initWelcomePage() {
    const username = sessionStorage.getItem('username');
    const role = sessionStorage.getItem('role') || 'user';
    const usernameDisplay = document.getElementById('username-display');
    const adminPanel = document.getElementById('admin-panel');
    
    if (!username) {
        window.location.href = '/index.html';
    } else if (usernameDisplay) {
        usernameDisplay.textContent = `¡Hola, ${sanitizeOutput(username)}!`;
    }
    
    // Si es administrador, cargar y mostrar la lista de usuarios
    if (role === 'admin' && adminPanel) {
        loadUsersList(username);
    }
}

/**
 * Carga la lista de usuarios del servidor
 * @param {string} username - Nombre del usuario administrador
 */
async function loadUsersList(username) {
    try {
        const response = await fetch('/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username
            })
        });
        
        const data = await response.json();
        
        if (response.ok && data.success) {
            displayUsersList(data.users);
        } else {
            console.error('Error al cargar usuarios:', data.message);
        }
    } catch (error) {
        console.error('Error al cargar lista de usuarios:', error);
    }
}

/**
 * Muestra la lista de usuarios en la tabla
 * @param {Array} users - Array de usuarios
 */
function displayUsersList(users) {
    const tableBody = document.getElementById('users-table-body');
    const adminPanel = document.getElementById('admin-panel');
    
    if (!tableBody || !adminPanel) return;
    
    // Mostrar el panel de administrador
    adminPanel.style.display = 'block';
    
    // Limpiar tabla
    tableBody.innerHTML = '';
    
    // Llenar tabla con usuarios
    users.forEach((user, index) => {
        const row = document.createElement('tr');
        const createdDate = new Date(user.createdAt).toLocaleString('es-ES');
        const badgeClass = user.role === 'admin' ? 'badge-admin' : 'badge-user';
        
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${sanitizeOutput(user.username)}</td>
            <td class="role-badge ${badgeClass}">${user.role.toUpperCase()}</td>
            <td>${createdDate}</td>
        `;
        
        tableBody.appendChild(row);
    });
}

function logout() {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('role');
    window.location.href = '/index.html';
}

/* ==========================================
   FUNCIONES DE UTILIDAD
   ========================================== */

/**
 * Muestra un mensaje en el contenedor de mensajes
 * @param {HTMLElement} messageDiv - Elemento donde mostrar el mensaje
 * @param {string} message - Texto del mensaje
 * @param {string} type - Tipo de mensaje: 'error', 'success', 'warning', 'info'
 */
function showMessage(messageDiv, message, type) {
    if (!messageDiv) return;
    
    messageDiv.textContent = message;
    messageDiv.className = 'message show ' + type;
    
    // Auto-ocultar el mensaje después de 5 segundos (excepto en info)
    if (type !== 'info') {
        setTimeout(() => {
            messageDiv.classList.remove('show');
        }, 5000);
    }
}

/**
 * Sanitiza la entrada del usuario para prevenir XSS
 * @param {string} input - Texto a sanitizar
 * @returns {string} - Texto sanitizado
 */
function sanitizeInput(input) {
    if (typeof input !== 'string') return '';
    
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}

/**
 * Sanitiza la salida para mostrar en HTML
 * @param {string} output - Texto a sanitizar
 * @returns {string} - Texto sanitizado
 */
function sanitizeOutput(output) {
    if (typeof output !== 'string') return '';
    
    const div = document.createElement('div');
    div.textContent = output;
    return div.innerHTML;
}

/**
 * Registra intentos fallidos de login
 * Implementa rate limiting básico
 */
function trackFailedAttempt() {
    let attempts = parseInt(localStorage.getItem('failedAttempts') || '0', 10);
    attempts++;
    localStorage.setItem('failedAttempts', attempts.toString());
    localStorage.setItem('lastFailedAttempt', Date.now().toString());
    
    // Bloquear después de 5 intentos fallidos en 15 minutos
    if (attempts >= 5) {
        const lastAttempt = parseInt(localStorage.getItem('lastFailedAttempt'), 10);
        const timeSinceLastAttempt = Date.now() - lastAttempt;
        const fifteenMinutes = 15 * 60 * 1000;
        
        if (timeSinceLastAttempt < fifteenMinutes) {
            const messageDiv = document.getElementById('message');
            const remainingTime = Math.ceil((fifteenMinutes - timeSinceLastAttempt) / 1000 / 60);
            showMessage(messageDiv, `Demasiados intentos fallidos. Intenta nuevamente en ${remainingTime} minuto(s).`, 'warning');
            
            const form = document.getElementById('loginForm');
            if (form) {
                form.style.pointerEvents = 'none';
                form.style.opacity = '0.5';
                setTimeout(() => {
                    form.style.pointerEvents = 'auto';
                    form.style.opacity = '1';
                    localStorage.setItem('failedAttempts', '0');
                }, fifteenMinutes);
            }
        }
    }
}

/**
 * Limpia los intentos fallidos después de login exitoso
 */
function clearFailedAttempts() {
    localStorage.removeItem('failedAttempts');
    localStorage.removeItem('lastFailedAttempt');
}
