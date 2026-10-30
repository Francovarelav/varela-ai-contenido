# Estilos de carrusel aprobados

## A) «Sistema» (EL DE DIARIO) — futurista, minifiguras LEGO, 0 créditos
Ejemplo aprobado: `carruseles/prueba-sistema/` (inventario, «Tu Excel dice 40. En la bodega hay 12.»).
Plantilla: `marca/plantilla-sistema.html`. En `slides.json` pon `"plantilla":"plantilla-sistema.html"`.
Fondo noche con retícula técnica, una lámina clara (pasos) y una azul (resultado). Todo lo visual se hace en código:
notificaciones, número gigante, teléfono con la app. Personajes: `marca/personajes/<nombre>/<pose>`
(poses: preocupada, sorprendida, triste, senala, tablet, celebra, pulgar; nombres: chuy, marisol, valeria, ricardo,
beto, elena, andres, sofi, memo, tere, paty, rafa, karla, ana, lalo, tono, lupita, daniela, rosa).
Usa UN personaje por carrusel, el que mejor encaje con el giro, y no repitas el del día anterior.

Tipos de lámina (`tipo`):
- `gancho`: `titulo` (máx. 9 palabras, `<mark>` bloque azul, `<em>` azul eléctrico), `burbujas` opcional (1 notificación), `personaje` sorprendida/preocupada.
- `caos`: `titulo` + `burbujas` (3 notificaciones: `de`, `m`, `i` = 2 letras del ícono, `c` = r|a|b color, `h` hora) + `personaje`.
- `numero`: `numero` (ej. `"28 <small>piezas</small>"`), `vs` opcional (2 etiquetas), `etiqueta`, `nota` («* Ejemplo ilustrativo» si es ejemplo), `personaje`. Con `"fondo":"azul"` sirve para el resultado.
- `pasos`: lámina clara con `titulo`, `lista` (3 puntos, cortos) y `tip`. Sin personaje.
- `sistema`: `titulo` (`"m":true`), `texto` corto, `app` {`titulo`, `tag`, `kpi` {`l`,`v`}, `filas` [4 × {`t`,`s`,`e`,`c`: v|a|r|b}], `boton`}, `personaje` tablet. La app debe ser la del sistema que resuelve el problema del giro (cobranza, citas, CRM, producción, etc.), con datos realistas.
- `cta`: `titulo`, `pregunta`, `cta` (PALABRA), `personaje` pulgar/celebra.
Orden recomendado (7): gancho → caos → numero → pasos → sistema → numero azul (resultado) → cta.

## B) «Foto natural» (máx. 1 vez por semana, los jueves) — gasta ~3 créditos
Ejemplo aprobado: `carruseles/2026-10-30/` y `carruseles/prueba-cotizaciones/`. Plantilla `marca/plantilla-carrusel.html`.
Solo 3 fotos con Higgsfield (`gpt_image_2_5`, 4:5, quality medium, 2k): gancho, solución y CTA; las otras 4 láminas
reusan esas fotos con otro encuadre (`pos`) o son lámina `papel`.
### Cómo se hace (foto natural)
1. Genera 6 fotos con Higgsfield `gpt_image_2_5` (aspect_ratio `4:5`, quality `medium`, resolution `2k`)
   en un solo `generate_image_batch`. Prompt base de cada foto:
   «Candid iPhone photo, natural light, <escena concreta en un negocio mexicano del giro>, real people,
   authentic, documentary, normal 35mm lens, shallow depth of field, clear empty space in the top (o bottom)
   part of the frame for text. No text, no logos, screens blurred with no readable text.»
   Varía las escenas: dueño cansado/estresado (gancho), equipo o clientes (problema), objeto/detalle
   (costo o paso), empleado resolviendo con tablet/celular (solución), dueño tranquilo (CTA).
2. Descarga a `carruseles/<fecha>/fotos/1.png …` y revísalas (Read). Regenera las raras una vez.
3. Escribe `carruseles/<fecha>/slides.json` y renderiza: `node marca/render-carrusel.cjs carruseles/<fecha>`
   (usa `marca/plantilla-carrusel.html`; en la nube, si falta `node_modules/playwright`, `npm i playwright`
   o usa el Playwright global de /opt/pw-browsers con `NODE_PATH`).

### slides.json (foto natural)
- `foto`: ruta relativa a la carpeta del carrusel. `pos`: background-position opcional ("center 60%").
- `eye`: pill eléctrica rotada (2–4 palabras, ej. «Te suena», «Lo que cuesta», «Paso 1 · hoy»).
- `titulo`: HTML corto. `<mark>…</mark>` = bloque azul de marca; `<em>…</em>` = texto azul eléctrico.
  Máx. 9 palabras. Usa `"m": true` si es largo (baja a 96 px).
- `texto`: 1–2 frases, `<b>` para el dato clave. `nota`: letra chica mono (ej. «* Ejemplo ilustrativo»).
- `abajo: true`: texto en la parte baja (cuando la foto tiene el aire abajo / el sujeto arriba).
- `tipo: "papel"`: lámina sin foto (fondo papel) con `lista` (3 puntos) y `tip` (bloque azul con ↗).
  Úsala 1 vez por carrusel para romper el ritmo.
- `cta`: palabra en MAYÚSCULAS → bloque «Escríbenos «PALABRA» ↗» + pill «Guárdalo para cuando lo necesites».
  Va en la última lámina. La primera lámina muestra «Desliza →» y la última «varelta.com» automáticamente.

## Qué hace que convierta (los dos estilos)
- Lámina 1 = gancho, no portada: segunda persona, duele, se entiende en 1 segundo, obliga a deslizar.
- Cada lámina una sola idea. Valor real (pasos aplicables hoy) antes de vender.
- Una sola acción al final (escribir la palabra por DM). Nada de cifras inventadas como caso real.
