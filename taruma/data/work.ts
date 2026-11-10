export type Project = {
  slug: string;
  title: string;
  year: number;
  category: string;
  location: string;
  service: string;
  description: string;
  images: { src: string; alt: string }[];
};

export const projects: Project[] = [
  {
    slug: "complejo-habitacional-lapidario",
    title: "Complejo Habitacional Lapidario",
    year: 2022,
    category: "Residencial",
    location: "La Ceiba",
    service: "Diseño y planificación",
    description:
      "Combina zonas residenciales, comerciales, oficinas y áreas recreativas para satisfacer de manera integral las distintas necesidades de los usuarios en un mismo espacio.",
    images: [
      { src: "/img/complejo-habitacional-lipidario1.png", alt: "Fachada principal del Complejo Habitacional Lapidario" },
      { src: "/img/complejo-habitacional-lipidario2.png", alt: "Vista lateral del Complejo Habitacional Lapidario" },
      { src: "/img/complejo-habitacional-lipidario3.png", alt: "Área residencial interior del Complejo Habitacional Lapidario" },
      { src: "/img/complejo-habitacional-lipidario4.png", alt: "Zona comercial del Complejo Habitacional Lapidario" },
      { src: "/img/complejo-habitacional-lipidario5.png", alt: "Áreas recreativas del Complejo Habitacional Lapidario" },
      { src: "/img/complejo-habitacional-lipidario6.png", alt: "Espacios comunes del Complejo Habitacional Lapidario" },
      { src: "/img/complejo-habitacional-lipidario7.png", alt: "Vista aérea del Complejo Habitacional Lapidario" }
    ]
  },
  {
    slug: "complejo-deportivo",
    title: "Complejo Deportivo",
    year: 2020,
    category: "Institucional",
    location: "Tegucigalpa",
    service: "Diseño arquitectónico",
    description:
      "Espacios orientados a la práctica deportiva y al bienestar integral, con áreas de socialización y recuperación resueltas junto a las canchas.",
    images: [
      { src: "/img/complejo-deportivo1.png", alt: "Fachada principal del Complejo Deportivo" },
      { src: "/img/complejo-deportivo2.png", alt: "Canchas deportivas del Complejo Deportivo" },
      { src: "/img/complejo-deportivo3.png", alt: "Área de socialización del Complejo Deportivo" },
      { src: "/img/complejo-deportivo4.png", alt: "Vista general del Complejo Deportivo" }
    ]
  },
  {
    slug: "complejo-turistico-colonial",
    title: "Complejo Turístico Colonial",
    year: 2021,
    category: "Turístico",
    location: "San Pedro Sula",
    service: "Diseño y construcción",
    description:
      "Diversos espacios diseñados para brindar comodidades y promover el desarrollo del turismo en la zona, con un marcado enfoque en la arquitectura colonial.",
    images: [
      { src: "/img/complejo-turistico-colonial1.png", alt: "Entrada principal del Complejo Turístico Colonial" },
      { src: "/img/complejo-turistico-colonial2.png", alt: "Detalles de arquitectura colonial del complejo turístico" },
      { src: "/img/complejo-turistico-colonial3.png", alt: "Vista panorámica del Complejo Turístico Colonial" }
    ]
  },
  {
    slug: "la-pizza-nostra",
    title: "La Pizza Nostra",
    year: 2023,
    category: "Comercial",
    location: "Tegucigalpa",
    service: "Interiorismo",
    description:
      "Espacio acogedor pensado para que cada cliente disfrute de una experiencia gastronómica y comparta momentos en familia, con un diseño cálido y contemporáneo.",
    images: [
      { src: "/img/pizza-nostra1.png", alt: "Fachada exterior del restaurante La Pizza Nostra" },
      { src: "/img/pizza-nostra2.png", alt: "Área de comedor interior del restaurante La Pizza Nostra" },
      { src: "/img/pizza-nostra3.png", alt: "Diseño de interiores del restaurante La Pizza Nostra" },
      { src: "/img/pizza-nostra4.png", alt: "Zona de bar y recepción de La Pizza Nostra" },
      { src: "/img/pizza-nostra5.png", alt: "Vista nocturna del restaurante La Pizza Nostra iluminado" }
    ]
  },
  {
    slug: "urbanizacion-rubra",
    title: "Urbanización Rubra",
    year: 2023,
    category: "Urbano",
    location: "Choluteca",
    service: "Planificación urbana",
    description:
      "Integra espacios recreativos y áreas educativas, comerciales y residenciales en un solo entorno planificado, con altos estándares de calidad de vida para sus habitantes.",
    images: [
      { src: "/img/urbanizacion-rubra1.png", alt: "Vista general de la Urbanización Rubra" },
      { src: "/img/urbanizacion-rubra2.png", alt: "Zona residencial de la Urbanización Rubra" },
      { src: "/img/urbanizacion-rubra3.png", alt: "Áreas recreativas de la Urbanización Rubra" },
      { src: "/img/urbanizacion-rubra4.png", alt: "Sector comercial de la Urbanización Rubra" }
    ]
  },
  {
    slug: "cabanas-the-rubra",
    title: "Cabañas The Rubra",
    year: 2025,
    category: "Turístico",
    location: "Choluteca",
    service: "Diseño y construcción",
    description:
      "Complejo de cabañas con un ambiente cálido y lleno de confort, pensado para descansar, reconectar con la naturaleza y disfrutar de una estancia placentera.",
    images: [
      { src: "/img/cabanas-the-rubra1.png", alt: "Vista exterior de las Cabañas The Rubra rodeadas de naturaleza" },
      { src: "/img/cabanas-the-rubra2.png", alt: "Interior acogedor de una cabaña de The Rubra" },
      { src: "/img/cabanas-the-rubra3.png", alt: "Área común y jardines del complejo Cabañas The Rubra" },
      { src: "/img/cabanas-the-rubra4.png", alt: "Vista panorámica del entorno natural de Cabañas The Rubra" }
    ]
  },
  {
    slug: "plaza-valterra",
    title: "Plaza Valterra",
    year: 2024,
    category: "Comercial",
    location: "San Pedro Sula",
    service: "Diseño y construcción",
    description:
      "Plaza comercial de uso mixto con locales a pie de calle, recorridos peatonales techados y una fachada que resuelve el asoleamiento del poniente.",
    images: [
      { src: "/img/valterra1.jpg", alt: "Vista general de la Plaza Valterra" },
      { src: "/img/valterra2.jpg", alt: "Fachada principal de la Plaza Valterra" },
      { src: "/img/valterra3.jpg", alt: "Locales comerciales de la Plaza Valterra" },
      { src: "/img/valterra4.jpg", alt: "Área peatonal de la Plaza Valterra" },
      { src: "/img/valterra5.jpg", alt: "Detalles arquitectónicos de la Plaza Valterra" },
      { src: "/img/valterra6.jpg", alt: "Vista nocturna iluminada de la Plaza Valterra" },
      { src: "/img/valterra7.jpg", alt: "Acceso principal de la Plaza Valterra" }
    ]
  },
  {
    slug: "vivienda-modular",
    title: "Vivienda Modular",
    year: 2020,
    category: "Residencial",
    location: "San Pedro Sula",
    service: "Diseño y construcción",
    description:
      "Sistema de vivienda por módulos repetibles que reduce tiempos de obra y permite crecer la casa por etapas sin rehacer lo ya construido.",
    images: [
      { src: "/img/viviendamodular1.jpg", alt: "Módulo principal de la Vivienda Modular" },
      { src: "/img/viviendamodular2.jpg", alt: "Ensamblaje de módulos de la Vivienda Modular" },
      { src: "/img/viviendamodular3.jpg", alt: "Vista interior de la Vivienda Modular" },
      { src: "/img/viviendamodular4.jpg", alt: "Fachada de la Vivienda Modular terminada" },
      { src: "/img/viviendamodular5.jpg", alt: "Detalle constructivo de la Vivienda Modular" },
      { src: "/img/viviendamodular6.jpg", alt: "Área social de la Vivienda Modular" },
      { src: "/img/viviendamodular7.jpg", alt: "Dormitorio de la Vivienda Modular" },
      { src: "/img/viviendamodular8.jpg", alt: "Cocina de la Vivienda Modular" },
      { src: "/img/viviendamodular9.jpg", alt: "Baño de la Vivienda Modular" },
      { src: "/img/viviendamodular10.jpg", alt: "Vista exterior lateral de la Vivienda Modular" },
      { src: "/img/viviendamodular11.jpg", alt: "Vista aérea del conjunto de la Vivienda Modular" }
    ]
  },
  {
    slug: "tecnicentro-zamora",
    title: "Tecnicentro Zamora",
    year: 2025,
    category: "Comercial",
    location: "Choloma",
    service: "Remodelación",
    description:
      "Remodelación de un taller en operación: se reordenaron las bahías de servicio, se abrió la nave a luz natural y se separó la atención al cliente del área de trabajo.",
    images: [
      { src: "/img/tecnicentro1.jpg", alt: "Fachada principal del Tecnicentro Zamora" },
      { src: "/img/tecnicentro2.jpg", alt: "Área de servicio técnico del Tecnicentro Zamora" },
      { src: "/img/tecnicentro3.jpg", alt: "Interior del taller del Tecnicentro Zamora" },
      { src: "/img/tecnicentro4.jpg", alt: "Zona de trabajo del Tecnicentro Zamora" },
      { src: "/img/tecnicentro5.jpg", alt: "Vista general del Tecnicentro Zamora" }
    ]
  },
  {
    slug: "plaza-serrano",
    title: "Plaza Serrano",
    year: 2025,
    category: "Comercial",
    location: "Tegucigalpa",
    service: "Diseño arquitectónico",
    description:
      "Plaza comercial de escala barrial, con locales de frente corto, estacionamiento resuelto al costado y una plaza de acceso que funciona como punto de encuentro.",
    images: [
      { src: "/img/serrano.jpg", alt: "Vista frontal de la Plaza Serrano" },
      { src: "/img/serrano2.jpg", alt: "Interior comercial de la Plaza Serrano" },
      { src: "/img/serrano3.jpg", alt: "Área de estacionamiento de la Plaza Serrano" }
    ]
  },
  {
    slug: "vivienda-san-jeronimo",
    title: "Vivienda San Jerónimo",
    year: 2023,
    category: "Residencial",
    location: "Tegucigalpa",
    service: "Diseño y construcción",
    description:
      "Casa unifamiliar organizada alrededor de un patio central que ventila e ilumina las áreas sociales sin exponerlas a la calle.",
    images: [
      { src: "/img/viviendasanjeronimo1.jpg", alt: "Fachada principal de la Vivienda San Jerónimo" },
      { src: "/img/viviendasanjeronimo2.jpg", alt: "Sala de estar de la Vivienda San Jerónimo" },
      { src: "/img/viviendasanjeronimo3.jpg", alt: "Comedor de la Vivienda San Jerónimo" },
      { src: "/img/viviendasanjeronimo4.jpg", alt: "Jardín exterior de la Vivienda San Jerónimo" },
      { src: "/img/viviendasanjeronimo5.jpg", alt: "Dormitorio principal de la Vivienda San Jerónimo" },
      { src: "/img/viviendasanjeronimo6.jpg", alt: "Vista exterior trasera de la Vivienda San Jerónimo" }
    ]
  },
  {
    slug: "bodegas-industriales",
    title: "Bodegas Industriales",
    year: 2024,
    category: "Industrial",
    location: "Tegucigalpa",
    service: "Planificación",
    description:
      "Conjunto de bodegas con patio de maniobras para vehículo de carga, estructura de claro libre y crecimiento previsto por naves adicionales.",
    images: [
      { src: "/img/bode1.jpg", alt: "Fachada de las bodegas industriales" },
      { src: "/img/bode2.jpg", alt: "Patio de maniobras de las bodegas industriales" }
    ]
  },
  {
    slug: "plantel-industrial",
    title: "Plantel Industrial",
    year: 2022,
    category: "Industrial",
    location: "Choluteca",
    service: "Construcción",
    description:
      "Plantel de producción con circulaciones separadas para personal y materiales, y áreas de servicio agrupadas para simplificar las instalaciones.",
    images: [
      { src: "/img/plantel1.jpg", alt: "Vista exterior del plantel industrial" },
      { src: "/img/plantel2.jpg", alt: "Nave de producción del plantel industrial" }
    ]
  },
  {
    slug: "restaurante-parrilla",
    title: "Restaurante y Parrilla",
    year: 2022,
    category: "Comercial",
    location: "Tegucigalpa",
    service: "Interiorismo",
    description:
      "Restaurante con área de parrilla a la vista, comedor interior y terraza, resuelto para que el humo y el calor de la cocina no invadan el salón.",
    images: [
      { src: "/img/restaurante1.jpg", alt: "Fachada exterior del restaurante" },
      { src: "/img/restaurante2.jpg", alt: "Área de comedor del restaurante" },
      { src: "/img/restaurante3.jpg", alt: "Zona de parrilla del restaurante" },
      { src: "/img/restaurante4.jpg", alt: "Detalle de diseño arquitectónico del restaurante" }
    ]
  },
  {
    slug: "apartamentos-taruma",
    title: "Apartamentos Taruma",
    year: 2024,
    category: "Residencial",
    location: "Tegucigalpa",
    service: "Interiorismo",
    description:
      "Unidades compactas donde la cocina se integra al área social para ganar amplitud, con el almacenamiento resuelto en los muros divisorios.",
    images: [
      { src: "/img/apetamentos1.jpg", alt: "Sala de estar de los Apartamentos Taruma" },
      { src: "/img/apetamentos2.jpg", alt: "Dormitorio principal de los Apartamentos Taruma" },
      { src: "/img/apetamentos3.jpg", alt: "Cocina integrada de los Apartamentos Taruma" }
    ]
  },
  {
    slug: "modelo-de-vivienda",
    title: "Modelo de Vivienda",
    year: 2023,
    category: "Residencial",
    location: "Honduras",
    service: "Diseño arquitectónico",
    description:
      "Modelo replicable para desarrollos habitacionales, con distribución eficiente en planta y acabados seleccionados para resistir el uso diario.",
    images: [
      { src: "/img/modelovicienda1.jpg", alt: "Fachada del modelo de vivienda" },
      { src: "/img/modelovicienda2.jpg", alt: "Sala del modelo de vivienda" },
      { src: "/img/modelovicienda3.jpg", alt: "Comedor del modelo de vivienda" },
      { src: "/img/modelovicienda4.jpg", alt: "Cocina del modelo de vivienda" },
      { src: "/img/modelovicienda5.jpg", alt: "Dormitorio del modelo de vivienda" },
      { src: "/img/modelovicienda6.jpg", alt: "Área exterior del modelo de vivienda" }
    ]
  },
  {
    slug: "vivienda-unifamiliar",
    title: "Vivienda Unifamiliar",
    year: 2021,
    category: "Residencial",
    location: "Tegucigalpa",
    service: "Diseño y construcción",
    description:
      "Casa de dos niveles en terreno con pendiente, con el área social abierta al jardín y los dormitorios retirados del frente de la calle.",
    images: [
      { src: "/img/viviendau1.jpg", alt: "Fachada principal de vivienda unifamiliar" },
      { src: "/img/viviendau2.jpg", alt: "Vista lateral de vivienda unifamiliar" },
      { src: "/img/viviendau3.jpg", alt: "Área social de vivienda unifamiliar" },
      { src: "/img/viviendau4.jpg", alt: "Jardín exterior de vivienda unifamiliar" },
      { src: "/img/viviendau5.jpg", alt: "Interior de sala de vivienda unifamiliar" },
      { src: "/img/viviendau6.jpg", alt: "Vista aérea de vivienda unifamiliar" }
    ]
  },
  {
    slug: "piscina-residencial",
    title: "Piscina Residencial",
    year: 2024,
    category: "Residencial",
    location: "Tegucigalpa",
    service: "Paisajismo",
    description:
      "Piscina y área de descanso integradas al jardín existente, con terraza de asoleamiento y vegetación que da privacidad al conjunto.",
    images: [
      { src: "/img/picsina.jpg", alt: "Piscina residencial con área de descanso y jardín" }
    ]
  }
];

export const categories = [
  "Todos",
  "Residencial",
  "Comercial",
  "Institucional",
  "Turístico",
  "Urbano",
  "Industrial"
];

const bySlug = (slug: string): Project => {
  const found = projects.find((p) => p.slug === slug);
  if (!found) throw new Error(`Proyecto no encontrado: ${slug}`);
  return found;
};

// Uno grande (2x2) y cuatro pequeños: llena exactamente la retícula de 4x2
export const featured: Project[] = [
  bySlug("complejo-habitacional-lapidario"),
  bySlug("cabanas-the-rubra"),
  bySlug("complejo-turistico-colonial"),
  bySlug("plaza-valterra"),
  bySlug("urbanizacion-rubra")
];

export type GalleryImage = {
  src: string;
  alt: string;
  project: string;
  category: string;
  view: "Exterior" | "Interior";
};

export const galleryImages: GalleryImage[] = projects.flatMap((project) =>
  project.images.map((image) => ({
    src: image.src,
    alt: image.alt,
    project: project.title,
    category: project.category,
    view: /interior|sala|comedor|cocina|dormitorio|ba[ñn]o|taller|nave|comensal|mesas/i.test(
      image.alt
    )
      ? ("Interior" as const)
      : ("Exterior" as const)
  }))
);
