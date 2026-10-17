# Portafolio web

Portafolio personal estático de Antonio Jose Lorenzo, construido con HTML, CSS y JavaScript.

## Idiomas

El botón `ES`/`EN` del encabezado cambia el idioma sin salir de la página. La elección se guarda en `localStorage` con la clave `portfolio-language` y se conserva al navegar por el sitio.

- `assets/js/language.js` contiene las traducciones y la lógica compartida. Para añadir o modificar texto, actualiza las entradas correspondientes en los objetos `en` y `es`.
- El perfil y las áreas profesionales animadas del encabezado también tienen textos de respaldo en `index.html` y `assets/js/script.js`; al editar `hero-intro` o `role-*`, mantén esos respaldos en inglés coherentes con ambas traducciones.
- Las fechas de educación y experiencia también usan claves `data-i18n`: para cambiarlas, actualiza la entrada de idioma inglés y español en `assets/js/language.js`. Cada empleo tiene una clave de fecha propia para que un puesto nuevo no herede ni sobrescriba las fechas de otro.
- En HTML, `data-i18n="clave"` traduce texto; `data-i18n-placeholder` y `data-i18n-aria` traducen placeholders y etiquetas accesibles.
- Para contenido que se dibuja desde JavaScript, escucha el evento `portfolio:languagechange` y vuelve a renderizarlo con `window.PortfolioLanguage.current` o `window.PortfolioLanguage.t(clave)`. La portada y la página de proyectos ya lo hacen para las tarjetas y estados vacíos.
- Las páginas de inicio, proyectos, experiencia y error deben cargar `assets/js/language.js` antes de su propio script y definir `data-title-key` en `<html>` para traducir el título de la pestaña.

## Currículum

El enlace de CV de la sección “Sobre mí” es único. `index.html` guarda ambas rutas en `data-resume-en` y `data-resume-es`; `assets/js/language.js` actualiza el destino según el idioma activo:

- Inglés: `experience/RESUMECV/ANTONIO_JOSE_LORENZO_CV.pdf`
- Español: `experience/RESUMECV/Antonio_jose_Lorenzo_Hoja_de_vida.pdf`

Al sustituir los archivos, conserva esos nombres o actualiza los atributos del enlace.

## Proyectos y experiencia

- Los proyectos se mantienen en `projects/projects.json`. Se pueden añadir `name_es` y `desc_es` a cada objeto para ofrecer textos en español; si faltan, se muestran los textos base. Cada tarjeta necesita un enlace `view` o `code` válido.
- `projects/script.js` redibuja las tarjetas al cambiar el idioma y mantiene el filtro elegido.
- La sección resumida de experiencia está en `index.html`; la vista completa, en `experience/index.html`. Mantén las tarjetas visibles en esta página para que “Ver toda la experiencia” no dependa de una animación de entrada.
- Las habilidades se cargan desde `skills.json`. El diseño usa una cuadrícula que calcula sus columnas por el ancho disponible y el contenedor crece según las filas necesarias. Si se agregan más de 12 habilidades, aparece automáticamente el control para verlas todas o mostrar menos.
- Las certificaciones destacadas se mantienen en `certifications.json`. Cada entrada requiere `name` e `issuer`; `date`, `url` y `previewUrl` son opcionales. Las tarjetas usan desplazamiento horizontal con flechas. El enlace “Ver todas las certificaciones” de `index.html` lleva a la carpeta pública de MEGA con la colección completa; actualiza su atributo `href` si cambia la ubicación. Las vistas previas se generan automáticamente para archivos MEGA y enlaces públicos de Credly. Coursera bloquea la inserción externa, así que se muestra una tarjeta informativa con el enlace original; para otros proveedores, usa `previewUrl` con una URL que permita incrustarse.
- Educación usa tarjetas compactas y adaptables para que puedan añadirse estudios sin que las imágenes ocupen toda la pantalla.

## Presentación y pruebas

- `assets/css/style.css` controla el selector, los colores originales del encabezado (incluido el texto introductorio negro y los roles animados en rojo oscuro) y el retrato circular de “Sobre mí”. Las páginas secundarias tienen sus estilos en sus respectivas carpetas y en `assets/css/404.css`.
- En móvil, ese CSS suaviza las tarjetas de experiencia y muestra la etiqueta del botón de envío del formulario; las tarjetas de escritorio y el resto de los estilos base se mantienen.
- Sirve la carpeta raíz con cualquier servidor HTTP estático para probar las rutas, los archivos PDF y la persistencia del idioma. Abrir los HTML directamente como archivos locales puede impedir algunas solicitudes `fetch`.
- Antes de integrar cambios, revisa `git diff --check` y prueba ambos idiomas en cada ruta.
