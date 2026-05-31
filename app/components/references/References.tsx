"use client";

import { useState } from "react";
import type { Reference, ReferenceType } from "../../types/reference";
import { FormCard } from "../shared/FormCard";
import { ReferenceItem } from "./ReferenceItem";
import { ReferenceTypeSelector } from "./ReferenceTypeSelector";
import { BookReferenceForm } from "./forms/BookReferenceForm";
import { JournalReferenceForm } from "./forms/JournalReferenceForm";
import { WebsiteReferenceForm } from "./forms/WebsiteReferenceForm";
import { ReportReferenceForm } from "./forms/ReportReferenceForm";
import { CustomReferenceForm } from "./forms/CustomReferenceForm";

interface ReferencesProps {
  references: Reference[];
  onAdd: (ref: Reference) => void;
  onRemove: (id: string) => void;
  onUpdate: (ref: Reference) => void;
}

type AddStep = "idle" | "selecting" | ReferenceType;

export function References({ references, onAdd, onRemove, onUpdate }: ReferencesProps) {
  const [step, setStep] = useState<AddStep>("idle");

  function handleAdd(ref: Reference) {
    onAdd(ref);
    setStep("idle");
  }

  return (
    <FormCard title="Referencias Bibliográficas" icon="">
      {references.length > 0 && (
        <div className="mb-4 border border-slate-200 rounded-lg overflow-hidden">
          {references.map((ref) => (
            <ReferenceItem key={ref.id} reference={ref} onRemove={onRemove} onUpdate={onUpdate} />
          ))}
        </div>
      )}

      {step === "idle" && (
        <button
          onClick={() => setStep("selecting")}
          className="w-full text-sm font-medium text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 border border-dashed border-blue-300 hover:border-blue-400 rounded-lg px-4 py-3 transition-colors flex items-center justify-center gap-2"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Añadir referencia
        </button>
      )}

      {step === "selecting" && (
        <ReferenceTypeSelector onSelect={setStep} onCancel={() => setStep("idle")} />
      )}

      {step === "book" && (
        <div className="border border-slate-200 rounded-lg p-4">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Libro</p>
          <BookReferenceForm onSave={handleAdd} onCancel={() => setStep("selecting")} />
        </div>
      )}

      {step === "journal" && (
        <div className="border border-slate-200 rounded-lg p-4">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Artículo de revista</p>
          <JournalReferenceForm onSave={handleAdd} onCancel={() => setStep("selecting")} />
        </div>
      )}

      {step === "website" && (
        <div className="border border-slate-200 rounded-lg p-4">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Sitio web</p>
          <WebsiteReferenceForm onSave={handleAdd} onCancel={() => setStep("selecting")} />
        </div>
      )}

      {step === "report" && (
        <div className="border border-slate-200 rounded-lg p-4">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Informe institucional</p>
          <ReportReferenceForm onSave={handleAdd} onCancel={() => setStep("selecting")} />
        </div>
      )}

      {step === "custom" && (
        <div className="border border-slate-200 rounded-lg p-4">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Referencia personalizada</p>
          <CustomReferenceForm onSave={handleAdd} onCancel={() => setStep("selecting")} />
        </div>
      )}
    </FormCard>
  );
}
