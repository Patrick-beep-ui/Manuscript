import type { Section } from "../types/document";
import type { ContentBlock } from "../types/blocks";
import { BlockEditor } from "./editor/BlockEditor";

interface SectionItemProps {
  section: Section;
  index: number;
  totalCount: number;
  onTitleChange: (id: string, title: string) => void;
  onBlocksChange: (id: string, blocks: ContentBlock[]) => void;
  onRemove: (id: string) => void;
  onMove: (id: string, dir: -1 | 1) => void;
}

export function SectionItem({
  section,
  index,
  totalCount,
  onTitleChange,
  onBlocksChange,
  onRemove,
  onMove,
}: SectionItemProps) {
  return (
    <div>
      {/* Section header */}
      <div className="flex items-center gap-2 px-5 py-3 border-b border-slate-100">
        <span className="w-5 h-5 rounded bg-slate-800 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
          {index + 1}
        </span>
        <input
          value={section.title}
          onChange={(e) => onTitleChange(section.id, e.target.value)}
          placeholder="Título de la sección…"
          className="flex-1 text-sm font-semibold text-slate-800 border-0 outline-none bg-transparent placeholder:text-slate-400 placeholder:font-normal"
        />
        <div className="flex items-center gap-1 ml-auto">
          <button
            onClick={() => onMove(section.id, -1)}
            disabled={index === 0}
            title="Subir"
            className="p-1 text-slate-400 hover:text-slate-600 disabled:opacity-20 transition-colors"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
          </button>
          <button
            onClick={() => onMove(section.id, 1)}
            disabled={index === totalCount - 1}
            title="Bajar"
            className="p-1 text-slate-400 hover:text-slate-600 disabled:opacity-20 transition-colors"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
          {totalCount > 1 && (
            <button
              onClick={() => onRemove(section.id)}
              title="Eliminar sección"
              className="p-1 text-slate-400 hover:text-red-500 transition-colors ml-1"
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Block editor */}
      <BlockEditor
        blocks={section.blocks}
        onChange={(blocks) => onBlocksChange(section.id, blocks)}
      />
    </div>
  );
}
