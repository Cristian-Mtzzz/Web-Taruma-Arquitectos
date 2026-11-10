# Notas técnicas

Decisiones de implementación y trampas encontradas durante el desarrollo.
Para la descripción del proyecto, ver el [README](../README.md).

---


Sitio del despacho construido con **Next.js 16** (App Router, TypeScript, CSS Modules).
Reúne los dos prototipos previos del repositorio: el contenido y las imágenes del
proyecto `taruma-arquitectos-main`, y la ambición visual del prototipo en HTML plano
de la raíz, con una dirección de arte nueva.

## Arrancar

```bash
npm install
npm run dev                  # http://localhost:3000
npm run build
npm run lint
```

## Configurar el envío de los formularios

Los formularios de **contacto** y **cotizaciones** envían por SMTP de Gmail a la
dirección de `CONTACT_TO`. Para activarlos:

1. En la cuenta de Google de `tarumadmn@gmail.com`, activar la **verificación en
   dos pasos** (sin ella Google no permite crear contraseñas de aplicación).
2. Generar una **contraseña de aplicación** en
   <https://myaccount.google.com/apppasswords>. Google la muestra en cuatro grupos
   de cuatro; hay que pegarla como **16 caracteres seguidos, sin espacios**.
3. Pegarla en `GMAIL_APP_PASSWORD`, dentro del archivo **`.env`**.
4. Comprobar que funciona antes de probar el sitio:

```bash
npm run verificar-correo
```

Ese comando conecta al SMTP, valida las credenciales y envía un correo de prueba.
Si algo falla, explica la causa probable en lugar de dar un error genérico.

Mientras no haya credenciales, los formularios no se rompen: validan igual y
muestran un aviso pidiendo escribir directamente al correo del despacho.

> **Las credenciales van en claro, en `.env`, y ese archivo SÍ se versiona.**
> Es una decisión consciente del proyecto para no tener que gestionar secretos.
> El `.gitignore` lleva una excepción (`!.env`) justo para eso, y no se usa
> `.env.local`.
>
> La contrapartida: una contraseña de aplicación de Gmail da acceso completo por
> SMTP e IMAP a la cuenta. Si este repositorio se publica en GitHub, hay que
> revocarla en <https://myaccount.google.com/apppasswords> y generar otra. Para
> volver al modelo con secretos basta con quitar `!.env` del `.gitignore` y
> mover los valores a `.env.local`, sin tocar código: `app/actions/email.ts` lee
> de `process.env` en cualquiera de los dos casos.

En desarrollo, `next dev` vigila el archivo y lo recarga solo al guardarlo (lo
dice en su salida: `Reload env: .env`). En producción, en cambio, las variables
se leen al arrancar el proceso, así que ahí sí hay que reiniciarlo.

> El envío usa Server Actions, así que el sitio necesita un **entorno con Node**
> (Vercel, VPS, contenedor). No funciona como exportación estática a hosting de
> solo archivos.

## Dirección de diseño

Concepto: **la hoja de planos**. El lenguaje visual viene del oficio —cianotipo,
hormigón, retícula estructural, cuadro de rotulación— y no de la estética de
estudio boutique.

**Color** (tokens en `app/globals.css`):

| Token              | Valor     | Uso                                        |
| ------------------ | --------- | ------------------------------------------ |
| `--blueprint`      | `#0B2B3C` | Azul tinta de plano, fondo dominante       |
| `--blueprint-deep` | `#061A25` | Pie de página y velos sobre imagen         |
| `--vellum`         | `#EDEEEA` | Papel de dibujo frío (no crema)            |
| `--concrete`       | `#C7C9C4` | Hormigón, fondo de imágenes                |
| `--graphite`       | `#3A3F41` | Texto sobre fondo claro                    |
| `--accent`         | `#3E96C0` | Estructura: reglas, estados activos, foco, subrayados |
| `--accent-lift`    | `#4FA8CF` | Relleno de la CTA **sobre fondo oscuro**, con texto azul profundo |
| `--accent-ink`     | `#1F5F80` | Relleno de la CTA **sobre fondo claro**, con texto blanco |

El acento tiene **tres tonos del mismo matiz** y no se pueden fusionar, porque
cada uno cumple un requisito de contraste distinto:

- `--accent` es el único que sirve sobre claro y oscuro a la vez (3.3:1 contra
  blanco, 4.4:1 contra `--blueprint`), por eso lleva las reglas y el indicador
  de foco. Aclararlo rompería el foco sobre fondo claro.
- `--accent-lift` solo existe para el relleno de la CTA sobre fondo oscuro:
  5.5:1 contra la banda y 6.3:1 con la etiqueta en `--blueprint-deep`. **El texto
  encima va oscuro, nunca blanco** — en blanco daría 2.7:1.
- `--accent-ink` es el relleno de la CTA sobre fondo claro, con texto blanco a 7:1.

La regla de fondo: sobre fondo oscuro la CTA se **aclara** y el texto se
oscurece; sobre fondo claro, lo contrario. Eso lo gobierna la clase
**`.on-dark`**, que marca los contextos oscuros que no son bandas (el héroe y la
navegación). Si se añade una sección oscura nueva hay que ponerle `.band-dark`,
`.band-deep` o `.on-dark`, o los botones quedarán con texto grafito ilegible.

Ningún botón usa relleno blanco o de papel: el único blanco de la interfaz es el
fondo de las secciones claras.

**Tipografía**: una sola familia, **Archivo** variable, usando el eje de ancho
(`wdth`) como elemento de diseño activo. El eje real va de 62 a 125, de ahí los
tokens `--w-normal: 100`, `--w-wide: 116`, `--w-xwide: 125` — no subirlos de 125,
el navegador recorta al máximo del eje.

### Superficie de los controles

El radio va **solo en lo que se toca**: botones, campos, fichas de opción,
chips, botones de icono. La estructura —bandas, láminas, imágenes, cuadro de
rotulación, pestañas de la galería— se queda en 0. Así el radio significa "esto
es interactivo" en lugar de ser un acabado uniforme. Un solo token:
`--radius-control: 4px`.

Las sombras van **teñidas de azul tinta** (`rgba(6,26,37,…)`), no de gris
neutro, que sobre esta paleta se ve sucio. Van en capas (contacto + ambiente)
en lugar de un borrón difuso.

La **elevación codifica jerarquía**, no decora:

| Elemento                     | Reposo        | Encima              | Pulsado  |
| ---------------------------- | ------------- | ------------------- | -------- |
| Botón relleno (primario)     | elevado       | más elevado, sube 1px | hundido |
| Botón de contorno (secundario) | plano       | gana relleno y cuerpo | hundido |
| Campo de formulario          | hundido       | borde más marcado   | anillo de foco |
| Opción o chip seleccionado   | hundido       | sin cambio          | —        |

Un campo va hundido y un botón sobresale, al revés el uno del otro: uno recibe
y el otro se acciona.

Los contextos oscuros redefinen las variables `--ctx-lift`, `--ctx-lift-hover`
y `--ctx-edge` en lugar de duplicar selectores, porque sobre fondo oscuro una
sombra azul no se ve y hace falta negro con más borde superior. Eso evita
peleas de especificidad: los botones consumen las variables y se adaptan solos.

**Importante**: los rellenos usan `background-color` y `background-image` por
separado, nunca el atajo `background`. El atajo borraría el degradado de
superficie cuando una regla de contexto cambia el color.

La regla de `:active` va **después** de todos los `:hover`: al hacer clic el
cursor también está encima, y con igual especificidad gana la última regla.

### Movimiento

Un momento orquestado en el héroe de la portada, el revelado al hacer scroll, y
el movimiento que responde a una acción (menú, visor, filtros, botones, wizard).

El **revelado al hacer scroll es solo CSS**, con una línea de tiempo de scroll
(`animation-timeline: view()`). No hay observador ni componente de JavaScript.

Esa decisión es deliberada y vino de dos errores reales. Una primera versión
usaba un IntersectionObserver que añadía clases y estilos a los bloques: eso es
mutar DOM que React controla desde fuera de React, y provocaba errores de
hidratación, porque al hidratar encontraba atributos que el servidor nunca
emitió. Antes de eso, el mismo componente dejaba las páginas en blanco al
navegar con `<Link>`, porque vivía en el layout raíz y su efecto corría una sola
vez. Con CSS puro ninguno de los dos problemas puede volver a ocurrir.

Qué cubre:

- `.band .shell > *` en `globals.css`, con escalonado por `nth-child`.
- `.tile` en `GalleryBrowser.module.css`. Al no depender de JavaScript, las
  fichas que aparecen al cambiar de filtro se animan solas.

Quedan fuera a propósito el héroe y los encabezados de página: ya están en
pantalla al cargar y el titular tiene que leerse de inmediato.

Dos detalles de implementación que conviene no tocar a ciegas:

- El rango termina en `cover` y no en `entry`. Un bloque más alto que la ventana
  nunca llega a "entrar del todo", así que con `entry 100%` se quedaría a medio
  animar.
- Todo va dentro de `@supports (animation-timeline: view())` y
  `@media (prefers-reduced-motion: no-preference)`. Si el navegador no lo
  soporta o el sistema pide menos movimiento, no se aplica nada: el contenido se
  ve normal, sin animación y sin riesgo de quedarse invisible.

Inventario del movimiento:

| Qué | Dónde | Cómo |
| --- | --- | --- |
| Secuencia de carga del héroe | `home.module.css` | Animaciones de tiempo escalonadas |
| Acercamiento lento de la imagen del héroe | `home.module.css` | `--heroZoom`, por tiempo |
| Desplazamiento diferencial del héroe | `home.module.css` | `--heroY`, por scroll |
| Entrada de bloques | `globals.css` | `animation-timeline: view()` |
| Entrada lateral en dos columnas | `globals.css`, clase `split-reveal` | Solo a partir de 1001px |
| Trazado de la regla de acento | `globals.css` | Anima el ancho al entrar |
| Entrada de fichas de galería | `GalleryBrowser.module.css` | Por scroll |
| Barra que se esconde al bajar | `SiteNav.tsx` | Estado de React |
| Marquesina de especialidades | `home.module.css` | Bucle por tiempo |

La imagen del héroe lleva **dos animaciones a la vez**, una por tiempo y otra
por scroll. No pueden animar las dos `transform`, porque la segunda ganaría:
cada una mueve su propia propiedad registrada con `@property` (`--heroY`,
`--heroZoom`) y el `transform` las compone. Si añades una tercera, sigue ese
mismo patrón.

> **Compatibilidad**: las animaciones guiadas por scroll funcionan en Chrome y
> Edge 115+, Safari 26+ y Firefox 144+. En navegadores anteriores el sitio se ve
> igual pero sin esta animación. Es una mejora progresiva, no un requisito.

### Responsivo

Puntos de corte, de mayor a menor:

| Ancho | Qué cambia |
| --- | --- |
| 1080px | El menú pasa a hamburguesa y panel a pantalla completa |
| 1000px | Las dos columnas se apilan; galería a 2 columnas; retícula de obra a 2 |
| 900px | El wizard de cotización pierde su barra lateral fija |
| 760px | El cuadro de rotulación pasa de 4 celdas a 2 |
| 620px | Casi todas las retículas pasan a una columna; galería a 1 columna |
| 480px | Se aprietan `--gutter` y `--band`, baja la escala tipográfica y las acciones ocupan todo el ancho |
| 420px | Filas de resumen y horarios permiten salto de línea |
| alto ≤ 560px | El menú móvil pasa a dos columnas (teléfono en horizontal) |

**Pantalla baja**: en horizontal un teléfono deja unos 390px de alto, y el menú
en una columna solo mostraba cuatro enlaces. Por eso el corte por `max-height`,
que es por altura y no por ancho.

**Áreas seguras**: `.shell`, el panel móvil y el pie usan
`max(<valor>, env(safe-area-inset-*))`, para que el notch en horizontal y la
barra de gestos no se coman contenido. Donde no hay notch, `env()` vale 0 y
manda el valor normal.

**Altura del héroe**: usa `svh` con `vh` de respaldo en la línea anterior. Con
`vh`, al aparecer o esconderse la barra de direcciones del móvil, el héroe
pegaba un salto de alto.

Además, `@media (pointer: coarse)` sube a 44–48px la altura de botones, chips,
filtros y campos, que con el puntero del ratón se quedaban por debajo del
mínimo cómodo para el dedo.

El `body` lleva `overflow-x: hidden` como red de seguridad, pero no debería
hacer falta: si aparece desplazamiento horizontal, es un síntoma, no algo que
tapar. Al medirlo hay que desactivarlo primero, o recorta el desborde y da un
falso correcto.

La marca de la barra usa `clamp()` en lugar de un punto de corte:
`.brand` no puede encogerse, así que a 390px empujaba el botón de menú fuera de
pantalla. Si se alarga el nombre del estudio, hay que revisar ese `clamp`.

> **Cuidado con la especificidad entre globals y módulos.** Un botón que lleva
> a la vez la clase global `.btn` y una de módulo tiene **empate de
> especificidad** (0,1,0), y entonces decide el orden de carga, que gana
> `globals.css`. Por eso ocultar el CTA en móvil necesita `.nav .cta` y no solo
> `.cta`: con `.cta` el botón seguía visible y se desbordaba. Si algún día otra
> regla de módulo "no hace nada", mira esto antes que nada.

## Estructura

```
app/
  globals.css          Tokens y primitivas (.shell, .band, .btn, .titleblock, .display…)
  shared.module.css    Patrones de las páginas interiores (retículas, fichas, pasos)
  home.module.css      Solo la portada
  actions/email.ts     Server Actions que envían los formularios por SMTP
  page.tsx             Portada
  nosotros/ servicios/ procesos/ portafolio/
  proyectos/ galeria/ contacto/ cotizaciones/
components/
  SiteNav / SiteFooter / PageHeader
  Lightbox             Visor reutilizable (teclado, foco, Escape, flechas)
  GalleryBrowser       Masonry + filtros por categoría y por tipo de espacio
  PortfolioGrid        Índice de proyectos filtrable
  ProjectShowcase      Ficha de proyecto con tira de imágenes
  ContactForm / QuoteWizard / Faq
  Form.module.css      Estilos de formulario compartidos
data/
  site.ts        Datos del despacho y navegación
  studio.ts      Historia, misión, valores, equipo, servicios, procesos
  work.ts        18 proyectos y la galería derivada de ellos
  editorial.ts   Preguntas frecuentes y opciones de los formularios
scripts/
  verificar-correo.mjs Comprueba las credenciales de Gmail
public/img/      96 imágenes con nombres normalizados (sin espacios ni acentos)
```

Todo el texto y las imágenes salen de `data/`, así que el contenido se edita sin
tocar los componentes.

## Antispam y pendientes

Ambos formularios llevan un campo señuelo invisible: si viene relleno, la
solicitud se descarta en silencio. No hay límite de frecuencia por IP; si llega
correo basura, conviene añadir uno (Upstash Ratelimit o similar) o un captcha.

El wizard de cotizaciones todavía no permite adjuntar fotos del terreno; eso
requiere almacenamiento de archivos.
