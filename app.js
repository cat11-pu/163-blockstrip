// app.js：渲染结果
import { findBlocks } from "./scan.js";
import { stripBlocks } from "./strip.js";

export function render(spec) {
  const text = String(spec.text || "");
  const view = stripBlocks(text);
  const spans = view.spans || [];
  let removed = 0;
  spans.forEach((pair) => { removed += pair[1] - pair[0]; });
  const left = String(view.text || "");
  return { text: left, spans: spans, removed: removed, length: left.length,
           original: text.length, count: spans.length };
}
