import fs from 'fs';
import path from 'path';

const outDir = path.resolve('public/images/vehicles');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// 19 vehicle real images mapping to Wikimedia Commons
const realCarImages = [
  {
    id: 'byd-atto-1',
    fileName: 'byd-atto-1.jpg',
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/2023_BYD_Seagull_(front).jpg?width=1000',
  },
  {
    id: 'byd-atto-2',
    fileName: 'byd-atto-2.jpg',
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/BYD_Yuan_Up_001.jpg?width=1000',
  },
  {
    id: 'byd-atto-3',
    fileName: 'byd-atto-3.jpg',
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/2023_BYD_Atto_3_Design.jpg?width=1000',
  },
  {
    id: 'nevo-e5',
    fileName: 'nevo-e5.jpg',
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Nevo_Q05_001.jpg?width=1000',
  },
  {
    id: 'omoda-e5',
    fileName: 'omoda-e5.jpg',
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/2022_Chery_Omoda_5.jpg?width=1000',
  },
  {
    id: 'omoda-e5-pro',
    fileName: 'omoda-e5-pro.jpg',
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/2023_Chery_Omoda_5_GT_front.jpg?width=1000',
  },
  {
    id: 'ridard-pickup',
    fileName: 'ridard-pickup.jpg',
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/2022_Radar_RD6_(front).jpg?width=1000',
  },
  {
    id: 'jaeco-j5',
    fileName: 'jaeco-j5.jpg',
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Jaecoo_J7.jpg?width=1000',
  },
  {
    id: 'naami-vigo',
    fileName: 'naami-vigo.jpg',
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Dongfeng_Nammi_01_at_Auto_Guangzhou_2023_20231126.jpg?width=1000',
  },
  {
    id: 'naami-box',
    fileName: 'naami-box.jpg',
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Dongfeng_Box_IMG_6862.jpg?width=1000',
  },
  {
    id: 'i-caur',
    fileName: 'i-caur.jpg',
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/ICar_03_001.jpg?width=1000',
  },
  {
    id: 'deepal-s05',
    fileName: 'deepal-s05.jpg',
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/2023_Chang%27an_Shenlan_S7.jpg?width=1000',
  },
  {
    id: 'deepal-s07',
    fileName: 'deepal-s07.jpg',
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/2023_Chang%27an_Shenlan_S7.jpg?width=1000',
  },
  {
    id: 'grand-i10',
    fileName: 'grand-i10.jpg',
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Hyundai_Grand_i10_front_view.jpg?width=1000',
  },
  {
    id: 'nissan-magnite',
    fileName: 'nissan-magnite.jpg',
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/2021_Nissan_Magnite_Premium_(Indonesia)_front_view.jpg?width=1000',
  },
  {
    id: 'hyundai-i20',
    fileName: 'hyundai-i20.jpg',
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Hyundai_i20.JPG?width=1000',
  },
  {
    id: 'vw-polo',
    fileName: 'vw-polo.jpg',
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Volkswagen_polo.jpg?width=1000',
  },
  {
    id: 'kia-sonet',
    fileName: 'kia-sonet.jpg',
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/2021_Kia_Sonet_1.5_Premiere_(Indonesia)_front_view_03.jpg?width=1000',
  },
  {
    id: 'toyota-hilux-4x4',
    fileName: 'toyota-hilux-4x4.jpg',
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Toyota_Hilux_2.4_E_4x2_2020.jpg?width=1000',
  },
];

async function downloadFile(url, dest) {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'UDriveNepalAutomotiveWebsite/1.0 (contact@udrive.com.np)',
      },
      redirect: 'follow',
    });
    if (!res.ok) {
      console.warn(`HTTP ${res.status} for ${url}`);
      return false;
    }
    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFileSync(dest, buffer);
    return true;
  } catch (err) {
    console.warn(`Error downloading ${url}:`, err.message);
    return false;
  }
}

async function main() {
  console.log('Downloading real automotive photos for all 19 vehicles...');
  let downloadedCount = 0;

  for (const item of realCarImages) {
    const filePath = path.join(outDir, item.fileName);
    console.log(`Downloading: ${item.id} -> ${item.fileName}`);
    const success = await downloadFile(item.url, filePath);
    if (success) {
      const stats = fs.statSync(filePath);
      console.log(`✓ Saved ${item.fileName} (${(stats.size / 1024).toFixed(1)} KB)`);
      downloadedCount++;
    } else {
      console.log(`✗ Could not download ${item.fileName}, keeping existing asset`);
    }
  }

  console.log(`\nSuccessfully downloaded ${downloadedCount}/${realCarImages.length} real vehicle photographs!`);
}

main().catch(console.error);
