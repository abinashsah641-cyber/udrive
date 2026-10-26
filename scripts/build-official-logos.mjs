import sharp from 'sharp';
import fs from 'fs';

const src = 'C:/Users/asus/.gemini/antigravity/brain/ea4b70a4-f653-46f3-be3e-05d16b819b73/.user_uploaded/media_1793013797492_a8a547d1.png';

async function buildLogos() {
  const { data, info } = await sharp(src).raw().toBuffer({ resolveWithObject: true });
  const w = info.width, h = info.height;

  // 1. Find bounding box of visible pixels (alpha > 15)
  let minX = w, minY = h, maxX = 0, maxY = 0;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = (y * w + x) * 4;
      const a = data[idx + 3];
      if (a > 15) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  console.log('Original visible bbox:', { minX, minY, maxX, maxY });
  
  // Add proportional clean padding
  const padX = 16;
  const padY = 12;
  const cropLeft = Math.max(0, minX - padX);
  const cropTop = Math.max(0, minY - padY);
  const cropWidth = Math.min(w - cropLeft, (maxX - minX + 1) + padX * 2);
  const cropHeight = Math.min(h - cropTop, (maxY - minY + 1) + padY * 2);

  console.log('Final crop box:', { cropLeft, cropTop, cropWidth, cropHeight });

  // 2. Crop the exact original with transparency (for light backgrounds)
  await sharp(src)
    .extract({ left: cropLeft, top: cropTop, width: cropWidth, height: cropHeight })
    .png({ quality: 100 })
    .toFile('public/images/logo/udrive-logo-original.png');

  // Copy to udrive-logo-light.png and udrive-logo-transparent.png
  fs.copyFileSync('public/images/logo/udrive-logo-original.png', 'public/images/logo/udrive-logo-light.png');
  fs.copyFileSync('public/images/logo/udrive-logo-original.png', 'public/images/logo/udrive-logo-transparent.png');
  console.log('✓ Created udrive-logo-original.png, udrive-logo-light.png, udrive-logo-transparent.png');

  // 3. Create the Dark Background Version:
  // Invert the black 'Drive' text and black underline to pure crisp white (#FFFFFF)
  // while keeping Gold U and Blue Car and the Taglines 100% intact!
  const croppedRaw = await sharp(src)
    .extract({ left: cropLeft, top: cropTop, width: cropWidth, height: cropHeight })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const darkBuffer = Buffer.from(croppedRaw.data);
  const cw = croppedRaw.info.width;
  const ch = croppedRaw.info.height;

  for (let i = 0; i < darkBuffer.length; i += 4) {
    const a = darkBuffer[i + 3];
    if (a < 15) continue; // transparent pixel

    const r = darkBuffer[i];
    const g = darkBuffer[i + 1];
    const b = darkBuffer[i + 2];

    // Identify Gold (R > 180, G > 140, B < 120)
    const isGold = (r > 160 && g > 130 && b < 110);
    // Identify Blue (B > 80, B > R + 25)
    const isBlue = (b > 80 && b > r + 25);

    // If it's not gold and not blue, it's the black "Drive" letters or black underline
    if (!isGold && !isBlue) {
      // Invert brightness towards 255 (white)
      // For antialiasing: keep alpha exactly intact, but set RGB to 255
      darkBuffer[i] = 255;
      darkBuffer[i + 1] = 255;
      darkBuffer[i + 2] = 255;
    }
  }

  await sharp(darkBuffer, {
    raw: { width: cw, height: ch, channels: 4 }
  })
    .png({ quality: 100 })
    .toFile('public/images/logo/udrive-logo-dark.png');
  console.log('✓ Created udrive-logo-dark.png (customized for dark midnight headers/footers)');

  // 4. Create an icon crop for favicon/brand mark (The Gold U + Car)
  // In the crop, U is at left (x ~ 10 to 120, y ~ 10 to 140)
  const iconPad = 8;
  const uWidth = 140;
  await sharp(src)
    .extract({ left: Math.max(0, minX - iconPad), top: Math.max(0, minY - iconPad), width: uWidth, height: cropHeight })
    .png({ quality: 100 })
    .toFile('public/images/logo/udrive-icon.png');
  console.log('✓ Created udrive-icon.png');
}

buildLogos().catch(console.error);
