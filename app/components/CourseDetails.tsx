import { Field } from "./shared/Field";
import { FormCard } from "./shared/FormCard";
import { inputCls } from "./shared/styles";

interface CourseDetailsProps {
  author: string;
  professor: string;
  institution: string;
  program: string;
  course: string;
  date: string;
  onAuthorChange: (v: string) => void;
  onProfessorChange: (v: string) => void;
  onInstitutionChange: (v: string) => void;
  onProgramChange: (v: string) => void;
  onCourseChange: (v: string) => void;
  onDateChange: (v: string) => void;
}

export function CourseDetails({
  author,
  professor,
  institution,
  program,
  course,
  date,
  onAuthorChange,
  onProfessorChange,
  onInstitutionChange,
  onProgramChange,
  onCourseChange,
  onDateChange,
}: CourseDetailsProps) {
  return (
    <FormCard title="Autores y Curso" icon="">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Autor / Alumno">
          <input value={author} onChange={(e) => onAuthorChange(e.target.value)} placeholder="Tu nombre" className={inputCls} />
        </Field>
        <Field label="Profesor / Catedrático">
          <input value={professor} onChange={(e) => onProfessorChange(e.target.value)} placeholder="Nombre del profesor" className={inputCls} />
        </Field>
        <Field label="Institución">
          <input value={institution} onChange={(e) => onInstitutionChange(e.target.value)} placeholder="Universidad / Instituto" className={inputCls} />
        </Field>
        <Field label="Programa académico">
          <input value={program} onChange={(e) => onProgramChange(e.target.value)} placeholder="Ej: MBA, Ingeniería de Sistemas…" className={inputCls} />
        </Field>
        <Field label="Materia / Curso">
          <input value={course} onChange={(e) => onCourseChange(e.target.value)} placeholder="Ej: Negocios Internacionales" className={inputCls} />
        </Field>
        <Field label="Fecha">
          <input value={date} onChange={(e) => onDateChange(e.target.value)} placeholder="Mayo 2026" className={inputCls} />
        </Field>
      </div>
    </FormCard>
  );
}
