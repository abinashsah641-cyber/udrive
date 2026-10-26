import fs from 'fs';
import sharp from 'sharp';

async function checkReadme() {
  try {
    const readme = fs.readFileSync('scripts/slider_bundle/README.md', 'utf8');
    console.log('=== README.md ===\n', readme);
  } catch(e) {
    console.log('Error reading README:', e.message);
  }
}

async function inspectImages() {
  // The 19 unique image indices in the 57 downloaded files:
  // 1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34, 37, 40, 43, 46, 49, 52, 55
  const indices = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34, 37, 40, 43, 46, 49, 52, 55];
  console.log(`Inspecting ${indices.length} unique images...`);

  fs.mkdirSync('public/images/hero-slider-unique', { recursive: true });

  const metadataList = [];
  for (let i = 0; i < indices.length; i++) {
    const idx = indices[i];
    const srcPath = `public/images/hero-slider/image-${idx}.png`;
    const targetPath = `public/images/hero-slider-unique/slide-${i + 1}.png`;
    fs.copyFileSync(srcPath, targetPath);

    const meta = await sharp(targetPath).metadata();
    metadataList.push({
      slide: i + 1,
      format: meta.format,
      width: meta.width,
      height: meta.height,
      channels: meta.channels,
      hasAlpha: meta.hasAlpha,
      sizeKb: Math.round(fs.statSync(targetPath).size / 1024)
    });
  }

  console.table(metadataList);
}

async function main() {
  await checkReadme();
  await inspectImages();
}

main().catch(console.error);
