# Carrusel estilo Varelta (aprobado por Franco el 3-nov-2026)

Este es EL estilo de carrusel de @varela.ai. Sustituye a los estilos «sistema» (LEGO) y «foto natural con IA» de `CARRUSEL.md`, que ya NO se usan.

Sigue el visual de varelta.com:
- Foto natural del cielo de la web.
- Tarjetas de interfaz real flotando.
- Titular enorme en dos tonos.
- Eyebrows en mono.
- Bloques sólidos redondeados con ↗.
- Cuadro de selección tipo Figma.
- Pill de CTA.

Nada que se vea hecho con IA.

**Ejemplo aprobado (cópialo siempre como base):** `carruseles/2026-11-04-bodega/carrusel.html` y sus PNG.

## Flujo (0 créditos, todo en código)
1. Crea la carpeta y copia el ejemplo:
   ```
   mkdir -p carruseles/<fecha>
   cp carruseles/2026-11-04-bodega/carrusel.html carruseles/<fecha>/
   ```
2. Edita SOLO los textos y el contenido de las piezas de `carruseles/<fecha>/carrusel.html`. Mantén:
   - las clases y la estructura;
   - el `<link>` a `../../marca/varelta.css`;
   - las rutas `../../marca/varelta-ala.png`.

   Puedes mover un poco las piezas con `top`, `left` o `right` inline y cambiar el encuadre de la foto con `background-position` en `.foto`. No toques `marca/varelta.css`.
3. Renderiza y revisa:
   ```
   node marca/render-varelta.cjs carruseles/<fecha>
   ```
   - Escribe `01.png … 07.png` y `hoja.jpg`.
   - Revisa solo fuentes, imágenes, márgenes, encimados, titulares de más de 2 renglones y texto desbordado.
   - Si imprime `ERROR`, corrige y vuelve a correrlo hasta que diga «sin errores».
4. Mira `hoja.jpg` UNA vez:
   - que se lea todo;
   - que la historia fluya;
   - que no haya nada raro.

   Si algo se ve mal, corrígelo (máximo 2 vueltas).

## La historia: 7 láminas, siempre en este orden
Cada lámina responde la pregunta que dejó abierta la anterior: es un open loop. El texto pequeño de abajo (`.sigue`) es el puente a la siguiente.

| # | Fondo | Papel | Componente del ejemplo |
|---|---|---|---|
| 01 Portada | cielo | Contradicción que duele y deja una pregunta abierta («Tu Excel dice 40. / Tu bodega tiene 12.»). | `h1` con `.sel` (cuadro de selección) + `.medida` + `.cursor` con la pregunta + 3 «artefactos del caos» (`.xls`, `.ref`, `.wa`) con su `.nota` debajo + `.pill` «Desliza y…» |
| 02 La escena | cielo | El momento exacto en que duele, con hora y día. | `.chat` con 3 `.msg` (`el` = cliente, `yo` = el dueño, `mal` = la mala noticia en rojo) + `.nota` de remate |
| 03 Por qué pasa | papel | Las 3 causas. | 3 bloques `.bl n1/n2/n3` (navy, azul, celeste) con «Fuga 01…» / «Causa 01…» y ↗ |
| 04 Lo que cuesta | cielo | Por qué importa (dinero, clientes, tiempo). | 3 `.cc` + `.ejemplo` (SIEMPRE con la etiqueta «Ejemplo»: nada de cifras inventadas presentadas como caso real) |
| 05 Hazlo hoy | papel | 3 pasos que puede aplicar HOY aunque no nos contrate. Da valor de verdad. | `.indice` con 3 `.fila` (líneas punteadas) |
| 06 Con un sistema | cielo | Cómo se ve resuelto con un sistema a la medida. | `.card.app` (tabla o tablero de la interfaz real) + 2 `.toast` con su `.nota` (`<i>01</i>`…) |
| 07 Tu turno | cielo | CTA. | `h1` con `.sel` en la palabra clave + `.nota` «Comenta PALABRA o mándanos mensaje…» + `.pill` «Comenta PALABRA» + varelta.com · «Guárdalo para…» |

Adapta las piezas al tema:
- **Archivo `.xls`:** inventa un nombre creíble de archivo caótico, por ejemplo `Cobranza_OCT_bueno_FINAL.xlsx`.
- **`.ref`:** puede ser `#¡REF!`, `#N/D`, `#¡VALOR!` o un sticker rojo corto, por ejemplo «3 DÍAS SIN RESPUESTA».
- **`.wa`:** un mensaje real del día a día.
- **Lámina 06:** la tabla o tablero debe ser del tema (citas, cobranza, pedidos…) con chips `.ok` / `.bajo`.

## Reglas de texto
- **Titulares:** máximo 2 renglones. Renglón 1 en gris (`.g`) da el contexto; renglón 2 da el golpe. Máximo 6–7 palabras por renglón. Una sola palabra o frase destacada:
  - `.ce` (celeste) sobre cielo;
  - `.az` (azul) sobre papel;
  - `.sel` (cuadro de selección) solo en portada y CTA.
- **Toda pieza flotante (tarjeta, sticker, toast) lleva su `.nota` debajo:** `<i>0N</i>` + máximo 10 palabras que explican por qué importa. Así cada cosa cuenta un pedazo de la historia.
- Español de México con acentos correctos. Segunda persona, de dueño a dueño. Nada de relleno.
- **Prohibido:** emojis (ni en los chats), imágenes generadas por IA, LEGO o minifiguras, glows, gradientes neón, precios.
- **CTA:** «Comenta PALABRA o mándanos mensaje» (PALABRA en MAYÚSCULAS, corta, que no se repita en 20 días) + varelta.com + «Guárdalo para…».

## Publicación
- Medios por `https://raw.githubusercontent.com/Francovarelav/varela-ai-contenido/main/carruseles/<fecha>/NN.png` (github.io no responde desde la nube).
- Revisa que las 7 URLs den 200 antes de programar.
