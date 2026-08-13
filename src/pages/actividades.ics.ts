import type { APIRoute } from 'astro';
import { fechaDe, obtenerActividades } from '../lib/actividades';
import { site } from '../data/content';

/**
 * Calendario suscribible (iCalendar). Cualquiera puede agregarlo a Google
 * Calendar, Apple Calendario u Outlook y las actividades le aparecen solas:
 * los clientes releen este archivo cada varias horas, así que se mantiene al
 * día con cada publicación del sitio.
 */

/** Escapa según RFC 5545: la coma, el punto y coma y la barra son sintaxis. */
const escapar = (texto: string) =>
  texto.replace(/\\/g, '\\\\').replace(/[,;]/g, (c) => `\\${c}`).replace(/\r?\n/g, '\\n');

/** Las líneas no pueden pasar de 75 octetos; el resto va sangrado un espacio. */
const plegar = (linea: string) => {
  const partes: string[] = [];
  let resto = linea;
  while (resto.length > 73) {
    partes.push(resto.slice(0, 73));
    resto = resto.slice(73);
  }
  partes.push(resto);
  return partes.join('\r\n ');
};

const comoUtc = (fecha: Date) => fecha.toISOString().replace(/[-:]|\.\d{3}/g, '');
const comoFecha = (fecha: Date) =>
  `${fecha.getFullYear()}${String(fecha.getMonth() + 1).padStart(2, '0')}${String(
    fecha.getDate()
  ).padStart(2, '0')}`;

export const GET: APIRoute = async ({ site: origen }) => {
  const { actividades } = await obtenerActividades();
  const sello = comoUtc(new Date());

  const lineas = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Iglesia Viña Puerto Montt//Actividades//ES',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    `X-WR-CALNAME:${escapar(`Actividades ${site.name}`)}`,
    'X-WR-TIMEZONE:America/Santiago',
  ];

  for (const actividad of actividades) {
    const inicio = fechaDe(actividad.inicio);
    // sin término declarado damos una hora (o el día completo)
    const fin = actividad.fin
      ? fechaDe(actividad.fin)
      : new Date(inicio.getTime() + (actividad.todoElDia ? 86_400_000 : 3_600_000));

    // identificador estable: mismo evento en cada publicación, no duplicados
    const id = `${comoUtc(inicio)}-${actividad.nombre.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

    lineas.push(
      'BEGIN:VEVENT',
      `UID:${id}@iglesiavinapm.cl`,
      `DTSTAMP:${sello}`,
      actividad.todoElDia
        ? `DTSTART;VALUE=DATE:${comoFecha(inicio)}`
        : `DTSTART:${comoUtc(inicio)}`,
      actividad.todoElDia ? `DTEND;VALUE=DATE:${comoFecha(fin)}` : `DTEND:${comoUtc(fin)}`,
      `SUMMARY:${escapar(actividad.nombre)}`
    );

    if (actividad.ubicacion) lineas.push(`LOCATION:${escapar(actividad.ubicacion)}`);
    if (actividad.red) lineas.push(`DESCRIPTION:${escapar(`Red a cargo: ${actividad.red}`)}`);
    if (actividad.url) lineas.push(`URL:${actividad.url}`);

    lineas.push('END:VEVENT');
  }

  lineas.push('END:VCALENDAR');

  return new Response(lineas.map(plegar).join('\r\n'), {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': 'inline; filename="actividades-vinapm.ics"',
    },
  });
};
