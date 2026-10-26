import sharp from 'sharp';
import fs from 'fs';

async function processLogo() {
  const inputPath = 'public/images/logo/udrive-logo.jpeg';
  const img = sharp(inputPath);
  const metadata = await img.metadata();
  console.log('Original dimensions:', metadata.width, 'x', metadata.height);

  // Get raw pixel data to find bounding box
  const { data, info } = await sharp(inputPath).raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  let minX = width, minY = height, maxX = 0, maxY = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      
      // Black threshold (darker than 35 in all channels)
      if (r > 35 || g > 35 || b > 35) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  console.log(`Bounding box: left=${minX}, top=${minY}, right=${maxX}, bottom=${maxY}`);
  const pad = 20;
  const cropLeft = Math.max(0, minX - pad);
  const cropTop = Math.max(0, minY - pad);
  const cropWidth = Math.min(width - cropLeft, (maxX - minX) + pad * 2);
  const cropHeight = Math.min(height - cropTop, (maxY - minY) + pad * 2);

  console.log(`Cropped size: ${cropWidth} x ${cropHeight}`);

  // 1. Export cropped logo with crisp dark background (perfect for dark navbar/footer)
  await sharp(inputPath)
    .extract({ left: cropLeft, top: cropTop, width: cropWidth, height: cropHeight })
    .png({ quality: 100 })
    .toFile('public/images/logo/udrive-logo-dark.png');
  console.log('✓ Created udrive-logo-dark.png');

  // 2. Export transparent version:
  // Convert near-black pixels to transparent alpha while preserving the gold and blue artwork
  const croppedRaw = await sharp(inputPath)
    .extract({ left: cropLeft, top: cropTop, width: cropWidth, height: cropHeight })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const cData = croppedRaw.data;
  const cWidth = croppedRaw.info.width;
  const cHeight = croppedRaw.info.height;

  for (let i = 0; i < cData.length; i += 4) {
    const r = cData[i];
    const g = cData[i + 1];
    const b = cData[i + 2];
    const brightness = Math.max(r, g, b);

    if (brightness < 30) {
      cData[i + 3] = 0; // Completely transparent
    } else if (brightness < 60) {
      // Smooth alpha transition to prevent jagged edges
      cData[i + 3] = Math.round(((brightness - 30) / 30) * 255);
    }
  }

  await sharp(cData, {
    raw: {
      width: cWidth,
      height: cHeight,
      channels: 4,
    },
  })
    .png()
    .toFile('public/images/logo/udrive-logo-transparent.png');
  console.log('✓ Created udrive-logo-transparent.png');

  // Check the whatsapp image as well
  const waMeta = await sharp('public/images/logo/udrive-whatsapp.jpeg').metadata();
  console.log('WhatsApp image dimensions:', waMeta.width, 'x', waMeta.height);
}

processLogo().catch(console.error);
