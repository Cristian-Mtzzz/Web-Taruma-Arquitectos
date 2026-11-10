export const site = {
  name: "Taruma Arquitectos",
  short: "Taruma",
  tagline: "Despacho de arquitectura, construcción y planificación urbana",
  founded: "2025",
  copyrightYear: 2026,
  city: "Tegucigalpa",
  country: "Honduras",
  phone: "+504 3298-1900",
  phoneHref: "+50432981900",
  whatsapp: "50432981900",
  email: "tarumadmn@gmail.com",
  hours: [
    { days: "Lunes a viernes", time: "8:00 — 17:00" },
    { days: "Sábado", time: "8:00 — 12:00" },
  ],
  social: {
    instagram: "https://www.instagram.com/taruma_arq/",
    facebook:
      "https://www.facebook.com/profile.php?id=61572001932615&locale=es_LA",
  },
  mapSrc:
    "https://maps.google.com/maps?q=Tegucigalpa&t=&z=13&ie=UTF8&iwloc=&output=embed",
} as const;

export const nav = [
  { href: "/nosotros", label: "Nosotros" },
  { href: "/servicios", label: "Servicios" },
  { href: "/procesos", label: "Procesos" },
  { href: "/portafolio", label: "Portafolio" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/galeria", label: "Galería" },
  { href: "/contacto", label: "Contacto" },
] as const;
