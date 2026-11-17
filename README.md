# Edgar Josué Jurado · Portfolio

Portafolio Full Stack construido con **React 19 + Vite**, con una identidad visual oscura, tipografía editorial, acentos azul/violeta y componentes responsive. Contenido en español e inglés, diseñado para presentar proyectos y experiencia de forma clara ante equipos técnicos y reclutadores.

## Inicio rápido

Requiere **Node.js 22.12+** (o 20.19+) y npm.

```bash
npm ci
npm run dev
```

Abre la URL que muestra Vite (por defecto `http://localhost:5173`).

## Comandos

| Comando | Función |
| --- | --- |
| `npm run dev` | Desarrollo con recarga en caliente |
| `npm run build` | Compilación optimizada en `dist/` |
| `npm run preview` | Previsualización local del build |
| `npm run lint` | ESLint, reglas React y Hooks |
| `npm test` | Pruebas de validación del formulario |
| `npx playwright test` | Pruebas de interacción desktop y mobile sobre el build de producción |

Antes de la primera ejecución de Playwright, instala Chromium con `npx playwright install chromium` y compila con `npm run build`. Las pruebas E2E usan la configuración pública vacía; ejecútalas sin `.env.local` con canales de entrega reales. No envían mensajes reales en la configuración predeterminada. Si ya tienes Microsoft Edge instalado, puedes usarlo en PowerShell con `$env:PLAYWRIGHT_CHANNEL='msedge'` antes de ejecutar los tests.

## Arquitectura

```text
public/                       # Favicon, reglas de hosting, CV/foto propios
src/
  assets/                     # Recursos importables
  components/
    Layout.jsx                # Header, footer, redes y efectos globales
    UI.jsx                    # Reveal, encabezados, enlaces y previews
  pages/
    Home.jsx                  # Composición del inicio
    ProjectDetail.jsx         # Detalles por slug, carga diferida
    NotFound.jsx              # Estado 404
  sections/
    Hero.jsx                  # Presentación, typing y tarjeta de código
    Projects.jsx              # Proyectos y filtros animados
    About.jsx                 # Perfil y trayectoria
    Stack.jsx                 # Tecnologías por categoría
    Experience.jsx            # Contadores, timeline, certificaciones y blog
    Github.jsx                # API pública, repositorios y actividad
    Contact.jsx               # Formulario accesible y validado
  hooks/usePreferences.jsx    # Idioma y tema persistentes
  services/api.js             # Axios: GitHub y envío de contacto
  utils/
    content.js                # Fuente de contenido editable
    validation.js             # Validación independiente de la UI
    validation.test.js         # Casos de validación
  App.jsx                     # Router, metadatos y navegación por anclas
  main.jsx                    # Providers y arranque
  styles.css                  # Tokens, componentes y media queries
tests/portfolio.spec.js        # Pruebas E2E
```

## Personalización antes de publicar

Crea `.env.local` a partir de `.env.example` y completa únicamente tus valores reales:

```dotenv
VITE_GITHUB_USERNAME=tu-usuario
VITE_LINKEDIN_URL=https://www.linkedin.com/in/tu-perfil/
VITE_CONTACT_EMAIL=tu@dominio.com
VITE_WHATSAPP_NUMBER=591XXXXXXXX
VITE_CONTACT_ENDPOINT=https://formspree.io/f/TU_ID
VITE_CV_URL=/cv.pdf
```

**Las variables `VITE_*` son públicas. Nunca pongas tokens, contraseñas ni claves privadas.** Después de cambiar variables, reinicia Vite o genera un nuevo build.

### Identidad y contenido

- Edita `src/utils/content.js` para cambiar el perfil, proyectos, enlaces, certificaciones, artículos y métricas.
- Los textos del contenido se guardan como `[español, inglés]`. Los textos de interfaz usan `t(es, en)` desde `usePreferences`.
- Las tarjetas usan imágenes conceptuales de dashboards creadas con CSS. Las cifras dentro de esas ilustraciones son datos de maqueta, no resultados del proyecto. Sustitúyelas por capturas autorizadas reales cuando estén disponibles.
- La foto usa un placeholder de iniciales. Para añadir tu fotografía, guarda `public/profile.webp` y sustituye los bloques `profile-placeholder` y `portrait-art` por una imagen con `alt`, dimensiones explícitas y `object-fit: cover`.
- Añade tu CV real a `public/cv.pdf` y define `VITE_CV_URL=/cv.pdf`. Hasta entonces se muestra **Solicitar CV** y dirige al contacto.
- En cada proyecto, configura `github` y `demo` con URLs HTTPS. Sin enlaces, la UI indica que todavía no están publicados.
- El stack del proyecto de tutorías es el proporcionado. Inventario y administración muestran etiquetas funcionales porque sus tecnologías específicas no se proporcionaron; reemplaza `stack` con las tecnologías verificadas.
- Los niveles del stack son orientativos («En práctica»), no porcentajes inventados. Personalízalos tras una autoevaluación.
- Las horas y commits son `null`, mostrados como «—». Añade métricas verificadas en `metrics`. El contador de tecnologías refleja las 16 herramientas listadas, no una evaluación de dominio.
- La experiencia describe áreas de práctica, sin inventar empresas, fechas ni años de antigüedad.

### Certificaciones y blog

Los arrays `certificates` y `posts` están vacíos y tienen estados «próximamente». Al añadir entradas se convierten automáticamente en listas enlazadas:

```js
export const certificates = [
  { title: ['Título real', 'Actual title'], issuer: 'Entidad', date: '2026', url: 'https://URL-verificable' },
];
export const posts = [
  { title: ['Título', 'Title'], excerpt: ['Resumen', 'Summary'], date: '2026-09-22', url: 'https://URL-del-articulo' },
];
```

## Formulario de contacto

1. Crea un formulario en [Formspree](https://formspree.io/) y verifica el correo destinatario.
2. Copia su endpoint público a `VITE_CONTACT_ENDPOINT`.
3. Configura protección antispam y dominios permitidos en el proveedor.
4. Despliega y realiza un envío real de prueba.

El formulario valida nombre, email, asunto y mensaje, limita longitudes, enfoca el primer campo inválido y muestra estados de carga, éxito y error. Usa un campo trampa antispam (`_gotcha`). El servicio de destino debe volver a validar en servidor y controlar abuso; el frontend no sustituye estas medidas.

Si sólo configuras `VITE_CONTACT_EMAIL`, el formulario abre el cliente de correo con el mensaje preparado y lo comunica sin afirmar que se haya enviado. Si no configuras ningún canal, informa que el envío no está disponible. **No hay entrega de correo sin un proveedor o correo configurado.**

## Integración GitHub

Consulta `/users/:username`, los seis repositorios propios actualizados más recientemente y hasta 30 eventos públicos. Muestra repositorios, lenguajes principales, estrellas y eventos push con enlaces a los commits del repositorio.

- No requiere un token de GitHub en el navegador.
- Incluye cancelación de solicitudes al desmontar y estados de carga, error, perfil sin datos y límite de consultas.
- La API sin autenticar normalmente permite 60 consultas/hora/IP; cada carga utiliza tres solicitudes (React StrictMode puede duplicar el ciclo de efectos en desarrollo).
- Los eventos públicos son una ventana limitada de actividad, **no un total histórico de commits ni un calendario de contribuciones**.
- Nunca se muestran repositorios o actividad ficticia si falta el usuario.

## Diseño, accesibilidad y rendimiento

- Tema oscuro predeterminado y claro opcional mediante tokens CSS; preferencias guardadas en `localStorage` con manejo de acceso restringido.
- Navegación semántica, enlace para saltar al contenido, foco visible, errores asociados a campos, regiones de estado y menú móvil con Escape.
- Breakpoints para móvil, tablet y desktop; objetivo mínimo 320 px.
- Framer Motion para apariciones y filtros; animaciones CSS para typing, partículas y fondo.
- Respeta `prefers-reduced-motion`, tanto en Motion como CSS; cursor luminoso sólo con puntero preciso.
- Detalles y 404 con carga diferida. Iconos importados individualmente y previews ligeros sin imágenes externas pesadas.
- Fuentes de Google Fonts con `display=swap` y fallback local. Puedes autoalojarlas si necesitas eliminar esa solicitud externa.
- SEO inicial con título, descripción, Open Graph, idioma y robots. Las rutas actualizan título y descripción en el cliente. Para indexación avanzada y previews sociales independientes por proyecto, añade prerenderizado/SSR y metadatos por URL.
- Tras elegir dominio, añade canonical, `og:url`, una imagen social real, sitemap y la referencia al sitemap en `robots.txt`.

## Despliegue

### Vercel

1. Sube el proyecto a tu repositorio.
2. Importa el repositorio en Vercel y elige el preset **Vite**.
3. Build: `npm run build`. Carpeta de salida: `dist`.
4. Define las variables de entorno en el panel y despliega.

`vercel.json` incluye la reescritura de rutas SPA para abrir directamente `/proyectos/tutorias`.

### Netlify

1. Conecta el repositorio.
2. Build: `npm run build`. Publish directory: `dist`.
3. Configura variables de entorno y despliega.

Vite copia `public/_redirects` al build, habilitando las rutas React Router.

### Hosting estático / Nginx

Publica el contenido de `dist/` y configura el fallback:

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

El proyecto asume publicación en la raíz del dominio. Para un subdirectorio, configura `base` de Vite, `basename` de React Router y las rutas de assets.

## Comprobación de lanzamiento

```bash
npm run lint
npm test
npm run build
npx playwright test
```

Completa enlaces y CV, verifica el envío real con el proveedor elegido y revisa los textos y capturas de cada proyecto. Los tests verifican renderizado, ausencia de overflow, filtros, rutas, preferencias, validación, navegación móvil y estados honestos del formulario; no sustituyen una revisión manual de accesibilidad ni una medición Lighthouse en el dominio publicado.
