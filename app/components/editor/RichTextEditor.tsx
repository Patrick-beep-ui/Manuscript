"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
  className?: string;
}

export function RichTextEditor({ content, onChange, placeholder, className }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        codeBlock: false,
        blockquote: false,
        horizontalRule: false,
        bulletList: false,
        orderedList: false,
        code: false,
      }),
    ],
    content: isHtml(content) ? content : escapeTextForTiptap(content),
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div className={className}>
      <div className="flex items-center gap-0.5 mb-1">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-1.5 py-0.5 text-xs font-bold rounded transition-colors ${
            editor.isActive("bold")
              ? "bg-blue-100 text-blue-700"
              : "text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          }`}
          title="Negrita (Ctrl+B)"
        >
          B
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-1.5 py-0.5 text-xs italic rounded transition-colors ${
            editor.isActive("italic")
              ? "bg-blue-100 text-blue-700"
              : "text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          }`}
          title="Cursiva (Ctrl+I)"
        >
          I
        </button>
        {editor.isActive("bold") || editor.isActive("italic") ? (
          <button
            type="button"
            onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
            className="ml-1 px-1.5 py-0.5 text-xs text-slate-400 hover:text-red-500 rounded transition-colors"
            title="Limpiar formato"
          >
            ×
          </button>
        ) : null}
      </div>
      <EditorContent editor={editor} className="prose-editor" />
      <style>{`
        .prose-editor .ProseMirror {
          outline: none;
          min-height: 4.5em;
          font-size: 0.875rem;
          line-height: 1.625;
          color: #334155;
        }
        .prose-editor .ProseMirror p {
          margin: 0;
        }
        .prose-editor .ProseMirror strong { font-weight: 600; }
        .prose-editor .ProseMirror em { font-style: italic; }
      `}</style>
    </div>
  );
}

function isHtml(text: string): boolean {
  return /<[a-z][\s\S]*>/i.test(text);
}

function escapeTextForTiptap(text: string): string {
  if (!text.trim()) return "";
  const escaped = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  return `<p>${escaped.replace(/\n\n+/g, "</p><p>").replace(/\n/g, "<br>")}</p>`;
}
