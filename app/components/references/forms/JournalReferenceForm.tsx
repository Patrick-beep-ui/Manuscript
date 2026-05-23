"use client";

import { useState } from "react";
import type { JournalReference } from "../../../types/reference";
import { uid } from "../../../lib/uid";
import { Field } from "../../shared/Field";
import { inputCls } from "../../shared/styles";

interface JournalReferenceFormProps {
  initial?: JournalReference;
  onSave: (ref: JournalReference) => void;
  onCancel: () => void;
}

export function JournalReferenceForm({ initial, onSave, onCancel }: JournalReferenceFormProps) {
  const [author,  setAuthor]  = useState(initial?.author  ?? "");
  const [year,    setYear]    = useState(initial?.year    ?? "");
  const [title,   setTitle]   = useState(initial?.title   ?? "");
  const [journal, setJournal] = useState(initial?.journal ?? "");
  const [volume,  setVolume]  = useState(initial?.volume  ?? "");
  const [issue,   setIssue]   = useState(initial?.issue   ?? "");
  const [pages,   setPages]   = useState(initial?.pages   ?? "");
  const [doi,     setDoi]     = useState(initial?.doi     ?? "");

  const canSave = title.trim() !== "" && journal.trim() !== "";

  function handleSave() {
    if (!canSave) return;
    onSave({
      id:      initial?.id ?? uid(),
      type:    "journal",
      author:  author.trim(),
      year:    year.trim(),
      title:   title.trim(),
      journal: journal.trim(),
      volume:  volume.trim() || undefined,
      issue:   issue.trim()  || undefined,
      pages:   pages.trim()  || undefined,
      doi:     doi.trim()    || undefined,
    });
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <Field label="Autor(es)" className="col-span-2">
          <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="García, M. A., & López, R." className={inputCls} />
        </Field>
        <Field label="Año">
          <input value={year} onChange={(e) => setYear(e.target.value)} placeholder="2023" className={inputCls} />
        </Field>
        <Field label="Título del artículo *" className="col-span-2">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Título del artículo" className={inputCls} />
        </Field>
        <Field label="Revista *" className="col-span-2">
          <input value={journal} onChange={(e) => setJournal(e.target.value)} placeholder="Journal of Business Ethics" className={inputCls} />
        </Field>
        <Field label="Volumen">
          <input value={volume} onChange={(e) => setVolume(e.target.value)} placeholder="12" className={inputCls} />
        </Field>
        <Field label="Número">
          <input value={issue} onChange={(e) => setIssue(e.target.value)} placeholder="3" className={inputCls} />
        </Field>
        <Field label="Páginas">
          <input value={pages} onChange={(e) => setPages(e.target.value)} placeholder="45–67" className={inputCls} />
        </Field>
        <Field label="DOI">
          <input value={doi} onChange={(e) => setDoi(e.target.value)} placeholder="10.1007/s10551-023-05123-4" className={inputCls} />
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
