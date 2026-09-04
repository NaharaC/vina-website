import { fechaDe } from './actividades';
import type { Actividad } from './actividades';

/**
 * El calendario en formato iCalendar (RFC 5545). Lo piden dos rutas: el
 * calendario completo (`/actividades.ics`) y el de una sola actividad
 * (`/calendarios/<ranura>.ics`), que es el mismo archivo con una actividad
 * dentro. Vive aquí para que las dos escriban exactamente los mismos eventos:
 * el UID incluido, que es lo que evita que quien tenga los dos suscritos vea
 * cada reunión duplicada.
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

/** El calendario entero, listo para servir. */
export function calendario(actividades: Actividad[], nombre: string) {
  const sello = comoUtc(new Date());

  const lineas = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Iglesia Viña Puerto Montt//Actividades//ES',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    `X-WR-CALNAME:${escapar(nombre)}`,
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

    /*
      Lo mismo que se lee en la web: la descripción escrita en Notion y, si la
      hay, la red a cargo. El enlace a la ficha de Notion no se publica —ni
      aquí ni en la web—: es una herramienta de dentro.
    */
    const descripcion = [actividad.descripcion, actividad.red && `Red a cargo: ${actividad.red}`]
      .filter(Boolean)
      .join('\n\n');
    if (descripcion) lineas.push(`DESCRIPTION:${escapar(descripcion)}`);

    lineas.push('END:VEVENT');
  }

  lineas.push('END:VCALENDAR');

  return lineas.map(plegar).join('\r\n');
}

/** La respuesta HTTP, con el tipo y el nombre de archivo que toca. */
export function respuestaIcs(texto: string, archivo: string) {
  return new Response(texto, {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': `inline; filename="${archivo}"`,
    },
  });
}
