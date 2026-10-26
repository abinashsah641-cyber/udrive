import fs from 'fs';
import path from 'path';

const storePath = path.resolve('.data/udrive-store.json');
const initialVehiclesPath = path.resolve('data/initial-vehicles.ts');

let initialContent = fs.readFileSync(initialVehiclesPath, 'utf-8');
initialContent = initialContent.replace(/\.svg/g, '.jpg');
fs.writeFileSync(initialVehiclesPath, initialContent, 'utf-8');
console.log('✓ Updated data/initial-vehicles.ts with .jpg paths');

if (fs.existsSync(storePath)) {
  const store = JSON.parse(fs.readFileSync(storePath, 'utf-8'));
  store.vehicles = store.vehicles.map((v) => ({
    ...v,
    image: `/images/vehicles/${v.id}.jpg`,
    gallery: [`/images/vehicles/${v.id}.jpg`],
  }));
  fs.writeFileSync(storePath, JSON.stringify(store, null, 2), 'utf-8');
  console.log('✓ Updated .data/udrive-store.json with .jpg paths');
}
