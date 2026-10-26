async function verifyBrand() {
  const res = await fetch('http://localhost:3001/');
  const html = await res.text();
  console.log('Homepage contains "Every Ride A New Story":', html.includes('Every Ride A New Story'));
  console.log('Homepage contains "udrive-logo-dark.svg":', html.includes('udrive-logo-dark.svg'));
  console.log('Homepage contains "U Drive":', html.includes('U Drive'));
  console.log('Homepage contains "Deepal S07":', html.includes('Deepal S07'));
  console.log('Homepage contains "Toyota Hilux":', html.includes('Toyota Hilux'));
}

verifyBrand().catch(console.error);
