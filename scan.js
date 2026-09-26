// scan.js：单遍扫描找块注释区间（半开区间 [start, end)，含两端标记）
export const BLOCK_BUDGET = 50000;

export function findBlocks(text) {
  const src = String(text);
  const spans = [];
  const n = src.length;
  let i = 0;
  while (i < n - 1) {
    if (src.charCodeAt(i) === 47 && src.charCodeAt(i + 1) === 42) {
      const start = i;
      let j = i + 2;
      let end = -1;
      while (j < n - 1) {
        if (src.charCodeAt(j) === 42 && src.charCodeAt(j + 1) === 47) {
          end = j + 2;
          break;
        }
        j += 1;
      }
      if (end === -1) {
        const error = new Error("unclosed block comment at index " + start);
        error.code = "E_UNCLOSED_BLOCK";
        throw error;
      }
      spans.push([start, end]);
      i = end;
    } else {
      i += 1;
    }
  }
  return spans;
}
