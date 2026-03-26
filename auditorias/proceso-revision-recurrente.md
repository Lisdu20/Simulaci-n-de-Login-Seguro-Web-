# Proceso recurrente de revisión de seguridad con ModSecurity/CRS

Objetivo: mantener la protección WAF y la higiene de seguridad durante el ciclo de vida del software.

## Frecuencia
- Semanal: revisión rápida de logs y métricas de bloqueos.
- Mensual: simulación de ataques básicos (XSS, SQLi, traversal, fuerza bruta).
- Trimestral: ajuste de nivel de paranoia y reglas de exclusión; revisión de certificados y renovaciones.

## Pasos operativos (mensual)
1. Ejecutar pruebas automatizadas (`curl`/zap-cli) contra 8080 con payloads maliciosos.
2. Revisar `error.log` y `modsecurity_audit.log` (si está habilitado) en el contenedor WAF.
3. Documentar hallazgos y falsos positivos; proponer exclusiones puntuales.
4. Validar que el backend en 3000 no quedó accesible públicamente (solo para depuración interna).
5. Verificar renovación de certificados y configuración TLS.
6. Actualizar CRS/imagen `owasp/modsecurity-crs:nginx` a la última versión disponible.

## Integración a CI/CD
- Añadir job de seguridad que corra pruebas XSS/SQLi/traversal en cada rama principal.
- Job falla si alguna carga maliciosa devuelve 2xx/3xx.
- Publicar reporte en `auditorias/` por ejecución (artefacto de pipeline).

## Métricas de control
- Número de bloqueos CRS por tipo (XSS, SQLi, LFI, RCE).
- Tasa de falsos positivos cerrados en cada ciclo.
- Tiempo de respuesta para aplicar parches de WAF/CRS.
- Porcentaje de builds que ejecutan pruebas de seguridad automáticas.

