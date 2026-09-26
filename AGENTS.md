# Iglesia Viña Puerto Montt

Sitio en Astro + Tailwind v4. Cuatro páginas a la vista: la portada
(`index.astro`), `nosotros`, `actividades` y `soy-nuevo` —la de quien viene por
primera vez, donde aterriza «Quiero Visitar» del hero—, más `/centinela`, que
no se publica, el calendario suscribible `actividades.ics` y su gemelo de dentro,
`/interno/<clave>.ics`, con lo que no sale a la web.

El sitio está en español: nombres de componentes, variables, comentarios y
mensajes de commit van en español.

## Dónde está cada cosa

- **`src/data/content.ts`** — todo el texto y las imágenes editables. Si algo
  se ve en pantalla y no es maquetación, sale de aquí. Las imágenes se
  importan (no son rutas string) para que Astro las optimice; un `href` vacío
  significa «todavía no hay destino» y el componente esconde el botón.
- **`src/styles/global.css`** — tokens de color, radios y escala tipográfica.
  Cambiar un token cambia toda la web.
- **`src/lib/actividades.ts`** — lectura del calendario desde Notion.
- **`src/components/`** — una sección por componente.

## Convenciones de estilo

- **Tokens antes que clases sueltas.** Las utilidades de Tailwind leen los
  tokens con `var()`, así que redefinirlos en un ámbito cambia de piel todo lo
  que haya dentro sin tocar el marcado. Eso hacen `.tema-editorial` (tramo
  oscuro) y `.tramo-claro` (una sección blanca dentro del oscuro).
- **`.foto-fija`** deja una foto quieta detrás mientras la página se desliza
  por encima; se le pasa la imagen en `--foto`. `.foto-baja` es la variante
  con aire arriba, para que lo retratado no quede pegado al filo.
- **Una sola escalera tipográfica**, definida y documentada en
  `global.css`: `portada`, `heading-xl`, `heading-lg`, `heading-md`,
  `heading-sm`, `cifra`, `eyebrow`/`rotulo`, `subtitle-lg`, `subtitle` y
  `nota`. Todo título o texto sale de ahí; si algo no encaja en ningún
  peldaño, lo que falta es un peldaño, no un `text-[1.0625rem]` suelto. Solo
  la interfaz (botones, menú, calendario) va por libre, en 13 / 15 / 16 px.
- **`.voz-fina`** pone los titulares en peso normal para las páginas de dentro
  (`nosotros`, `actividades`) y los tramos oscuros. Se envuelve el tramo y
  todo lo de dentro cambia de voz; no se escribe `font-normal` título a
  título.
- **`SectionHeading`** es el único encabezado de sección. Rótulo en versalitas
  con línea fina debajo y, si hace falta, título grande y bajada; lo que se le
  pase por dentro va al extremo derecho de la fila del rótulo (el botón «Ver
  todos»). Las secciones cuyo contenido ya trae tipografía grande usan solo el
  rótulo: si los dos van en cuerpo grande, no se distingue cuál es cuál.
- Los bloques de imagen a sangre llevan esquina redondeada (2rem, 2.75rem en
  escritorio), no llegan a filo con el borde de la ventana. La excepción son
  los rectángulos grises de `ProyectosCompasion` y `SuenosTerreno`: esos sí
  llegan al filo derecho, y por eso redondean solo las esquinas de la
  izquierda. El margen de la izquierda lo repiten a mano, con los tres
  escalones de `container-page`.

## Trampas conocidas

- **Los estilos con ámbito de Astro no alcanzan a `<Image>`.** Lo pinta el
  componente, no la plantilla, así que no recibe el atributo de ámbito. Para
  darle estilo hay que usar `<style is:global>` acotado por una clase del
  contenedor.
- **Fotos de teléfono.** Los HEIC y muchos JPEG traen los píxeles de lado y el
  giro solo en la etiqueta EXIF, que Astro no mira. Ni `sips --rotate` ni
  pasar por PNG quitan esa etiqueta. Hay que hornear el giro con sharp, que ya
  está instalado:

  ```js
  await sharp(origen).rotate().resize({ width: 1200 }).jpeg({ quality: 82 }).toFile(destino);
  ```

  `.rotate()` sin argumentos aplica la orientación y borra la etiqueta.
  Conviene además reducir a ~1200px: las fotos de cámara llegan a 15 MB.

- **Los retratos del equipo pastoral se encuadran desde el CSS, no en el
  archivo.** Las fotos entran enteras, tal como salieron de la cámara —solo
  reducidas a 2600px de lado largo para que pesen lo razonable— y el marco
  cuadrado de la tarjeta enseña el trozo que le dice `encuadre` en
  `src/data/content.ts`: `zoom`, `x` e `y`, que se traducen a variables CSS en
  el `style` de cada `<Image>`.

  `zoom: 1` es `object-fit: cover`, o sea la foto entera de alto; es lo más
  abierto que se puede sin dejar hueco, y por eso nunca hay valores por debajo
  de 1. `x` e `y` van a la vez a `object-position` y a `transform-origin`, así
  que subir el zoom no descoloca lo que ya estaba cuadrado.

  **Los valores están puestos a ojo, mirando la grilla completa**, con Daniel y
  Nahara de referencia: cabezas del mismo tamaño, ojos a la misma altura y el
  mismo aire por encima. No salen de ninguna cuenta, y hubo un intento largo de
  que salieran: detección de caras con Vision, normalizar el alto de la cara y
  la línea de los ojos, recortar y hornear el resultado con sharp. Las medidas
  cuadraban al milímetro y la grilla seguía viéndose desigual, porque lo que
  hace que una pareja se vea grande no es solo el tamaño de la cara: es también
  lo juntos que posan, cuánto torso se ve y cuánto ocupan de ancho. Eso no lo
  arregla una fórmula. Si hay que retocar una tarjeta, se retoca a ojo y
  mirando las demás.

  Roberto y Araceli es la única que no llega del todo. Su foto sí es de fondo
  blanco y el tono ya iguala al resto, pero llega recortada en cuadrado y
  ajustada: los dos se salen por los tres filos —el hombro de él por la
  izquierda, ella por la derecha, los dos por abajo— y las caras salen algo
  más grandes que en las demás tarjetas. No se puede abrir más: `zoom` no baja
  de 1, y ensanchar el lienzo con blanco tampoco vale, porque el corte de un
  hombro oscuro contra el blanco añadido se ve como una línea recta. Se
  arregla con el archivo completo de la sesión, no con CSS.

  Los fundadores y Eduardo y Priscila llegan ya en blanco y negro, retocados
  en su sesión, y van con `enGris: true` en `content.ts`: sin ningún filtro
  —ni el gris ni el ajuste de `niveles`—. Su segunda foto sí sale a
  color como las demás; la de Eduardo y Priscila es la foto de familia que
  hizo de retrato provisional. En `soy-nuevo`, donde los retratos van a
  color, estos dos prestan su segunda foto en vez de la primera.

  **Desde el 25 de septiembre de 2026 la cuadrícula lleva los retratos
  editados en blanco y negro de la sesión**, todos con `enGris`. Son otras
  tomas, no las mismas fotos, así que cada `encuadre` se recalculó para que las
  caras quedaran del mismo tamaño y a la misma altura que en la tarjeta
  anterior —caras medidas con Vision en la foto vieja y en la nueva— y después
  se revisó a ojo en la grilla. Aquí la cuenta sí sirvió, porque cada foto
  tenía una tarjeta ya afinada con que compararse. Rodolfo y Natalie salen un
  4% más grandes (pedían `zoom` 0.96), y Juan y Lina, que no tenían foto, van
  a ojo: él es mucho más alto y con las caras al tamaño del resto a ella se le
  iba la barbilla. Quienes pastorean una red guardan el retrato de antes en
  `aColor` —el archivo `-color.jpg`, con su encuadre y sus `niveles`— para
  `soy-nuevo`, que así no cambió. David y Camila siguen con la foto a color
  y el filtro: su versión nueva no llegó.

  La cuadrícula se afinó en dos tandas y cada una tiene su referencia: la
  primera mitad se ajustó contra Daniel y Nahara, y la segunda —Jonathan,
  Hardy, Eugenia, Gerardo y Cecilia— contra David y Camila. Son las dos fotos
  que salían bien sin tocarlas.

  Un truco que hace falta cuando alguien llega muy arriba en su foto: poner el
  origen del zoom en el filo de arriba (`y: '0%'`, como en Nicole). Así el aire
  sobre la cabeza crece con la escala en vez de comérsela; con el origen a
  media altura, ampliar le cortaba la coronilla.

  Y al revés: quien posa más cerca de la cámara va sin zoom. Hardy y Ruth
  llevaban `1.2` y salían con las cabezas mucho más grandes que el resto de su
  fila; con `zoom: 1` —lo más abierto que se puede— cuadran. Que una foto pida
  zoom o no depende de la toma, no de la tarjeta.

  **El blanco y negro también se iguala desde el CSS**, y la referencia es el
  retrato de Eduardo y Priscila, que llega ya editado desde la sesión: pared
  en 220 sobre 255, negros apenas levantados (16) y altas luces sin quemar.
  Las demás fotos de estudio se expusieron para que la pared saliera blanca
  del todo —entre 210 y 250 en el trozo visible— y con los negros a cero.

  Cada retrato lleva en `content.ts` sus `niveles`: el negro, la pared y las
  altas luces, medidos sobre el trozo que enseña la tarjeta. No se escriben a
  mano: salen de `node scripts/niveles-retratos.mjs`, que hay que volver a
  pasar si cambia una foto o su `encuadre`. Con eso `src/lib/retratos.ts`
  calcula el `brightness()` y el `contrast()` que llevan el negro a 16 y la
  pared a 220 —una recta; una curva pediría un filtro SVG por foto, y no hace
  falta porque lo que cambiaba era la exposición—. Cambiar esos dos números
  ahí cambia el tono de toda la cuadrícula, y también el de `soy-nuevo`.

  Nicole es la excepción: su pared está en gris medio y lleva blusa clara, así
  que llevar la pared a 220 le quemaba la blusa. Hay un techo (245) para lo
  más claro, y por eso su pared se queda en ~193.

  Todo esto es `filter` de CSS, así que no toca los archivos: se puede quitar
  o recalibrar en cualquier momento y las fotos vuelven a estar como salieron
  de la cámara.

  En la web las tarjetas van en blanco y negro por CSS y el color llega al
  pasar el ratón: con segunda foto, cambiando la de arriba por la de abajo; sin
  ella, quitándole el gris a la misma foto. Las segundas fotos —las del
  hover— casi siempre vienen cuadradas; si no, llevan `encuadreHover`.

  En el teléfono no hay hover: ahí el script de `nosotros.astro` le pone la
  clase `encendida` —que hace lo mismo— al tocar el retrato, y otro toque lo
  devuelve a la primera foto; al salir de la ventana también vuelve a ella.
  Antes cambiaba solo (primero al cruzar el tercio central, después cada
  3,5 s mientras estaba a la vista), y se prefirió que cambie solo cuando lo
  pide quien mira. Solo corre con `(hover: none)`; en escritorio sigue siendo
  el ratón.

  **Ojo al comprobarlo en el navegador:** en desarrollo la URL de la imagen
  optimizada no lleva huella del contenido, así que al cambiar un retrato el
  navegador sigue sirviendo el viejo. Hay que recargar con ⌘⇧R.

- **El relato de «Nuestra historia» se queda quieto y las fotos corren por al
  lado.** Es un `sticky`, y ahí está la trampa: un bloque pegajoso más alto que
  la ventana se ancla arriba y su final nunca llega a verse. Hubo una primera
  versión con la altura mínima escrita en dos consultas de medios, medida sobre
  el texto de entonces; el efecto se apagaba entero en cuanto la ventana bajaba
  de 752px —un portátil de 13" con la barra de marcadores puesta ya no llega—, y
  cualquier párrafo de más en `historia.body` movía el número sin avisar.

  Ahora el tope lo calcula el script de `nosotros.astro` y lo deja en `--tope`:
  `min(64, innerHeight − alto del relato − 16)`. En ventanas holgadas da los
  4rem de siempre; en las cortas sale negativo y el relato asoma por arriba,
  dejando a la vista su final, que es lo que se venía leyendo al llegar. Se
  recalcula al redimensionar y cuando entra la tipografía, porque el alto
  cambia. Así no hay número que mantener.

  Por lo mismo el relato va en `subtitle` y no en `subtitle-lg`: es texto
  corrido, no la bajada de un título, y en cuerpo grande medía 681px, justo lo
  que da una ventana de portátil, así que el titular asomaba cortado.

  La misma trampa la tiene la columna de las redes en `soy-nuevo`, y se
  resuelve al revés: allí lo que sobra es la foto, no el texto, así que en vez
  de mover el anclaje se le pone tope de alto (`--alto`, calculado igual: lo
  que queda de ventana después de medir todo lo demás). Como la foto va con
  `object-cover`, recortarla de alto la encuadra más apaisada y no la deforma.

- **El afiche de la radio tiene dos versiones.** La apaisada
  (`radio-programacion.png`) es la de escritorio. La vertical
  (`radio-programacion-vertical.jpg`, 1200x2184) no es un recorte del
  original: la compone `scripts/afiche-radio.mjs` a la medida de la tarjeta
  del móvil. Sin esa composición no caben las dos cosas —el bloque de texto
  mide 301px de los 624 de la tarjeta, así que sobre el afiche entero tapaba
  media programación—. Cuando cambie la parrilla se rehace con el script; no
  vale reemplazar el archivo por el afiche a secas.
- **Fechas sin hora.** Notion las entrega como `YYYY-MM-DD` y `new Date` las
  lee en UTC, lo que en Chile las corre al día anterior. Usar `fechaDe()` de
  `src/lib/actividades.ts`.
- **En producción los iconos van en una lista escrita a mano.** Aquí entra la
  colección entera de lucide y cualquier `<Icon name="lucide:…">` funciona; el
  repositorio de producción (typeboldcl/vinapm, con el sitio en `website/`)
  declara en su `astro.config.mjs` los veintitantos que usa, para no publicar
  seis mil. Un icono nuevo funciona aquí y tira la construcción allí, diciendo
  cuál falta. Al portar una página nueva, hay que añadirlos.

- **Google Maps.** La dirección («La Vara Kilómetro 8») es rural y no
  geocodifica; se busca por el nombre de la ficha. El mapa incrustado sí va
  por coordenadas: por nombre, Google abre encima la ficha del negocio con su
  puntuación en estrellas.

## La dirección de los centinelas

`/centinela` son los bloques de oración de la Casa de Oración, que son un PDF.
La dirección corta es lo que se reparte al equipo, y es la que se queda en la
barra: la página (`src/pages/centinela.astro`) no lleva barra, ni pie, ni
tipografía nuestra —es el PDF a pantalla completa, en un `<object>`—.

**El mes que viene se reemplaza `public/centinela/bloques.pdf` y ya está**: la
dirección no cambia, así que el enlace repartido sigue sirviendo. Si algún día
hace falta guardar los meses pasados, habrá que darle nombre con fecha a cada
PDF y hacer una página con la lista.

En el teléfono no se puede enseñar dentro: unos navegadores dejan el recuadro
en blanco y otros pintan solo la primera página y no dejan pasarla. Por eso un
script lleva el teléfono al archivo —ahí la dirección sí cambia, y se abre
entero en su lector—. En escritorio no se toca nada.

No se publica: no lo enlaza nadie, queda fuera del mapa del sitio (el filtro
del sitemap en `astro.config.mjs`), `robots.txt` lo prohíbe y la página lleva
su `noindex`.

## Notion

El calendario de actividades se lee al construir el sitio con `NOTION_TOKEN`
(ver `.env.example`). Sin token —o con el token caducado— la página se genera
con la lista de respaldo y avisa en pantalla. Solo se publican las filas con
`Status = Web`.

**Ojo a dónde vive ese filtro.** `desdeNotion()` lee la base entera y solo
*anota* si la fila es publicable, en `actividad.publica`. Quien filtra es
`obtenerActividades()`, que es la puerta por la que entran la página y los dos
`.ics` públicos. La puerta de atrás es `obtenerTodas()`, que devuelve también
lo interno, y la usa un solo archivo: `src/pages/interno/[clave].ics.ts`. Si
algún día se añade una página que enseñe actividades, tiene que pedirlas por
`obtenerActividades()`; llamar a `obtenerTodas()` saca al aire los borradores
y las reuniones de dentro. Están puestas así —el filtro en la puerta de
delante, no en la lectura— justamente para que lo seguro sea lo que sale por
defecto.

**La descripción de una actividad no es una propiedad**: es lo que se escribe
en el cuerpo de su página de Notion. Eso obliga a una petición por actividad
—`/v1/blocks/{id}/children`— además de la consulta a la base, así que se piden
de tres en tres y solo para las actividades futuras, que son las únicas que se
publican. `obtenerTodas()` guarda la lectura y la reparte: la piden la página,
los dos `.ics` públicos y el interno, y sin eso cada construcción pagaría
cuatro veces esas peticiones. Son unas ciento cuarenta —las futuras de la
base entera, no solo las «Web»—, alrededor de tres cuartos de minuto.
En una construcción la lectura no caduca —el build dura lo que
dura—; en desarrollo caduca a los 30 s, para que editar el calendario y
recargar enseñe el cambio. El token es otra cosa: un servidor levantado antes
de tocar `.env` sigue sirviendo la lista de respaldo aunque el token ya esté
puesto, y ahí sí hay que reiniciar (`astro dev stop` y volver a levantarlo).

### El calendario interno del equipo

Además del `actividades.ics` público hay un segundo calendario, en
`/interno/<clave>.ics`, con **lo que no sale a la web**: las filas cuyo
`Status` no es «Web». Los dos se suscriben a la vez, no uno en lugar del otro,
y esa es toda la gracia: Google Calendar pinta de un color cada calendario
suscrito, y así lo interno y lo público se distinguen de un vistazo. Ninguna
actividad está en los dos, así que no hay nada duplicado.

**No se intentó el color por evento porque no existe con un `.ics`.** Google
ignora la propiedad `COLOR` de iCalendar; el color por evento solo lo da la
API de Google Calendar, y encima solo lo ven quienes tengan permiso de edición
sobre ese calendario. Dos suscripciones lo resuelven sin cuenta de servicio ni
nada que sincronizar.

La dirección lleva una clave impredecible (`CALENDARIO_INTERNO`, ver
`.env.example`) porque Google Calendar no manda cabeceras ni contraseñas al
suscribirse por URL: quien tiene el enlace, entra. De ahí que la clave venga
de una variable de entorno y no del código, que `robots.txt` prohíba
`/interno/` y que el enlace no aparezca en ninguna página. **Sin la variable
el archivo no se genera** —`getStaticPaths` devuelve la lista vacía—, que es
lo que queremos en un pull request o en el portátil de alguien. En producción
hay que darle el secreto al paso «Construir» del workflow, junto a
`NOTION_TOKEN`; si se olvida, el calendario deja de publicarse sin avisar,
pero por el lado seguro.

Cambiar la clave revoca el acceso a todo el mundo a la vez, y hay que volver a
repartir el enlace.

**El enlace a la ficha de Notion no se publica**, ni en la web ni en el `.ics`:
la base es una herramienta de dentro. Si vuelve a hacer falta, es `fila.url` en
`desdeNotion()`.

**`getImage` con `inferSize` y solo `width` estira las fotos.** Cambia el ancho
al pedido pero se queda con el alto del original: una foto de Notion de
2048x1214 salía de 720x1214 y una de 5556x4160, de 720x4160. Todas parecían
verticales cuando ninguna lo era, y cualquier marco cuadrado las dejaba en una
franja. La cura es preguntar las medidas aparte con `inferRemoteSize`, calcular
el alto proporcional y pasarle a `getImage` las dos. Si alguna vez las fotos
vuelven a verse estiradas o recortadísimas, mira primero el `width`/`height`
que sale en el `<img>`: si el alto coincide con el del archivo original, es
esto.

**En la ficha las fotos van en un cuadrado** —140px en el teléfono, 250 en
escritorio— con `object-contain`: se ve la foto entera y el hueco que sobra
arriba y abajo lo llena el gris de la tarjeta. Es decisión tomada: se prefiere
ver la foto completa a llenar el cuadrado recortando.

## Desarrollo

Levanta el servidor en segundo plano:

```
astro dev --background
```

Se maneja con `astro dev stop`, `astro dev status` y `astro dev logs`.

Para comprobar un cambio en pantalla hay `puppeteer-core` instalado; usa el
Chrome del sistema (`/Applications/Google Chrome.app/Contents/MacOS/Google
Chrome`). El script tiene que ejecutarse desde la raíz del proyecto para que
resuelva el paquete.

## Documentación

Documentación completa: https://docs.astro.build

- [Páginas, rutas dinámicas y middleware](https://docs.astro.build/en/guides/routing/)
- [Componentes de Astro](https://docs.astro.build/en/basics/astro-components/)
- [Imágenes](https://docs.astro.build/en/guides/images/)
- [Estilos y Tailwind](https://docs.astro.build/en/guides/styling/)
