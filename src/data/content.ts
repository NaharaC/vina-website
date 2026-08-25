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
import historiaMatrimonioPastores from '../assets/img/historia-matrimonio-pastores.jpg';
import logoCentroMedico from '../assets/img/logo-centro-medico.png';
import logoDadoresDeAmor from '../assets/img/logo-dadores-de-amor.png';
import logoEducaMontealto from '../assets/img/logo-educa-montealto.png';
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
import predicacion from '../assets/img/predicacion.jpg';
import radioEstudio from '../assets/img/radio-estudio.jpg';
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
  alt: string;
  action: NavLink;
  /**
   * Recuadro flotante con el detalle concreto del aviso —los horarios de la
   * radio—, al modo de la referencia. Opcional: sin él la tarjeta es foto y
   * texto, y la imagen se ve entera.
   */
  panel?: {
    title: string;
    rows: { name: string; when: string }[];
  };
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
    image: familiaCasaOracion2,
    alt: 'Manos sosteniendo una Biblia abierta y subrayada',
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
    title: 'Nuestros programas, toda la semana',
    description: 'Acompáñanos en vivo por la radio de la familia',
    image: radioEstudio,
    alt: 'Dos locutores conversando frente a los micrófonos del estudio',
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
    panel: {
      title: 'Programación',
      rows: [
        { name: 'Caminando Seguras', when: 'Lun a jue · 12:00' },
        { name: 'Pastores con Pura Vida', when: 'Miércoles · 13:00' },
        { name: 'Tiempo y Hora', when: 'Miércoles · 14:00' },
        { name: 'Permaneciendo Dependientes', when: 'Jueves · 14:00' },
        { name: 'Terminando la Semana', when: 'Viernes · 12:00' },
        { name: 'Pulso de Vida', when: 'Viernes · 16:00' },
      ],
    },
  },
];

/* --- Nosotros -------------------------------------------------------------- */

export type MiembroEquipo = {
  name: string;
  role: string;
  /** `null` mientras no llegue el retrato. Cuadrado, 1:1. */
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
  /** `null` mientras no llegue. Cada una se muestra con su proporción. */
  image: ImageMetadata | null;
};

export const about = {
  eyebrow: 'Nosotros',
  title: 'Somos una familia compasiva imitando a Jesús',

  historia: {
    title: 'Cómo empezó',
    /** Un párrafo por entrada. */
    body: [
      'Un grupo pequeño reuniéndose a orar fue el principio de lo que hoy es una familia de cientos de personas en Puerto Montt.',
      'Con los años, esa casa se hizo chica y la iglesia se fue extendiendo a la ciudad: primero en reuniones y redes, después en salud, educación y proyectos sociales.',
    ],
    /*
      Van una debajo de otra, cada una con su pie, mientras el texto de al
      lado se queda quieto. Cada foto conserva su proporción: las hay
      verticales y apaisadas, y recortarlas todas al mismo marco obligaba a
      cortar justo lo que se quiere ver.
    */
    fotos: [
      { caption: 'El matrimonio de los pastores', image: historiaMatrimonioPastores },
      { caption: 'El edificio blanco', image: historiaEdificioBlanco },
      { caption: 'Construcciones', image: historiaConstruccion },
      { caption: 'Campamento de niños', image: historiaCampamentoNinos },
      { caption: 'Bautizos en Chamiza', image: historiaBautizosChamiza },
    ] satisfies FotoHistorica[],
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
    description: 'Conoce a nuestros pastores asociados',
    /** TODO: pendientes los nombres, los cargos y los retratos. */
    miembros: [
      {
        name: 'Roberto Quinteros y Araceli Chaparro',
        role: 'Pastores de Jóvenes',
        photo: equipoRobertoAraceli,
        photoHover: equipoRobertoAraceli2,
      },
      {
        name: 'Daniel Quinteros y Nahara Gutiérrez',
        role: 'Pastores de Matrimonios Jóvenes',
        photo: equipoDanielNahara,
        photoHover: equipoDanielNahara2,
      },
      {
        name: 'Carlos Moya y Thiare Pivet',
        role: 'Pastores de Matrimonios',
        photo: equipoCarlosThiare,
        photoHover: equipoCarlosThiare2,
      },
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
      { label: 'Predicaciones Recientes', href: '#avisos' },
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
