/* ==========================================
   PRUEBAS UNITARIAS - FUNCIONES DE SEGURIDAD
   ========================================== */

const { generateSalt, hashPassword, verifyPassword } = require('./server');
const assert = require('assert');

console.log('\n╔═══════════════════════════════════════════════╗');
console.log('║         INICIANDO PRUEBAS DE SEGURIDAD       ║');
console.log('╚═══════════════════════════════════════════════╝\n');

let testsPassed = 0;
let testsFailed = 0;

/**
 * Función auxiliar para pruebas
 */
function test(description, testFn) {
    try {
        testFn();
        console.log(`✓ ${description}`);
        testsPassed++;
    } catch (error) {
        console.log(`✗ ${description}`);
        console.log(`  Error: ${error.message}\n`);
        testsFailed++;
    }
}

// ==========================================
// PRUEBAS DE GENERACIÓN DE SAL
// ==========================================

console.log('📝 Pruebas de Generación de Sal\n');

test('Generar sal - retorna string', () => {
    const salt = generateSalt();
    assert.strictEqual(typeof salt, 'string');
    assert.ok(salt.length > 0);
});

test('Generar sal - longitud correcta (32 caracteres hex = 16 bytes)', () => {
    const salt = generateSalt();
    assert.strictEqual(salt.length, 32);
});

test('Generar sal - cada sal es única', () => {
    const salt1 = generateSalt();
    const salt2 = generateSalt();
    assert.notStrictEqual(salt1, salt2);
});

test('Generar sal - es formato hexadecimal válido', () => {
    const salt = generateSalt();
    assert.ok(/^[a-f0-9]{32}$/.test(salt));
});

// ==========================================
// PRUEBAS DE HASHING
// ==========================================

console.log('\n📝 Pruebas de Hashing de Contraseña\n');

test('Hash - retorna string', () => {
    const salt = generateSalt();
    const hash = hashPassword('Test123', salt);
    assert.strictEqual(typeof hash, 'string');
    assert.ok(hash.length > 0);
});

test('Hash - longitud correcta (64 caracteres hex para SHA-256)', () => {
    const salt = generateSalt();
    const hash = hashPassword('Test123', salt);
    assert.strictEqual(hash.length, 64);
});

test('Hash - es formato hexadecimal válido', () => {
    const salt = generateSalt();
    const hash = hashPassword('Test123', salt);
    assert.ok(/^[a-f0-9]{64}$/.test(hash));
});

test('Hash - el mismo hash con misma sal es determinístico', () => {
    const salt = 'a'.repeat(32); // Sal fija
    const hash1 = hashPassword('Test123', salt);
    const hash2 = hashPassword('Test123', salt);
    assert.strictEqual(hash1, hash2);
});

test('Hash - diferentes contraseñas producen diferentes hashes', () => {
    const salt = generateSalt();
    const hash1 = hashPassword('Test123', salt);
    const hash2 = hashPassword('Test456', salt);
    assert.notStrictEqual(hash1, hash2);
});

test('Hash - diferentes sales producen diferentes hashes', () => {
    const salt1 = generateSalt();
    const salt2 = generateSalt();
    const hash1 = hashPassword('Test123', salt1);
    const hash2 = hashPassword('Test123', salt2);
    assert.notStrictEqual(hash1, hash2);
});

test('Hash - la sal es esencial (cambiar un carácter invalida hash)', () => {
    const salt = generateSalt();
    const password = 'Test123';
    const hash1 = hashPassword(password, salt);
    
    // Cambiar un carácter de la sal
    const modifiedSalt = salt.slice(0, -1) + 
        (salt[salt.length - 1] === 'a' ? 'b' : 'a');
    const hash2 = hashPassword(password, modifiedSalt);
    
    assert.notStrictEqual(hash1, hash2);
});

// ==========================================
// PRUEBAS DE VERIFICACIÓN
// ==========================================

console.log('\n📝 Pruebas de Verificación de Contraseña\n');

test('Verificación - contraseña correcta retorna true', () => {
    const salt = generateSalt();
    const password = 'Test123';
    const hash = hashPassword(password, salt);
    
    const isValid = verifyPassword(password, salt, hash);
    assert.strictEqual(isValid, true);
});

test('Verificación - contraseña incorrecta retorna false', () => {
    const salt = generateSalt();
    const correctPassword = 'Test123';
    const wrongPassword = 'Wrong456';
    const hash = hashPassword(correctPassword, salt);
    
    const isValid = verifyPassword(wrongPassword, salt, hash);
    assert.strictEqual(isValid, false);
});

test('Verificación - cambio de un carácter invalida contraseña', () => {
    const salt = generateSalt();
    const password = 'Test123';
    const modifiedPassword = 'Test124';
    const hash = hashPassword(password, salt);
    
    const isValid = verifyPassword(modifiedPassword, salt, hash);
    assert.strictEqual(isValid, false);
});

test('Verificación - sal incorrecta invalida verificación', () => {
    const salt1 = generateSalt();
    const salt2 = generateSalt();
    const password = 'Test123';
    const hash = hashPassword(password, salt1);
    
    const isValid = verifyPassword(password, salt2, hash);
    assert.strictEqual(isValid, false);
});

// ==========================================
// PRUEBAS DE SEGURIDAD
// ==========================================

console.log('\n📝 Pruebas de Seguridad\n');

test('Seguridad - no se puede invertir el hash', () => {
    const salt = generateSalt();
    const password = 'MiContraseña123';
    const hash = hashPassword(password, salt);
    
    // El hash no debe contener la contraseña original
    assert.ok(!hash.includes('MiContraseña'));
    assert.ok(!hash.includes('123'));
});

test('Seguridad - ataque rainbow table imposible (diferentes sales)', () => {
    const password = 'ComúnPassword123';
    const salt1 = generateSalt();
    const salt2 = generateSalt();
    
    const hash1 = hashPassword(password, salt1);
    const hash2 = hashPassword(password, salt2);
    
    // Mismo usuario con password común genera hashes diferentes
    assert.notStrictEqual(hash1, hash2);
});

test('Seguridad - contraseña vacía se hashea (pero se valida en servidor)', () => {
    const salt = generateSalt();
    const emptyPassword = '';
    
    // Esto no debe lanzar error
    const hash = hashPassword(emptyPassword, salt);
    assert.strictEqual(typeof hash, 'string');
    assert.ok(hash.length === 64);
});

// ==========================================
// PRUEBAS DE RENDIMIENTO
// ==========================================

console.log('\n📝 Pruebas de Rendimiento\n');

test('Rendimiento - hashing es razonablemente rápido (< 10ms)', () => {
    const salt = generateSalt();
    const start = process.hrtime.bigint();
    
    for (let i = 0; i < 100; i++) {
        hashPassword(`Test${i}`, salt);
    }
    
    const end = process.hrtime.bigint();
    const timeMs = Number(end - start) / 1000000;
    
    assert.ok(timeMs < 1000, `Hashing 100 veces tardó ${timeMs.toFixed(2)}ms`);
});

// ==========================================
// RESUMEN DE PRUEBAS
// ==========================================

console.log('\n╔═══════════════════════════════════════════════╗');
console.log('║            RESUMEN DE PRUEBAS                 ║');
console.log('╚═══════════════════════════════════════════════╝\n');

console.log(`✓ Pruebas pasadas: ${testsPassed}`);
console.log(`✗ Pruebas fallidas: ${testsFailed}`);
console.log(`\nTotal: ${testsPassed + testsFailed} pruebas`);

if (testsFailed === 0) {
    console.log('\n✓ ¡TODAS LAS PRUEBAS PASARON! 🎉\n');
    process.exit(0);
} else {
    console.log('\n✗ Algunas pruebas fallaron.\n');
    process.exit(1);
}
