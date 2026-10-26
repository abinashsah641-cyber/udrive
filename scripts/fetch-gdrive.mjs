import fs from 'fs';

async function parseDriveHtml() {
  const url = 'https://drive.google.com/drive/folders/1xHFomu5_6LsHyhllVhXVJbnWngdxYbZi';
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
  });
  const text = await res.text();
  fs.writeFileSync('scripts/gdrive_page.html', text);

  // Search for file items or folder title
  const titleMatch = text.match(/<title>(.*?)<\/title>/);
  console.log('Title:', titleMatch ? titleMatch[1] : 'No title');

  // Search for any googleusercontent or drive file URLs
  const driveMatches = [...text.matchAll(/https:\/\/[^"'\s\\]*(?:drive|googleusercontent|lh3)[^"'\s\\]*/g)].map(m => m[0]);
  console.log('Drive/lh3 URLs found:', [...new Set(driveMatches)].slice(0, 20));

  // Search for 33-character Google Drive file IDs
  const idMatches = [...text.matchAll(/["']([a-zA-Z0-9_-]{33})["']/g)].map(m => m[1]);
  const uniqueIds = [...new Set(idMatches)].filter(id => id !== '1xHFomu5_6LsHyhllVhXVJbnWngdxYbZi');
  console.log('Candidate file IDs (33 chars):', uniqueIds);
}

parseDriveHtml().catch(console.error);
