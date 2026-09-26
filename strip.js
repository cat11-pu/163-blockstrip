// strip.js：按区间剥离块注释，区间外片段按顺序拼回
import { findBlocks } from "./scan.js";

export function stripBlocks(text) {
  const src = String(text);
  const spans = findBlocks(src);
  let kept = "";
  let cursor = 0;
  for (const pair of spans) {
    kept += src.slice(cursor, pair[0]);
    cursor = pair[1];
  }
  kept += src.slice(cursor);
  return { text: kept, spans: spans };
}
