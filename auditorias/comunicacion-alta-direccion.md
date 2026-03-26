# Resumen ejecutivo para alta dirección – Auditoría WAF (Práctica 1)

Fecha: 26/03/2026  
Responsable: Líder de Desarrollo Seguro

## Situación
Se implementó un WAF (Nginx + ModSecurity + OWASP CRS) frente al servicio de login en puerto 3000, expuesto al usuario en 8080/8443.

## Resultados clave
- Tráfico legítimo pasa sin bloqueo (200 OK).
- Intentos de XSS y SQLi fueron bloqueados (403). Evidencia en `auditorias/auditoria-practica1.md`.
- Riesgos residuales: certificado autofirmado, sin rate limiting, sin audit log forense.

## Riesgo y impacto
- Probabilidad de explotación de XSS/SQLi mitigada por reglas CRS actuales.
- Riesgo de DoS aplicando solicitudes válidas sigue presente hasta habilitar limitación de tasas.
- Auditoría y trazabilidad limitada mientras no se active el audit log.

## Decisiones y apoyos requeridos
- Autorizar obtención/instalación de certificado TLS válido.
- Aceptar ventana de pruebas con `PARANOIA=2` para mayor cobertura de reglas.
- Alinear a QA para integrar pruebas automáticas de payloads maliciosos en el pipeline.

## Próximos hitos
- 02/04: audit log + rate limiting configurados.
- 05/04: pruebas con PARANOIA=2 y ajustes de exclusiones.
- 10/04: pruebas automáticas en CI.
- 12/04: cierre de plan de acción y revalidación.

