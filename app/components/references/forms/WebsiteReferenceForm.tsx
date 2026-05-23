"use client";

import { useState } from "react";
import type { WebsiteReference } from "../../../types/reference";
import { uid } from "../../../lib/uid";
import { Field } from "../../shared/Field";
import { inputCls } from "../../shared/styles";

interface WebsiteReferenceFormProps {
  initial?: WebsiteReference;
  onSave: (ref: WebsiteReference) => void;
  onCancel: () => void;
}

export function WebsiteReferenceForm({ initial, onSave, onCancel }: WebsiteReferenceFormProps) {
  const [author,     setAuthor]     = useState(initial?.author     ?? "");
  const [year,       setYear]       = useState(initial?.year       ?? "");
  const [title,      setTitle]      = useState(initial?.title      ?? "");
  const [siteName,   setSiteName]   = useState(initial?.siteName   ?? "");
  const [url,        setUrl]        = useState(initial?.url        ?? "");
  const [accessDate, setAccessDate] = useState(initial?.accessDate ?? "");

  const canSave = title.trim() !== "" && url.trim() !== "";

  function handleSave() {
    if (!canSave) return;
    onSave({
      id:         initial?.id ?? uid(),
      type:       "website",
      author:     author.trim()     || undefined,
      year:       year.trim()       || undefined,
      title:      title.trim(),
      siteName:   siteName.trim()   || undefined,
      url:        url.trim(),
      accessDate: accessDate.trim() || undefined,
    });
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <Field label="Autor(es)">
          <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Organización o autor" className={inputCls} />
        </Field>
        <Field label="Año">
          <input value={year} onChange={(e) => setYear(e.target.value)} placeholder="2024" className={inputCls} />
        </Field>
        <Field label="Título de la página *" className="col-span-2">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Título de la página" className={inputCls} />
        </Field>
        <Field label="Nombre del sitio">
          <input value={siteName} onChange={(e) => setSiteName(e.target.value)} placeholder="U.S. Department of Justice" className={inputCls} />
        </Field>
        <Field label="Fecha de acceso">
          <input value={accessDate} onChange={(e) => setAccessDate(e.target.value)} placeholder="15 de mayo de 2026" className={inputCls} />
        </Field>
        <Field label="URL *" className="col-span-2">
          <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://www.justice.gov/..." className={inputCls} />
        </Field>
      </div>
      <FormActions canSave={canSave} onSave={handleSave} onCancel={onCancel} />
    </div>
  );
}

function FormActions({ canSave, onSave, onCancel }: { canSave: boolean; onSave: () => void; onCancel: () => void }) {
  return (
    <div className="flex justify-end gap-2 pt-1">
      <button onClick={onCancel} className="px-3 py-1.5 text-sm rounded-md border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors">
        Cancelar
      </button>
      <button onClick={onSave} disabled={!canSave} className="px-3 py-1.5 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-500 transition-colors disabled:opacity-40">
        Guardar
      </button>
    </div>
  );
}
