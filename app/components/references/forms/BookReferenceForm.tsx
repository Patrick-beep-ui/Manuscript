"use client";

import { useState } from "react";
import type { BookReference } from "../../../types/reference";
import { uid } from "../../../lib/uid";
import { Field } from "../../shared/Field";
import { inputCls } from "../../shared/styles";

interface BookReferenceFormProps {
  initial?: BookReference;
  onSave: (ref: BookReference) => void;
  onCancel: () => void;
}

export function BookReferenceForm({ initial, onSave, onCancel }: BookReferenceFormProps) {
  const [author,    setAuthor]    = useState(initial?.author    ?? "");
  const [year,      setYear]      = useState(initial?.year      ?? "");
  const [title,     setTitle]     = useState(initial?.title     ?? "");
  const [edition,   setEdition]   = useState(initial?.edition   ?? "");
  const [publisher, setPublisher] = useState(initial?.publisher ?? "");

  const canSave = title.trim() !== "" && publisher.trim() !== "";

  function handleSave() {
    if (!canSave) return;
    onSave({
      id:        initial?.id ?? uid(),
      type:      "book",
      author:    author.trim(),
      year:      year.trim(),
      title:     title.trim(),
      edition:   edition.trim() || undefined,
      publisher: publisher.trim(),
    });
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <Field label="Autor(es)" className="col-span-2">
          <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Hill, C. W." className={inputCls} />
        </Field>
        <Field label="Año">
          <input value={year} onChange={(e) => setYear(e.target.value)} placeholder="2021" className={inputCls} />
        </Field>
        <Field label="Edición">
          <input value={edition} onChange={(e) => setEdition(e.target.value)} placeholder="13a" className={inputCls} />
        </Field>
        <Field label="Título *" className="col-span-2">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Negocios internacionales" className={inputCls} />
        </Field>
        <Field label="Editorial *" className="col-span-2">
          <input value={publisher} onChange={(e) => setPublisher(e.target.value)} placeholder="McGraw-Hill" className={inputCls} />
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
