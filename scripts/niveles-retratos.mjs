/*
  Mide los `niveles` de cada retrato del equipo pastoral, para pegarlos en
  `src/data/content.ts`.

  Mide solo el trozo que enseña la tarjeta —el cuadrado que sale de su
  `encuadre`—, no el archivo entero: en una foto apaisada, lo que queda fuera
  por los lados cambia mucho la cuenta. Por eso, si se retoca un encuadre, hay
  que volver a pasarlo.

  Tres números, sobre 255 y en el mismo gris que pinta el CSS (`grayscale()`
  pondera el rojo, el verde y el azul igual que aquí):

  - `negro` — el percentil 2: lo más oscuro, sin contar los píxeles sueltos.
  - `fondo` — la mediana de las dos esquinas de arriba, que en todas las
    fotos de estudio son pared.
  - `blanco` — el percentil 98: las altas luces, para no quemarlas.

  Los retratos con `enGris` no se miden: ya vienen editados y son la
  referencia, no algo que igualar.

  Uso:

    node scripts/niveles-retratos.mjs
*/
import fs from 'node:fs';
import sharp from 'sharp';

const contenido = fs.readFileSync('src/data/content.ts', 'utf8');

const archivos = Object.fromEntries(
  [...contenido.matchAll(/import (equipo\w+) from '\.\.\/assets\/img\/([\w-]+\.jpg)'/g)].map((m) => [
    m[1],
    m[2],
  ])
);

// Cada miembro, desde su `name:` hasta el siguiente.
const miembros = contenido
  .slice(contenido.indexOf('grupos: ['))
  .split(/\n\s*name: /)
  .slice(1);

const porcentaje = (texto, clave) =>
  parseFloat(texto.match(new RegExp(`${clave}: '([\\d.]+)%'`))?.[1] ?? 50) / 100;

for (const bloque of miembros) {
  const nombre = bloque.match(/^'([^']+)'/)?.[1];
  const foto = bloque.match(/\bphoto: (equipo\w+)/)?.[1];

  if (!nombre || !foto || /enGris: true/.test(bloque)) continue;

  const e = bloque.match(/\bencuadre: \{([^}]*)\}/)?.[1] ?? '';
  const zoom = parseFloat(e.match(/zoom: ([\d.]+)/)?.[1] ?? 1);
  const x = porcentaje(e, 'x');
  const y = porcentaje(e, 'y');

  const ruta = `src/assets/img/${archivos[foto]}`;
  const { width: ancho, height: alto } = await sharp(ruta).metadata();

  /*
    Lo mismo que hace el navegador: `object-fit: cover` en un cuadrado deja el
    lado corto entero y corre el largo según `object-position`; luego
    `scale()` acerca sobre el mismo punto (`transform-origin`).
  */
  const lado = Math.min(ancho, alto);
  const origenX = x * lado;
  const origenY = y * lado;
  const recorte = {
    left: Math.round((ancho - lado) * x + origenX - origenX / zoom),
    top: Math.round((alto - lado) * y + origenY - origenY / zoom),
    width: Math.round(lado / zoom),
    height: Math.round(lado / zoom),
  };

  const N = 300;
  const { data } = await sharp(ruta)
    .extract(recorte)
    .resize(N, N)
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const gris = [];
  for (let i = 0; i < data.length; i += 3) {
    gris.push(0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]);
  }

  const ordenados = [...gris].sort((a, b) => a - b);
  const percentil = (p) => Math.round(ordenados[Math.floor(p * (ordenados.length - 1))]);

  // Las esquinas de arriba: un 15% de ancho por un 13% de alto a cada lado.
  const esquinas = [];
  for (let fila = 6; fila < 45; fila++) {
    for (let col = 6; col < 50; col++) {
      esquinas.push(gris[fila * N + col], gris[fila * N + N - 1 - col]);
    }
  }
  esquinas.sort((a, b) => a - b);

  const niveles = {
    negro: percentil(0.02),
    fondo: Math.round(esquinas[esquinas.length >> 1]),
    blanco: percentil(0.98),
  };

  console.log(`${nombre}\n  niveles: { negro: ${niveles.negro}, fondo: ${niveles.fondo}, blanco: ${niveles.blanco} },`);
}
