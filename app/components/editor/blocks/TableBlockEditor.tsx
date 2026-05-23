import type { TableBlock } from "../../../types/blocks";

interface Props {
  block: TableBlock;
  onChange: (block: TableBlock) => void;
}

export function TableBlockEditor({ block, onChange }: Props) {
  const colCount = block.headers.length;
  const rowCount = block.rows.length;

  function updateHeader(col: number, value: string) {
    const headers = block.headers.map((h, i) => (i === col ? value : h));
    onChange({ ...block, headers });
  }

  function updateCell(row: number, col: number, value: string) {
    const rows = block.rows.map((r, ri) =>
      ri === row ? r.map((c, ci) => (ci === col ? value : c)) : r
    );
    onChange({ ...block, rows });
  }

  function addRow() {
    onChange({ ...block, rows: [...block.rows, new Array(colCount).fill("")] });
  }

  function removeRow(row: number) {
    if (rowCount <= 1) return;
    onChange({ ...block, rows: block.rows.filter((_, i) => i !== row) });
  }

  function addColumn() {
    onChange({
      ...block,
      headers: [...block.headers, `Col. ${colCount + 1}`],
      rows: block.rows.map((r) => [...r, ""]),
    });
  }

  function removeColumn(col: number) {
    if (colCount <= 1) return;
    onChange({
      ...block,
      headers: block.headers.filter((_, i) => i !== col),
      rows: block.rows.map((r) => r.filter((_, i) => i !== col)),
    });
  }

  return (
    <div className="space-y-2">
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr>
              {block.headers.map((h, col) => (
                <th key={col} className="border border-slate-200 bg-slate-100 p-1.5 text-left">
                  <div className="flex items-center gap-1">
                    <input
                      value={h}
                      onChange={(e) => updateHeader(col, e.target.value)}
                      className="flex-1 font-semibold text-slate-700 bg-transparent outline-none min-w-0"
                    />
                    {colCount > 1 && (
                      <button
                        onClick={() => removeColumn(col)}
                        className="text-slate-300 hover:text-red-400 transition-colors leading-none flex-shrink-0"
                      >
                        ×
                      </button>
                    )}
                  </div>
                </th>
              ))}
              <th className="border-0 w-6" />
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row, ri) => (
              <tr key={ri}>
                {row.map((cell, ci) => (
                  <td key={ci} className="border border-slate-200 p-1.5">
                    <input
                      value={cell}
                      onChange={(e) => updateCell(ri, ci, e.target.value)}
                      className="w-full text-slate-700 bg-transparent outline-none"
                    />
                  </td>
                ))}
                <td className="border-0 pl-1">
                  {rowCount > 1 && (
                    <button
                      onClick={() => removeRow(ri)}
                      className="text-slate-300 hover:text-red-400 transition-colors leading-none"
                    >
                      ×
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex gap-3">
        <button onClick={addRow}    className="text-xs text-blue-600 hover:text-blue-700 transition-colors">+ Añadir fila</button>
        <button onClick={addColumn} className="text-xs text-blue-600 hover:text-blue-700 transition-colors">+ Añadir columna</button>
      </div>
    </div>
  );
}
