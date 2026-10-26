import fs from 'fs';

const html = fs.readFileSync('scripts/gdrive_page.html', 'utf8');

const ids = [
  '1hgwanm6tDJqUfrLLf8ki6xhQrWPXVmF4',
  '1mVgMYqZcWBlSDWSLlHhU6x_NX6BsCWwC',
  '1pWloaMbeILOk9IbhHpekrsPSypT17Vxq'
];

for (const id of ids) {
  const marker = `data-id="${id}"`;
  const idx = html.indexOf(marker);
  if (idx !== -1) {
    const end = html.indexOf('</tr>', idx);
    const rowHtml = html.substring(idx, end !== -1 ? end : idx + 2000);
    const labelMatch = rowHtml.match(/<strong class="DNoYtb">([^<]+)<\/strong>/);
    console.log(`ID ${id} filename:`, labelMatch ? labelMatch[1] : 'Unknown');
  }
}
