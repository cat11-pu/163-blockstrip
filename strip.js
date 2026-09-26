// strip.js：剥离（基线：原样返回）
import { findBlocks } from "./scan.js";

export function stripBlocks(text) {
  return { text: String(text), spans: [] };
}
