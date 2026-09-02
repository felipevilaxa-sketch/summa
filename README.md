# Handoff: Plataforma de Reformas Educativas — SUMMA / BID

## Overview
Sitio de la Plataforma de Reformas Educativas de SUMMA con apoyo del BID. Sistematiza
reformas educativas de gran escala en América Latina y el Caribe bajo una estructura
analítica común, de modo que sean comparables entre sí.

Ocho vistas: inicio, marco WISE, líneas de reforma, detalle de una línea, listado de
casos con comparador, criterios de selección, detalle de un caso y resultados de búsqueda.

## About the Design Files
Los archivos de este paquete son **referencias de diseño hechas en HTML**: prototipos que
muestran la apariencia y el comportamiento buscados, no código de producción para copiar
directamente.

La tarea es **recrear estos diseños en el entorno del codebase de destino** (React, Vue,
Astro, Next, etc.) usando sus patrones y librerías establecidas. Si aún no existe un
entorno, elegir el framework más apropiado para el proyecto e implementarlos ahí.

Cada archivo `.dc.html` es un componente autocontenido con dos partes: un template
declarativo y una clase de lógica en JavaScript. Al portarlo, la clase se traduce a estado
de componente y los `{{ holes }}` a interpolación del framework de destino.

## Fidelity
**Alta fidelidad (hifi).** Colores, tipografía, espaciado, estados e interacciones están
definidos y deben recrearse fielmente con las librerías del codebase. Las cifras de los
gráficos y varias fechas son ilustrativas y están marcadas como tales en la interfaz;
deben reemplazarse por datos reales.

---

## Design Tokens

### Colores
| Rol | Hex |
|---|---|
| Teal corporativo (primario) | `#0D4A57` |
| Teal oscuro / texto fuerte | `#17242A` |
| Verde lima (acento) | `#8BC53F` |
| Verde medio | `#6FA030` |
| Verde oscuro (texto sobre claro) | `#4E7220` |
| Verde muy oscuro | `#3F5F1B` / `#3A5518` / `#334C13` |
| Verde claro (fondo) | `#EEF6E2` |
| Lima claro (degradado y texto sobre oscuro) | `#D4FBA1` |
| Texto cuerpo | `#33444A` |
| Texto secundario | `#516268` |
| Texto terciario (AA sobre blanco) | `#4F6B72` |
| Texto atenuado | `#7C8B8D` / `#8CA0A5` |
| Borde | `#DCE3E1` |
| Borde suave | `#ECF1EF` / `#F0F4F3` |
| Fondo gris verdoso | `#F4F7F6` |
| Azul (terciario) | `#6C90A3` / `#3E7F90` / `#2E6473` |
| Azul claro (fondos escala WISE) | `#E6F0F3`, `#BFD9E1`, `#93BDC8` |
| Azul pálido (fondo tag) | `#EAF1F2` |
| Mostaza (terciario) | `#E8A33D` / `#B4791F` |
| Mostaza fondo | `#FBF0DF` |
| Terracota (terciario) | `#C4674A` / `#B0563A` / `#9A4630` |
| Terracota fondo | `#F6E2DC` |

**Reglas de uso.** Predominan los neutros y los dos corporativos (teal y verde lima). Los
terciarios (mostaza, terracota, azul) solo como acento controlado: líneas superiores de
tarjetas de cifras, series de gráficos, chips de estado. Nunca como fondo de sección.

**Degradado primario** (botones destacados y hero de líneas):
`linear-gradient(90deg,#8BC53F 0%,#D4FBA1 100%)` con `background-size:180% 100%` y
`background-position` de `0%` a `100%` en hover (transición `.35s ease`).

### Tipografía
- **Titulares y UI**: `'Google Sans', sans-serif` — pesos 400, 500, 600, 700.
- **Cuerpo**: `'Google Sans Text', system-ui, sans-serif`.
- **Código y citas**: `'SFMono-Regular', Consolas, monospace`.

Las fuentes están embebidas como `@font-face` base64 en `fonts.css` (6 caras). En el
codebase de destino, sustituir por las fuentes ya instaladas o servirlas como archivos.

Escala:
| Uso | Tamaño | Peso | Line-height |
|---|---|---|---|
| H1 hero | `clamp(28px,4.2vw,42px)` | 600 | 1.16–1.20 |
| H2 sección | `clamp(24px,3.2vw,34px)` | 400 | 1.25 |
| H2 artículo | `clamp(22px,2.5vw,26px)` | 700 | 1.25 |
| H3 tarjeta | 19–21px | 700 | 1.3 |
| Cifra grande | `clamp(26px,3.8vw,40px)` | 700 | 1 |
| Cuerpo artículo | 15.5px | 400 | 1.75 |
| Cuerpo tarjeta | 13.5–14px | 400 | 1.6 |
| Antetítulo (eyebrow) | 10.5–12px | 700 | uppercase, `letter-spacing:.07em` |
| Botón | 13px | 400–600 | `letter-spacing:.03em` |
| Meta / pie | 12–12.5px | 400–600 | 1.5 |

### Espaciado
- Contenedor: `max-width:1240px`, padding `clamp(20px,4vw,40px)`.
- Entre secciones: `clamp(90px,13vw,170px)` en inicio; `clamp(52px,7vw,88px)` en interiores.
- Interior de tarjeta: `20–26px` horizontal, `18–26px` vertical.
- Gap de grilla: 16px (cifras), 20–24px (tarjetas).

### Radios
`999px` píldoras · `16px` tarjetas y contenedores · `14px` tarjetas de enlace ·
`12px` subtarjetas · `10px` inputs y bloques de código · `6px` chips y etiquetas.

### Sombras
- Header al hacer scroll: `0 4px 20px rgba(13,74,87,.09)`.
- Hover de tarjeta: `0 16px 32px -8px rgba(13,74,87,.16)` + `translateY(-4px|-5px)`.
- Hover de enlace: `0 8px 20px -10px rgba(13,74,87,.25)`.
- Modal: `0 20px 46px -14px rgba(13,74,87,.45)`.
- Tooltip: `0 4px 14px rgba(23,36,42,.25)`.
- Botón flotante: `0 10px 26px -8px rgba(13,74,87,.55)`.

### Animaciones
```css
@keyframes fadeUp   { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:none} }
@keyframes drawLine { from{stroke-dashoffset:900} to{stroke-dashoffset:0} }
@keyframes growBar  { from{transform:scaleY(0)} to{transform:scaleY(1)} }
@keyframes popDot   { from{opacity:0;transform:scale(.2)} to{opacity:1;transform:scale(1)} }
@keyframes drawArc  { from{stroke-dashoffset:440} }
@keyframes storyFill{ from{width:0%} to{width:100%} }
```
Transiciones estándar: `.15s` en color y borde, `.25s` en sombra y transform,
`.32s–.35s` en cambios de estado y degradados.

---

## Componentes globales

### Header
Fijo (`position:fixed`, `z-index:50`) con espaciador hermano de 81px (74px en móvil).
Fondo blanco; adquiere sombra al superar 8px de scroll. Contenido: logo (38px de alto,
30px en móvil) · enlaces Marco WISE y Líneas de Reforma · botón de búsqueda circular de
40px · CTA primario "Explorar casos" (relleno teal, hover outline).

En móvil (≤900px) los enlaces y el CTA se ocultan y aparece un botón hamburguesa de 44px
que abre un panel a pantalla completa con la navegación.

### Buscador
Botón circular con lupa. Al activarse despliega un panel bajo el header (alto calculado en
runtime) con un input ancho, sugerencias agrupadas por palabra clave, país y concepto, y un
botón "Buscar" en píldora. El fondo de la página recibe una capa oscura, pero el header
permanece por encima. Cerrar con ✕ circular o Escape. La búsqueda lleva a
`resultados.html?q=…`.

### Footer
Ancho completo, fondo `#0D4A57`, contenido centrado a 1240px.
- Izquierda: logo SUMMA en blanco (38px) y, bajo el rótulo "Miembros fundadores", el logo BID en blanco (42px).
- Derecha: CTA primario "Contáctanos" (degradado verde), CTA secundario "Trabaja con nosotros" (outline blanco), enlace terciario "Plataforma de Prácticas Educativas Efectivas →" separado por una línea, y tres íconos circulares de 38px (LinkedIn, X, YouTube).
- En móvil se apila alineado a la izquierda.

### Tarjeta de caso
Borde `#DCE3E1`, radio 16px. Imagen `aspect-ratio:16/7` con etiqueta de línea de reforma
en blanco sobre la esquina superior izquierda. Cuerpo: país con punto verde, título a dos
líneas fijas (`min-height:2.6em`), cifra destacada con su glosa, y CTA "Ver caso →".
Hover: elevación y sombra.

---

## Screens / Views

### 1. index.html — Inicio

**Hero tipo story.** Imagen a sangre completa en escala de grises con degradado oscuro
suave, alto `clamp(360px,40vw,480px)`, contenido centrado horizontal y verticalmente.
Tres pasos fijos que rotan cada 6,2s:
1. `01 — El problema` / "América Latina atraviesa una crisis educativa."
2. `02 — La pregunta` / "Se necesitan reformas.\n¿Por dónde empezar?" (salto de línea explícito, `white-space:pre-line`)
3. `03 — La respuesta` / "Sistematizamos lo que ya funcionó, para decidir con base en evidencia." + CTA "Explorar casos"

Bajo el titular, tres barras de progreso tipo Instagram: la activa se llena con
`@keyframes storyFill` de 6,2s; las anteriores quedan al 100%. Un solo `setTimeout` avanza
el paso (no un intervalo por frame). Al hacer clic en una barra se salta a ese paso y se
reinicia el temporizador. La transición entre pasos usa opacidad y `translateY` de .34s.

**Dos tarjetas de acceso** justo bajo el hero, en dos columnas (una en móvil): "Líneas de
reforma" y "Casos", cada una con antetítulo, título, descripción, foto a color y CTA.

**Fila de métricas** a ancho completo (`data-m="stat-row"`): 2 líneas de reforma, 12 países
cubiertos, 6 casos documentados. Los números cuentan de 0 a su valor en 1,4s cuando la
fila entra en viewport. Cada tarjeta lleva línea superior de un terciario distinto.

**Qué es la plataforma.** Dos columnas: texto más CTA "Ver criterios de selección de casos"
(relleno teal, hover outline) y cuatro tarjetas de pilar con borde izquierdo de color.
Debajo, bloque "Para quiénes" con cuatro tarjetas de perfil, cada una con su ícono de 56px
arriba a la izquierda y número en la misma línea del título.

**Cobertura regional.** Globo 3D interactivo en canvas (`globe.js`): rotación automática,
arrastre con el mouse, pines por país. Al seleccionar un país en el globo o en el desplegable
se muestra su caso con un CTA. El pin de Chile enlaza al detalle del caso.

**Marco WISE.** Título, descripción y CTA "Ver marco WISE", más el esquema de cinco
dimensiones en versión estática (sin desplegables).

### 2. marco-wise.html — Marco WISE

**Hero** en contenedor con degradado `105deg` de `#0D4A57` a azul claro, alto
`clamp(420px,38vw,460px)`. A la derecha, retícula isométrica animada en SVG: un punto
recorre las aristas del cubo con `animateMotion` (los puntos con retardo parten en
`opacity:0`).

**Dimensiones y subdimensiones** (`id="esquema"`) con dos vistas conmutables:

*Esquema* — flujo horizontal en grilla `1fr 40px 1.15fr 40px 1fr`:
Insumos → contenedor punteado con los tres niveles de proceso → Resultados, con flechas
entre columnas. Fondo de cada tarjeta según la escala del teal:
Insumos `#E6F0F3` · Nivel 3 `#BFD9E1` · Nivel 2 `#93BDC8` · Nivel 1 `#3E7F90` ·
Resultados `#0D4A57`. Las etiquetas de categoría (Entrada, Procesos, Nivel 1/2/3, Salida)
van en verde, solo texto y sin fondo. Al hacer clic en una tarjeta se despliega abajo un
panel a todo el ancho con la descripción, las subdimensiones y sus indicadores. En móvil
la grilla pasa a una columna y las flechas rotan 90°.

*Círculo* — diagrama concéntrico (viewBox 520, máximo 540px): Resultados al centro (r=84),
los tres niveles como tercios del anillo medio (r=133, grosor 86, `stroke-dasharray`
`271 837` con offsets 0 / −278 / −556) e Insumos en el anillo exterior (r=215, grosor 62).
Sin texto dentro del SVG: toda la nomenclatura vive en la leyenda de la derecha, agrupada
en Entrada, Procesos y Salida, con color, número de subdimensiones y resaltado recíproco al
pasar el cursor. Al hacer clic se abre un modal con las subdimensiones desplegables.

**Tendencias.** Gráfico de barras de casos por dimensión, con selector de rango temporal.
Paleta de mostaza y grises del verde opaco. En móvil las etiquetas del eje se reemplazan
por versiones cortas (Insumos, Habilitantes, Apoyo, Aula, Resultados).

### 3. lineas-de-reforma.html — Líneas de Reforma

**Hero** con degradado verde `105deg` de `#8BC53F` a `#DDF6AE`, textos en teal oscuro,
CTA "Ver las líneas" con flecha hacia abajo. Ilustración isométrica de cubos encadenados
en SVG, con puntos que recorren las aristas; el último cubo va en línea punteada
(representa el crecimiento futuro). Mismo alto que el hero de Marco WISE.

**Módulo de criterios**: "Cómo seleccionamos los casos" con CTA "Ver criterios de selección".

**Tarjetas de línea** — "Conoce cada línea y sus casos". Una tarjeta por línea con ícono de
56px arriba a la izquierda, etiqueta de dimensión en verde claro sobre texto verde oscuro,
título de dos líneas fijas, descripción a altura constante y contador de casos alineado.
Se suma una tarjeta punteada "En crecimiento · Nuevas líneas en preparación" con etiqueta
outline en teal.

### 4. financiamiento-progresivo.html — Detalle de línea

**Hero** en contenedor `#F4F7F6`, textos centrados verticalmente, bajada de una sola
frase, y el ícono de la línea como textura de fondo a la derecha: muy grande, al 16% de
opacidad y recortado por el borde. CTA "Ver los casos" con flecha hacia abajo.

Luego: contexto de la línea, módulo "Criterios aplicados a los casos" con CTA "Ver
criterios de selección", tarjetas de los tres casos (mismo componente del inicio) y, al
final, módulo de comparación con botón outline.

### 5. casos.html — Casos

Sin hero: entra directo al núcleo. Cabecera con título, contador de resultados, botón
"¿Cómo usar esta vista?" y conmutador Listado / Comparador en píldoras.

**Listado.** Caja de filtros (grilla `auto-fit` de 220px, 28px de separación con las
tarjetas): línea de reforma, dimensión WISE (**multiselector** en desplegable con
casillas), país o región, y orden (línea, más recientes, más antiguos, país). Chips de
filtros activos con ✕ y "Limpiar todo". Grilla de tarjetas en `repeat(auto-fill,minmax(290px,1fr))`
— `auto-fill` para que las tarjetas conserven su ancho al filtrar. Cada tarjeta suma
etiquetas de dimensión WISE y un botón "+ Comparar". Estado vacío con reset.

Al seleccionar casos aparece una **barra fija inferior** teal con los elegidos, "Vaciar" y
"Comparar ahora".

**Comparador.** Filtros de criterio de orden (escala, costo de implementación, costo por
estudiante, alcance) más "Exportar CSV" e "Imprimir", ambos deshabilitados si hay menos de
dos casos. Lista de chips de casos disponibles con su línea. Se comparan **hasta tres casos
de cualquier línea de reforma**. Cada tarjeta muestra un mosaico de cuatro indicadores —el
del criterio activo se resalta en verde— y filas de detalle; los elementos están alineados
a la misma altura entre tarjetas para facilitar la lectura horizontal. Botón de limpiar
para resetear la vista.

**Guía de uso.** Recorrido de 4 pasos con foco de luz sobre el elemento real (filtros →
multiselector WISE → conmutador → botón Comparar). Oscurece el resto, contornea el objetivo
en verde, hace scroll si queda fuera de pantalla, avanza con botones o flechas del teclado
y cierra con Esc. Se muestra sola la primera visita (`localStorage`) y luego queda
disponible en el botón de cabecera y en un botón flotante con signo de interrogación.

### 6. criterios-de-seleccion.html — Criterios de selección

Metodología resumida y, en `id="matriz"`, la matriz por caso.

**Pestañas de línea de reforma** con subrayado verde (mismo componente del detalle de caso)
y, debajo, **chips de filtro por caso** ("Todos los casos" más uno por caso). Al cambiar de
línea vuelve a "Todos".

**Matriz** en tabla con scroll horizontal propio: una fila por criterio, una columna por
caso. Cada criterio conserva su botón "Ver definición". Los valores usan chips de estado
con color (cumple, parcial, no aplica). Exportación a CSV que toma el nombre del caso
cuando hay uno filtrado.

**Deep links**: `?linea=fin` selecciona la línea con todos sus casos; `?caso=sep`
selecciona la línea y filtra al caso. Ambos hacen scroll a la matriz.

Cierra con un módulo de CTA "Comparar casos" que lleva a `casos.html?vista=comparador`.

### 7. detalle-caso.html — Detalle de caso (SEP, Chile)

Cabecera con etiqueta de línea, título, bajada, fila de metadatos horizontal (País, Línea,
Vigencia, Tipo de mecanismo) y, a la derecha y del mismo ancho, dos botones apilados:
"Comparar con otros casos" y "Ver criterios de selección", ambos con ícono de enlace
externo.

**Diez pestañas** en píldoras dentro de un contenedor gris con borde (la activa en teal
sólido; envuelven a dos líneas sin perder legibilidad):
Resumen · Contexto · Diseño · Financiamiento · Implementación · Resultados e impacto ·
Lecciones · Multimedia · Recursos · Bibliografía.

**Resumen** — tarjeta teal con la idea central del caso, foto, seis cifras (una por
sección, etiquetadas con su sección de origen), ficha técnica del mecanismo y tres tarjetas
de evidencia clave con su fuente.

**Contexto · Diseño · Financiamiento · Implementación · Lecciones** — formato artículo con
índice lateral pegajoso a la izquierda (visible desde 1320px) que resalta la sección en
curso. Cada sección abre con el aviso de cómo desplegar los detalles. Los detalles se abren
con frases subrayadas de puntos o con enlaces "Más detalle sobre este punto".

Recursos embebidos, repartidos sin repetir el mismo tipo:
- *Contexto*: gráfico de barras del gasto privado por quintil (etiquetas como overlay HTML sobre el SVG), enlace al documento de la OCDE y podcast sobre la discusión legislativa de 2008.
- *Diseño*: video explicador sobre focalizar por estudiante y enlace al texto oficial de la Ley N°20.248.
- *Financiamiento*: gráfico de barra apilada con la composición del ingreso y podcast sobre presupuesto fiscal.
- *Implementación*: tres tarjetas de contexto (político, económico, social) y línea de tiempo vertical con seis hitos desde 1981.

**Resultados e impacto** — dashboard, no artículo: cuatro KPIs con acento de color, gráfico
principal de la brecha de lectura con tooltips, dos gráficos secundarios (efecto por
quintil en barras horizontales y escuelas con convenio) y dos paneles finales, "Hallazgos
destacados" con fuente y "Límites de la evidencia".

**Multimedia** — grilla de seis piezas (video y podcast), indicando en qué sección aparece
cada una.

**Recursos** — tarjetas por gráfico con "Ver y exportar" y CSV directo, bloque "Documentos
de apoyo" con los enlaces externos, descarga de informes y el prompt de IA para copiar.

**Bibliografía** — fuentes, citación en texto y BibTeX con botón de copiar, y tarjeta verde
claro "Validado por Comité Experto" con tres integrantes (foto circular, nombre, cargo).

**Modal de gráfico** con pestañas Visualización / Datos y exportación CSV, SVG y PNG.
**Panel lateral de comparación** con la tabla de dimensiones.

### 8. resultados.html — Resultados de búsqueda
Lista de resultados etiquetados por tipo (Caso, Línea, Marco) con filtros por tipo. Solo
muestra contenido publicado.

---

## Interactions & Behavior

- **Header**: sombra al superar 8px de scroll; en móvil, menú hamburguesa a pantalla completa.
- **Hero story**: avance automático cada 6,2s con `setTimeout`; barra de progreso animada por CSS; clic en barra para saltar.
- **Contadores**: se disparan al entrar la fila de métricas en viewport (umbral 0,92 de `innerHeight`), 1,4s de duración.
- **Filtros**: aplicación inmediata sin recargar; el multiselector WISE filtra por unión (cualquier dimensión marcada).
- **Comparación**: máximo 3 casos; al agregar un cuarto se descarta el primero; persiste al alternar entre listado y comparador.
- **Acordeones**: alternan con clic, animación `fadeUp` de .28s, `aria-expanded` en el disparador.
- **Gráficos**: animación de entrada al montar; tooltips en hover y con foco de teclado; limpieza en `blur` y `mouseleave`.
- **Modales y paneles**: cierre por ✕, clic en el fondo o Esc; `role="dialog"` y `aria-modal`.
- **Guía de uso**: recorrido con foco, teclado (← → Esc), memoria en `localStorage`.
- **Toasts**: aviso inferior de 2,2s al copiar o al reproducir una demo.

## State Management

Por vista, el estado necesario:

- **Inicio**: `slide`, `run` (ciclo de animación), `fading`, `scrolled`, `counts[]`, `counted`.
- **Marco WISE**: `view` (`flow`|`ring`), `pillar` (dimensión abierta), `ring` (capa en hover), `open{}` (subdimensiones), `range` (rango del gráfico), `hover`, `scrolled`.
- **Casos**: `mode` (`lista`|`comparador`), `fLinea`, `fWise[]`, `fPais`, `fSort`, `compare[]`, `criterio`, `tour`, `rect` (posición del foco), `scrolled`.
- **Criterios**: `linea`, `caso`, `open{}` (definiciones), `scrolled`.
- **Detalle de caso**: `tab`, `open{}` (acordeones), `activeToc`, `wide`, `chart`, `chartMode`, `compare`, `tip`, `barTip`, `pieHover`, `copied{}`, `toast`, `scrolled`.
- **Resultados**: `q`, `filter`.

Sin data fetching: todos los datos están en constantes al inicio de cada clase de lógica
(`CASES`, `PILLARS`, `CRITERIOS`, `CHARTS`, `TOUR`, `STORY`…). Al portar, extraerlos a un
CMS o a archivos de datos.

## Responsive behavior

Los ajustes viven en `responsive.css`, mediante atributos `data-m="…"` en el HTML, y
**no alteran la versión desktop** (>900px):

| Atributo | Ajuste en ≤900px |
|---|---|
| `hamburger` | visible (oculto en desktop) |
| `navlinks`, `navcta` | ocultos |
| `topnav` | sin wrap |
| `brand` | logo a 30px |
| `spacer` | 74px |
| `footer-row`, `footer-col` | apilado a la izquierda |
| `scroll-x` | scroll horizontal |
| `wise-flow` | una columna |
| `wise-arrow` | rotado 90° |
| `hero-d-cards` | una columna |
| `icon-btn` | 44×44 (objetivo táctil) |
| `label-full` / `label-short` | intercambio de etiquetas del gráfico |

Objetivo táctil mínimo de 44px en todos los controles de ícono.

## Accessibility

- `role="tablist"` / `role="tab"` con `aria-selected` en pestañas y conmutadores.
- `aria-expanded` en acordeones y desplegables; `aria-pressed` en filtros de tipo toggle.
- `role="dialog"` con `aria-modal` y `aria-label` en modales y paneles.
- `role="img"` con `aria-label` descriptivo en cada gráfico y en las formas animadas.
- Tooltips accesibles por teclado (`tabindex="0"` en las zonas activas, `onFocus` / `onBlur`).
- `role="status"` en toasts y en resultados dinámicos.
- `:focus-visible` con contorno verde de 2px y `outline-offset:2px`.
- Contraste ≥4.5:1 verificado en texto sobre todos los fondos de la escala.
- `data-noprint` marca los elementos que se ocultan al imprimir.

## Assets

En `assets/`:
- `logo-summa.png`, `logo-summa-blanco.png` — logotipo SUMMA.
- `logo-bid-blanco.png` — logotipo BID para el pie.
- `hero-1.png`, `hero-2.png`, `hero-3.png` — imágenes de portada.
- `hero-story.jpg` — imagen del hero tipo story (se muestra en escala de grises por CSS).
- `case-1.jpg`, `case-2.jpg`, `case-3.jpg` — fotos de las tarjetas de caso.
- `metrics-bg.png`, `reforma-img.png` — apoyos gráficos.
- `icono-financiamiento.png`, `icono-lectoescritura.png` — íconos de línea de reforma.
- `perfil-tecnicos.png`, `perfil-tomadores.png`, `perfil-implementadores.png`, `perfil-investigadores.png` — íconos de perfil de usuario.
- `comite-1.jpg`, `comite-2.jpg`, `comite-3.jpg` — **placeholders** de los retratos del comité (iniciales sobre color); reemplazar por fotos reales.

Los logotipos son marcas de SUMMA y del BID: usar los archivos oficiales del cliente, no
recrearlos.

## Files

### Diseños (fuente)
| Archivo | Vista |
|---|---|
| `Inicio.dc.html` | Inicio |
| `Marco WISE.dc.html` | Marco WISE |
| `Lineas de Reforma.dc.html` | Líneas de reforma |
| `Financiamiento Progresivo.dc.html` | Detalle de línea |
| `Casos.dc.html` | Casos y comparador |
| `Criterios de Seleccion.dc.html` | Criterios de selección |
| `Detalle de Caso.dc.html` | Detalle de caso |
| `Resultados.dc.html` | Resultados de búsqueda |

### Apoyo
- `fonts.css` — `@font-face` de Google Sans y Google Sans Text (base64).
- `responsive.css` — ajustes móviles por `data-m`.
- `globe.js` — web component del globo 3D en canvas.
- `site-search.js` — web component del buscador con panel.
- `mobile-nav.js` — web component del menú hamburguesa.
- `support.js` — runtime de los archivos `.dc.html` (**no portar**: es el motor del prototipo).

### Compilados
`dist/` contiene las ocho páginas autocontenidas (fuentes, imágenes y scripts embebidos),
con nombres y enlaces web: `index.html`, `marco-wise.html`, `lineas-de-reforma.html`,
`financiamiento-progresivo.html`, `casos.html`, `criterios-de-seleccion.html`,
`detalle-caso.html`, `resultados.html`. Abrir estos para ver los diseños funcionando.

### Documentos de origen
`docs/` incluye los insumos del contenido: informe de financiamiento progresivo, análisis
comparado de lectoescritura, presentación de inicio de proyecto, análisis UX y la planilla
de criterios de selección.

## Pendientes conocidos

1. Los enlaces del pie (Contáctanos, Trabaja con nosotros, Prácticas Educativas Efectivas y redes) apuntan a `#`.
2. Solo el caso SEP tiene página de detalle propia; los otros cinco enlazan a la misma.
3. Los retratos del comité son placeholders.
4. Las series de los gráficos y varias cifras son ilustrativas y están marcadas como tales.
5. Los umbrales exactos de varios criterios de selección están por definir con el comité.
