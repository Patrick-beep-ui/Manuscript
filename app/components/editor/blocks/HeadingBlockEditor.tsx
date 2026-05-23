import type { HeadingBlock } from "../../../types/blocks";

interface Props {
  block: HeadingBlock;
  onChange: (block: HeadingBlock) => void;
}

export function HeadingBlockEditor({ block, onChange }: Props) {
  return (
    <input
      value={block.text}
      onChange={(e) => onChange({ ...block, text: e.target.value })}
      placeholder="Subtítulo de subsección…"
      className="w-full text-sm font-semibold text-slate-800 bg-transparent border-0 outline-none placeholder:text-slate-300 placeholder:font-normal"
    />
  );
}
