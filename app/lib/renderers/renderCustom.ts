import type { CustomReference } from "../../types/reference";

export function renderCustom(ref: CustomReference): string {
  return ref.text || "";
}
