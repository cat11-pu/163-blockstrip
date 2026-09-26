// scan.js：单遍扫描找块注释区间（/* ... */，可跨行，不嵌套）
export const SCAN_BUDGET = 50000;

export function findBlocks(text) {
  const src = String(text);
  if (src.length > SCAN_BUDGET) {
    const error = new Error("单次扫描预算为 " + SCAN_BUDGET + " 字符，实际 " + src.length);
    error.code = "E_BUDGET_EXCEEDED";
    throw error;
  }
  const spans = [];
  const n = src.length;
  let inBlock = false;
  let start = -1;
  let prev = "";
  for (let i = 0; i < n; i++) {
    const ch = src[i];
    if (!inBlock) {
      if (prev === "/" && ch === "*") {
        inBlock = true;
        start = i - 1;
      }
    } else if (prev === "*" && ch === "/") {
      spans.push([start, i + 1]);
      inBlock = false;
      start = -1;
    }
    prev = ch;
  }
  if (inBlock) {
    const error = new Error("块注释未闭合：位置 " + start + " 开始的 /* 缺少 */");
    error.code = "E_UNCLOSED_BLOCK";
    error.index = start;
    throw error;
  }
  return spans;
}
