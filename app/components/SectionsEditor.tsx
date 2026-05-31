"use client";

import { useState } from "react";
import type { Section } from "../types/document";
import type { ContentBlock, BlockType } from "../types/blocks";
import { SectionItem } from "./SectionItem";
import { BlockTypeMenu } from "./editor/BlockTypeMenu";

interface SectionsEditorProps {
  sections: Section[];
  onAdd: (type: BlockType) => void;
  onRemove: (id: string) => void;
  onTitleChange: (id: string, title: string) => void;
  onBlocksChange: (id: string, blocks: ContentBlock[]) => void;
  onMove: (id: string, dir: -1 | 1) => void;
}

export function SectionsEditor({
  sections,
  onAdd,
  onRemove,
  onTitleChange,
  onBlocksChange,
  onMove,
}: SectionsEditorProps) {
  const [addingSection, setAddingSection] = useState(false);

  function handleSelect(type: BlockType) {
    onAdd(type);
    setAddingSection(false);
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-5">
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="text-base"></span>
          <h2 className="font-semibold text-slate-800 text-sm">Secciones del Documento</h2>
          <span className="ml-1 bg-slate-100 text-slate-500 text-xs px-2 py-0.5 rounded-full font-medium">
            {sections.length}
          </span>
        </div>
        <button
          onClick={() => setAddingSection(true)}
          className="text-xs font-medium text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-md transition-colors flex items-center gap-1"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Añadir sección
        </button>
      </div>
      <div className="divide-y divide-slate-100">
        {sections.map((sec, idx) => (
          <SectionItem
            key={sec.id}
            section={sec}
            index={idx}
            totalCount={sections.length}
            onTitleChange={onTitleChange}
            onBlocksChange={onBlocksChange}
            onRemove={onRemove}
            onMove={onMove}
          />
        ))}
      </div>
      {sections.length > 0 && !addingSection && (
        <div className="border-t border-slate-100 px-5 py-4 flex justify-end">
          <button
            onClick={() => setAddingSection(true)}
            className="text-xs font-medium text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-md transition-colors flex items-center gap-1"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Añadir sección
          </button>
        </div>
      )}
      {addingSection && (
        <div className="border-t border-slate-100 px-5 py-4">
          <BlockTypeMenu onSelect={handleSelect} onCancel={() => setAddingSection(false)} />
        </div>
      )}
    </div>
  );
}
