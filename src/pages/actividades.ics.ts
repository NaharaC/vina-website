import type { APIRoute } from 'astro';
import { obtenerActividades } from '../lib/actividades';
import { calendario, respuestaIcs } from '../lib/ics';
import { site } from '../data/content';

/**
 * Calendario suscribible (iCalendar) con todo lo que hay. Cualquiera puede
 * agregarlo a Google Calendar, Apple Calendario u Outlook y las actividades
 * le aparecen solas: los clientes releen este archivo cada varias horas, así
 * que se mantiene al día con cada publicación del sitio.
 *
 * Quien solo quiera una actividad tiene la suya en
 * `/calendarios/<ranura>.ics`; los eventos son los mismos, con el mismo UID,
 * así que tener los dos suscritos no duplica nada.
 */
export const GET: APIRoute = async () => {
  const { actividades } = await obtenerActividades();

  return respuestaIcs(
    calendario(actividades, `Actividades ${site.name}`),
    'actividades-vinapm.ics'
  );
};
