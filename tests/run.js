import assert from "node:assert";
import { findBlocks } from "../scan.js";
import { stripBlocks } from "../strip.js";
import { render } from "../app.js";

let failed = 0;
function check(name, fn) {
  try { fn(); console.log("ok " + name); } catch (e) { failed += 1; console.log("FAIL " + name + " :: " + e.message); }
}

check("findBlocks returns a list", () => {
  assert.ok(Array.isArray(findBlocks("a")));
});

check("stripBlocks returns spans", () => {
  assert.ok(Array.isArray(stripBlocks("a").spans));
});

check("stripBlocks returns text", () => {
  assert.strictEqual(typeof stripBlocks("a").text, "string");
});

check("render counts spans", () => {
  assert.strictEqual(typeof render({ text: "a" }).count, "number");
});

check("render exposes removed count", () => {
  assert.strictEqual(typeof render({ text: "a" }).removed, "number");
});

console.log("5 cases, " + failed + " failed");
process.exit(failed === 0 ? 0 : 1);
