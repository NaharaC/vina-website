/**
 * Actividades de la iglesia, leídas desde la base de Notion.
 *
 * La consulta ocurre al construir el sitio: si defines NOTION_TOKEN en `.env`
 * (ver `.env.example`), la página se genera con los datos reales; si no, se
 * usa la lista de respaldo de abajo para que el sitio siga compilando y el
 * diseño se pueda revisar sin credenciales.
 *
 * Para que se actualice solo, programa una reconstrucción diaria en el
 * hosting: el calendario cambia de mes, no de minuto.
 */

export type Actividad = {
  nombre: string;
  /** ISO con fecha y, si la actividad la tiene, hora de inicio */
  inicio: string;
  /** ISO de término; vacío si la actividad no lo declara */
  fin?: string;
  /** true cuando Notion entregó solo la fecha, sin hora */
  todoElDia: boolean;
  ubicacion?: string;
  red?: string;
  /** ficha en Notion, para el enlace de "ver detalle" */
  url?: string;
  /**
   * Foto de la actividad. Ojo: si viene subida a Notion, esta URL es de S3 y
   * caduca en ~1 hora, así que hay que procesarla al construir el sitio (lo
   * hace `actividades.astro`) y nunca publicarla tal cual.
   */
  foto?: string;
};

/*
  En local el token sale del archivo `.env`; en Netlify, Vercel y compañía se
  define en el panel del hosting y llega por `process.env`. Se miran los dos.
*/
const NOTION_TOKEN = import.meta.env.NOTION_TOKEN ?? process.env.NOTION_TOKEN;
const NOTION_DB =
  import.meta.env.NOTION_DB ?? process.env.NOTION_DB ?? 'f2e0de39-fd7d-4079-8e06-66c3d5d368c7';
const NOTION_VERSION = '2022-06-28';

/**
 * Respaldo mientras no haya token. Son actividades reales de la base, para
 * que la maqueta se vea con contenido verdadero.
 */
const RESPALDO: Actividad[] = [
  {
    nombre: 'Reunión Matris Prime',
    inicio: '2026-12-12T17:30:00',
    fin: '2026-12-12T19:30:00',
    todoElDia: false,
    ubicacion: 'Patio de Comunión',
  },
  {
    nombre: 'Ensayo Danza',
    inicio: '2026-12-19T10:00:00',
    fin: '2026-12-19T12:30:00',
    todoElDia: false,
    ubicacion: 'Patio de Comunión',
  },
  {
    nombre: 'Reunión de Jóvenes',
    inicio: '2026-12-19T15:00:00',
    fin: '2026-12-19T19:00:00',
    todoElDia: false,
    ubicacion: 'Centinela - Casa de Oración',
    red: 'Jóvenes',
  },
  {
    nombre: 'Velada Navideña',
    inicio: '2026-12-20T19:00:00',
    fin: '2026-12-20T21:00:00',
    todoElDia: false,
    ubicacion: 'Salon Principal',
  },
  {
    nombre: 'Reunión Años Dorados',
    inicio: '2026-12-23T15:30:00',
    fin: '2026-12-23T18:30:00',
    todoElDia: false,
    ubicacion: 'Patio de Comunión',
    red: 'Años Dorados',
  },
  {
    nombre: 'Reunión Jeer',
    inicio: '2026-12-26T14:00:00',
    fin: '2026-12-26T17:00:00',
    todoElDia: false,
    ubicacion: 'Acoge',
    red: 'Jeer',
  },
  {
    nombre: 'Matrimonio Matías y Francisca',
    inicio: '2027-01-23T16:00:00',
    fin: '2027-01-23T18:00:00',
    todoElDia: false,
    ubicacion: 'Salon Principal',
  },
];

/**
 * Notion nombra distinto cada tipo de propiedad. En vez de asumir cuál usa la
 * base (y romperse si alguien la cambia de `select` a `status`), leemos el
 * texto de cualquiera de los tipos que devuelven uno.
 */
function textoDe(prop: any): string | undefined {
  if (!prop) return undefined;
  switch (prop.type) {
    case 'title':
    case 'rich_text':
      return prop[prop.type]?.map((t: any) => t.plain_text).join('') || undefined;
    case 'select':
    case 'status':
      return prop[prop.type]?.name || undefined;
    case 'multi_select':
      return prop.multi_select?.map((o: any) => o.name).join(', ') || undefined;
    case 'people':
      return prop.people?.map((p: any) => p.name).filter(Boolean).join(', ') || undefined;
    default:
      return undefined;
  }
}

/**
 * Busca una propiedad sin depender de tildes ni mayúsculas, respetando el
 * orden en que se piden los nombres. El orden importa: la base tiene a la vez
 * «Estado» (aprobación) y «Status» (otro flujo interno), y quedarse con la
 * primera que aparezca en el objeto devolvía la equivocada.
 */
function propiedad(props: Record<string, any>, ...nombres: string[]) {
  const normaliza = (s: string) =>
    s.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase().trim();

  const claves = Object.keys(props);
  for (const nombre of nombres) {
    const encontrada = claves.find((k) => normaliza(k) === normaliza(nombre));
    if (encontrada) return props[encontrada];
  }
  return undefined;
}

async function desdeNotion(): Promise<Actividad[]> {
  const actividades: Actividad[] = [];
  let cursor: string | undefined;

  do {
    const respuesta = await fetch(`https://api.notion.com/v1/databases/${NOTION_DB}/query`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${NOTION_TOKEN}`,
        'Notion-Version': NOTION_VERSION,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ page_size: 100, start_cursor: cursor }),
    });

    if (!respuesta.ok) {
      throw new Error(`Notion respondió ${respuesta.status}: ${await respuesta.text()}`);
    }

    const datos = await respuesta.json();

    for (const fila of datos.results) {
      const props = fila.properties ?? {};
      const fecha = propiedad(props, 'Fecha', 'Date')?.date;
      if (!fecha?.start) continue;

      /*
        La web publica solo lo marcado como «Web» en la propiedad Status: ese
        es el interruptor que se maneja desde Notion. Hay que exigirlo de
        forma explícita — dejar pasar las filas sin valor sacaría al aire
        borradores. Ojo: «Status» no es «Estado», la base usa las dos y
        significan cosas distintas (Estado es la aprobación interna).
      */
      const publicar = textoDe(propiedad(props, 'Status'));
      if (publicar?.toLowerCase() !== 'web') continue;

      // la foto puede estar subida a Notion (`file`) o ser un enlace (`external`)
      const archivos = propiedad(props, 'Foto', 'Imagen')?.files ?? [];
      const foto = archivos[0]?.file?.url ?? archivos[0]?.external?.url;

      actividades.push({
        nombre: textoDe(propiedad(props, 'Name', 'Nombre')) ?? 'Actividad',
        inicio: fecha.start,
        fin: fecha.end ?? undefined,
        todoElDia: !fecha.start.includes('T'),
        ubicacion: textoDe(propiedad(props, 'Ubicación', 'Ubicacion', 'Lugar')),
        red: textoDe(propiedad(props, 'Red a cargo', 'Red')),
        url: fila.url,
        foto,
      });
    }

    cursor = datos.has_more ? datos.next_cursor : undefined;
  } while (cursor);

  return actividades;
}

/**
 * Fecha de una actividad, siempre en hora local.
 *
 * Las actividades de todo el día llegan como `YYYY-MM-DD`, y `new Date` lee
 * ese formato en UTC: en Chile eso las corría al día anterior (un evento del
 * 14 aparecía el 13). Las de día completo se arman a mano; las que traen hora
 * ya vienen con su desfase y no hay nada que corregir.
 */
export function fechaDe(iso: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return new Date(iso);
  const [anio, mes, dia] = iso.split('-').map(Number);
  return new Date(anio, mes - 1, dia);
}

/** Actividades futuras, de la más próxima a la más lejana. */
export async function obtenerActividades(): Promise<{
  actividades: Actividad[];
  desdeRespaldo: boolean;
}> {
  let actividades = RESPALDO;
  let desdeRespaldo = true;

  if (NOTION_TOKEN) {
    try {
      actividades = await desdeNotion();
      desdeRespaldo = false;
    } catch (error) {
      // el sitio no debe caerse porque Notion falle: avisamos y seguimos
      console.warn('[actividades] no se pudo leer Notion, uso el respaldo:', error);
    }
  }

  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  return {
    actividades: actividades
      .filter((a) => fechaDe(a.fin ?? a.inicio) >= hoy)
      .sort((a, b) => a.inicio.localeCompare(b.inicio)),
    desdeRespaldo,
  };
}

/** Agrupa por mes para poder titular cada bloque del calendario. */
export function agruparPorMes(actividades: Actividad[]) {
  const meses = new Map<string, { titulo: string; actividades: Actividad[] }>();

  for (const actividad of actividades) {
    const fecha = fechaDe(actividad.inicio);
    const clave = `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, '0')}`;
    const titulo = fecha.toLocaleDateString('es-CL', { month: 'long', year: 'numeric' });

    if (!meses.has(clave)) meses.set(clave, { titulo, actividades: [] });
    meses.get(clave)!.actividades.push(actividad);
  }

  return [...meses.values()];
}
