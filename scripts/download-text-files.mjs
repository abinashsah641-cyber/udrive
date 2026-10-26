import fs from 'fs';

async function downloadFileWithConfirm(id, outFile) {
  const url = `https://drive.usercontent.google.com/download?id=${id}&export=download`;
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } });
  const html = await res.text();

  // Try to find confirm link or form
  let dlUrl = null;
  const linkMatch = html.match(/href="(\/download[^"]*confirm=[^"]*)"/);
  if (linkMatch) {
    dlUrl = `https://drive.usercontent.google.com${linkMatch[1].replace(/&amp;/g, '&')}`;
  } else {
    const actionMatch = html.match(/action="([^"]+)"/);
    const confirmMatch = html.match(/name="confirm"\s+value="([^"]+)"/);
    if (actionMatch && confirmMatch) {
      dlUrl = `${actionMatch[1]}&confirm=${confirmMatch[1]}`;
    }
  }

  if (dlUrl) {
    console.log(`Downloading with confirm URL for ${outFile}...`);
    const finalRes = await fetch(dlUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const content = await finalRes.text();
    fs.writeFileSync(outFile, content);
    console.log(`✓ Saved ${outFile} (${content.length} bytes)`);
  } else {
    fs.writeFileSync(outFile, html);
    console.log(`Saved raw output to ${outFile} (${html.length} bytes)`);
  }
}

async function main() {
  await downloadFileWithConfirm('1mVgMYqZcWBlSDWSLlHhU6x_NX6BsCWwC', 'scripts/slider_bundle/script.js');
  await downloadFileWithConfirm('1pWloaMbeILOk9IbhHpekrsPSypT17Vxq', 'scripts/slider_bundle/styles.css');
  await downloadFileWithConfirm('1hgwanm6tDJqUfrLLf8ki6xhQrWPXVmF4', 'scripts/slider_bundle/index.html');
}

main().catch(console.error);
