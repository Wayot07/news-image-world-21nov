// news-image-20261121 entry (Node 22, standard library only).
// The image is entry.png beside this file: a broadsheet front page
// ("THE WORLD", Saturday 21 November 2026) summing up that day's news.
// The program copies it to /output/entry.png. The copy is byte-for-byte,
// so both grader runs write identical bytes. No network, no randomness,
// no timestamps: the output depends only on the entry.png shipped here.
// The image was drawn programmatically (Python PIL) in this same session:
// hero story (Russian missiles strike Poland; NATO calls it a grave
// violation), eight vignettes, an ALSO strip and a news wire ticker,
// all dated 21 Nov 2026.
// Outside the grader's container,
// MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, existsSync, mkdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const src = new URL('./entry.png', import.meta.url);
if (!existsSync(src)) {
  console.error(`error: entry.png is missing: ${src.pathname}`);
  process.exit(1);
}
if (statSync(src).size === 0) {
  console.error('error: entry.png is empty (0 bytes)');
  process.exit(1);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
copyFileSync(src, join(outDir, 'entry.png'));
