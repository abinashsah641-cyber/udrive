import fs from 'fs';

const html = fs.readFileSync('scripts/assets_folder.html', 'utf8');

// Find all occurrences of file mappings
// Pattern: \x22([a-zA-Z0-9_-]{33})\x22,[^,]*,\x22([^\\]+\.png)\x22
const matches = [...html.matchAll(/\\x22([a-zA-Z0-9_-]{33})\\x22,\s*\\x5b\\x22[a-zA-Z0-9_-]+\\x22\\x5d,\s*\\x22([^\\"]+\.png)\\x22/g)];

console.log('Matches found:', matches.length);
const files = [];
for (const m of matches) {
  files.push({ id: m[1], filename: m[2] });
}

console.log('Total files found:', files.length);
console.table(files);
fs.writeFileSync('scripts/drive_files_mapped.json', JSON.stringify(files, null, 2));
