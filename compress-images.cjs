// Lossless WebP conversion: every pixel stays identical, original size is kept.
// Setup:  npm i -D sharp
// Run:    node compress-images.js
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const dir = './src/images';
const out = './src/images/compressed';
fs.mkdirSync(out, { recursive: true });

// Only the mockups used on the Projects page. Add more filenames as needed.
const files = [
  'scaffold-main.png',
  'picki-main.png',
  'playlist-mockup.png',
  'dress-up-mockup.png',
  'canmockup.png',
  'poster-main.png',
  'HSC_WHITEWOVEN-ON-BLACK.jpg'
];

(async () => {
  for (const file of files) {
    const input = path.join(dir, file);
    if (!fs.existsSync(input)) {
      console.log('skipped (not found):', file);
      continue;
    }
    const output = path.join(out, file.replace(/\.[^.]+$/, '.webp'));
    await sharp(input).webp({ lossless: true }).toFile(output);
    const before = (fs.statSync(input).size / 1024).toFixed(0);
    const after = (fs.statSync(output).size / 1024).toFixed(0);
    console.log(`${file}: ${before}KB -> ${after}KB`);
  }
})();