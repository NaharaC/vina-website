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
import logoCentroMedico from '../assets/img/logo-centro-medico.png';
import logoDadoresDeAmor from '../assets/img/logo-dadores-de-amor.png';
import logoEducaMontealto from '../assets/img/logo-educa-montealto.png';
import logoVinapm from '../assets/img/logo-vinapm.png';
import nosotros from '../assets/img/nosotros.jpg';
import equipoDanielNahara from '../assets/img/equipo-daniel-nahara.jpg';
import equipoDanielNahara2 from '../assets/img/equipo-daniel-nahara-2.jpg';
import predicacion from '../assets/img/predicacion.jpg';
import radioCaminandoSeguras from '../assets/img/radio-caminando-seguras.jpg';
import radioPastoresPuraVida from '../assets/img/radio-pastores-con-pura-vida.jpg';
import radioPermaneciendoDependientes from '../assets/img/radio-permaneciendo-dependientes.jpg';
import radioPulsoDeVida from '../assets/img/radio-pulso-de-vida.jpg';
import radioTerminandoLaSemana from '../assets/img/radio-terminando-la-semana.jpg';
import radioTiempoYHora from '../assets/img/radio-tiempo-y-hora.jpg';
import reunionDomingosGloria from '../assets/img/reunion-domingos-gloria.jpg';
import reunionMiercolesPalabra from '../assets/img/reunion-miercoles-palabra.jpg';
import reunionViernesAvivamiento from '../assets/img/reunion-viernes-avivamiento.jpg';
import videoPoster from '../assets/img/video-poster.jpg';

export const logo = { src: logoVinapm, alt: 'Iglesia viñapm' };

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
  { label: 'Prédicas', href: '#predicaciones' },
  { label: 'Dar', href: '#dar' },
];

/* --- Hero ------------------------------------------------------------------ */

export const hero = {
  image: heroCongregacion,
  alt: 'Congregación adorando durante una reunión en Iglesia Viña Puerto Montt',
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
  {
    title: 'Actividades',
    description: 'Quiero ser parte de las actividades',
    href: '#vida-en-familia',
    icon: 'lucide:calendar-days',
    iconClass: 'bg-icon-amber',
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

/** Búsqueda en Google Maps con la dirección de la iglesia. */
export const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${organization.streetAddress}, ${organization.addressLocality}`
)}`;

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
    value: '1.000+',
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

/* --- Predicaciones --------------------------------------------------------- */

export const predicaciones = {
  title: 'Escucha donde estés',
  description: 'Revive nuestras predicaciones cuando quieras y donde quieras',
  image: predicacion,
  alt: 'Pastor predicando durante una reunión',
  actions: [
    /**
     * Playlist "Prédicas 2026". Va a la vista de lista en vez de al enlace de
     * un video suelto: así se ven todas las prédicas, y no queda apuntando a
     * una concreta que con el tiempo deje de ser la más reciente.
     */
    {
      label: 'Ver predicaciones',
      href: 'https://www.youtube.com/playlist?list=PLdyP4f9u-CyoZ4P-ZyG8FP9y77hfIkXLv',
      external: true,
    },
  ] satisfies NavLink[],
};

/* --- Radio ----------------------------------------------------------------- */

export type ProgramaRadio = {
  name: string;
  /** Cuándo se emite, tal como lo dice el afiche. */
  when: string;
  poster: ImageMetadata;
};

export const radio = {
  title: 'Radio Pura Vida FM',
  description: 'Conéctate a nuestros programas radiales',
  /**
   * Señal en vivo (Icecast, AAC 128 kbps). El servidor también responde por
   * HTTPS, que es lo que hay que usar: enlazar a http:// desde un sitio en
   * https dispara avisos de "no seguro" en el navegador.
   */
  action: {
    label: 'Escuchar en vivo',
    href: 'https://audio2.tustreaming.cl:7200/stream',
    external: true,
  } satisfies NavLink,
  programas: [
    { name: 'Caminando Seguras', when: 'Lunes a jueves · 12:00 hrs', poster: radioCaminandoSeguras },
    { name: 'Pastores con Pura Vida', when: 'Miércoles · 13:00 hrs', poster: radioPastoresPuraVida },
    { name: 'Tiempo y Hora', when: 'Miércoles · 14:00 hrs', poster: radioTiempoYHora },
    {
      name: 'Permaneciendo Dependientes',
      when: 'Jueves · 14:00 hrs',
      poster: radioPermaneciendoDependientes,
    },
    { name: 'Terminando la Semana', when: 'Viernes · 12:00 hrs', poster: radioTerminandoLaSemana },
    { name: 'Pulso de Vida', when: 'Viernes · 16:00 hrs', poster: radioPulsoDeVida },
  ] satisfies ProgramaRadio[],
};

/* --- Nosotros -------------------------------------------------------------- */

export type MiembroEquipo = {
  name: string;
  role: string;
  /** `null` mientras no llegue el retrato. Formato vertical, 4:5. */
  photo: ImageMetadata | null;
  /**
   * Segunda foto, más personal: aparece al pasar el ratón por la tarjeta.
   * Opcional; sin ella la tarjeta simplemente no cambia.
   */
  photoHover?: ImageMetadata | null;
};

export type FotoHistorica = {
  /** Pie de foto: año, lugar o qué se ve. */
  caption: string;
  /** `null` mientras no llegue. Horizontal, 4:3. */
  image: ImageMetadata | null;
};

export const about = {
  eyebrow: 'Nosotros',
  title: 'Más de 25 años siendo una familia compasiva en Puerto Montt',

  historia: {
    title: 'Cómo empezó',
    /** Un párrafo por entrada. */
    body: [
      'Un grupo pequeño reuniéndose a orar fue el principio de lo que hoy es una familia de cientos de personas en Puerto Montt.',
      'Con los años, esa casa se hizo chica y la iglesia se fue extendiendo a la ciudad: primero en reuniones y redes, después en salud, educación y proyectos sociales.',
    ],
    foto: null as ImageMetadata | null,
    fotoCaption: 'Los primeros años de la iglesia',
  },

  /** TODO: pendiente la cita real y quién la dice. */
  cita: {
    quote:
      '«Pendiente: unas líneas de los pastores contando por qué la iglesia es como es. Dos o tres frases.»',
    name: 'Nombre del pastor o pastora',
    role: 'Pastor',
    photo: null as ImageMetadata | null,
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

  galeria: {
    title: 'Nuestra historia en fotos',
    description: 'Del living de una casa a una familia de cientos de personas',
    /** TODO: pendientes las fotos antiguas y sus pies. */
    fotos: [
      { caption: 'Pendiente', image: null },
      { caption: 'Pendiente', image: null },
      { caption: 'Pendiente', image: null },
      { caption: 'Pendiente', image: null },
      { caption: 'Pendiente', image: null },
      { caption: 'Pendiente', image: null },
    ] satisfies FotoHistorica[],
  },

  equipo: {
    title: 'Equipo pastoral',
    description: 'Conoce a nuestros pastores asociados',
    /** TODO: pendientes los nombres, los cargos y los retratos. */
    miembros: [
      { name: 'Nombre pendiente', role: 'Pastor principal', photo: null },
      {
        name: 'Daniel Quinteros y Nahara Gutiérrez',
        role: 'Pastores de Matrimonios Jóvenes',
        photo: equipoDanielNahara,
        photoHover: equipoDanielNahara2,
      },
      { name: 'Nombre pendiente', role: 'Pastor', photo: null },
      { name: 'Nombre pendiente', role: 'Pastor de jóvenes', photo: null },
      { name: 'Nombre pendiente', role: 'Pastora de mujeres', photo: null },
      { name: 'Nombre pendiente', role: 'Pastor de compasión social', photo: null },
    ] satisfies MiembroEquipo[],
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
  cta: { label: 'Ver todas las actividades', href: '/actividades' },
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

export const testimonials: Testimonial[] = [
  {
    name: 'Andrea',
    video: '/videos/testimonio-andrea.mp4',
    poster: '/videos/testimonio-andrea-poster.jpg',
    alt: 'Andrea contando su testimonio',
  },
];

/* --- Dar ------------------------------------------------------------------- */

export const giving = {
  verse: '“Hay más dicha en dar que en recibir”',
  reference: 'Hechos 20:35b',
  title: 'Sé parte de nuestros trabajos de compasión social',
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
 * TODO: estos enlaces apuntan a páginas que todavía no existen. Mientras el
 * `href` esté vacío el footer los muestra como texto plano, no como enlaces.
 */
export const footerColumns: FooterColumn[] = [
  {
    title: 'Nosotros',
    links: [
      { label: 'Donde comenzó todo', href: '' },
      { label: 'Misión, Visión y Valores', href: '' },
      { label: 'Equipo Pastoral', href: '' },
    ],
  },
  {
    title: 'Compasión',
    links: [
      { label: 'Centro Médico Viña Puerto Montt', href: '' },
      { label: 'Educa Montealto', href: '' },
      { label: 'Dadores de Amor', href: '' },
      { label: 'Acoge Day', href: '' },
    ],
  },
  {
    title: 'Participar',
    links: [
      { label: 'Horarios y Ubicación', href: '#reuniones' },
      { label: 'Calendario de Actividades', href: '#vida-en-familia' },
      { label: 'Predicaciones Recientes', href: '#predicaciones' },
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
