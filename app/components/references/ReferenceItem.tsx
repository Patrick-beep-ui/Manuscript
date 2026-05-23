"use client";

import { useState } from "react";
import type { Reference } from "../../types/reference";
import { ReferencePreview } from "./ReferencePreview";
import { BookReferenceForm } from "./forms/BookReferenceForm";
import { JournalReferenceForm } from "./forms/JournalReferenceForm";
import { WebsiteReferenceForm } from "./forms/WebsiteReferenceForm";

interface ReferenceItemProps {
  reference: Reference;
  onRemove: (id: string) => void;
  onUpdate: (ref: Reference) => void;
}

export function ReferenceItem({ reference, onRemove, onUpdate }: ReferenceItemProps) {
  const [editing, setEditing] = useState(false);

  function handleSave(updated: Reference) {
    onUpdate(updated);
    setEditing(false);
  }

  if (editing) {
    return (
      <div className="p-4 bg-slate-50 border-b border-slate-100 last:border-0">
        {reference.type === "book" && (
          <BookReferenceForm initial={reference} onSave={handleSave} onCancel={() => setEditing(false)} />
        )}
        {reference.type === "journal" && (
          <JournalReferenceForm initial={reference} onSave={handleSave} onCancel={() => setEditing(false)} />
        )}
        {reference.type === "website" && (
          <WebsiteReferenceForm initial={reference} onSave={handleSave} onCancel={() => setEditing(false)} />
        )}
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3 p-4 border-b border-slate-100 last:border-0">
      <ReferencePreview reference={reference} />
      <div className="flex items-center gap-1 flex-shrink-0 mt-1">
        <button
          onClick={() => setEditing(true)}
          title="Editar"
          className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
        </button>
        <button
          onClick={() => onRemove(reference.id)}
          title="Eliminar"
          className="p-1.5 text-slate-400 hover:text-red-500 transition-colors"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
}
