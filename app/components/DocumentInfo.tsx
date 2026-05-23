import { Field } from "./shared/Field";
import { FormCard } from "./shared/FormCard";
import { inputCls } from "./shared/styles";

interface DocumentInfoProps {
  title: string;
  subtitle: string;
  documentType: string;
  onTitleChange: (v: string) => void;
  onSubtitleChange: (v: string) => void;
  onDocumentTypeChange: (v: string) => void;
}

export function DocumentInfo({
  title,
  subtitle,
  documentType,
  onTitleChange,
  onSubtitleChange,
  onDocumentTypeChange,
}: DocumentInfoProps) {
  return (
    <FormCard title="Información del Documento" icon="">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Título *" className="sm:col-span-2">
          <input
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="Ej: Ética y Legalidad de los Pagos de Facilitación"
            className={inputCls}
          />
        </Field>
        <Field label="Subtítulo">
          <input
            value={subtitle}
            onChange={(e) => onSubtitleChange(e.target.value)}
            placeholder="Subtítulo opcional"
            className={inputCls}
          />
        </Field>
        <Field label="Tipo de documento">
          <input
            value={documentType}
            onChange={(e) => onDocumentTypeChange(e.target.value)}
            placeholder="Ej: Ensayo Académico, Informe, Tesis…"
            className={inputCls}
          />
        </Field>
      </div>
    </FormCard>
  );
}
