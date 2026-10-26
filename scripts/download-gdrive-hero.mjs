import fs from 'fs';
import sharp from 'sharp';

const candidateIds = [
  '12V8WEleJkDVSf7BbbfL5EItAyGMDX0Tz',
  '1hgwanm6tDJqUfrLLf8ki6xhQrWPXVmF4',
  '1XxIEEhf1TWCtndlkEgRiUbU2OL3m9FHe',
  '1mVgMYqZcWBlSDWSLlHhU6x_NX6BsCWwC',
  '1pWloaMbeILOk9IbhHpekrsPSypT17Vxq'
];

async function downloadCandidate(id, index) {
  // Try several Google Drive public direct download URL formats
  const urls = [
    `https://drive.google.com/uc?export=download&id=${id}`,
    `https://drive.usercontent.google.com/download?id=${id}&export=download`,
    `https://lh3.googleusercontent.com/d/${id}`
  ];

  for (const url of urls) {
    try {
      console.log(`Trying ID ${id} with ${url}...`);
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        },
        redirect: 'follow'
      });

      if (res.ok) {
        const contentType = res.headers.get('content-type') || '';
        console.log(`Response content-type: ${contentType}, status: ${res.status}`);
        const buffer = Buffer.from(await res.arrayBuffer());
        console.log(`Downloaded ${buffer.length} bytes`);

        if (buffer.length > 5000 && !contentType.includes('text/html')) {
          const outPath = `public/images/hero/hero-slide-${index + 1}.jpg`;
          fs.mkdirSync('public/images/hero', { recursive: true });
          fs.writeFileSync(outPath, buffer);

          try {
            const meta = await sharp(outPath).metadata();
            console.log(`✓ Valid image saved to ${outPath}:`, meta.format, meta.width, 'x', meta.height);
            return true;
          } catch(e) {
            console.log(`File is not image:`, e.message);
          }
        } else if (contentType.includes('text/html')) {
          console.log(`Received HTML instead of image`);
        }
      } else {
        console.log(`Failed status: ${res.status}`);
      }
    } catch(err) {
      console.log(`Error fetching ${url}:`, err.message);
    }
  }
  return false;
}

async function main() {
  for (let i = 0; i < candidateIds.length; i++) {
    await downloadCandidate(candidateIds[i], i);
  }
}

main().catch(console.error);
