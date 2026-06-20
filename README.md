# Manuscript — Generador de Documentos Académicos

**Manuscript** es una aplicación web para redactar y generar documentos académicos y profesionales en formato PDF. Proporciona un editor estructurado por secciones, bloques de contenido y referencias bibliográficas en formato APA, y renderiza un PDF de alta calidad mediante Puppeteer.

## Funcionalidades

- **Editor estructurado**: Crea documentos con secciones que contienen párrafos, subtítulos, listas, tablas y citas
- **Referencias APA**: Añade referencias de libros, artículos de revista o sitios web con formato APA 7.ª edición
- **Vista previa HTML**: Visualiza el documento antes de generar el PDF
- **Exportación PDF**: Genera PDFs tamaño A4 listos para imprimir con portada profesional
- **Plantilla premium**: Tipografía Playfair Display + Source Sans 3, diseño con acento azul

## Tecnologías

- [Next.js](https://nextjs.org/) 16 (App Router)
- [React](https://react.dev/) 19
- [Tailwind CSS](https://tailwindcss.com/) v4
- [Handlebars](https://handlebarsjs.com/) para plantillas HTML
- [Puppeteer](https://pptr.dev/) para generación de PDF

## Primeros pasos

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador. Completa los metadatos del documento, añade secciones y bloques de contenido, opcionalmente agrega referencias y haz clic en **Generar PDF** para descargar.

## Estructura del proyecto

- `app/` — Páginas y componentes de Next.js App Router
  - `components/` — Componentes React para la interfaz del editor
  - `lib/` — Utilidades de renderizado (bloques, APA, escape HTML)
  - `types/` — Definiciones de tipos TypeScript (bloques, documento, referencias)
  - `api/` — Rutas de API para generación de PDF y vista previa
- `lib/` — Lógica del lado servidor para generación de PDF
- `templates/` — Plantillas HTML Handlebars
