/*
  Prepara la versión de móvil del afiche de la radio.

  El afiche de móvil ya viene compuesto: la tabla de horarios arriba y, debajo,
  la foto del estudio, que es donde cae el texto del aviso. Lo único que le
  falta es pie.

  La cuenta: la tarjeta mide 88vw de ancho por 39rem de alto —343 x 624 px— y
  el bloque de texto (rótulo, titular, bajada y los dos botones) ocupa los
  últimos 325. El afiche, a ancho de tarjeta, mide 516 de alto: llega justo
  hasta donde empieza el texto, pero no hasta el borde de abajo. Recortarlo por
  los lados para estirarlo no vale —la tabla deja solo un 4% de margen y se le
  comería el filo—, así que se le añade el trozo que falta.

  Ese trozo se hace con la última fila de píxeles del propio afiche, estirada y
  apagándose hacia abajo. Cada columna sigue con su color, y como el pie del
  afiche ya viene oscurecido, se lee como que la foto se apaga, no como un
  parche. Va entero por detrás de los botones.

  Uso:

    node scripts/afiche-radio.mjs "/ruta/al/programacion mobile.png"
*/
import sharp from 'sharp';

const ORIGEN = process.argv[2];
const DESTINO = 'src/assets/img/radio-programacion-vertical.jpg';

if (!ORIGEN) {
  console.error('Falta la ruta del afiche de móvil.');
  process.exit(1);
}

/*
  La proporción de la tarjeta, en píxeles CSS: 88vw de ancho en un teléfono de
  390 por 41rem de alto. Si se cambia el alto en `Avisos.astro` hay que
  cambiarlo aquí y volver a generar la imagen, o el afiche se recorta por los
  lados y la tabla pierde el filo.
*/
const TARJETA = { ancho: 343, alto: 656 };
const PROPORCION = TARJETA.ancho / TARJETA.alto;

const original = sharp(ORIGEN);
const { width, height } = await original.metadata();

const altoFinal = Math.round(width / PROPORCION);
const pie = altoFinal - height;

if (pie < 0) {
  console.error(`El afiche ya es más alto que la tarjeta (${width}x${height}); revisa TARJETA.`);
  process.exit(1);
}

const afiche = await original.png().toBuffer();

/*
  La franja de abajo del afiche, reducida a una miniatura y vuelta a subir:
  eso se queda con el reparto de luces —más claro donde estaba la mesa, más
  oscuro por las esquinas— y se deja por el camino el tramado y los perfiles.
  Estirar la última fila de píxeles a secas dejaba rayas verticales.

  Van en dos pasadas y no encadenadas: sharp aplica un solo `resize` por
  tubería, así que el segundo se comía al primero y lo que salía era la franja
  estirada —con el tramado convertido en rayitas— en vez de la miniatura.
*/
const miniatura = await sharp(afiche)
  .extract({ left: 0, top: height - 90, width, height: 90 })
  .resize({ width: 16, height: 4, fit: 'fill' })
  .png()
  .toBuffer();

/*
  El pie no se pega a continuación del afiche sino montado sobre sus últimos
  píxeles, y entra con la opacidad subiendo desde cero. Pegado a tope se veía
  la juntura: arriba el tramado de puntos y debajo un campo liso, con la línea
  de corte a la vista. Montado, el tramado se va disolviendo.
*/
const SOLAPE = 220;
const pieAlto = pie + SOLAPE;

const prolongacion = await sharp(miniatura)
  .resize({ width, height: pieAlto, fit: 'fill', kernel: 'cubic' })
  .png()
  .toBuffer();

/* Se apaga hacia abajo, para que el pie no compita con la tabla. */
const apagado = Buffer.from(`<svg width="${width}" height="${pieAlto}"><defs>
  <linearGradient id="a" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#000" stop-opacity="0"/>
    <stop offset="100%" stop-color="#000" stop-opacity="0.5"/>
  </linearGradient></defs>
  <rect width="${width}" height="${pieAlto}" fill="url(#a)"/></svg>`);

/* Y entra difuminado: transparente arriba, opaco pasado el solape. */
const entrada = Buffer.from(`<svg width="${width}" height="${pieAlto}"><defs>
  <linearGradient id="e" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#fff" stop-opacity="0"/>
    <stop offset="${((SOLAPE / pieAlto) * 100).toFixed(1)}%" stop-color="#fff" stop-opacity="1"/>
    <stop offset="100%" stop-color="#fff" stop-opacity="1"/>
  </linearGradient></defs>
  <rect width="${width}" height="${pieAlto}" fill="url(#e)"/></svg>`);

const pieCompuesto = await sharp(prolongacion)
  .composite([{ input: apagado }])
  .png()
  .toBuffer();

const pieConEntrada = await sharp(pieCompuesto)
  .composite([{ input: entrada, blend: 'dest-in' }])
  .png()
  .toBuffer();

await sharp({ create: { width, height: altoFinal, channels: 3, background: '#04191a' } })
  .composite([
    { input: afiche, left: 0, top: 0 },
    { input: pieConEntrada, left: 0, top: height - SOLAPE },
  ])
  .jpeg({ quality: 90 })
  .toFile(DESTINO);

console.log(`${DESTINO} → ${width}x${altoFinal} (pie añadido: ${pie}px)`);
