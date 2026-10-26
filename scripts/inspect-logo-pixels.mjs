import sharp from 'sharp';

async function inspectImage() {
  const { data, info } = await sharp('public/images/logo/udrive-logo.jpeg').raw().toBuffer({ resolveWithObject: true });
  console.log('Channels:', info.channels, 'Size:', info.width, info.height);

  // Let's sample colors across the vertical center line and horizontal center line
  const centerX = Math.floor(info.width / 2);
  const centerY = Math.floor(info.height / 2);

  // Find non-black pixels with a higher threshold or check corner pixels
  const corner0 = [data[0], data[1], data[2]];
  console.log('Top-left corner pixel RGB:', corner0);

  // Check 50 random samples or row-by-row
  let coloredPixels = [];
  for (let y = 0; y < info.height; y += 40) {
    for (let x = 0; x < info.width; x += 40) {
      const idx = (y * info.width + x) * info.channels;
      const r = data[idx], g = data[idx + 1], b = data[idx + 2];
      if (r > 60 || g > 60 || b > 60) {
        coloredPixels.push({ x, y, rgb: [r, g, b] });
      }
    }
  }
  console.log(`Found ${coloredPixels.length} sampled colored pixels.`);
  if (coloredPixels.length > 0) {
    console.log('Sample colored points:', coloredPixels.slice(0, 10));
  }

  // Also inspect udrive-whatsapp.jpeg
  const wa = await sharp('public/images/logo/udrive-whatsapp.jpeg').raw().toBuffer({ resolveWithObject: true });
  const waCorner0 = [wa.data[0], wa.data[1], wa.data[2]];
  console.log('WhatsApp image Top-left corner pixel RGB:', waCorner0);
}

inspectImage().catch(console.error);
