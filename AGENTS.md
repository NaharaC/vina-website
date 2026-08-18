# Iglesia Viña Puerto Montt

Sitio en Astro + Tailwind v4. Tres páginas: la portada (`index.astro`),
`nosotros` y `actividades`, más el calendario suscribible `actividades.ics`.

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
- **Rótulo de sección** en versalitas con línea fina debajo (`eyebrow`), y los
  titulares grandes para el contenido. Si los dos van en cuerpo grande, no se
  distingue cuál es cuál.
- Los bloques de imagen a sangre llevan esquina redondeada (2rem, 2.75rem en
  escritorio), no llegan a filo con el borde de la ventana.

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
