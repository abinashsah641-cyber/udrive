import fs from 'fs';

const html = fs.readFileSync('scripts/assets_folder.html', 'utf8');
const id = '1WI1zIXbTjkTL78yHnsHn2bSiqSyUTe68';

// Search for all occurrences of this ID
let pos = 0;
while ((pos = html.indexOf(id, pos)) !== -1) {
  console.log(`\nFound at ${pos}:`);
  console.log(html.substring(Math.max(0, pos - 100), Math.min(html.length, pos + 200)));
  pos += id.length;
}
