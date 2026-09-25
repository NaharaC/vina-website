import type { APIRoute, GetStaticPaths } from 'astro';
import { obtenerTodas } from '../../lib/actividades';
import { calendario, respuestaIcs } from '../../lib/ics';
import { site } from '../../data/content';

/**
 * El calendario del equipo: lo que no sale a la web.
 *
 * Se suscribe junto al público (`/actividades.ics`), no en su lugar. Esa es
 * toda la gracia: Google Calendar pinta cada calendario suscrito de un color,
 * elegido por cada persona, y los enciende y apaga por separado. La propiedad
 * COLOR del formato iCalendar Google la ignora, así que dos calendarios es la
 * única forma de que lo interno y lo público se distingan de un vistazo.
 * Ninguna actividad está en los dos, de modo que no hay nada duplicado.
 *
 * La dirección lleva una clave impredecible porque Google Calendar no manda
 * cabeceras ni contraseñas al suscribirse por URL: quien tiene el enlace,
 * entra. Por eso la clave sale de una variable de entorno y no del código —no
 * se sube al repositorio— y por eso `robots.txt` prohíbe `/interno/`.
 */
export const getStaticPaths: GetStaticPaths = async () => {
  const clave = import.meta.env.CALENDARIO_INTERNO ?? process.env.CALENDARIO_INTERNO;

  /*
    Sin clave no se genera el archivo. Es lo que queremos: una construcción sin
    el secreto —un pull request, un `npm run build` en el portátil de alguien—
    no publica el calendario interno en ninguna parte.
  */
  return clave ? [{ params: { clave } }] : [];
};

export const GET: APIRoute = async () => {
  const { actividades } = await obtenerTodas();

  return respuestaIcs(
    calendario(
      actividades.filter((a) => !a.publica),
      `Actividades internas — ${site.name}`
    ),
    'actividades-internas-vinapm.ics'
  );
};
