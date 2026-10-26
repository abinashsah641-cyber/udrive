import fs from 'fs';

const html = fs.readFileSync('scripts/gdrive_page.html', 'utf8');

// Find all occurrences of IDs and surrounding text
const matches = [...html.matchAll(/\["([a-zA-Z0-9_-]{25,45})",\["([a-zA-Z0-9_-]{25,45})"[^\]]*\]/g)];
console.log('Array matches found:', matches.length);
for (const m of matches.slice(0, 20)) {
  console.log('Match:', m[0].slice(0, 200));
}

// Find any strings resembling filenames or extensions (.png, .jpg, .webp, .jpeg)
const nameMatches = [...html.matchAll(/"([^"]+\.(?:png|jpg|jpeg|webp))"/gi)].map(m => m[1]);
console.log('All image filenames in HTML:', [...new Set(nameMatches)]);

// Find all 33 character IDs
const allIds = [...html.matchAll(/([a-zA-Z0-9_-]{33})/g)].map(m => m[1]);
const counts = {};
allIds.forEach(id => counts[id] = (counts[id] || 0) + 1);
console.log('ID frequencies:', Object.entries(counts).filter(([id, c]) => c > 2));
