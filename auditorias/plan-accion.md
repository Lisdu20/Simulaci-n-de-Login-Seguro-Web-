# Plan de acción posterior a la auditoría (Práctica 1)

Fecha de inicio: 26/03/2026  
Owner del plan: Líder de Desarrollo / DevSecOps

| # | Acción | Responsable | Estado | Fecha objetivo |
| --- | --- | --- | --- | --- |
| 1 | Habilitar audit log de ModSecurity con rotación (daily, 30 días) | DevOps | Pendiente | 02/04/2026 |
| 2 | Configurar `limit_req` y `limit_conn` en Nginx (p.ej. 10 r/s por IP, burst 20) | DevOps | Pendiente | 02/04/2026 |
| 3 | Subir `PARANOIA=2` en ambiente de pruebas y documentar exclusiones necesarias | DevSecOps | Pendiente | 05/04/2026 |
| 4 | Obtener/instalar certificado TLS válido para 8443 (o mover a 443 en prod) | Infra | Pendiente | 08/04/2026 |
| 5 | Integrar pruebas automáticas (XSS, SQLi, traversal) en CI | QA | Pendiente | 10/04/2026 |
| 6 | Revisar y excluir falsos positivos documentados tras PARANOIA=2 | DevSecOps + Backend | Pendiente | 12/04/2026 |
| 7 | Presentar reporte ejecutivo a dirección y aprobar cambios de hardening | Líder de proyecto | Pendiente | 12/04/2026 |

Seguimiento: revisar este plan cada semana hasta cerrar todas las acciones; registrar evidencias (capturas de comandos, logs) en `auditorias/evidencias/`.

