import fs from 'fs';

const html = fs.readFileSync('scripts/assets_folder.html', 'utf8');
const regex = /data-id="([a-zA-Z0-9_-]{33})"/g;
const ids = [...new Set([...html.matchAll(regex)].map(m => m[1]))];
console.log('Unique file IDs in assets:', ids.length);
for (const id of ids) {
  const marker = `data-id="${id}"`;
  const idx = html.indexOf(marker);
  const chunk = html.substring(idx, idx + 1500);
  const nameM = chunk.match(/<strong class="DNoYtb">([^<]+)<\/strong>/);
  console.log(id, '->', nameM ? nameM[1] : 'unknown');
}
