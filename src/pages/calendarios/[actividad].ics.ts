import type { APIRoute, GetStaticPaths } from 'astro';
import { obtenerActividades, ranura } from '../../lib/actividades';
import { calendario, respuestaIcs } from '../../lib/ics';
import { site } from '../../data/content';

/**
 * El calendario de una sola actividad.
 *
 * La ficha del año —lo que se abre al elegir una actividad en el buscador—
 * ofrece suscribirse solo a esa: quien va a «Desde casa y sin excusa» y a
 * nada más no tiene por qué llenarse la agenda con lo demás. Es un archivo
 * por nombre de actividad, generado al construir el sitio, porque aquí no
 * hay servidor que responda a un parámetro.
 *
 * Los eventos son los mismos del calendario completo, UID incluido: quien
 * tenga los dos suscritos no ve nada duplicado.
 */
export const getStaticPaths: GetStaticPaths = async () => {
  const { actividades } = await obtenerActividades();

  /*
    Una ruta por nombre, no por actividad: lo que se publica es la serie
    entera —las diecisiete fechas del Domingo de Gloria—, no una reunión.
  */
  const nombres = [...new Set(actividades.map((a) => a.nombre))];

  return nombres.map((nombre) => ({
    params: { actividad: ranura(nombre) },
    props: { nombre },
  }));
};

export const GET: APIRoute = async ({ props }) => {
  const { nombre } = props as { nombre: string };
  const { actividades } = await obtenerActividades();
  const suyas = actividades.filter((a) => a.nombre === nombre);

  return respuestaIcs(
    calendario(suyas, `${nombre} — ${site.name}`),
    `${ranura(nombre)}-vinapm.ics`
  );
};
