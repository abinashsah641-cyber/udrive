import fs from 'fs';
import sharp from 'sharp';

const files = JSON.parse(fs.readFileSync('scripts/drive_files_mapped.json', 'utf8'));

// The 19 files mapped by ID from our earlier download
// Indices in `public/images/hero-slider/image-{idx}.png`
// Let's copy each to its real filename and also save optimized web-ready versions
async function organize() {
  fs.mkdirSync('public/images/hero-slider', { recursive: true });
  fs.mkdirSync('public/images/vehicles', { recursive: true });

  for (let i = 0; i < files.length; i++) {
    const item = files[i];
    const srcIndex = (i * 3) + 1; // 1, 4, 7, 10, ...
    const downloadedPath = `public/images/hero-slider/image-${srcIndex}.png`;
    const targetPng = `public/images/hero-slider/${item.filename}`;
    const targetWebp = `public/images/hero-slider/${item.filename.replace('.png', '.webp')}`;
    const targetJpg = `public/images/hero-slider/${item.filename.replace('.png', '.jpg')}`;

    console.log(`Processing [${i+1}/19] ${item.filename}...`);
    fs.copyFileSync(downloadedPath, targetPng);

    // Also optimize with sharp: 1600x900 webp and jpg
    await sharp(downloadedPath)
      .webp({ quality: 85 })
      .toFile(targetWebp);

    await sharp(downloadedPath)
      .jpeg({ quality: 88 })
      .toFile(targetJpg);

    console.log(`✓ Saved ${item.filename} (PNG, WebP, JPG)`);
  }
}

organize().catch(console.error);
