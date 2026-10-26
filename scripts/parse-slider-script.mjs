import fs from 'fs';

try {
  const content = fs.readFileSync('scripts/slider_bundle/script.js', 'utf8');
  // Find the vehicles array
  const match = content.match(/const\s+vehicles\s*=\s*(\[[\s\S]*?\]);/);
  if (match) {
    console.log('Vehicles array found!');
    fs.writeFileSync('scripts/vehicles_from_slider.json', match[1]);
    const parsed = eval(match[1]);
    console.log(`Parsed ${parsed.length} vehicles from script.js:`);
    for (const v of parsed) {
      console.log(`- ${v.name} (${v.type || v.category || ''}) -> ${v.image || v.img || v.file || ''}`);
    }
  } else {
    console.log('Vehicles array not matched via regex, printing first 2000 chars:');
    console.log(content.slice(0, 2000));
  }
} catch(e) {
  console.log('Error reading script.js:', e.message);
}
