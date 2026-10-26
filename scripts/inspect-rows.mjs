import fs from 'fs';

const html = fs.readFileSync('scripts/gdrive_page.html', 'utf8');

function inspectRow(id) {
  const marker = `data-id="${id}"`;
  const idx = html.indexOf(marker);
  if (idx !== -1) {
    const end = html.indexOf('</tr>', idx);
    const rowHtml = html.substring(idx, end !== -1 ? end + 5 : idx + 2000);
    console.log(`\n=== ROW FOR ${id} ===`);
    // extract aria-label or text content
    console.log(rowHtml);
  }
}

inspectRow('12V8WEleJkDVSf7BbbfL5EItAyGMDX0Tz');
inspectRow('1XxIEEhf1TWCtndlkEgRiUbU2OL3m9FHe');
