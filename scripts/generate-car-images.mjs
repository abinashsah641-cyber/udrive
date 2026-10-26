import fs from 'fs';
import path from 'path';

const outDir = path.resolve('public/images/vehicles');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// 19 vehicles with their exact color palettes and styling
const vehicles = [
  {
    id: 'byd-atto-1',
    name: 'BYD Atto 1',
    type: 'hatchback',
    colorHex: '#3CD070', // Spark-Green
    accentHex: '#258F49',
    roofHex: '#101827',
    groundClearance: '175mm',
    badges: ['BYD', 'ATTO 1', 'EV']
  },
  {
    id: 'byd-atto-2',
    name: 'BYD Atto 2',
    type: 'suv',
    colorHex: '#1F242D', // Deep Metallic Black
    accentHex: '#0D1117',
    roofHex: '#15181F',
    groundClearance: '200mm',
    badges: ['BYD', 'ATTO 2', 'EV']
  },
  {
    id: 'byd-atto-3',
    name: 'BYD Atto 3',
    type: 'suv',
    colorHex: '#1E69D2', // Surf Blue
    accentHex: '#134B9C',
    roofHex: '#111827',
    groundClearance: '175mm',
    badges: ['BYD', 'ATTO 3', 'EV']
  },
  {
    id: 'nevo-e5',
    name: 'Nevo E5',
    type: 'suv',
    colorHex: '#2575FC', // Vibrant Blue with sunroof
    accentHex: '#1A50B0',
    roofHex: '#38BDF8',
    sunroof: true,
    groundClearance: '205mm',
    badges: ['NEVO', 'E5', 'SUNROOF']
  },
  {
    id: 'omoda-e5',
    name: 'Omoda E5',
    type: 'suv',
    colorHex: '#2B3240', // Dark Charcoal with sunroof
    accentHex: '#1B212D',
    roofHex: '#101827',
    sunroof: true,
    groundClearance: '191mm',
    badges: ['OMODA', 'E5', 'EV']
  },
  {
    id: 'omoda-e5-pro',
    name: 'Omoda E5 Pro',
    type: 'suv',
    colorHex: '#5EA3DE', // Cloud Blue with sunroof
    accentHex: '#3B7CB4',
    roofHex: '#101827',
    sunroof: true,
    groundClearance: '191mm',
    badges: ['OMODA', 'E5 PRO', 'EV']
  },
  {
    id: 'ridard-pickup',
    name: 'Ridard',
    type: 'pickup',
    colorHex: '#4C8CD0', // Serene Blue
    accentHex: '#2D6298',
    roofHex: '#101827',
    groundClearance: '225mm',
    badges: ['RIDARD', 'EV PICKUP', '425 KM']
  },
  {
    id: 'jaeco-j5',
    name: 'Jaeco J5',
    type: 'suv',
    colorHex: '#F0F3F7', // Alpine White
    accentHex: '#CBD5E1',
    roofHex: '#101827',
    groundClearance: '185mm',
    badges: ['JAECO', 'J5', 'EV']
  },
  {
    id: 'naami-vigo',
    name: 'Naami Vigo',
    type: 'suv',
    colorHex: '#F8FAFC', // Pearl White
    accentHex: '#D1D5DB',
    roofHex: '#38BDF8', // Large moonroof
    sunroof: true,
    groundClearance: '190mm',
    badges: ['NAAMI', 'VIGO', 'MOONROOF']
  },
  {
    id: 'naami-box',
    name: 'Naami Box',
    type: 'hatchback',
    colorHex: '#3B82F6', // Vivid Blue
    accentHex: '#1D4ED8',
    roofHex: '#F8FAFC',
    groundClearance: '196mm',
    badges: ['NAAMI', 'BOX', 'EV']
  },
  {
    id: 'i-caur',
    name: 'i-caur',
    type: 'suv',
    colorHex: '#E2E8F0', // Polar White
    accentHex: '#94A3B8',
    roofHex: '#0F172A',
    groundClearance: '195mm',
    badges: ['i-CAUR', 'BOX-SUV', 'EV']
  },
  {
    id: 'deepal-s05',
    name: 'Deepal S05',
    type: 'suv',
    colorHex: '#1E293B', // Black/White dual tone
    accentHex: '#0F172A',
    roofHex: '#F1F5F9',
    groundClearance: '175mm',
    badges: ['DEEPAL', 'S05', 'EV']
  },
  {
    id: 'deepal-s07',
    name: 'Deepal S07',
    type: 'suv',
    colorHex: '#146C65', // Deep Aurora Emerald/Green
    accentHex: '#0C443F',
    roofHex: '#0F172A',
    groundClearance: '175mm',
    badges: ['DEEPAL', 'S07', '485 KM']
  },
  {
    id: 'grand-i10',
    name: 'Grand i10',
    type: 'hatchback',
    colorHex: '#C5CCD6', // Sleek Silver
    accentHex: '#9CA3AF',
    roofHex: '#C5CCD6',
    groundClearance: '165mm',
    badges: ['HYUNDAI', 'GRAND i10', 'PETROL']
  },
  {
    id: 'nissan-magnite',
    name: 'Nissan Magnite',
    type: 'suv',
    colorHex: '#BAC4D0', // Blade Silver
    accentHex: '#8C97A5',
    roofHex: '#101827',
    groundClearance: '205mm',
    badges: ['NISSAN', 'MAGNITE', 'SUV']
  },
  {
    id: 'hyundai-i20',
    name: 'i20',
    type: 'hatchback',
    colorHex: '#B4BCC8', // Metallic Silver
    accentHex: '#858E9B',
    roofHex: '#B4BCC8',
    groundClearance: '170mm',
    badges: ['HYUNDAI', 'i20', 'PETROL']
  },
  {
    id: 'vw-polo',
    name: 'Volkswagen Polo',
    type: 'hatchback',
    colorHex: '#EDF2F7', // Pure White
    accentHex: '#CBD5E1',
    roofHex: '#EDF2F7',
    groundClearance: '165mm',
    badges: ['VOLKSWAGEN', 'POLO', 'PETROL']
  },
  {
    id: 'kia-sonet',
    name: 'Kia Sonet',
    type: 'suv',
    colorHex: '#F3F4F6', // Clear White
    accentHex: '#D1D5DB',
    roofHex: '#1E293B',
    groundClearance: '205mm',
    badges: ['KIA', 'SONET', 'PETROL']
  },
  {
    id: 'toyota-hilux-4x4',
    name: 'Toyota Hilux 4x4',
    type: 'pickup',
    colorHex: '#F8FAFC', // Super White
    accentHex: '#CBD5E1',
    roofHex: '#1E293B',
    groundClearance: '310mm',
    badges: ['TOYOTA', 'HILUX 4x4', 'DIESEL']
  }
];

function generateCarSvg(v) {
  const isPickup = v.type === 'pickup';
  const isHatch = v.type === 'hatchback';
  const isSuv = v.type === 'suv';

  // Body profile coordinates
  let bodyPath = '';
  let cabinPath = '';
  let bedPath = '';

  if (isPickup) {
    // Pickup profile with truck bed
    bodyPath = 'M 70 240 L 120 235 L 190 190 L 320 185 L 420 185 L 460 215 L 670 215 L 685 245 L 680 270 L 610 270 A 55 55 0 0 0 500 270 L 250 270 A 55 55 0 0 0 140 270 L 60 270 Z';
    cabinPath = 'M 205 195 L 315 190 L 415 190 L 440 220 L 210 220 Z';
    bedPath = '<line x1="450" y1="215" x2="450" y2="265" stroke="#0F172A" stroke-width="4" stroke-opacity="0.4" />';
  } else if (isHatch) {
    // Sleek aerodynamic hatchback profile
    bodyPath = 'M 75 250 L 140 238 L 220 195 L 360 190 L 490 200 L 590 235 L 635 255 L 630 272 L 560 272 A 50 50 0 0 0 460 272 L 230 272 A 50 50 0 0 0 130 272 L 65 272 Z';
    cabinPath = 'M 230 200 L 355 195 L 475 205 L 530 235 L 220 235 Z';
  } else {
    // Modern SUV profile
    bodyPath = 'M 70 245 L 135 235 L 210 188 L 380 185 L 530 188 L 600 225 L 645 250 L 640 272 L 570 272 A 52 52 0 0 0 466 272 L 240 272 A 52 52 0 0 0 136 272 L 60 272 Z';
    cabinPath = 'M 220 194 L 375 190 L 515 194 L 565 228 L 210 228 Z';
  }

  const frontWheelX = isPickup ? 195 : (isHatch ? 180 : 188);
  const rearWheelX = isPickup ? 555 : (isHatch ? 510 : 518);
  const wheelY = 270;
  const wheelR = isPickup ? 48 : 42;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 360" width="100%" height="100%">
  <defs>
    <!-- Background studio glow -->
    <radialGradient id="studioGlow" cx="50%" cy="60%" r="65%">
      <stop offset="0%" stop-color="#1E293B" stop-opacity="0.6"/>
      <stop offset="60%" stop-color="#0F172A" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#0B0F19" stop-opacity="1"/>
    </radialGradient>
    
    <!-- Paint Gradient -->
    <linearGradient id="bodyPaint" x1="0%" y1="0%" x2="100%" y2="80%">
      <stop offset="0%" stop-color="${v.colorHex}"/>
      <stop offset="50%" stop-color="${v.colorHex}"/>
      <stop offset="100%" stop-color="${v.accentHex}"/>
    </linearGradient>

    <!-- Glass Gradient -->
    <linearGradient id="windowGlass" x1="20%" y1="0%" x2="80%" y2="100%">
      <stop offset="0%" stop-color="#1E293B" stop-opacity="0.9"/>
      <stop offset="50%" stop-color="#38BDF8" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#0F172A" stop-opacity="0.95"/>
    </linearGradient>

    <!-- Chrome Rim Gradient -->
    <linearGradient id="rimChrome" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E2E8F0"/>
      <stop offset="50%" stop-color="#64748B"/>
      <stop offset="100%" stop-color="#334155"/>
    </linearGradient>

    <!-- Floor Shadow Filter -->
    <filter id="carShadow" x="-20%" y="-20%" width="140%" height="160%">
      <feGaussianBlur stdDeviation="8" result="blur"/>
    </filter>

    <!-- Electric Accent Glow -->
    <filter id="electricGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="4" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>

  <!-- Studio Backdrop with grid mesh -->
  <rect width="720" height="360" rx="16" fill="url(#studioGlow)"/>
  
  <g opacity="0.08" stroke="#FFFFFF" stroke-width="1">
    <line x1="0" y1="80" x2="720" y2="80"/>
    <line x1="0" y1="160" x2="720" y2="160"/>
    <line x1="0" y1="240" x2="720" y2="240"/>
    <line x1="0" y1="300" x2="720" y2="300"/>
    <line x1="160" y1="0" x2="160" y2="360"/>
    <line x1="360" y1="0" x2="360" y2="360"/>
    <line x1="560" y1="0" x2="560" y2="360"/>
  </g>

  <!-- Model Badge & Header in Canvas -->
  <g transform="translate(36, 42)">
    <rect x="0" y="0" width="80" height="20" rx="4" fill="#B8F451" fill-opacity="0.15"/>
    <text x="40" y="14" fill="#B8F451" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="10" text-anchor="middle" letter-spacing="1">${v.badges[0]}</text>
    <text x="92" y="15" fill="#FFFFFF" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="15" letter-spacing="0.5">${v.name}</text>
    <text x="92" y="32" fill="#94A3B8" font-family="system-ui, sans-serif" font-size="11">Ground Clearance: ${v.groundClearance} • ${v.badges[2] || 'Verified'}</text>
  </g>

  <!-- Ground Shadow Plane -->
  <ellipse cx="370" cy="308" rx="280" ry="16" fill="#000000" opacity="0.75" filter="url(#carShadow)"/>
  <ellipse cx="370" cy="306" rx="220" ry="8" fill="#B8F451" opacity="0.12" filter="url(#carShadow)"/>

  <!-- Car Body Main -->
  <g>
    <!-- Roof highlight if sunroof -->
    ${v.sunroof ? `<rect x="260" y="186" width="120" height="4" rx="2" fill="#38BDF8" opacity="0.85"/>` : ''}

    <!-- Main Silhouette -->
    <path d="${bodyPath}" fill="url(#bodyPaint)" stroke="#FFFFFF" stroke-opacity="0.15" stroke-width="1.5"/>

    <!-- Door Lines / Paneling -->
    <line x1="335" y1="195" x2="330" y2="265" stroke="#000000" stroke-width="1.8" stroke-opacity="0.45"/>
    <line x1="435" y1="195" x2="430" y2="265" stroke="#000000" stroke-width="1.8" stroke-opacity="0.45"/>
    ${bedPath}

    <!-- Windows & Cabin Glass -->
    <path d="${cabinPath}" fill="url(#windowGlass)" stroke="#FFFFFF" stroke-opacity="0.2" stroke-width="1"/>
    
    <!-- Window Pillars (A, B, C pillars) -->
    <line x1="325" y1="190" x2="325" y2="225" stroke="${v.roofHex}" stroke-width="8"/>
    <line x1="420" y1="190" x2="420" y2="225" stroke="${v.roofHex}" stroke-width="8"/>

    <!-- Aerodynamic Character Crease -->
    <path d="M 120 236 Q 360 220 620 248" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-opacity="0.25"/>
    <path d="M 140 248 Q 360 238 590 258" fill="none" stroke="#000000" stroke-width="1.5" stroke-opacity="0.4"/>

    <!-- Headlight Unit (Modern LED DRL) -->
    <path d="M 68 248 L 105 240 L 98 255 Z" fill="#F8FAFC" filter="url(#electricGlow)"/>
    <circle cx="85" cy="246" r="4" fill="#38BDF8" filter="url(#electricGlow)"/>

    <!-- Tail Light Unit -->
    <path d="M 632 254 L 644 252 L 640 262 Z" fill="#EF4444" filter="url(#electricGlow)"/>

    <!-- Door Handles -->
    <rect x="300" y="228" width="18" height="4" rx="2" fill="#FFFFFF" fill-opacity="0.3"/>
    <rect x="395" y="228" width="18" height="4" rx="2" fill="#FFFFFF" fill-opacity="0.3"/>

    <!-- Front & Rear Bumpers -->
    <rect x="55" y="260" width="22" height="12" rx="3" fill="#0F172A" opacity="0.6"/>
    <rect x="635" y="260" width="15" height="12" rx="3" fill="#0F172A" opacity="0.6"/>

    <!-- Side Skirt in Dark Slate -->
    <path d="M ${frontWheelX + wheelR + 4} 270 L ${rearWheelX - wheelR - 4} 270" stroke="#0F172A" stroke-width="6" stroke-linecap="round"/>
  </g>

  <!-- Front Wheel Assembly -->
  <g transform="translate(${frontWheelX}, ${wheelY})">
    <!-- Tire rubber -->
    <circle cx="0" cy="0" r="${wheelR}" fill="#18181B" stroke="#09090B" stroke-width="4"/>
    <circle cx="0" cy="0" r="${wheelR - 10}" fill="#27272A"/>
    <!-- Alloy Rim -->
    <circle cx="0" cy="0" r="${wheelR - 14}" fill="url(#rimChrome)"/>
    <!-- Disc brake rotor & caliper -->
    <circle cx="0" cy="0" r="${wheelR - 20}" fill="#475569" stroke="#94A3B8" stroke-width="1"/>
    <rect x="-6" y="-18" width="12" height="8" rx="2" fill="#B8F451"/>
    <!-- Multi-spoke pattern -->
    <line x1="0" y1="-22" x2="0" y2="22" stroke="#E2E8F0" stroke-width="3"/>
    <line x1="-22" y1="0" x2="22" y2="0" stroke="#E2E8F0" stroke-width="3"/>
    <line x1="-16" y1="-16" x2="16" y2="16" stroke="#E2E8F0" stroke-width="2.5"/>
    <line x1="-16" y1="16" x2="16" y2="-16" stroke="#E2E8F0" stroke-width="2.5"/>
    <!-- Center Hub -->
    <circle cx="0" cy="0" r="7" fill="#0F172A" stroke="#B8F451" stroke-width="1.5"/>
  </g>

  <!-- Rear Wheel Assembly -->
  <g transform="translate(${rearWheelX}, ${wheelY})">
    <!-- Tire rubber -->
    <circle cx="0" cy="0" r="${wheelR}" fill="#18181B" stroke="#09090B" stroke-width="4"/>
    <circle cx="0" cy="0" r="${wheelR - 10}" fill="#27272A"/>
    <!-- Alloy Rim -->
    <circle cx="0" cy="0" r="${wheelR - 14}" fill="url(#rimChrome)"/>
    <!-- Disc brake rotor & caliper -->
    <circle cx="0" cy="0" r="${wheelR - 20}" fill="#475569" stroke="#94A3B8" stroke-width="1"/>
    <rect x="-6" y="-18" width="12" height="8" rx="2" fill="#B8F451"/>
    <!-- Multi-spoke pattern -->
    <line x1="0" y1="-22" x2="0" y2="22" stroke="#E2E8F0" stroke-width="3"/>
    <line x1="-22" y1="0" x2="22" y2="0" stroke="#E2E8F0" stroke-width="3"/>
    <line x1="-16" y1="-16" x2="16" y2="16" stroke="#E2E8F0" stroke-width="2.5"/>
    <line x1="-16" y1="16" x2="16" y2="-16" stroke="#E2E8F0" stroke-width="2.5"/>
    <!-- Center Hub -->
    <circle cx="0" cy="0" r="7" fill="#0F172A" stroke="#B8F451" stroke-width="1.5"/>
  </g>

  <!-- Subtle watermark signature -->
  <text x="684" y="342" fill="#64748B" opacity="0.6" font-family="'Space Grotesk', sans-serif" font-size="10" font-weight="600" text-anchor="end" letter-spacing="1">UDRIVE NEPAL</text>
</svg>`;
}

for (const v of vehicles) {
  const svg = generateCarSvg(v);
  const filePath = path.join(outDir, `${v.id}.svg`);
  fs.writeFileSync(filePath, svg, 'utf-8');
  console.log(`Generated: ${v.id}.svg`);
}

// Generate fallback-car.svg
const fallbackSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 360" width="100%" height="100%">
  <rect width="720" height="360" rx="16" fill="#101827"/>
  <ellipse cx="360" cy="290" rx="240" ry="14" fill="#000000" opacity="0.6"/>
  <path d="M 120 245 L 200 190 L 380 185 L 530 190 L 600 230 L 620 260 L 100 260 Z" fill="#1E293B" stroke="#B8F451" stroke-width="2"/>
  <circle cx="210" cy="260" r="36" fill="#334155" stroke="#94A3B8" stroke-width="3"/>
  <circle cx="510" cy="260" r="36" fill="#334155" stroke="#94A3B8" stroke-width="3"/>
  <text x="360" y="140" fill="#B8F451" font-family="'Space Grotesk', sans-serif" font-size="20" font-weight="700" text-anchor="middle">UDRIVE RENTAL SERVICE</text>
  <text x="360" y="165" fill="#94A3B8" font-family="sans-serif" font-size="14" text-anchor="middle">Vehicle Preview</text>
</svg>`;
fs.writeFileSync(path.join(outDir, 'fallback-car.svg'), fallbackSvg, 'utf-8');
console.log('Generated: fallback-car.svg');
