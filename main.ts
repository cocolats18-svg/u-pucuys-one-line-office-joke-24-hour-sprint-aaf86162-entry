// One-Line Office Joke: 24-Hour Sprint
// Entry program (make.fun program/v1): writes a single original one-line
// office joke to /output/entry.txt — at most 200 UTF-8 characters, one line.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The joke: a fresh, original one-liner about office life.
const JOKE =
  "My manager calls it a flat hierarchy, which is why my raise was flat too.";

// Where the harness expects the entry. The runner sets MAKEFUN_OUTPUT_DIR;
// the sealed sandbox uses /output.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// The gate is strict: UTF-8 text, 1 to 200 characters, not only whitespace,
// and a single line. Refuse to write anything that would fail it.
const text = JOKE.trim();
const chars = [...text].length;
if (chars < 1 || chars > 200) {
  throw new Error(`joke must be 1-200 characters, got ${chars}`);
}
if (/\n/.test(text)) {
  throw new Error("joke must be a single line");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), text + "\n", "utf8");
console.log(`wrote ${chars}-character office joke to ${join(outDir, "entry.txt")}`);

