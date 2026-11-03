# Contenido de @varela.ai

Medios públicos para programar en Metricool (cuenta @varela.ai). Se sirven con GitHub Pages:
`https://francovarelav.github.io/varela-ai-contenido/<ruta>`

- `reels/` — los 15 reels LEGO de casos de uso (v01–v15).
- `carruseles/AAAA-MM-DD/` — carruseles diarios (1080×1350).
- `videos-nuevos/AAAA-MM-DD/` — video nuevo de cada día.
- `marca/` — logo y guía de marca Varelta.
- `historial.md` — qué se publicó cada día (para no repetir temas).

## Secuencia diaria (actualizada el 3-nov-2026)
Todo corre solo en la nube, en la rutina `trig_015etJ2aKZ9dD2RiNAx55DX9`, que lee `.metricool/rutina-prompt.md`.

| Hora (Monterrey) | Qué pasa |
|---|---|
| 7:00 | La rutina clona este repo y elige un tema que no se haya usado en 20 días, contando también lo ya programado. |
| 7:00–7:15 | Escribe el carrusel de 7 láminas con el estilo Varelta (`marca/CARRUSEL-VARELTA.md`), con al menos 3 fotos distintas de `marca/fotos/`. |
| | Renderiza con `node marca/render-varelta.cjs carruseles/<fecha>`. El renderizador revisa encimados, márgenes, titulares, fuentes y fotos; si marca ERROR, la rutina lo corrige. |
| | Hace push, comprueba las URLs de raw.githubusercontent y programa en Metricool. |
| 10:00 | Se publica el carrusel en IG y FB. |
| 12:00 | (Opcional) Carrusel extra hecho a mano en la Mac. |
| 18:00 | Reels LEGO ya programados hasta el 13-nov. |

- **Video:** en pausa hasta aprobar el formato nuevo (motion graphics tipo Steppy + historia tipo Roxy, zonas seguras de IG).
- **Costo:** 0 créditos de Higgsfield por día. Solo se paga la corrida de Claude.
- **Historial:** cada carrusel queda en `historial.md` con tema, giro, PALABRA, enlace de Metricool y foto de portada.

