# Estilo de carrusel aprobado: FOTO NATURAL + tipografía grande

Ejemplo aprobado: `carruseles/2026-10-30/` (tema «Si mañana faltas, ¿tu negocio sigue funcionando?»).
Mira `carruseles/2026-10-30/slides.json`: es el formato exacto a seguir.

## Cómo se hace
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

## slides.json
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

## Qué hace que convierta
- Lámina 1 = gancho, no portada: segunda persona, duele, se entiende en 1 segundo, obliga a deslizar.
- Cada lámina una sola idea. Valor real (pasos aplicables hoy) antes de vender.
- Una sola acción al final (escribir la palabra por DM). Nada de cifras inventadas como caso real.
