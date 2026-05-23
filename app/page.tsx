"use client";

import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Section {
  id: string;
  title: string;
  content: string;
}

type Template = "academic";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Home() {
  // Document metadata
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [author, setAuthor] = useState("");
  const [professor, setProfessor] = useState("");
  const [course, setCourse] = useState("");
  const [institution, setInstitution] = useState("");
  const [program, setProgram] = useState("");
  const [documentType, setDocumentType] = useState("Documento Académico");
  const [date, setDate] = useState(
    new Date().toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  );
  const [references, setReferences] = useState("");

  // Sections
  const [sections, setSections] = useState<Section[]>([
    { id: uid(), title: "", content: "" },
  ]);

  // Template
  const [template] = useState<Template>("academic");

  // UI state
  const [loading, setLoading] = useState<"pdf" | "preview" | null>(null);
  const [error, setError] = useState<string | null>(null);

  // ─── Section helpers ───────────────────────────────────────────────────────

  function addSection() {
    setSections((s) => [...s, { id: uid(), title: "", content: "" }]);
  }

  function removeSection(id: string) {
    setSections((s) => s.filter((sec) => sec.id !== id));
  }

  function updateSection(id: string, field: "title" | "content", value: string) {
    setSections((s) =>
      s.map((sec) => (sec.id === id ? { ...sec, [field]: value } : sec))
    );
  }

  function moveSection(id: string, dir: -1 | 1) {
    setSections((s) => {
      const idx = s.findIndex((sec) => sec.id === id);
      if (idx < 0) return s;
      const next = idx + dir;
      if (next < 0 || next >= s.length) return s;
      const copy = [...s];
      [copy[idx], copy[next]] = [copy[next], copy[idx]];
      return copy;
    });
  }

  // ─── Payload builder ───────────────────────────────────────────────────────

  function buildPayload() {
    return {
      title,
      subtitle: subtitle || undefined,
      author: author || undefined,
      professor: professor || undefined,
      course: course || undefined,
      institution: institution || undefined,
      program: program || undefined,
      documentType: documentType || undefined,
      date,
      template,
      sections: sections.map(({ title, content }) => ({ title, content })),
      references: references
        ? references
            .split("\n")
            .map((r) => r.trim())
            .filter(Boolean)
        : undefined,
    };
  }

  // ─── Actions ───────────────────────────────────────────────────────────────

  async function handleGenerate() {
    if (!title.trim()) { setError("El título es requerido."); return; }
    if (sections.every((s) => !s.title.trim())) {
      setError("Agrega al menos una sección con título."); return;
    }
    setError(null);
    setLoading("pdf");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildPayload()),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? "Error al generar el PDF");
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      setError(String(e));
    } finally {
      setLoading(null);
    }
  }

  async function handlePreview() {
    if (!title.trim()) { setError("El título es requerido."); return; }
    setError(null);
    setLoading("preview");
    try {
      const res = await fetch("/api/preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildPayload()),
      });
      if (!res.ok) throw new Error("Error al generar la vista previa");
      const html = await res.text();
      const blob = new Blob([html], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
    } catch (e) {
      setError(String(e));
    } finally {
      setLoading(null);
    }
  }

  // ─── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* ── Top bar ── */}
      <header className="sticky top-0 z-20 bg-slate-900 border-b border-slate-800 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-md bg-blue-500 flex items-center justify-center">
            <svg viewBox="0 0 20 20" fill="white" className="w-4 h-4">
              <path d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"/>
            </svg>
          </div>
          <span className="text-white font-semibold tracking-tight text-base">Structura</span>
          <span className="text-slate-500 text-xs ml-1">Generador de documentos</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePreview}
            disabled={!!loading}
            className="px-3 py-1.5 text-sm rounded-md border border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors disabled:opacity-40 flex items-center gap-1.5"
          >
            {loading === "preview" ? (
              <Spinner />
            ) : (
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
              </svg>
            )}
            Vista previa HTML
          </button>
          <button
            onClick={handleGenerate}
            disabled={!!loading}
            className="px-4 py-1.5 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-500 transition-colors disabled:opacity-40 font-medium flex items-center gap-1.5"
          >
            {loading === "pdf" ? (
              <Spinner />
            ) : (
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd"/>
              </svg>
            )}
            {loading === "pdf" ? "Generando…" : "Generar PDF"}
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 pb-24">

        {/* ── Error banner ── */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm flex items-start gap-2">
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mt-0.5 flex-shrink-0 text-red-500">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
            </svg>
            <span>{error}</span>
            <button onClick={() => setError(null)} className="ml-auto text-red-400 hover:text-red-600">✕</button>
          </div>
        )}

        {/* ══ CARD: Document info ══ */}
        <Section title="Información del Documento" icon="📄">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Título *" className="sm:col-span-2">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ej: Ética y Legalidad de los Pagos de Facilitación"
                className={inputCls}
              />
            </Field>
            <Field label="Subtítulo">
              <input
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="Subtítulo opcional"
                className={inputCls}
              />
            </Field>
            <Field label="Tipo de documento">
              <input
                value={documentType}
                onChange={(e) => setDocumentType(e.target.value)}
                placeholder="Ej: Ensayo Académico, Informe, Tesis…"
                className={inputCls}
              />
            </Field>
          </div>
        </Section>

        {/* ══ CARD: Authors & course ══ */}
        <Section title="Autores y Curso" icon="🎓">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Autor / Alumno">
              <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Tu nombre" className={inputCls}/>
            </Field>
            <Field label="Profesor / Catedrático">
              <input value={professor} onChange={(e) => setProfessor(e.target.value)} placeholder="Nombre del profesor" className={inputCls}/>
            </Field>
            <Field label="Institución">
              <input value={institution} onChange={(e) => setInstitution(e.target.value)} placeholder="Universidad / Instituto" className={inputCls}/>
            </Field>
            <Field label="Programa académico">
              <input value={program} onChange={(e) => setProgram(e.target.value)} placeholder="Ej: MBA, Ingeniería de Sistemas…" className={inputCls}/>
            </Field>
            <Field label="Materia / Curso">
              <input value={course} onChange={(e) => setCourse(e.target.value)} placeholder="Ej: Negocios Internacionales" className={inputCls}/>
            </Field>
            <Field label="Fecha">
              <input value={date} onChange={(e) => setDate(e.target.value)} placeholder="Mayo 2026" className={inputCls}/>
            </Field>
          </div>
        </Section>

        {/* ══ CARD: Sections ══ */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-5">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="text-base">📝</span>
              <h2 className="font-semibold text-slate-800 text-sm">Secciones del Documento</h2>
              <span className="ml-1 bg-slate-100 text-slate-500 text-xs px-2 py-0.5 rounded-full font-medium">{sections.length}</span>
            </div>
            <button
              onClick={addSection}
              className="text-xs font-medium text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-md transition-colors flex items-center gap-1"
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd"/></svg>
              Añadir sección
            </button>
          </div>
          <div className="divide-y divide-slate-100">
            {sections.map((sec, idx) => (
              <div key={sec.id} className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-5 h-5 rounded bg-slate-800 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">{idx + 1}</span>
                  <input
                    value={sec.title}
                    onChange={(e) => updateSection(sec.id, "title", e.target.value)}
                    placeholder="Título de la sección…"
                    className="flex-1 text-sm font-semibold text-slate-800 border-0 outline-none bg-transparent placeholder:text-slate-400 placeholder:font-normal"
                  />
                  <div className="flex items-center gap-1 ml-auto">
                    <button onClick={() => moveSection(sec.id, -1)} disabled={idx === 0} title="Subir" className="p-1 text-slate-400 hover:text-slate-600 disabled:opacity-20 transition-colors">
                      <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd"/></svg>
                    </button>
                    <button onClick={() => moveSection(sec.id, 1)} disabled={idx === sections.length - 1} title="Bajar" className="p-1 text-slate-400 hover:text-slate-600 disabled:opacity-20 transition-colors">
                      <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
                    </button>
                    {sections.length > 1 && (
                      <button onClick={() => removeSection(sec.id)} title="Eliminar" className="p-1 text-slate-400 hover:text-red-500 transition-colors ml-1">
                        <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"/></svg>
                      </button>
                    )}
                  </div>
                </div>
                <textarea
                  value={sec.content}
                  onChange={(e) => updateSection(sec.id, "content", e.target.value)}
                  placeholder="Contenido de la sección. Puedes usar HTML básico: <p>, <strong>, <em>, <ul><li>…</li></ul>, <table>, etc."
                  rows={6}
                  className="w-full text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100 resize-y placeholder:text-slate-400 font-mono leading-relaxed"
                />
              </div>
            ))}
          </div>
        </div>

        {/* ══ CARD: References ══ */}
        <Section title="Referencias Bibliográficas" icon="📚">
          <p className="text-xs text-slate-500 mb-3">Una referencia por línea, en formato APA u otro estilo.</p>
          <textarea
            value={references}
            onChange={(e) => setReferences(e.target.value)}
            placeholder={"Hill, C. W. (2021). Negocios internacionales (13a ed.). McGraw-Hill.\nU.S. Department of Justice. (2023). Foreign Corrupt Practices Act Resource Guide."}
            rows={5}
            className={`${inputCls} font-mono text-xs leading-relaxed resize-y`}
          />
        </Section>

        {/* ══ Sticky bottom bar ══ */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-6 py-3 flex items-center justify-between z-10">
          <span className="text-xs text-slate-400">
            {sections.length} sección{sections.length !== 1 ? "es" : ""} · Template: <span className="font-medium text-slate-600 capitalize">{template}</span>
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePreview}
              disabled={!!loading}
              className="px-4 py-2 text-sm rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-40 flex items-center gap-2"
            >
              {loading === "preview" ? <Spinner /> : null}
              Vista previa
            </button>
            <button
              onClick={handleGenerate}
              disabled={!!loading}
              className="px-5 py-2 text-sm rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-500 shadow-sm transition-colors disabled:opacity-40 flex items-center gap-2"
            >
              {loading === "pdf" ? <Spinner /> : null}
              {loading === "pdf" ? "Generando PDF…" : "⬇ Generar PDF"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

// ─── Small shared components ───────────────────────────────────────────────────

const inputCls =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100 placeholder:text-slate-400 transition";

function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-5">
      <div className="flex items-center gap-2 px-5 py-4 border-b border-slate-100">
        <span className="text-base">{icon}</span>
        <h2 className="font-semibold text-slate-800 text-sm">{title}</h2>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
        {label}
      </label>
      {children}
    </div>
  );
}

function Spinner() {
  return (
    <svg className="animate-spin w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
    </svg>
  );
}
