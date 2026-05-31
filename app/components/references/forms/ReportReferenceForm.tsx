"use client";

import { useState } from "react";
import type { ReportReference } from "../../../types/reference";
import { uid } from "../../../lib/uid";
import { Field } from "../../shared/Field";
import { inputCls } from "../../shared/styles";

interface ReportReferenceFormProps {
  initial?: ReportReference;
  onSave: (ref: ReportReference) => void;
  onCancel: () => void;
}

export function ReportReferenceForm({ initial, onSave, onCancel }: ReportReferenceFormProps) {
  const [author,       setAuthor]       = useState(initial?.author       ?? "");
  const [year,         setYear]         = useState(initial?.year         ?? "");
  const [title,        setTitle]        = useState(initial?.title        ?? "");
  const [reportNumber, setReportNumber] = useState(initial?.reportNumber ?? "");
  const [institution,  setInstitution]  = useState(initial?.institution  ?? "");
  const [url,          setUrl]          = useState(initial?.url          ?? "");
  const [accessDate,   setAccessDate]   = useState(initial?.accessDate   ?? "");

  const canSave = title.trim() !== "" && institution.trim() !== "";

  function handleSave() {
    if (!canSave) return;
    onSave({
      id:           initial?.id ?? uid(),
      type:         "report",
      author:       author.trim(),
      year:         year.trim(),
      title:        title.trim(),
      reportNumber: reportNumber.trim() || undefined,
      institution:  institution.trim(),
      url:          url.trim()          || undefined,
      accessDate:   accessDate.trim()   || undefined,
    });
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <Field label="Autor(es)" className="col-span-2">
          <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Arana, M." className={inputCls} />
        </Field>
        <Field label="Año">
          <input value={year} onChange={(e) => setYear(e.target.value)} placeholder="2003" className={inputCls} />
        </Field>
        <Field label="N° de informe">
          <input value={reportNumber} onChange={(e) => setReportNumber(e.target.value)} placeholder="N°. 123" className={inputCls} />
        </Field>
        <Field label="Institución *">
          <input value={institution} onChange={(e) => setInstitution(e.target.value)} placeholder="Ministerio de Fomento..." className={inputCls} />
        </Field>
        <Field label="Título *" className="col-span-2">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Resultados finales de la negociación..." className={inputCls} />
        </Field>
        <Field label="URL">
          <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://..." className={inputCls} />
        </Field>
        <Field label="Fecha de acceso">
          <input value={accessDate} onChange={(e) => setAccessDate(e.target.value)} placeholder="15 de mayo de 2026" className={inputCls} />
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
