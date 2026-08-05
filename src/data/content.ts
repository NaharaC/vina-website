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
import aliadoPuravidaFm from '../assets/img/aliado-puravida-fm.png';
import aliadoVelos from '../assets/img/aliado-velos.png';
import centroMedico from '../assets/img/centro-medico.jpg';
import contactoBanderas from '../assets/img/contacto-banderas.jpg';
import dadoresDeAmor from '../assets/img/dadores-de-amor.jpg';
import educaMontealto from '../assets/img/educa-montealto.jpg';
import familiaCasaOracion from '../assets/img/familia-casa-oracion.jpg';
import familiaSalasSanidad from '../assets/img/familia-salas-sanidad.jpg';
import familiaSentadosMesa from '../assets/img/familia-sentados-mesa.jpg';
import heroCongregacion from '../assets/img/hero-congregacion.jpg';
import logoCentroMedico from '../assets/img/logo-centro-medico.png';
import logoDadoresDeAmor from '../assets/img/logo-dadores-de-amor.png';
import logoEducaMontealto from '../assets/img/logo-educa-montealto.png';
import logoVinapm from '../assets/img/logo-vinapm.png';
import nosotros from '../assets/img/nosotros.jpg';
import radioEstudio from '../assets/img/radio-estudio.jpg';
import reunionDomingosGloria from '../assets/img/reunion-domingos-gloria.jpg';
import reunionMiercolesPalabra from '../assets/img/reunion-miercoles-palabra.jpg';
import reunionViernesAvivamiento from '../assets/img/reunion-viernes-avivamiento.jpg';
import testimonioNelsonWendy from '../assets/img/testimonio-nelson-wendy.jpg';
import testimonioNelsonWendyThumb from '../assets/img/testimonio-nelson-wendy-thumb.jpg';
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
  { label: 'Radio', href: '#radio' },
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

export type MeetingMeta = { icon: string; label: string };

export type Meeting = {
  title: string;
  subtitle: string;
  image: ImageMetadata;
  alt: string;
  meta: MeetingMeta[];
};

export const meetings: Meeting[] = [
  {
    title: 'Miércoles de palabra',
    subtitle: 'Desde casa y sin excusa',
    image: reunionMiercolesPalabra,
    alt: 'Biblia abierta durante el estudio de la palabra',
    meta: [
      { icon: 'lucide:clock', label: '20:00 hrs' },
      { icon: 'lucide:video', label: 'Zoom' },
      { icon: 'lucide:youtube', label: 'Transmisión Online' },
    ],
  },
  {
    title: 'Viernes de Avivamiento',
    subtitle: '',
    image: reunionViernesAvivamiento,
    alt: 'Persona adorando con un lienzo durante la reunión de avivamiento',
    meta: [
      { icon: 'lucide:clock', label: '19:30 hrs' },
      { icon: 'lucide:user', label: 'Presencial' },
      { icon: 'lucide:youtube', label: 'Transmisión Online' },
    ],
  },
  {
    title: 'Domingos de Gloria',
    subtitle: 'Reunión general',
    image: reunionDomingosGloria,
    alt: 'Manos levantadas en adoración durante la reunión general',
    meta: [
      { icon: 'lucide:clock', label: '10:30 hrs' },
      { icon: 'lucide:user', label: 'Presencial' },
      { icon: 'lucide:youtube', label: 'Transmisión Online' },
    ],
  },
];

/* --- Palabra profética + cifras -------------------------------------------- */

export const propheticWord = {
  quote:
    '“Avivamiento con entendimiento es intercesión, donde la declaración de la palabra trae transformación”',
  source: 'Palabra Profética 2026',
};

export type Stat = { value: string; label: string };

export const stats: Stat[] = [
  { value: '25+', label: 'años de iglesia' },
  {
    value: '12.000+',
    label: 'atenciones médicas a la fecha. A todos se les ha predicado de Jesús',
  },
  { value: 'Cientos', label: 'niños creciendo con educación de calidad y valores cristianos' },
  { value: 'Miles', label: 'familias alcanzadas a través de nuestros proyectos sociales' },
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
  /** TODO: destino de "Nosotros". */
  href: '',
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
    /** TODO: web o Instagram del Centro Médico. */
    href: '',
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
    /** TODO: web o Instagram de Educa Montealto. */
    href: '',
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

/* --- Radio ----------------------------------------------------------------- */

export const radio = {
  title: 'Escucha donde estés',
  description: 'Revive nuestras predicaciones y conéctate a nuestros programas radiales',
  image: radioEstudio,
  alt: 'Dos personas grabando un programa en el estudio de radio',
  actions: [
    /**
     * Playlist "Prédicas 2026". Va a la vista de lista en vez de al enlace de
     * un video suelto: así se ven todas las prédicas, y no queda apuntando a
     * una concreta que con el tiempo deje de ser la más reciente.
     */
    {
      label: 'Predicaciones',
      href: 'https://www.youtube.com/playlist?list=PLdyP4f9u-CyoZ4P-ZyG8FP9y77hfIkXLv',
      external: true,
    },
    /**
     * Señal en vivo (Icecast, AAC 128 kbps). El servidor también responde por
     * HTTPS, que es lo que hay que usar: enlazar a http:// desde un sitio en
     * https dispara avisos de "no seguro" en el navegador.
     */
    { label: 'Radio Pura Vida FM', href: 'https://audio2.tustreaming.cl:7200/stream', external: true },
  ] satisfies NavLink[],
};

/* --- Vida en familia ------------------------------------------------------- */

export type FamilyActivity = {
  title: string;
  when: string;
  times: string[];
  image: ImageMetadata;
  alt: string;
};

export const familyLife = {
  title: 'Vida en Familia',
  description: 'Instancias en el mes para crecer, servir y caminar juntos.',
  activities: [
    {
      title: 'Sentados a la mesa',
      when: 'Primer domingo de cada mes',
      times: ['18:00 hrs'],
      image: familiaSentadosMesa,
      alt: 'Manos sosteniendo la copa de la santa cena',
    },
    {
      title: 'Salas de Sanidad',
      when: 'A confirmar cada mes',
      times: ['18:00 hrs'],
      image: familiaSalasSanidad,
      alt: 'Personas orando unas por otras',
    },
    {
      title: 'Casa de Oración',
      when: 'Último fin de semana de cada mes',
      times: ['12:00 hrs / Vie', '12:00 hrs / Sáb'],
      image: familiaCasaOracion,
      alt: 'Persona de rodillas orando',
    },
  ] satisfies FamilyActivity[],
};

/* --- Testimonios ----------------------------------------------------------- */

export type Testimonial = {
  name: string;
  quote: string;
  poster: ImageMetadata;
  posterAlt: string;
  thumb: ImageMetadata;
  thumbAlt: string;
};

export const testimonialsIntro = {
  title: 'Testimonios',
  verse: '“El testimonio de Jesús es el espíritu que inspira la profecía”',
  reference: 'Apocalipsis 19:10',
};

export const testimonials: Testimonial[] = [
  {
    name: 'Nelson Morillo y Wendy',
    /** TODO: cita real del testimonio. */
    quote: '',
    poster: testimonioNelsonWendy,
    posterAlt: 'Wendy contando su testimonio',
    thumb: testimonioNelsonWendyThumb,
    thumbAlt: 'Nelson y Wendy conversando',
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
  title: 'Contáctanos',
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
      { label: 'Predicaciones Recientes', href: '#radio' },
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
