# Iglesia Viña Puerto Montt

Sitio en Astro + Tailwind v4. Cuatro páginas: la portada (`index.astro`),
`nosotros`, `actividades` y `soy-nuevo` —la de quien viene por primera vez,
donde aterriza «Quiero Visitar» del hero—, más el calendario suscribible
`actividades.ics`.

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

  Fuera de la sesión de estudio quedan otras dos, y las dos van sin `luz`,
  que es un ajuste pensado para el fondo blanco: los fundadores posan sobre
  fondo negro, y Eduardo y Priscila llevan de momento una foto suya de
  familia —caras más pequeñas que en el resto, y no se arregla acercándose
  porque el zoom les corta la cabeza a los hijos— hasta que llegue su
  retrato.

  La cuadrícula se afinó en dos tandas y cada una tiene su referencia: la
  primera mitad se ajustó contra Daniel y Nahara, y la segunda —Jonathan,
  Hardy, Eugenia, Gerardo y Cecilia— contra David y Camila. Son las dos fotos
  que salían bien sin tocarlas.

  Un truco que hace falta cuando alguien llega muy arriba en su foto: poner el
  origen del zoom en el filo de arriba (`y: '0%'`, como en Hardy). Así el aire
  sobre la cabeza crece con la escala en vez de comérsela; con el origen a
  media altura, ampliar le cortaba la coronilla.

  **El blanco y negro también se iguala desde el CSS.** Las fotos de estudio
  están expuestas para que el fondo salga blanco del todo: medido en el trozo
  que se ve de cada tarjeta, el fondo iba de 201 a 247 sobre 255 —altas luces
  quemadas y un gris que se confundía con el blanco de la página—. La de
  Nicole es la excepción, con el fondo en gris medio (166) y nada reventado, y
  por eso se veía más limpia que las demás. Cada retrato lleva ahora un `luz`
  en `content.ts`: el `brightness()` que lleva su fondo al gris común. El
  contraste (1.06) es el mismo para todas y vive en el CSS de `nosotros.astro`.

  El objetivo común es 182, no el 166 exacto de Nicole: bajando hasta su valor
  las caras del resto quedaban apagadas, porque esas fotos se expusieron para
  el fondo y no para la piel. En 182 el fondo deja de estar quemado, las caras
  aguantan y a Nicole apenas se la toca.

  Todo esto es `filter` de CSS, así que no toca los archivos: se puede quitar
  o recalibrar en cualquier momento y las fotos vuelven a estar como salieron
  de la cámara.

  En la web las tarjetas van en blanco y negro por CSS y el color llega al
  pasar el ratón: con segunda foto, cambiando la de arriba por la de abajo; sin
  ella, quitándole el gris a la misma foto. Las segundas fotos —las del
  hover— ya vienen cuadradas y no llevan `encuadre`.

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
- **Google Maps.** La dirección («La Vara Kilómetro 8») es rural y no
  geocodifica; se busca por el nombre de la ficha. El mapa incrustado sí va
  por coordenadas: por nombre, Google abre encima la ficha del negocio con su
  puntuación en estrellas.

## Notion

El calendario de actividades se lee al construir el sitio con `NOTION_TOKEN`
(ver `.env.example`). Sin token —o con el token caducado— la página se genera
con la lista de respaldo y avisa en pantalla. Solo se publican las filas con
`Status = Web`.

**La descripción de una actividad no es una propiedad**: es lo que se escribe
en el cuerpo de su página de Notion. Eso obliga a una petición por actividad
—`/v1/blocks/{id}/children`— además de la consulta a la base, así que se piden
de tres en tres y solo para las actividades futuras, que son las únicas que se
publican. `obtenerActividades()` guarda la lectura y la reparte: la piden la
página y el `.ics`, y sin eso cada construcción pagaría dos veces esas
peticiones. En una construcción la lectura no caduca —el build dura lo que
dura—; en desarrollo caduca a los 30 s, para que editar el calendario y
recargar enseñe el cambio. El token es otra cosa: un servidor levantado antes
de tocar `.env` sigue sirviendo la lista de respaldo aunque el token ya esté
puesto, y ahí sí hay que reiniciar (`astro dev stop` y volver a levantarlo).

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
