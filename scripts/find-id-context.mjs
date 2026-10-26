import fs from 'fs';

const html = fs.readFileSync('scripts/gdrive_page.html', 'utf8');
const ids = [
  '12V8WEleJkDVSf7BbbfL5EItAyGMDX0Tz',
  '1hgwanm6tDJqUfrLLf8ki6xhQrWPXVmF4',
  '1XxIEEhf1TWCtndlkEgRiUbU2OL3m9FHe',
  '1mVgMYqZcWBlSDWSLlHhU6x_NX6BsCWwC',
  '1pWloaMbeILOk9IbhHpekrsPSypT17Vxq'
];

for (const id of ids) {
  let idx = 0;
  console.log(`\n=== ID: ${id} ===`);
  const firstIdx = html.indexOf(id);
  if (firstIdx !== -1) {
    const start = Math.max(0, firstIdx - 150);
    const end = Math.min(html.length, firstIdx + 250);
    console.log(html.substring(start, end).replace(/\n/g, ' '));
  }
}
