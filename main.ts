// Entry program for the gta6-meme-x-01 bounty.
//
// What this has to accomplish is small but strict: the gate looks for a file
// named POST.json inside the output directory, and that file's "url" field is
// the address of the public X post carrying our meme. So the job here is to
// take POST.json from the bot directory and place a copy in the output
// directory — but only after making sure the address inside it is one the
// gate can actually follow. A malformed POST.json should fail loudly here
// rather than hand the gate a pointer to nowhere.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR
// stand in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

function fail(message: string): never {
  console.error(`main.ts: ${message}`);
  process.exit(1);
}

const botDir = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const sourcePath = join(botDir, 'POST.json');
const targetPath = join(outputDir, 'POST.json');

// Read and validate first, before the output directory is touched, so a bad
// entry leaves no half-finished state behind.
let raw: string;
try {
  raw = readFileSync(sourcePath, 'utf8');
} catch {
  fail(`cannot read ${sourcePath}`);
}

let post: unknown;
try {
  post = JSON.parse(raw);
} catch {
  fail(`${sourcePath} is not valid JSON`);
}

const url = (post as { url?: unknown }).url;
if (typeof url !== 'string' || !url.startsWith('https://')) {
  fail('POST.json must hold an "url" string that starts with https://');
}

mkdirSync(outputDir, { recursive: true });
copyFileSync(sourcePath, targetPath);

// Read the copy back before claiming success: the gate will parse this exact
// file, so prove the bytes that landed still decode to the same post address.
const landed = JSON.parse(readFileSync(targetPath, 'utf8')) as { url?: unknown };
if (landed.url !== url) {
  fail(`copy verification failed: ${targetPath} does not match the source`);
}
const size = Buffer.byteLength(raw, 'utf8');
console.log(`copied POST.json (${size} bytes) for ${url} to ${targetPath}`);
