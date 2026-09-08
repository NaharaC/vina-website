/**
 * Contenido de la home. Todo el texto editable vive aquí para que la
 * maquetación no tenga strings sueltos.
 *
 * Convenciones:
 * - Las imágenes se importan (no son rutas string) para que Astro las
 *   optimice en el build: genera AVIF/WebP, `srcset` y `width`/`height`.
 * - Un `href` vacío ('') significa "todavía no hay destino": los componentes
 *   ocultan el botón o dejan el texto sin enlazar, en vez de publicar un '#'
 *   que no lleva a ninguna parte.
 */

import type { ImageMetadata } from 'astro';

import aliadoBilav from '../assets/img/aliado-bilav.png';
import aliadoCentroMedico from '../assets/img/aliado-centro-medico.png';
import aliadoMontealto from '../assets/img/aliado-montealto.png';
import aliadoPuravida from '../assets/img/aliado-puravida.png';
import aliadoPuravidaFm from '../assets/img/aliado-puravida-radio.png';
import aliadoVelos from '../assets/img/aliado-velos.png';
import centroMedico from '../assets/img/centro-medico.jpg';
import contactoBanderas from '../assets/img/contacto-banderas.jpg';
import dadoresDeAmor from '../assets/img/dadores-de-amor.jpg';
import educaMontealto from '../assets/img/educa-montealto.jpg';
import familiaCasaOracion1 from '../assets/img/familia-casa-oracion-1.jpg';
import familiaCasaOracion2 from '../assets/img/familia-casa-oracion-2.jpg';
import familiaCasaOracion3 from '../assets/img/familia-casa-oracion-3.jpg';
import familiaCasaOracion4 from '../assets/img/familia-casa-oracion-4.jpg';
import familiaSalasSanidad from '../assets/img/familia-salas-sanidad.jpg';
import familiaSalasSanidad2 from '../assets/img/familia-salas-sanidad-2.jpg';
import familiaSalasSanidad3 from '../assets/img/familia-salas-sanidad-3.jpg';
import familiaSalasSanidad4 from '../assets/img/familia-salas-sanidad-4.jpg';
import familiaSentadosMesa1 from '../assets/img/familia-sentados-mesa-1.jpg';
import familiaSentadosMesa2 from '../assets/img/familia-sentados-mesa-2.jpg';
import familiaSentadosMesa3 from '../assets/img/familia-sentados-mesa-3.jpg';
import heroCongregacion from '../assets/img/hero-congregacion.jpg';
import historiaBautizosChamiza from '../assets/img/historia-bautizos-chamiza.jpg';
import historiaCampamentoNinos from '../assets/img/historia-campamento-ninos.jpg';
import historiaConstruccion from '../assets/img/historia-construccion.jpg';
import historiaEdificioBlanco from '../assets/img/historia-edificio-blanco.jpg';
import historiaEquipoAdoracion from '../assets/img/historia-equipo-adoracion.jpg';
import historiaMatrimonioPastores from '../assets/img/historia-matrimonio-pastores.jpg';
import historiaSalon from '../assets/img/historia-salon.jpg';
import logoCentroMedico from '../assets/img/logo-centro-medico.png';
import logoDadoresDeAmor from '../assets/img/logo-dadores-de-amor.png';
import logoEducaMontealto from '../assets/img/logo-educa-montealto.png';
import iconoVinapm from '../assets/img/icono-vinapm-blanco.png';
import logoVinapm from '../assets/img/logo-vinapm.png';
import nosotros from '../assets/img/nosotros.jpg';
import darManos from '../assets/img/dar-manos.jpg';
import equipoDanielNahara from '../assets/img/equipo-daniel-nahara.jpg';
import equipoCarlosThiare from '../assets/img/equipo-carlos-thiare.jpg';
import fintocLogo from '../assets/img/fintoc-logo.svg';
import equipoCarlosThiare2 from '../assets/img/equipo-carlos-thiare-2.jpg';
import equipoRobertoAraceli from '../assets/img/equipo-roberto-araceli.jpg';
import equipoRobertoAraceli2 from '../assets/img/equipo-roberto-araceli-2.jpg';
import equipoDanielNahara2 from '../assets/img/equipo-daniel-nahara-2.jpg';
import equipoDaniloLena from '../assets/img/equipo-danilo-lena.jpg';
import equipoDaniloLena2 from '../assets/img/equipo-danilo-lena-2.jpg';
import equipoRodolfoNatalie from '../assets/img/equipo-rodolfo-natalie.jpg';
import equipoRodolfoNatalie2 from '../assets/img/equipo-rodolfo-natalie-2.jpg';
import equipoNicole from '../assets/img/equipo-nicole.jpg';
import equipoNicole2 from '../assets/img/equipo-nicole-2.jpg';
import equipoJonathanCarmen from '../assets/img/equipo-jonathan-carmen.jpg';
import equipoJonathanCarmen2 from '../assets/img/equipo-jonathan-carmen-2.jpg';
import equipoDavidCamila from '../assets/img/equipo-david-camila.jpg';
import equipoDavidCamila2 from '../assets/img/equipo-david-camila-2.jpg';
import equipoHardyRuth from '../assets/img/equipo-hardy-ruth.jpg';
import equipoHardyRuth2 from '../assets/img/equipo-hardy-ruth-2.jpg';
import equipoEugenia from '../assets/img/equipo-eugenia.jpg';
import equipoEugenia2 from '../assets/img/equipo-eugenia-2.jpg';
import equipoGerardoMariaEliana from '../assets/img/equipo-gerardo-maria-eliana.jpg';
import equipoCecilia from '../assets/img/equipo-cecilia.jpg';
import equipoCecilia2 from '../assets/img/equipo-cecilia-2.jpg';
import equipoEduardoPriscila from '../assets/img/equipo-eduardo-priscila.jpg';
import equipoJairoVeronica from '../assets/img/equipo-jairo-veronica.jpg';
import equipoJairoVeronica2 from '../assets/img/equipo-jairo-veronica-2.jpg';
import predicacion from '../assets/img/predicacion.jpg';
import radioProgramacion from '../assets/img/radio-programacion.png';
import radioProgramacionVertical from '../assets/img/radio-programacion-vertical.jpg';
import reflexionesCamino from '../assets/img/reflexiones-camino.jpg';
import reunionDomingosGloria from '../assets/img/reunion-domingos-gloria.jpg';
import reunionMiercolesPalabra from '../assets/img/reunion-miercoles-palabra.jpg';
import reunionViernesAvivamiento from '../assets/img/reunion-viernes-avivamiento.jpg';
import videoPoster from '../assets/img/video-poster.jpg';

/**
 * La marca entera y el icono suelto. El icono es la versión blanca: solo
 * sale en la barra encogida, que va sobre fondo oscuro.
 */
export const logo = { src: logoVinapm, alt: 'Iglesia viñapm', icon: iconoVinapm };

/* ===========================================================================
   ⚠️  DATOS PENDIENTES
   Todo lo que falta para publicar está agrupado aquí. Rellena estos valores y
   los botones y enlaces aparecen solos por toda la web.
   =========================================================================== */

export const contactChannels = {
  /** +56 9 5782 9898 — solo dígitos, con código país. */
  whatsapp: '56957829898',
  whatsappMessage: 'Hola, me gustaría recibir más información sobre la iglesia',
  givingUrl: 'https://fintoc.me/vinapm',
} as const;

/** Enlace de WhatsApp con el mensaje prellenado. Vacío si aún no hay número. */
export const whatsappHref = (message: string = contactChannels.whatsappMessage): string =>
  contactChannels.whatsapp
    ? `https://wa.me/${contactChannels.whatsapp}?text=${encodeURIComponent(message)}`
    : '';

/**
 * Datos de la organización para el marcado estructurado (JSON-LD) que leen
 * Google y compañía. Los horarios salen de las reuniones principales.
 */
export const organization = {
  streetAddress: 'La Vara Kilómetro 8, Parcela 154',
  addressLocality: 'Puerto Montt',
  addressRegion: 'Los Lagos',
  addressCountry: 'CL',
  openingHours: [
    { day: 'Wednesday', opens: '20:00' },
    { day: 'Friday', opens: '19:30' },
    { day: 'Sunday', opens: '10:30' },
  ],
};

/* --------------------------------------------------------------------------- */

export const site = {
  name: 'Iglesia Viña Puerto Montt',
  shortName: 'iglesia viñapm',
  tagline: 'Siendo una familia compasiva imitando a Jesús',
  description:
    'Iglesia Viña Puerto Montt. Más de 25 años siendo una familia compasiva: reuniones semanales, centro médico, proyecto educativo y proyectos sociales.',
} as const;

export type NavLink = { label: string; href: string; external?: boolean };

export const nav: NavLink[] = [
  { label: 'Compasión', href: '#compasion' },
  { label: 'Actividades', href: '#vida-en-familia' },
  { label: 'Avisos', href: '#avisos' },
  { label: 'Dar', href: '#dar' },
];

/* --- Hero ------------------------------------------------------------------ */

export const hero = {
  /*
    La portada abre con video. El original venía a 1920x1080 y 111 MB: aquí va
    a 720p, sin pista de audio —nunca suena— y bien comprimido, porque detrás
    del velo y del titular no se nota y sí se nota lo que tarda en cargar.
  */
  video: '/videos/hero-vinapm.mp4',
  poster: '/videos/hero-vinapm-poster.jpg',
  image: heroCongregacion,
  alt: 'Recorrido por la vida de Iglesia Viña Puerto Montt: encuentros, adoración y proyectos',
  panelTitle: '¡Te estábamos esperando!',
  panelSubtitle: 'Ven y sé parte',
};

export type HeroAction = {
  title: string;
  description: string;
  href: string;
  icon: string;
  /** clase de fondo del círculo del icono */
  iconClass: string;
};

export const heroActions: HeroAction[] = [
  {
    title: 'Quiero Dar',
    description: 'Me gustaría ofrendar y/o diezmar',
    href: '#dar',
    icon: 'lucide:hand-heart',
    iconClass: 'bg-icon-teal',
  },
  {
    title: 'Quiero Visitar',
    description: 'Me gustaría asistir por primera vez',
    href: '#reuniones',
    icon: 'lucide:map-pin',
    iconClass: 'bg-accent',
  },
  {
    title: 'Quiero Conocer',
    description: 'Me interesa saber más de la iglesia',
    href: '#compasion',
    icon: 'lucide:handshake',
    iconClass: 'bg-icon-maroon',
  },
];

/* --- Bienvenido a casa (video) --------------------------------------------- */

export const welcome = {
  title: 'Bienvenido a casa',
  subtitle: 'Iglesia en movimiento',
  poster: videoPoster,
  alt: 'Equipo de alabanza durante una reunión de Iglesia Viña Puerto Montt',
  /**
   * TODO: pendiente el video oficial de bienvenida.
   *
   * El culto del 2 de agosto (`afG_zDT04R8`) NO sirve: LatinAutor - UMPG tiene
   * derechos sobre la música y bloquea su reproducción fuera de YouTube. Lo
   * mismo pasa con el resto de transmisiones "EN VIVO" del canal. Las prédicas
   * editadas y los clips cortos sí se pueden incrustar.
   *
   * Mientras esté vacío, la sección muestra el póster tal como en el mockup y
   * no se pide nada a YouTube.
   */
  youtubeId: '',
  /** Segundo por el que empieza el video. 0 = desde el principio. */
  startSeconds: 0,
  /**
   * Si es `true`, arranca solo y sin sonido al entrar en pantalla. Con
   * `prefers-reduced-motion` no se reproduce: se muestra el póster con el play.
   * Solo tiene sentido con un video sin locución.
   */
  autoplay: false,
};

/* --- Reuniones principales ------------------------------------------------- */

/** Canal donde se transmiten las reuniones en vivo. */
export const youtubeChannel = 'https://www.youtube.com/@lavinatvpmontt';

/*
  Se busca por el nombre de la ficha y no por la dirección: «La Vara Kilómetro
  8, Parcela 154» es rural y Google la resolvía en cualquier punto de Puerto
  Montt, sin marcador. Con el nombre cae justo en la iglesia.
*/
const mapsQuery = encodeURIComponent('Iglesia Cristiana La Viña Puerto Montt');

/** Ficha de la iglesia en Google Maps. */
export const mapsHref = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;

/**
 * El mismo punto, para incrustarlo en la página. `output=embed` es la forma
 * de Google que no pide clave; una imagen fija del mapa sí la pediría (Static
 * Maps API) y una captura de su mapa no se puede republicar.
 *
 * Aquí sí van las coordenadas y no el nombre: buscando por nombre, el mapa
 * abre encima la ficha del negocio con la puntuación en estrellas, que no
 * pinta nada en la página. Con el punto sale solo el marcador.
 */
export const mapsEmbedHref =
  'https://maps.google.com/maps?q=-41.4223822,-72.9157593&z=15&output=embed';

export const ubicacion = {
  eyebrow: 'Dónde estamos',
  title: 'Nos reunimos acá',
  address: `${organization.streetAddress}, ${organization.addressLocality}`,
  cta: 'Cómo llegar',
};

/**
 * Cada forma de participar dice su canal completo ("En línea por Zoom", no
 * solo "Zoom"): así se entiende de una lectura y no se confunde con las otras.
 */
export type MeetingWay = {
  icon: string;
  label: string;
  href?: string;
  external?: boolean;
  /** aclaración corta, cuando la opción tiene letra chica */
  note?: string;
};

export type Meeting = {
  title: string;
  subtitle: string;
  time: string;
  image: ImageMetadata;
  alt: string;
  ways: MeetingWay[];
};

export const meetings: Meeting[] = [
  {
    title: 'Miércoles de palabra',
    subtitle: 'Desde casa y sin excusa',
    time: '20:00 hrs',
    image: reunionMiercolesPalabra,
    alt: 'Biblia abierta durante el estudio de la palabra',
    ways: [
      {
        icon: 'lucide:video',
        label: 'En línea por Zoom',
        // el enlace cambia cada semana: lo pedimos por WhatsApp
        href: whatsappHref('Hola, quiero el enlace de Zoom del miércoles'),
        external: true,
        note: 'Obtén el enlace por los grupos de WhatsApp',
      },
      { icon: 'lucide:youtube', label: 'En vivo por YouTube', href: youtubeChannel, external: true },
    ],
  },
  {
    title: 'Viernes de Avivamiento',
    subtitle: '',
    time: '19:30 hrs',
    image: reunionViernesAvivamiento,
    alt: 'Persona adorando con un lienzo durante la reunión de avivamiento',
    ways: [
      {
        icon: 'lucide:map-pin',
        label: 'Presencial',
        href: mapsHref,
        external: true,
        note: organization.streetAddress,
      },
      { icon: 'lucide:youtube', label: 'En vivo por YouTube', href: youtubeChannel, external: true },
    ],
  },
  {
    title: 'Domingos de Gloria',
    subtitle: 'Reunión general',
    time: '10:30 hrs',
    image: reunionDomingosGloria,
    alt: 'Manos levantadas en adoración durante la reunión general',
    ways: [
      {
        icon: 'lucide:map-pin',
        label: 'Presencial',
        href: mapsHref,
        external: true,
        note: organization.streetAddress,
      },
      { icon: 'lucide:youtube', label: 'En vivo por YouTube', href: youtubeChannel, external: true },
    ],
  },
];

/* --- Palabra profética + cifras -------------------------------------------- */

export const propheticWord = {
  quote:
    '“Avivamiento con entendimiento es intercesión, donde la declaración de la palabra trae transformación”',
  source: 'Palabra Profética 2026',
};

/** `caption` va arriba en versalitas y `description` matiza la cifra. */
export type Stat = { caption: string; value: string; description?: string };

export const stats: Stat[] = [
  { caption: 'Años de iglesia', value: '25+' },
  {
    caption: 'Atenciones médicas',
    value: '12.000+',
    description: 'A la fecha. A todos se les ha predicado de Jesús',
  },
  {
    caption: 'Niños en educación',
    value: '100+',
    description: 'Creciendo con educación de calidad y valores cristianos',
  },
  {
    caption: 'Familias alcanzadas',
    value: '20.000+',
    description: 'A través de nuestros proyectos sociales',
  },
];

/* --- Aliados --------------------------------------------------------------- */

export type Partner = { name: string; logo: ImageMetadata };

export const partners: Partner[] = [
  { name: 'Bilav ONG — Bienestar Integral', logo: aliadoBilav },
  { name: 'Centro Médico viñapm', logo: aliadoCentroMedico },
  { name: 'Fundación Puravida', logo: aliadoPuravida },
  { name: 'Educa Montealto', logo: aliadoMontealto },
  { name: 'Fundación Velos', logo: aliadoVelos },
  { name: 'PuraVida 102.5 FM', logo: aliadoPuravidaFm },
];

/* --- Una familia compasiva -------------------------------------------------- */

export type CompassionCard = {
  /** Texto del botón. Por defecto, «Ver más». */
  ctaLabel?: string;
  title: string;
  description: string;
  image: ImageMetadata;
  alt: string;
  /** logo blanco superpuesto sobre la foto */
  overlayLogo?: ImageMetadata;
  overlayLogoAlt?: string;
  href: string;
  external?: boolean;
};

export const compassionFeature: CompassionCard = {
  title: 'Nosotros',
  ctaLabel: 'Conócenos',
  description: 'Todo comenzó en el living de una casa y en el corazón de Dios',
  image: nosotros,
  alt: 'Congregación con las manos levantadas en adoración',
  overlayLogo: logoVinapm,
  overlayLogoAlt: 'Iglesia viñapm',
  href: '/nosotros',
};

export const compassionCards: CompassionCard[] = [
  {
    title: 'Centro Médico Viña Puerto Montt',
    /** TODO: descripción real (una línea). */
    description: '',
    image: centroMedico,
    alt: 'Profesional de la salud atendiendo a un paciente',
    overlayLogo: logoCentroMedico,
    overlayLogoAlt: 'Centro Médico viñapm',
    href: 'https://cm.vinapm.cl/',
    external: true,
  },
  {
    title: 'Proyecto Educativo Educa Montealto',
    /** TODO: descripción real (una línea). */
    description: '',
    image: educaMontealto,
    alt: 'Estudiante orando en una actividad del colegio',
    overlayLogo: logoEducaMontealto,
    overlayLogoAlt: 'Educa Montealto',
    href: 'https://www.instagram.com/educamontealto/',
    external: true,
  },
  {
    title: 'Dadores de Amor',
    /** TODO: descripción real (una línea). */
    description: '',
    image: dadoresDeAmor,
    alt: 'Canastas con mercadería preparadas para entregar a familias',
    overlayLogo: logoDadoresDeAmor,
    overlayLogoAlt: 'Dadores de Amor',
    /** TODO: web o Instagram de Dadores de Amor. */
    href: '',
    external: true,
  },
];

/* --- Avisos ---------------------------------------------------------------- */

export type Aviso = {
  /** Rótulo pequeño dentro de la tarjeta. */
  eyebrow: string;
  title: string;
  description: string;
  image: ImageMetadata;
  /**
   * Versión vertical de la imagen, para el móvil. La tarjeta ahí es más alta
   * que ancha y una imagen apaisada se recorta por los lados: de un afiche se
   * perdería justo lo que hay que leer. Sin esto se usa `image` en las dos.
   */
  imageMovil?: ImageMetadata;
  alt: string;
  action: NavLink;
  /** Segundo botón, cuando el aviso lleva a dos sitios (oír la radio o verla). */
  accionSecundaria?: NavLink;
  /**
   * La imagen no es una foto de fondo sino un afiche con cosas que leer. El
   * velo se retira antes para no apagarlo: solo oscurece el lado del texto.
   */
  afiche?: boolean;
};

export const avisosIntro = {
  title: 'Mantente conectado',
};

export const avisos: Aviso[] = [
  {
    eyebrow: 'Predicaciones',
    title: 'Escucha donde estés',
    description: 'Revive nuestras predicaciones cuando quieras y donde quieras',
    image: predicacion,
    alt: 'Pastor predicando durante una reunión',
    /**
     * Playlist "Prédicas 2026". Va a la vista de lista en vez de al enlace de
     * un video suelto: así se ven todas las prédicas, y no queda apuntando a
     * una concreta que con el tiempo deje de ser la más reciente.
     */
    action: {
      label: 'Ver predicaciones',
      href: 'https://www.youtube.com/playlist?list=PLdyP4f9u-CyoZ4P-ZyG8FP9y77hfIkXLv',
      external: true,
    },
  },
  {
    eyebrow: 'Reflexiones diarias',
    title: 'Una palabra para cada mañana',
    description:
      'Cada día compartimos una reflexión breve en los grupos de WhatsApp. Escríbenos y te sumamos.',
    image: reflexionesCamino,
    alt: 'Mujer caminando por un camino de tierra al amanecer',
    /*
      No hay enlace de invitación al grupo: cambia cada tanto y caduca. Se
      pide por el WhatsApp de la iglesia, igual que el enlace del miércoles.
    */
    action: {
      label: 'Quiero recibirlas',
      href: whatsappHref('Hola, quiero recibir las reflexiones diarias'),
      external: true,
    },
  },
  {
    eyebrow: 'Radio Pura Vida FM',
    title: 'Escúchanos en la 102.5 FM',
    description: 'Conéctate durante la semana a nuestros programas radiales.',
    image: radioProgramacion,
    imageMovil: radioProgramacionVertical,
    alt: 'Afiche con la programación semanal de Radio Pura Vida FM',
    afiche: true,
    /**
     * Señal en vivo (Icecast, AAC 128 kbps). El servidor también responde por
     * HTTPS, que es lo que hay que usar: enlazar a http:// desde un sitio en
     * https dispara avisos de "no seguro" en el navegador.
     */
    action: {
      label: 'Escuchar en vivo',
      href: 'https://audio2.tustreaming.cl:7200/stream',
      external: true,
    },
    accionSecundaria: {
      label: 'Ver el canal',
      href: 'https://www.youtube.com/@RadiopuravidaFM',
      external: true,
    },
  },
];

/* --- Nosotros -------------------------------------------------------------- */

/**
 * Cómo se planta una foto dentro de su tarjeta. Las fotos entran enteras, tal
 * como salieron de la cámara, y el encuadre se hace aquí: así se puede afinar
 * mirando la página, sin volver a recortar archivos.
 *
 * - `zoom` — cuánto se acerca. 1 es la foto entera de alto (`object-fit:
 *   cover`), que es lo más abierto que se puede sin dejar hueco. Nunca menos.
 * - `x`, `y` — qué parte de la foto queda a la vista, y también el punto sobre
 *   el que se acerca (`object-position` y `transform-origin` van juntos, así
 *   que subir el zoom no descoloca lo que ya cuadraba).
 *
 * Lo llevan los retratos que mandan en la tarjeta y, si hace falta, también
 * las segundas —las del hover—: casi todas ya vienen cuadradas y no lo
 * necesitan, pero alguna llega apaisada y hay que decirle qué se ve.
 *
 * Los valores están puestos a ojo, tarjeta por tarjeta, tomando a Daniel y
 * Nahara de referencia: cabezas del mismo tamaño, ojos a la misma altura y el
 * mismo aire por encima. No salen de ninguna cuenta —cada pareja posa a su
 * manera y eso no lo arregla una fórmula—, así que si se retoca uno, se retoca
 * mirando la grilla entera.
 */
export type Encuadre = { zoom?: number; x?: string; y?: string };

export type MiembroEquipo = {
  name: string;
  /** Opcional: sin cargo la tarjeta se queda solo con el nombre. */
  role?: string;
  /** La foto entera, sin recortar: el encuadre lo pone `encuadre`. */
  photo: ImageMetadata | null;
  encuadre?: Encuadre;
  /**
   * Cuánto se sube o se baja el brillo de esta foto, para que el gris del
   * fondo salga igual en toda la cuadrícula.
   *
   * Las fotos de la sesión de estudio están expuestas para que el fondo salga
   * blanco del todo: medido en el trozo que se ve de cada tarjeta, iba de 201
   * a 247 sobre 255, o sea altas luces quemadas y un fondo que se confunde con
   * el blanco de la página. La de Nicole es la excepción —fondo en gris medio
   * (166), sin nada reventado— y es la que se ve limpia y de estudio.
   *
   * El objetivo común es 182, no el 166 de Nicole: bajando hasta su valor
   * exacto las caras del resto quedaban apagadas, porque esas fotos se
   * expusieron para el fondo y no para la piel. En 182 el fondo deja de estar
   * quemado, las caras aguantan, y a Nicole apenas se la toca.
   *
   * El número es el `brightness()` de CSS que lleva el fondo de esa foto al
   * gris común. El contraste, en cambio, es el mismo para todas y vive en el
   * CSS: aquí solo cambia el brillo. Como es CSS, no toca el archivo y se
   * puede quitar o cambiar en cualquier momento.
   */
  luz?: number;
  /**
   * La línea que acompaña al nombre. Solo la enseña el tramo en `retrato`
   * —ahí hay sitio al lado de la foto grande—; en la cuadrícula, donde debajo
   * del nombre solo cabe el cargo, no se pinta.
   */
  bajada?: string;
  /**
   * Segunda foto, más personal: aparece al pasar el ratón por la tarjeta.
   * Opcional; sin ella la tarjeta simplemente no cambia.
   */
  photoHover?: ImageMetadata | null;
  /** Solo si la segunda foto no viene ya cuadrada. */
  encuadreHover?: Encuadre;
};

/**
 * Un tramo de la lista de pastores. Son dos —los fundadores y los asociados—
 * y cada uno lleva su rótulo: el título de la sección es uno solo, así que
 * quien mira sabe por qué hay dos cuadrículas.
 */
export type GrupoEquipo = {
  /** Rótulo del tramo, en versalitas y con la línea fina debajo. */
  rotulo: string;
  /**
   * Cómo se pinta el tramo.
   *
   * - `rejilla` (lo normal) — las tarjetas cuadradas, de tres en tres.
   * - `retrato` — una sola persona o pareja: la foto grande a un lado y, al
   *   otro, el nombre en cuerpo de titular con su bajada. Es lo que les da la
   *   preeminencia a los fundadores; con una tarjeta suelta en la cuadrícula
   *   la fila quedaba a medias y los dos tramos pesaban igual.
   */
  formato?: 'rejilla' | 'retrato';
  /**
   * Cuántas tarjetas se ven de entrada; el resto espera detrás del botón. Sin
   * `visibles` se ve el tramo entero y no sale botón, que es lo que hace el
   * de los fundadores: una sola tarjeta no se pliega.
   */
  visibles?: number;
  miembros: MiembroEquipo[];
};

export type FotoHistorica = {
  /** Pie de foto: año, lugar o qué se ve. */
  caption: string;
  /** `null` mientras no llegue. Cada una se muestra con su proporción. */
  image: ImageMetadata | null;
};

export const about = {
  eyebrow: 'Nosotros',
  title: 'Somos una familia compasiva imitando a Jesús',

  historia: {
    title: 'Nuestra historia',
    /** Un párrafo por entrada. */
    body: [
      'Nuestra historia comenzó en el living de la casa de nuestros pastores, donde durante tres meses nos reuníamos siete familias con el anhelo de buscar a Dios y crecer en Su presencia.',
      'A medida que la iglesia creció, las reuniones pasaron al Jardín Infantil Lunita y luego a una casona en Egaña 2070, que fue remodelada para recibir a la congregación. Más tarde, fue necesario trasladarse al galpón de la misma propiedad, llegando a reunir cerca de 130 personas.',
      'Después de una temporada difícil, la iglesia quedó conformada por 28 personas y comenzó una nueva etapa en un quincho de la población Kennedy. En 2005, Dios llamó a nuestro pastor Jairo a dedicar tres meses a sumergirse profundamente en Su presencia, con la promesa de que él lo llevaría más alto y más profundo, como nunca antes.',
      'Al finalizar ese tiempo, Dios abrió la puerta para adquirir la propiedad donde hoy se encuentra nuestra iglesia, la cual ha sido ampliada y transformada a lo largo de los años.',
      'Miramos hacia atrás reconociendo la fidelidad de Dios en cada etapa, y creemos que nuestra historia aún se está escribiendo.',
    ],
    /*
      Van una debajo de otra, cada una con su pie, mientras el texto de al
      lado se queda quieto. Cada foto conserva su proporción: las hay
      verticales y apaisadas, y recortarlas todas al mismo marco obligaba a
      cortar justo lo que se quiere ver.
    */
    fotos: [
      { caption: 'El matrimonio de los pastores', image: historiaMatrimonioPastores },
      { caption: 'El equipo de adoración', image: historiaEquipoAdoracion },
      { caption: 'Una reunión en el salón', image: historiaSalon },
      { caption: 'El edificio blanco', image: historiaEdificioBlanco },
      { caption: 'Construcciones', image: historiaConstruccion },
      { caption: 'Campamento de niños', image: historiaCampamentoNinos },
      { caption: 'Bautizos en Chamiza', image: historiaBautizosChamiza },
    ] satisfies FotoHistorica[],
  },


  valores: [
    {
      title: 'Una familia compasiva imitando a Jesús',
      body: 'La compasión no es un programa: es la forma en que entendemos la fe. Por eso la iglesia se extiende en salud, educación y ayuda social.',
    },
    {
      title: 'Iglesia en movimiento',
      body: 'Seguimos creciendo como comunidad y sirviendo a la ciudad, con la convicción de que la palabra declarada trae transformación.',
    },
    {
      title: 'Una casa abierta',
      body: 'Cada reunión, red y actividad existe para que nadie tenga que llegar solo: hay lugar para quien viene por primera vez y para quien lleva años.',
    },
  ],

  /*
    Se leen de a uno mientras se baja: el que va llegando al centro de la
    pantalla se enciende y los demás se apagan.
  */
  proyectos: {
    title: 'Nuestros proyectos de compasión social',
    items: [
      { title: 'Proyecto educativo Educa Montealto' },
      { title: 'Centro Médico Viña Puerto Montt' },
      { title: 'Entrega de canastas de alimento «Dadores de Amor»' },
    ],
  },

  /** Lo que viene. Aquí cada uno lleva una línea explicando de qué se trata. */
  sueños: {
    title: 'Seguimos soñando con',
    items: [
      {
        title: 'Primera Universidad Cristiana del sur de Chile',
        body: 'En el terreno adquirido recientemente se proyecta la Universidad «Velos», primera universidad cristiana del sur de Chile.',
      },
      {
        title: 'Academia y CFT',
        body: 'También se proyecta nuestro Centro de Formación Técnica, complementado con un programa de capacitación para emprendedores locales, abriendo puertas de futuro para niños, adolescentes y jóvenes de nuestra región.',
      },
      {
        title: 'Proyecto Hospital Clínico La Viña',
        body: 'En fe, sobre este nuevo terreno, construiremos este centro clínico, ampliando nuestra capacidad de servicio y sanidad en la comuna.',
      },
      {
        title: 'Proyecto de Residencia de Niños y Familias de Acogida',
        body: 'Anhelamos brindar un entorno seguro, de amor, restauración y cuidado integral a niños que lo necesitan, acompañando y capacitando a familias que abren sus corazones bajo esta hermosa labor de acogida.',
      },
    ],
  },

  equipo: {
    title: 'Equipo pastoral',
    description: 'Primero quienes fundaron la iglesia; después el equipo que pastorea cada área.',
    /**
     * Dos tramos, cada uno con su rótulo: primero los fundadores y luego los
     * asociados. En los asociados salen los primeros `visibles` y el resto
     * espera detrás del botón «Ver todo el equipo pastoral»; el orden de la
     * lista es el orden en que aparecen, así que para adelantar a alguien se
     * sube aquí.
     *
     * TODO: pendientes los cargos de casi todos, el retrato de estudio de
     * Eduardo y Priscila —ahora va una foto suya de familia— y el de Juan y
     * Lina.
     */
    grupos: [
      {
        rotulo: 'Pastores fundadores',
        formato: 'retrato',
        miembros: [
          {
            name: 'Jairo Quinteros y Verónica Mayne',
            bajada:
              'Fundadores y pastores de nuestra Iglesia Cristiana Viña Puerto Montt, quienes desde sus inicios hasta hoy han guiado y acompañado esta familia.',
            /*
              La única sobre fondo oscuro, así que aquí no hay `luz` que
              igualar: el `luz` de las demás lleva su fondo blanco al gris
              común, y este fondo ya es negro. Las dos son apaisadas y las dos
              traen a los protagonistas centrados, así que el marco 3:2 del
              tramo en retrato las coge tal cual, sin encuadre.
            */
            photo: equipoJairoVeronica,
            photoHover: equipoJairoVeronica2,
          },
        ],
      },
      {
        rotulo: 'Pastores asociados',
        visibles: 6,
        miembros: [
          {
            name: 'Roberto Quinteros y Araceli Chaparro',
            role: 'Pastores de Jóvenes',
            photo: equipoRobertoAraceli,
            /*
              La suya no es de estudio sino una foto de interior, mucho más
              oscura: para igualar el fondo haría falta un 2.3, y pasado 1.3 se le
              queman las caras. Se queda en el tope y su tarjeta sigue siendo la
              más oscura de la cuadrícula; eso lo arregla una foto de estudio, no
              el brillo.
            */
            luz: 1.3,
            photoHover: equipoRobertoAraceli2,
          },
          {
            name: 'Daniel Quinteros y Nahara Gutiérrez',
            role: 'Pastores de Matrimonios Jóvenes',
            photo: equipoDanielNahara,
            luz: 0.825,
            photoHover: equipoDanielNahara2,
          },
          {
            name: 'Carlos Moya y Thiare Pivet',
            role: 'Pastores de Matrimonios',
            photo: equipoCarlosThiare,
            luz: 0.725,
            encuadre: { zoom: 1.56, x: '50%', y: '32%' },
            photoHover: equipoCarlosThiare2,
          },
          {
            name: 'Danilo Vargas y Lena Miller',
            photo: equipoDaniloLena,
            luz: 0.888,
            photoHover: equipoDaniloLena2,
          },
          {
            name: 'Rodolfo Cabezas y Natalie Alfaro',
            photo: equipoRodolfoNatalie,
            luz: 0.804,
            encuadre: { zoom: 1.36, x: '50%', y: '27%' },
            photoHover: equipoRodolfoNatalie2,
          },
          {
            name: 'Nicole Bruyere',
            photo: equipoNicole,
            luz: 1.081,
            /*
              La única foto vertical del grupo, y por eso la más apretada: al
              cubrir el cuadrado se escala por el ancho, así que sobra alto y hay
              que elegir qué franja se ve. `y: '0%'` enseña el filo de arriba de la
              foto, que es donde está el aire sobre el pelo; con más, la coronilla
              se iba fuera. `zoom: 1` es lo más abierto posible —por debajo
              quedarían franjas a los lados—, así que aquí no hay margen para
              alejarse más: se ve algo más grande que el resto y es lo que da la
              foto.
            */
            encuadre: { zoom: 1, x: '50%', y: '0%' },
            photoHover: equipoNicole2,
            /*
              Apaisada, y con las dos abrazadas a la izquierda del encuadre: el
              cuadrado se corre hacia allá para que queden centradas. Del río
              entra lo justo.
            */
            encuadreHover: { zoom: 1, x: '20%', y: '50%' },
          },
          {
            name: 'Jonathan Rogel y Carmen Mansilla',
            photo: equipoJonathanCarmen,
            luz: 0.784,
            encuadre: { zoom: 1.28, x: '49%', y: '32%' },
            photoHover: equipoJonathanCarmen2,
            /*
              Apaisada y con los cuatro repartidos de lado a lado: el cuadrado
              se corre un poco a la derecha para que al hijo mayor no le pille
              el filo, que era lo único que no cabía.
            */
            encuadreHover: { x: '52%' },
          },
          {
            name: 'David Balbontín y Camila Gallardo',
            photo: equipoDavidCamila,
            luz: 0.735,
            encuadre: { zoom: 1.18, x: '50%', y: '34%' },
            photoHover: equipoDavidCamila2,
          },
          {
            name: 'Hardy Aqueveque y Ruth Venegas',
            photo: equipoHardyRuth,
            luz: 0.811,
            /*
              Hardy llega muy arriba en su foto, así que el zoom se toma desde el
              filo de arriba (`y: '0%'`): el aire sobre su cabeza crece con la
              escala en vez de comérsela. Con el origen a media altura, ampliar le
              cortaba la coronilla.
            */
            encuadre: { zoom: 1.2, x: '48%', y: '0%' },
            photoHover: equipoHardyRuth2,
          },
          {
            name: 'Eduardo Alister y Priscila Almonacid',
            /*
              Provisional, mientras no llegue el retrato de estudio: es una
              foto suya de familia y va con el mismo tratamiento que las
              demás —blanco y negro, y a color al pasar por encima—, así que
              la tarjeta no se sale de la cuadrícula aunque la foto sea de
              otro sitio. Las caras salen más pequeñas que en el resto y no
              hay forma de arreglarlo acercándose: con más zoom se les corta
              la cabeza a los hijos.

              `x: '40%'` corre el cuadrado hacia la izquierda; centrado, a
              Priscila le cortaba media cara. Sin `luz`, que es cosa del
              fondo de estudio.
            */
            photo: equipoEduardoPriscila,
            encuadre: { x: '40%' },
          },
          {
            name: 'Eugenia Soto',
            photo: equipoEugenia,
            luz: 0.791,
            encuadre: { zoom: 1.44, x: '48%', y: '24%' },
            photoHover: equipoEugenia2,
          },
          {
            name: 'Gerardo Andrade y Maria Eliana Zornow',
            photo: equipoGerardoMariaEliana,
            luz: 0.762,
            encuadre: { zoom: 1.48, x: '44%', y: '33%' },
          },
          {
            name: 'Cecilia Alvarado',
            photo: equipoCecilia,
            luz: 0.774,
            encuadre: { zoom: 1.6, x: '52%', y: '22%' },
            photoHover: equipoCecilia2,
            /*
              Vertical, así que del alto sobra y hay que elegir la franja:
              arriba del todo entraba el cuadro de la pared y abajo se le iba
              la cara, y en el 28% quedan ella y el lienzo que está pintando.
            */
            encuadreHover: { y: '28%' },
          },
          {
            name: 'Juan y Lina',
            photo: null,
          },
        ],
      },
    ] satisfies GrupoEquipo[],
  },
};

/* --- Vida en familia ------------------------------------------------------- */

export type FamilyActivity = {
  title: string;
  when: string;
  times: string[];
  /** varias fotos por actividad: van pasando en columna junto a la lista */
  images: ImageMetadata[];
  alt: string;
};

export const familyLife = {
  title: 'Vida en Familia',
  description: 'Instancias en el mes para crecer, servir y caminar juntos.',
  cta: { label: 'Ver calendario de actividades', href: '/actividades' },
  activities: [
    {
      title: 'Sentados a la mesa',
      when: 'Primer domingo de cada mes',
      times: ['18:00 hrs'],
      images: [familiaSentadosMesa1, familiaSentadosMesa2, familiaSentadosMesa3],
      alt: 'Compartiendo sentados a la mesa',
    },
    {
      title: 'Salas de Sanidad',
      when: 'A confirmar cada mes',
      times: ['18:00 hrs'],
      images: [familiaSalasSanidad, familiaSalasSanidad2, familiaSalasSanidad3, familiaSalasSanidad4],
      alt: 'Personas orando unas por otras',
    },
    {
      title: 'Casa de Oración',
      when: 'Último fin de semana de cada mes',
      times: ['12:00 hrs / Vie', '12:00 hrs / Sáb'],
      images: [familiaCasaOracion1, familiaCasaOracion2, familiaCasaOracion3, familiaCasaOracion4],
      alt: 'Momentos de oración en comunidad',
    },
  ] satisfies FamilyActivity[],
};

/* --- Testimonios ----------------------------------------------------------- */

/**
 * Los testimonios son videos: parten en silencio y el visitante decide si
 * activa el audio. Las rutas apuntan a `public/videos`.
 */
export type Testimonial = {
  name: string;
  /** En qué obró Dios, en dos o tres palabras: «Sanidad física», «Provisión». */
  summary: string;
  /** El que se muestra al centro cuando la página carga. Solo uno. */
  inicial?: boolean;
  video: string;
  poster: string;
  alt: string;
};

export const testimonialsIntro = {
  title: 'Testimonios',
  verse: '“El testimonio de Jesús es el espíritu que inspira la profecía”',
  reference: 'Apocalipsis 19:10',
  /**
   * Botón bajo el video. Por ahora lleva al canal de YouTube, que es donde
   * están los testimonios; si algún día hay una lista propia, se cambia aquí.
   */
  action: {
    label: 'Ver más testimonios',
    href: youtubeChannel,
    external: true,
  } satisfies NavLink,
};

/** TODO: falta el resumen del milagro de cada uno; se ve bajo el nombre. */
export const testimonials: Testimonial[] = [
  {
    name: 'Andrea',
    summary: '',
    video: '/videos/testimonio-andrea.mp4',
    poster: '/videos/testimonio-andrea-poster.jpg',
    alt: 'Andrea contando su testimonio',
  },
  {
    name: 'Flor',
    summary: '',
    inicial: true,
    video: '/videos/testimonio-flor.mp4',
    poster: '/videos/testimonio-flor-poster.jpg',
    alt: 'Flor contando su testimonio',
  },
  {
    name: 'Carlos',
    summary: '',
    video: '/videos/testimonio-carlos.mp4',
    poster: '/videos/testimonio-carlos-poster.jpg',
    alt: 'Carlos contando su testimonio',
  },
];

/* --- Dar ------------------------------------------------------------------- */

/*
  Las tres formas de dar. La de transferencia lleva las tres cuentas, una por
  destino: lo que se ofrenda a la iglesia, a educación y a salud va a
  personas jurídicas distintas y no se pueden mezclar.
*/
export type CuentaBancaria = {
  destino: string;
  titular: string;
  rut: string;
  banco: string;
  cuenta: string;
  correo: string;
};

export type FormaDeDar = {
  id: string;
  title: string;
  icon: string;
  summary: string;
  /** Logo de quien procesa el pago, si lo hay. */
  logo?: ImageMetadata;
  logoAlt?: string;
  cuentas?: CuentaBancaria[];
  action?: NavLink;
  /** Texto suelto, para las formas que no llevan cuentas ni botón. */
  detalle?: string;
};

export const formasDeDar: FormaDeDar[] = [
  {
    id: 'online',
    title: 'En línea',
    icon: 'lucide:credit-card',
    summary: 'Realiza tu diezmo u ofrenda de manera fácil, rápida y segura a través de Fintoc',
    detalle: 'Fintoc te conecta directo con tu banco',
    logo: fintocLogo,
    logoAlt: 'Fintoc',
    action: { label: 'Dar en línea', href: contactChannels.givingUrl, external: true },
  },
  {
    id: 'transferencia',
    title: 'Transferencia bancaria',
    icon: 'lucide:building-2',
    summary: 'Elige el destino de tu ofrenda y transfiere desde tu banco',
    cuentas: [
      {
        destino: 'Sostenimiento de la iglesia',
        titular: 'Iglesia Cristiana La Viña de Puerto Montt',
        rut: '65.454.670-3',
        banco: 'Scotiabank',
        cuenta: 'Cuenta corriente 02-80394-41',
        correo: 'finanzasvinapm@gmail.com',
      },
      {
        destino: 'Proyectos de educación',
        titular: 'Fundación Pura Vida',
        rut: '65.080.453-8',
        banco: 'Scotiabank',
        cuenta: 'Cuenta corriente 0097-25170-54',
        correo: 'finanzasvinapm@gmail.com',
      },
      {
        destino: 'Proyectos de salud',
        titular: 'ONG para el Desarrollo BILAV',
        rut: '65.065.856-6',
        banco: 'Scotiabank',
        cuenta: 'Cuenta corriente 97-20396-75',
        correo: 'finanzasvinapm@gmail.com',
      },
    ],
  },
  {
    id: 'efectivo',
    title: 'Efectivo',
    icon: 'lucide:hand-coins',
    summary: 'Entrégalo en persona, en cualquiera de nuestras reuniones',
    detalle:
      'En el momento de dar de nuestras reuniones el equipo de finanzas estará con canastos en distintas zonas de nuestro salón, en los que podrás entregar tus diezmos y ofrendas.',
  },
];

export const giving = {
  verse: '“Hay más dicha en dar que en recibir”',
  reference: 'Hechos 20:35b',
  title: 'Sé parte de nuestros trabajos de compasión social',
  image: darManos,
  alt: 'Manos abiertas recibiendo y entregando',
  action: { label: 'Dar', href: contactChannels.givingUrl, external: true } satisfies NavLink,
};

/* --- Contacto -------------------------------------------------------------- */

export const contact = {
  /** se compone una palabra por línea, como la referencia */
  title: 'Contáctate con nosotros',
  description: 'Si necesitas oración o mayor información',
  action: {
    label: 'Enviar mensaje',
    href: whatsappHref('Hola, necesito oración / más información'),
    external: true,
  } satisfies NavLink,
  image: contactoBanderas,
  alt: 'Persona ondeando un lienzo durante la alabanza',
};

/* --- Footer ---------------------------------------------------------------- */

export type FooterColumn = { title: string; links: NavLink[] };

/**
 * Cada enlace lleva a la sección que le corresponde. Van con la barra
 * delante —`/#dar` y no `#dar`— porque el footer sale en todas las páginas y
 * un ancla suelta desde `nosotros` buscaría la sección en esa misma página.
 * Los que siguen con el `href` vacío no tienen destino todavía: el footer los
 * muestra como texto plano, no como enlaces muertos.
 */
export const footerColumns: FooterColumn[] = [
  {
    title: 'Nosotros',
    links: [
      { label: 'Donde comenzó todo', href: '/nosotros#historia' },
      { label: 'Misión, Visión y Valores', href: '/nosotros#creemos' },
      { label: 'Equipo Pastoral', href: '/nosotros#equipo' },
    ],
  },
  {
    /* Los dos primeros tienen sitio propio; el resto, la sección que los presenta. */
    title: 'Compasión',
    links: [
      { label: 'Centro Médico Viña Puerto Montt', href: 'https://cm.vinapm.cl/', external: true },
      {
        label: 'Educa Montealto',
        href: 'https://www.instagram.com/educamontealto/',
        external: true,
      },
      { label: 'Dadores de Amor', href: '/#compasion' },
      { label: 'Acoge Day', href: '/#compasion' },
    ],
  },
  {
    title: 'Participar',
    links: [
      { label: 'Horarios y Ubicación', href: '/#reuniones' },
      { label: 'Calendario de Actividades', href: '/actividades' },
      { label: 'Predicaciones Recientes', href: '/#avisos' },
      { label: 'Áreas de Servicio', href: '' },
    ],
  },
];

export type SocialLink = { label: string; href: string; icon: string };

export const socials: SocialLink[] = [
  { label: 'WhatsApp', href: whatsappHref(), icon: 'simple-icons:whatsapp' },
  { label: 'Instagram', href: 'https://www.instagram.com/iglesiavinapm/', icon: 'simple-icons:instagram' },
  { label: 'YouTube', href: 'https://www.youtube.com/@lavinatvpmontt', icon: 'simple-icons:youtube' },
  { label: 'Facebook', href: 'https://www.facebook.com/iglesiavinapm', icon: 'simple-icons:facebook' },
];

export const credit = { label: 'TypeBold', href: 'https://typebold.com' };

/* ---------------------------------------------------------------------------
   Portada de la página de actividades
   --------------------------------------------------------------------------- */

/**
 * El titular se arma por piezas porque no es solo texto: entre las palabras
 * se abren huecos donde van cambiando fotos, y una flecha dibujada enlaza dos
 * de ellas. Cada `linea` es un renglón del titular, y el orden de las piezas
 * es el orden en que se leen.
 *
 * - `texto`   — una o varias palabras.
 * - `fotos`   — un hueco con `cuantas` casillas seguidas, en retrato (3:4) o
 *               apaisadas (16:9). Las fotos las pone el componente.
 * - `flecha`  — el trazo naranja.
 *
 * Cambiar el titular es reescribir estas líneas: para mover un hueco basta
 * con cambiarlo de sitio en el array.
 */
export type PiezaPortada =
  | { texto: string }
  | { fotos: 'retrato' | 'apaisada'; cuantas: number }
  | { flecha: true };

/**
 * Los nombres que desfilan en la tarjeta de texto del montaje, entre una foto
 * y la siguiente. No es el calendario —eso viene de Notion— sino lo que se
 * hace de forma habitual: lo que alguien esperaría encontrar al asomarse.
 */
export const loQueViene = [
  'Viernes de Avivamiento',
  'Casa de Oración',
  'Domingos de Gloria',
  'Salas de sanidad',
  'Sentados a la mesa',
  'Campamentos',
  'Presentación de niños',
];

export const portadaActividades: { lineas: PiezaPortada[][] } = {
  lineas: [
    [{ texto: 'Súmate' }, { fotos: 'retrato', cuantas: 3 }],
    [{ texto: 'a' }, { flecha: true }, { texto: 'nuestras' }],
    [{ texto: 'actividades' }, { fotos: 'apaisada', cuantas: 1 }],
  ],
};
