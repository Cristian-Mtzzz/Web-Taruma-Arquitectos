# Taruma Arquitectos — Portal Web

## Descripción general

Este repositorio contiene el portal web de Taruma Arquitectos, un despacho de
arquitectura, construcción y planificación urbana con sede en Tegucigalpa,
Honduras.

El objetivo del sitio es dar al estudio una presencia digital clara y
profesional: mostrar su obra construida, explicar cómo trabaja y abrir un canal
directo para que un cliente potencial pida una cotización sin tener que llamar
ni escribir un correo desde cero.

El portal centraliza la información institucional del despacho y destaca su
enfoque en diseño arquitectónico, urbanismo y proyectos integrales, con una
propuesta que combina funcionalidad, estética y sostenibilidad.

## Objetivo del portal

- Comunicar la identidad y la propuesta de valor de Taruma Arquitectos.
- Presentar servicios, procesos, portafolio y proyectos de forma estructurada.
- Mostrar la obra construida con calidad de imagen suficiente para que hable
  por sí sola.
- Habilitar canales de contacto y de solicitud de cotizaciones que lleguen
  directamente al correo del despacho.

## Secciones del sitio

| Sección | Qué contiene |
| --- | --- |
| Inicio | Presentación del estudio, obra destacada y accesos principales |
| Nosotros | Historia, misión, visión, valores, equipo y filosofía de trabajo |
| Servicios | Los seis frentes de trabajo y las tres formas de contratarlos |
| Procesos | Las cuatro etapas de un proyecto, con entregables y plazos |
| Portafolio | Índice completo de proyectos, filtrable por categoría |
| Proyectos | Fichas detalladas de las obras más representativas |
| Galería | Todas las imágenes de obra, filtrables por tipo de espacio |
| Contacto | Datos del estudio, formulario, ubicación y preguntas frecuentes |
| Cotizaciones | Formulario en tres pasos para solicitar una propuesta |

## Cómo está organizado

```
taruma/
├── app/              Una carpeta por sección del sitio
│   ├── page.tsx      Página de inicio
│   ├── actions/      Envío de los formularios por correo
│   ├── globals.css   Estilos base y comunes a todo el sitio
│   └── nosotros/ servicios/ procesos/ portafolio/
│       proyectos/ galeria/ contacto/ cotizaciones/
├── components/       Piezas reutilizables: navegación, pie de página,
│                     visor de imágenes, filtros, formularios
├── data/             TODO el contenido del sitio: textos, proyectos,
│                     imágenes, servicios, datos de contacto
├── public/img/       Las imágenes de obra del despacho
├── scripts/          Utilidades de mantenimiento
└── docs/             Notas técnicas del desarrollo
```

## Cómo funciona

**El contenido está separado del código.** Todos los textos, proyectos,
servicios y datos de contacto viven en la carpeta `data/`. Para cambiar un
teléfono, añadir un proyecto o corregir una descripción no hace falta tocar el
diseño ni las páginas: se edita el archivo de datos correspondiente y el cambio
aparece en todas las secciones donde se use.

**La galería se genera sola.** No hay una lista de imágenes aparte: la galería
se construye a partir de los proyectos, así que al añadir un proyecto con sus
fotos, estas aparecen automáticamente en la galería y en los contadores del
sitio, ya clasificadas por categoría y por tipo de espacio.

**Los formularios llegan al correo del estudio.** Tanto el formulario de
contacto como el de cotización envían la solicitud directamente a la dirección
configurada, con los datos ordenados en una tabla legible. El de cotización va
en tres pasos para no abrumar al visitante y recoge el alcance, el presupuesto
aproximado y la forma de contacto.

**El sitio se adapta al teléfono.** Está pensado para leerse igual de bien en
pantalla grande y en móvil, incluso en horizontal, y respeta la preferencia del
sistema de reducir animaciones.

## Puesta en marcha

Requiere Node.js 18 o superior.

```bash
cd taruma
npm install     # instala las dependencias
npm run dev     # levanta el sitio en http://localhost:3000
npm run build   # genera la versión de producción
```

Las credenciales del correo están en `taruma/.env`. Para comprobar que el
envío funciona antes de probar los formularios:

```bash
cd taruma
npm run verificar-correo
```

## Publicación

El envío de formularios se ejecuta en el servidor, así que el sitio necesita un
entorno con Node.js (Vercel, un VPS o un contenedor). No funciona subiéndolo
como archivos sueltos a un hosting estático.

---

Los detalles de implementación —sistema de diseño, animaciones, decisiones de
accesibilidad y problemas resueltos— están en
[taruma/docs/notas-tecnicas.md](taruma/docs/notas-tecnicas.md).
