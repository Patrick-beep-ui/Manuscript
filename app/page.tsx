"use client";

import { useState } from "react";
import type { Section, Template } from "./types/document";
import type { ContentBlock } from "./types/blocks";
import type { Reference } from "./types/reference";
import { uid } from "./lib/uid";
import { renderBlock } from "./lib/renderers/renderBlock";
import { renderAPA }   from "./lib/renderers/renderAPA";
import { DocumentInfo }  from "./components/DocumentInfo";
import { CourseDetails } from "./components/CourseDetails";
import { SectionsEditor } from "./components/SectionsEditor";
import { References }    from "./components/references/References";
import { Spinner }       from "./components/shared/Spinner";

function defaultSection(): Section {
  return { id: uid(), title: "", blocks: [{ id: uid(), type: "paragraph", text: "" }] };
}

export default function Home() {
  const [title,        setTitle]        = useState("");
  const [subtitle,     setSubtitle]     = useState("");
  const [author,       setAuthor]       = useState("");
  const [professor,    setProfessor]    = useState("");
  const [course,       setCourse]       = useState("");
  const [institution,  setInstitution]  = useState("");
  const [program,      setProgram]      = useState("");
  const [documentType, setDocumentType] = useState("Documento Académico");
  const [date,         setDate]         = useState(
    new Date().toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })
  );
  const [references, setReferences] = useState<Reference[]>([]);
  const [sections,   setSections]   = useState<Section[]>([defaultSection()]);
  const [template]                  = useState<Template>("academic");
  const [loading,    setLoading]    = useState<"pdf" | "preview" | null>(null);
  const [error,      setError]      = useState<string | null>(null);

  // ─── Section handlers ────────────────────────────────────────────────────────

  function addSection() {
    setSections((s) => [...s, defaultSection()]);
  }

  function removeSection(id: string) {
    setSections((s) => s.filter((sec) => sec.id !== id));
  }

  function updateSectionTitle(id: string, title: string) {
    setSections((s) => s.map((sec) => (sec.id === id ? { ...sec, title } : sec)));
  }

  function updateSectionBlocks(id: string, blocks: ContentBlock[]) {
    setSections((s) => s.map((sec) => (sec.id === id ? { ...sec, blocks } : sec)));
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

  // ─── Reference handlers ──────────────────────────────────────────────────────

  function addReference(ref: Reference) {
    setReferences((r) => [...r, ref]);
  }

  function removeReference(id: string) {
    setReferences((r) => r.filter((ref) => ref.id !== id));
  }

  function updateReference(ref: Reference) {
    setReferences((r) => r.map((existing) => (existing.id === ref.id ? ref : existing)));
  }

  // ─── Payload ─────────────────────────────────────────────────────────────────

  function buildPayload() {
    return {
      title,
      subtitle:     subtitle     || undefined,
      author:       author       || undefined,
      professor:    professor    || undefined,
      course:       course       || undefined,
      institution:  institution  || undefined,
      program:      program      || undefined,
      documentType: documentType || undefined,
      date,
      template,
      sections: sections.map(({ title, blocks }) => ({
        title,
        content: blocks.map(renderBlock).filter(Boolean).join("\n"),
      })),
      references: references.length > 0 ? references.map(renderAPA) : undefined,
    };
  }

  // ─── Actions ─────────────────────────────────────────────────────────────────

  async function handleGenerate() {
    if (!title.trim()) { setError("El título es requerido."); return; }
    if (sections.every((s) => !s.title.trim())) { setError("Agrega al menos una sección con título."); return; }
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

  // ─── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <header className="sticky top-0 z-20 bg-slate-900 border-b border-slate-800 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-md bg-blue-500 flex items-center justify-center">
            <svg viewBox="0 0 20 20" fill="white" className="w-4 h-4">
              <path d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
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
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
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
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            )}
            {loading === "pdf" ? "Generando…" : "Generar PDF"}
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 pb-24">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm flex items-start gap-2">
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mt-0.5 flex-shrink-0 text-red-500">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span>{error}</span>
            <button onClick={() => setError(null)} className="ml-auto text-red-400 hover:text-red-600">✕</button>
          </div>
        )}

        <DocumentInfo
          title={title}
          subtitle={subtitle}
          documentType={documentType}
          onTitleChange={setTitle}
          onSubtitleChange={setSubtitle}
          onDocumentTypeChange={setDocumentType}
        />

        <CourseDetails
          author={author}
          professor={professor}
          institution={institution}
          program={program}
          course={course}
          date={date}
          onAuthorChange={setAuthor}
          onProfessorChange={setProfessor}
          onInstitutionChange={setInstitution}
          onProgramChange={setProgram}
          onCourseChange={setCourse}
          onDateChange={setDate}
        />

        <SectionsEditor
          sections={sections}
          onAdd={addSection}
          onRemove={removeSection}
          onTitleChange={updateSectionTitle}
          onBlocksChange={updateSectionBlocks}
          onMove={moveSection}
        />

        <References
          references={references}
          onAdd={addReference}
          onRemove={removeReference}
          onUpdate={updateReference}
        />

        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-6 py-3 flex items-center justify-between z-10">
          <span className="text-xs text-slate-400">
            {sections.length} sección{sections.length !== 1 ? "es" : ""}
            {references.length > 0 && ` · ${references.length} referencia${references.length !== 1 ? "s" : ""}`}
            {" · "}Template: <span className="font-medium text-slate-600 capitalize">{template}</span>
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
