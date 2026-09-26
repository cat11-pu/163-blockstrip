// strip.js：按 findBlocks 的区间剥掉块注释，区间外片段按顺序拼回
import { findBlocks } from "./scan.js";

export function stripBlocks(text) {
  const src = String(text);
  const spans = findBlocks(src);
  const parts = [];
  let cursor = 0;
  for (const pair of spans) {
    const start = pair[0];
    const end = pair[1];
    if (start > cursor) parts.push(src.slice(cursor, start));
    cursor = end;
  }
  if (cursor < src.length) parts.push(src.slice(cursor));
  return { text: parts.join(""), spans: spans };
}
