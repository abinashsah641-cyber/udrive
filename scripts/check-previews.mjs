import sharp from 'sharp';
import fs from 'fs';

async function checkPreviews() {
  const meta1 = await sharp('../Rental agreement with UDrive details_files/preview').metadata();
  console.log('preview:', meta1);

  const meta2 = await sharp('../Rental agreement with UDrive details_files/preview(1)').metadata();
  console.log('preview(1):', meta2);

  await sharp('../Rental agreement with UDrive details_files/preview').png().toFile('public/images/logo/preview.png');
  await sharp('../Rental agreement with UDrive details_files/preview(1)').png().toFile('public/images/logo/preview1.png');
}

checkPreviews().catch(console.error);
