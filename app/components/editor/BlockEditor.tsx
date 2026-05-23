"use client";

import { useState } from "react";
import type { ContentBlock, BlockType } from "../../types/blocks";
import { uid } from "../../lib/uid";
import { BlockTypeMenu } from "./BlockTypeMenu";
import { ParagraphBlockEditor } from "./blocks/ParagraphBlockEditor";
import { HeadingBlockEditor }   from "./blocks/HeadingBlockEditor";
import { ListBlockEditor }      from "./blocks/ListBlockEditor";
import { TableBlockEditor }     from "./blocks/TableBlockEditor";
import { QuoteBlockEditor }     from "./blocks/QuoteBlockEditor";

const BLOCK_META: Record<BlockType, { label: string; color: string }> = {
  paragraph: { label: "Párrafo",   color: "bg-slate-100 text-slate-500"   },
  heading:   { label: "Subtítulo", color: "bg-blue-50 text-blue-600"      },
  list:      { label: "Lista",     color: "bg-green-50 text-green-600"    },
  table:     { label: "Tabla",     color: "bg-purple-50 text-purple-600"  },
  quote:     { label: "Cita",      color: "bg-amber-50 text-amber-600"    },
};

interface BlockEditorProps {
  blocks: ContentBlock[];
  onChange: (blocks: ContentBlock[]) => void;
}

export function BlockEditor({ blocks, onChange }: BlockEditorProps) {
  const [showMenu, setShowMenu] = useState(false);

  function addBlock(type: BlockType) {
    onChange([...blocks, createDefault(type)]);
    setShowMenu(false);
  }

  function removeBlock(index: number) {
    const updated = blocks.filter((_, i) => i !== index);
    onChange(updated.length > 0 ? updated : [createDefault("paragraph")]);
  }

  function updateBlock(index: number, updated: ContentBlock) {
    onChange(blocks.map((b, i) => (i === index ? updated : b)));
  }

  function moveBlock(index: number, dir: -1 | 1) {
    const next = index + dir;
    if (next < 0 || next >= blocks.length) return;
    const copy = [...blocks];
    [copy[index], copy[next]] = [copy[next], copy[index]];
    onChange(copy);
  }

  return (
    <div className="space-y-2 px-5 pb-5">
      {blocks.map((block, idx) => {
        const meta = BLOCK_META[block.type];
        return (
          <div key={block.id} className="border border-slate-200 rounded-lg overflow-hidden">
            {/* Block header */}
            <div className="flex items-center justify-between px-3 py-1.5 bg-slate-50 border-b border-slate-100">
              <span className={`text-xs font-semibold px-1.5 py-0.5 rounded ${meta.color}`}>
                {meta.label}
              </span>
              <div className="flex items-center gap-0.5">
                <button
                  onClick={() => moveBlock(idx, -1)}
                  disabled={idx === 0}
                  className="p-1 text-slate-400 hover:text-slate-600 disabled:opacity-20 transition-colors"
                >
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                    <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                <button
                  onClick={() => moveBlock(idx, 1)}
                  disabled={idx === blocks.length - 1}
                  className="p-1 text-slate-400 hover:text-slate-600 disabled:opacity-20 transition-colors"
                >
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                {blocks.length > 1 && (
                  <button
                    onClick={() => removeBlock(idx)}
                    className="p-1 text-slate-400 hover:text-red-500 transition-colors ml-0.5"
                  >
                    <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Block content */}
            <div className="p-3">
              {block.type === "paragraph" && (
                <ParagraphBlockEditor block={block} onChange={(b) => updateBlock(idx, b)} />
              )}
              {block.type === "heading" && (
                <HeadingBlockEditor block={block} onChange={(b) => updateBlock(idx, b)} />
              )}
              {block.type === "list" && (
                <ListBlockEditor block={block} onChange={(b) => updateBlock(idx, b)} />
              )}
              {block.type === "table" && (
                <TableBlockEditor block={block} onChange={(b) => updateBlock(idx, b)} />
              )}
              {block.type === "quote" && (
                <QuoteBlockEditor block={block} onChange={(b) => updateBlock(idx, b)} />
              )}
            </div>
          </div>
        );
      })}

      {showMenu ? (
        <BlockTypeMenu onSelect={addBlock} onCancel={() => setShowMenu(false)} />
      ) : (
        <button
          onClick={() => setShowMenu(true)}
          className="w-full text-xs font-medium text-slate-400 hover:text-blue-600 border border-dashed border-slate-200 hover:border-blue-300 rounded-lg py-2 transition-colors flex items-center justify-center gap-1.5"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Añadir bloque
        </button>
      )}
    </div>
  );
}

function createDefault(type: BlockType): ContentBlock {
  const id = uid();
  switch (type) {
    case "paragraph": return { id, type, text: "" };
    case "heading":   return { id, type, text: "" };
    case "list":      return { id, type, items: [""], ordered: false };
    case "table":     return { id, type, headers: ["Columna 1", "Columna 2"], rows: [["", ""]] };
    case "quote":     return { id, type, text: "" };
  }
}
