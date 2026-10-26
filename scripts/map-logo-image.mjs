import sharp from 'sharp';

async function mapImage() {
  const { data, info } = await sharp('public/images/logo/udrive-logo.jpeg').raw().toBuffer({ resolveWithObject: true });
  const w = info.width, h = info.height;

  // Let's create an ASCII map or print y coordinates where gold or blue appears!
  // Gold: #FFD83D (high R, high G, lower B) -> R > 200, G > 180, B < 120
  // Automotive Blue: #28618F -> R < 80, G in 70-130, B in 110-180
  let goldPoints = [];
  let bluePoints = [];

  for (let y = 0; y < h; y += 4) {
    for (let x = 0; x < w; x += 4) {
      const idx = (y * w + x) * info.channels;
      const r = data[idx], g = data[idx + 1], b = data[idx + 2];

      if (r > 180 && g > 150 && b < 100) {
        goldPoints.push({ x, y, r, g, b });
      }
      if (r < 80 && g > 60 && g < 150 && b > 100) {
        bluePoints.push({ x, y, r, g, b });
      }
    }
  }

  console.log(`Gold points found: ${goldPoints.length}`);
  console.log(`Blue points found: ${bluePoints.length}`);

  if (goldPoints.length > 0) {
    const minX = Math.min(...goldPoints.map(p => p.x));
    const maxX = Math.max(...goldPoints.map(p => p.x));
    const minY = Math.min(...goldPoints.map(p => p.y));
    const maxY = Math.max(...goldPoints.map(p => p.y));
    console.log(`Gold region: x=[${minX}, ${maxX}], y=[${minY}, ${maxY}]`);
  }

  if (bluePoints.length > 0) {
    const minX = Math.min(...bluePoints.map(p => p.x));
    const maxX = Math.max(...bluePoints.map(p => p.x));
    const minY = Math.min(...bluePoints.map(p => p.y));
    const maxY = Math.max(...bluePoints.map(p => p.y));
    console.log(`Blue region: x=[${minX}, ${maxX}], y=[${minY}, ${maxY}]`);
  }

  // Also check udrive-whatsapp.jpeg
  const wa = await sharp('public/images/logo/udrive-whatsapp.jpeg').raw().toBuffer({ resolveWithObject: true });
  let waGold = [];
  let waBlue = [];
  for (let y = 0; y < wa.info.height; y += 4) {
    for (let x = 0; x < wa.info.width; x += 4) {
      const idx = (y * wa.info.width + x) * wa.info.channels;
      const r = wa.data[idx], g = wa.data[idx + 1], b = wa.data[idx + 2];
      if (r > 180 && g > 150 && b < 100) waGold.push({ x, y });
      if (r < 80 && g > 60 && g < 150 && b > 100) waBlue.push({ x, y });
    }
  }
  console.log(`WhatsApp image Gold points: ${waGold.length}, Blue points: ${waBlue.length}`);
  if (waGold.length > 0) {
    console.log(`WhatsApp Gold region: x=[${Math.min(...waGold.map(p => p.x))}, ${Math.max(...waGold.map(p => p.x))}], y=[${Math.min(...waGold.map(p => p.y))}, ${Math.max(...waGold.map(p => p.y))}]`);
  }
  if (waBlue.length > 0) {
    console.log(`WhatsApp Blue region: x=[${Math.min(...waBlue.map(p => p.x))}, ${Math.max(...waBlue.map(p => p.y))}], y=[${Math.min(...waBlue.map(p => p.y))}, ${Math.max(...waBlue.map(p => p.y))}]`);
  }
}

mapImage().catch(console.error);
