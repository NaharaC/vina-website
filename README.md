# Iglesia Viña Puerto Montt

Sitio web de [iglesiavinapm.cl](https://iglesiavinapm.cl). Una sola página, estática,
construida con [Astro](https://astro.build) y Tailwind CSS v4.

## Puesta en marcha

```sh
npm install
npm run dev        # http://localhost:4321
```

En sesiones largas conviene levantarlo en segundo plano:

```sh
astro dev --background
astro dev status   # ver estado
astro dev logs     # ver la salida
astro dev stop     # detenerlo
```

| Comando           | Qué hace                                     |
| :---------------- | :------------------------------------------- |
| `npm run dev`     | Servidor de desarrollo                       |
| `npm run build`   | Compila el sitio estático en `dist/`         |
| `npm run preview` | Sirve `dist/` para revisar antes de publicar |
| `npx astro check` | Revisa tipos en los `.astro` y `.ts`         |

## Dónde se edita cada cosa

**Todo el texto y todos los enlaces viven en `src/data/content.ts`.** No hay strings
sueltos en la maquetación: para cambiar un horario, un título o un enlace se toca ese
archivo y nada más.

Dos convenciones importantes de ese archivo:

- **Las imágenes se importan**, no se escriben como ruta (`import hero from '../assets/img/hero.jpg'`).
  Así Astro las optimiza en el build: genera WebP, `srcset` y las medidas correctas.
  Las fotos viven en `src/assets/img/`; en `public/` solo van los archivos que necesitan
  una URL fija (favicons, `og-image.jpg`, `robots.txt`).
- **Un `href` vacío (`''`) significa "todavía no hay destino"**. Los componentes ocultan
  ese botón o dejan el texto sin enlazar, en vez de publicar un `#` que no lleva a
  ninguna parte. Los datos que faltan están marcados con `TODO` al principio del archivo.

```
src/
├── data/content.ts      ← texto, enlaces e imágenes de la home
├── assets/img/          ← fotos y logos (optimizados en el build)
├── components/          ← una sección de la home por componente
├── layouts/BaseLayout.astro   ← <head>, metadatos, datos estructurados
├── styles/global.css    ← tokens de diseño (colores, radios, tipografías)
└── pages/index.astro    ← ensambla las secciones en orden
```

## Diseño

Los tokens (colores de marca, radios de las tarjetas, escala de títulos) están en
`@theme` dentro de `src/styles/global.css`. Cambiar un valor ahí lo cambia en toda la web.

Las tipografías —Albert Sans y Newsreader— son self-hosted desde `public/fonts/`; no se
piden a ningún servidor externo.
