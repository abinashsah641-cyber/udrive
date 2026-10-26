import sharp from 'sharp';

async function checkPreviewContent() {
  const meta1 = await sharp('public/images/logo/preview.png').metadata();
  console.log('preview.png:', meta1.width, 'x', meta1.height);

  const { data: d1 } = await sharp('public/images/logo/preview.png').raw().toBuffer({ resolveWithObject: true });
  // check top left, center, etc.
  console.log('Sample d1 corner:', d1[0], d1[1], d1[2]);

  const { data: d2, info: i2 } = await sharp('public/images/logo/preview1.png').raw().toBuffer({ resolveWithObject: true });
  console.log('preview1.png:', i2.width, 'x', i2.height);
  console.log('Sample d2 corner:', d2[0], d2[1], d2[2]);
}

checkPreviewContent().catch(console.error);
