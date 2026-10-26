import fs from 'fs';
import sharp from 'sharp';

async function fetchFile(id, filename) {
  const url = `https://lh3.googleusercontent.com/d/${id}`;
  const res = await fetch(url);
  if (res.ok) {
    const text = await res.text();
    fs.mkdirSync('scripts/slider_bundle', { recursive: true });
    fs.writeFileSync(`scripts/slider_bundle/${filename}`, text);
    console.log(`✓ Saved scripts/slider_bundle/${filename} (${text.length} bytes)`);
    return text;
  } else {
    // Try download endpoint
    const dUrl = `https://drive.usercontent.google.com/download?id=${id}&export=download`;
    const res2 = await fetch(dUrl);
    if (res2.ok) {
      const text2 = await res2.text();
      fs.mkdirSync('scripts/slider_bundle', { recursive: true });
      fs.writeFileSync(`scripts/slider_bundle/${filename}`, text2);
      console.log(`✓ Saved scripts/slider_bundle/${filename} (${text2.length} bytes)`);
      return text2;
    }
  }
}

async function fetchAssetsFolder() {
  const assetsUrl = 'https://drive.google.com/drive/folders/12V8WEleJkDVSf7BbbfL5EItAyGMDX0Tz';
  console.log('Fetching assets folder:', assetsUrl);
  const res = await fetch(assetsUrl, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
  });
  const html = await res.text();
  fs.writeFileSync('scripts/assets_folder.html', html);
  console.log('Saved scripts/assets_folder.html, size:', html.length);

  // Extract all file IDs inside assets
  const idMatches = [...html.matchAll(/data-id="([a-zA-Z0-9_-]{28,35})"/g)].map(m => m[1]);
  console.log('IDs in assets folder:', idMatches);

  for (let i = 0; i < idMatches.length; i++) {
    const fileId = idMatches[i];
    // Find filename in html
    const marker = `data-id="${fileId}"`;
    const idx = html.indexOf(marker);
    let fname = `image-${i+1}.png`;
    if (idx !== -1) {
      const row = html.substring(idx, idx + 1000);
      const nameMatch = row.match(/<strong class="DNoYtb">([^<]+)<\/strong>/);
      if (nameMatch) fname = nameMatch[1];
    }
    console.log(`Downloading ${fname} (ID: ${fileId})...`);
    
    // Download image
    const imgRes = await fetch(`https://lh3.googleusercontent.com/d/${fileId}`);
    if (imgRes.ok) {
      const buf = Buffer.from(await imgRes.arrayBuffer());
      fs.mkdirSync('public/images/hero-slider', { recursive: true });
      const targetPath = `public/images/hero-slider/${fname}`;
      fs.writeFileSync(targetPath, buf);
      console.log(`✓ Downloaded ${targetPath} (${buf.length} bytes)`);
    } else {
      console.log(`Failed to download ${fname}: HTTP ${imgRes.status}`);
    }
  }
}

async function main() {
  await fetchFile('1hgwanm6tDJqUfrLLf8ki6xhQrWPXVmF4', 'index.html');
  await fetchFile('1mVgMYqZcWBlSDWSLlHhU6x_NX6BsCWwC', 'script.js');
  await fetchFile('1pWloaMbeILOk9IbhHpekrsPSypT17Vxq', 'styles.css');
  await fetchFile('1XxIEEhf1TWCtndlkEgRiUbU2OL3m9FHe', 'README.md');
  await fetchAssetsFolder();
}

main().catch(console.error);
