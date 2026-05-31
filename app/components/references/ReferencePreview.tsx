import type { Reference, ReferenceType } from "../../types/reference";
import { renderAPA } from "../../lib/renderers/renderAPA";

const TYPE_LABEL: Record<ReferenceType, string> = {
  book:    "📖 Libro",
  journal: "📰 Artículo",
  website: "🌐 Web",
  report:  "📄 Informe",
  custom:  "✏️ Personalizada",
};

export function ReferencePreview({ reference }: { reference: Reference }) {
  return (
    <div className="flex-1 min-w-0">
      <span className="inline-block text-xs text-slate-400 mb-1">{TYPE_LABEL[reference.type]}</span>
      <p
        className="text-sm text-slate-700 leading-relaxed font-mono break-words [&_em]:italic [&_a]:text-blue-600 [&_a]:underline"
        dangerouslySetInnerHTML={{ __html: renderAPA(reference) }}
      />
    </div>
  );
}
