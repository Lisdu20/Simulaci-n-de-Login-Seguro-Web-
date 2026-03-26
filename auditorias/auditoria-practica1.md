# Auditoría de seguridad con ModSecurity/CRS – Práctica 1

Fecha: 26/03/2026  
Equipo: Desarrollo Seguro 6I  
Alcance: Aplicación de login (Node/Express) protegida detrás de Nginx + ModSecurity + OWASP CRS.

## Metodología
- Entorno: contenedores `login-seguro-app` (backend en :3000) y `login-seguro-waf` (proxy/WAF en :8080/:8443).
- Reglas: OWASP CRS nivel de paranoia 1, `MODSEC_RULE_ENGINE=On`.
- Pruebas manuales de tráfico HTTP usando `curl.exe` desde host.

## Evidencia de pruebas
| Prueba | Payload / comando | Resultado esperado | Resultado obtenido |
| --- | --- | --- | --- |
| Tráfico legítimo | `curl.exe -i http://localhost:8080/` | 200 OK | 200 OK |
| XSS reflejado | `curl.exe -i "http://localhost:8080/?q=<script>alert(1)</script>"` | 403 Forbidden | 403 Forbidden |
| SQLi en login | `curl.exe -i http://localhost:8080/login -H "Content-Type: application/json" --data-binary "@payload.json"` con `{"username":"' OR 1=1 --","password":"test"}` | 403 Forbidden | 403 Forbidden |

## Hallazgos
1) **Protección WAF efectiva para XSS y SQLi comunes.** CRS bloquea las cargas maliciosas probadas (403) y permite tráfico legítimo (200).  
2) **Certificado autofirmado en 8443.** Válido solo para pruebas; no apto para producción.  
3) **Sin rate limiting ni protección DoS en Nginx.** Podrían saturar el backend con muchas solicitudes válidas.  
4) **Auditoría limitada al log de error de Nginx.** No se está guardando audit log detallado (modsecurity_audit.log) para forense.

## Recomendaciones
- Producción: usar certificado TLS de confianza (ACME/Let’s Encrypt) o de la CA corporativa.
- Activar audit log de ModSecurity (`SecAuditLogParts ABIJDEFHZ`, rotación diaria, retención 30 días).
- Añadir `limit_req` y `limit_conn` en Nginx para mitigar fuerza bruta y scraping.
- Subir a `PARANOIA=2` en pre-producción, ajustar exclusiones para falsos positivos y luego promover a prod.
- Integrar las pruebas de XSS/SQLi/Path traversal en pipeline CI (curl o zap-cli) para regresiones.

