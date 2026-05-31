"use client";

import { useState } from "react";
import type { CustomReference } from "../../../types/reference";
import { uid } from "../../../lib/uid";
import { RichTextEditor } from "../../editor/RichTextEditor";

interface CustomReferenceFormProps {
  initial?: CustomReference;
  onSave: (ref: CustomReference) => void;
  onCancel: () => void;
}

export function CustomReferenceForm({ initial, onSave, onCancel }: CustomReferenceFormProps) {
  const [text, setText] = useState(initial?.text ?? "");

  const canSave = text.replace(/<[^>]*>/g, "").trim() !== "";

  function handleSave() {
    if (!canSave) return;
    onSave({
      id:   initial?.id ?? uid(),
      type: "custom",
      text,
    });
  }

  return (
    <div className="space-y-3">
      <RichTextEditor
        content={text}
        onChange={setText}
        placeholder="Escribe la referencia completa aquí…"
      />
      <div className="flex justify-end gap-2 pt-1">
        <button onClick={onCancel} className="px-3 py-1.5 text-sm rounded-md border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors">
          Cancelar
        </button>
        <button onClick={handleSave} disabled={!canSave} className="px-3 py-1.5 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-500 transition-colors disabled:opacity-40">
          Guardar
        </button>
      </div>
    </div>
  );
}
