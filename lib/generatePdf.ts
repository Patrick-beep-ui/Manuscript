import Handlebars from "handlebars";
import fs from "fs";
import path from "path";

// Types

export interface DocumentSection {
  title: string;
  content: string; // HTML allowed
}

export interface DocumentData {
  title: string;
  subtitle?: string;
  author?: string;
  professor?: string;
  course?: string;
  institution?: string;
  program?: string;
  documentType?: string;
  date?: string;
  lang?: string;
  sections: DocumentSection[];
  references?: string[];
  template?: "academic";
}

// Handlebars helpers

Handlebars.registerHelper("addOne", (index: number) => index + 1);

// Template loader (cached)

const templateCache = new Map<string, HandlebarsTemplateDelegate>();

function loadTemplate(name: string): HandlebarsTemplateDelegate {
  // Skip cache in development so template edits are picked up instantly
  if (process.env.NODE_ENV !== "development" && templateCache.has(name)) {
    return templateCache.get(name)!;
  }
  const templatePath = path.join(process.cwd(), "templates", `${name}.html`);
  const source = fs.readFileSync(templatePath, "utf-8");
  const compiled = Handlebars.compile(source);
  templateCache.set(name, compiled);
  return compiled;
}

// HTML generation

export function generateHtml(data: DocumentData): string {
  const templateName = data.template ?? "academic";
  const template = loadTemplate(templateName);

  const context: DocumentData = {
    lang: "es",
    institution: "Universidad",
    program: "",
    documentType: "Documento Academico",
    date: new Date().toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    ...data,
  };

  return template(context);
}

// PDF generation

export async function generatePdf(data: DocumentData): Promise<Buffer> {
  const html = generateHtml(data);

  // Lazy-import so puppeteer only loads server-side
  const puppeteer = await import("puppeteer");

  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
      "--font-render-hinting=none",
    ],
  });

  try {
    const page = await browser.newPage();

    await page.setContent(html, {
      waitUntil: "load",
    });

    // Wait for web fonts to fully render
    await new Promise((r) => setTimeout(r, 1500));

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: "0", right: "0", bottom: "0", left: "0" },
    });

    return Buffer.from(pdf);
  } finally {
    await browser.close();
  }
}
