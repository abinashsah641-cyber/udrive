import sharp from 'sharp';
import fs from 'fs';

const src = 'C:/Users/asus/.gemini/antigravity/brain/ea4b70a4-f653-46f3-be3e-05d16b819b73/.user_uploaded/media_1793013797492_a8a547d1.png';

async function processOriginalLogo() {
  const meta = await sharp(src).metadata();
  console.log('Original image dimensions:', meta.width, 'x', meta.height);

  const { data, info } = await sharp(src).raw().toBuffer({ resolveWithObject: true });
  const w = info.width, h = info.height;

  // 1. Find accurate bounding box
  let minX = w, minY = h, maxX = 0, maxY = 0;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = (y * w + x) * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const a = data[idx + 3];

      const isBg = (r > 240 && g > 240 && b > 240) || a < 20;
      if (!isBg) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  console.log('Artwork bounding box:', { minX, minY, maxX, maxY });
  const pad = 12;
  const cropLeft = Math.max(0, minX - pad);
  const cropTop = Math.max(0, minY - pad);
  const cropWidth = Math.min(w - cropLeft, (maxX - minX + 1) + pad * 2);
  const cropHeight = Math.min(h - cropTop, (maxY - minY + 1) + pad * 2);

  console.log('Crop box with padding:', { cropLeft, cropTop, cropWidth, cropHeight });

  // 2. Crop the original logo preserving the white background
  await sharp(src)
    .extract({ left: cropLeft, top: cropTop, width: cropWidth, height: cropHeight })
    .png()
    .toFile('public/images/logo/udrive-original-cropped.png');
  console.log('✓ Created udrive-original-cropped.png');

  // 3. Create transparent version:
  // Pixels where r>240, g>240, b>240 get alpha 0; antialiased edges get proportional alpha
  const croppedRaw = await sharp(src)
    .extract({ left: cropLeft, top: cropTop, width: cropWidth, height: cropHeight })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const cData = Buffer.from(croppedRaw.data);
  const cw = croppedRaw.info.width;
  const ch = croppedRaw.info.height;

  // Transparent version (for light backgrounds)
  for (let i = 0; i < cData.length; i += 4) {
    const r = cData[i];
    const g = cData[i + 1];
    const b = cData[i + 2];

    const brightness = (r + g + b) / 3;
    if (brightness > 245) {
      cData[i + 3] = 0;
    } else if (brightness > 220) {
      // smooth alpha transition for edges
      const factor = (245 - brightness) / 25;
      cData[i + 3] = Math.round(cData[i + 3] * factor);
    }
  }

  await sharp(cData, {
    raw: { width: cw, height: ch, channels: 4 }
  })
    .png()
    .toFile('public/images/logo/udrive-logo-transparent.png');
  console.log('✓ Created udrive-logo-transparent.png');

  // 4. Create Dark Background version:
  // In the original logo, "Drive" is black, the horizontal line is black.
  // On a dark (#080A0D) header/footer, black text becomes invisible!
  // To make it look stunning and 100% faithful to the official logo artwork:
  // - The Gold "U" remains exact gold
  // - The Blue Car remains exact blue
  // - The Tagline: "EVERY RIDE" remains blue, "A NEW STORY" remains gold
  // - The black "Drive" letters and underline are rendered in clean crisp pure white!
  const darkData = Buffer.from(croppedRaw.data);
  for (let i = 0; i < darkData.length; i += 4) {
    const r = darkData[i];
    const g = darkData[i + 1];
    const b = darkData[i + 2];

    const brightness = (r + g + b) / 3;
    if (brightness > 245) {
      darkData[i + 3] = 0; // transparent bg
    } else {
      // Check if this pixel is black/dark grey (the "Drive" text & underline)
      // Gold pixels have high R, high G, low B (e.g. R>200, G>160, B<100)
      // Blue pixels have B > R + 20 and G > R (e.g. R ~ 40, G ~ 90, B ~ 140)
      const isGold = (r > 180 && g > 140 && b < 100);
      const isBlue = (b > r + 30 && g > r);

      if (!isGold && !isBlue && brightness < 120) {
        // This is part of the black "Drive" text or black underline!
        // Invert to white for dark backgrounds while preserving antialiasing!
        const alpha = darkData[i + 3];
        const val = Math.round(255 - brightness);
        darkData[i] = 255;
        darkData[i + 1] = 255;
        darkData[i + 2] = 255;
        darkData[i + 3] = alpha;
      }
    }
  }

  await sharp(darkData, {
    raw: { width: cw, height: ch, channels: 4 }
  })
    .png()
    .toFile('public/images/logo/udrive-logo-dark.png');
  console.log('✓ Created udrive-logo-dark.png (optimized for dark navy/black backgrounds)');

  // 5. Also copy the original uploaded file directly so the raw original is always preserved
  fs.copyFileSync(src, 'public/images/logo/udrive-official-original.png');
  console.log('✓ Copied raw upload to udrive-official-original.png');
}

processOriginalLogo().catch(console.error);
