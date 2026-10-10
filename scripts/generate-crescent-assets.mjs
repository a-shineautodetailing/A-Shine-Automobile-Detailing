import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

async function generateAllAssets() {
  const src = path.resolve('assets-src/logo-crescent-original.jpg');
  
  // 1. Trim whitespace
  const trimmed = await sharp(src).trim().toBuffer({ resolveWithObject: true });
  const width = trimmed.info.width;
  const height = trimmed.info.height;

  // 2. Extract alpha channel cleanly (make white background transparent)
  const { data } = await sharp(trimmed.data)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const out = Buffer.from(data);
  for (let i = 0; i < out.length; i += 4) {
    const r = out[i];
    const g = out[i+1];
    const b = out[i+2];
    const minC = Math.min(r, g, b);
    if (minC > 235) {
      const avg = (r + g + b) / 3;
      if (avg >= 249) {
        out[i+3] = 0;
      } else {
        out[i+3] = Math.round(255 * (1 - (avg - 235) / (249 - 235)));
      }
    }
  }

  // Raw transparent buffer with minimal padding
  const transparentBuffer = await sharp(out, { raw: { width, height, channels: 4 } })
    .extend({ top: 12, bottom: 12, left: 12, right: 12, background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  // Save public/crescent-logo.png and public/crescent-logo.webp
  await sharp(transparentBuffer)
    .resize({ width: 512, withoutEnlargement: true })
    .png({ quality: 95 })
    .toFile(path.resolve('public/crescent-logo.png'));

  await sharp(transparentBuffer)
    .resize({ width: 512, withoutEnlargement: true })
    .webp({ quality: 90 })
    .toFile(path.resolve('public/crescent-logo.webp'));

  // Also update public/logo.png and public/logo.webp
  await sharp(transparentBuffer)
    .resize({ width: 512, withoutEnlargement: true })
    .png({ quality: 95 })
    .toFile(path.resolve('public/logo.png'));

  await sharp(transparentBuffer)
    .resize({ width: 512, withoutEnlargement: true })
    .webp({ quality: 90 })
    .toFile(path.resolve('public/logo.webp'));

  // Helper to make crisp icons with white rounded square background
  // Minimal padding so the crescent moon is large, bold and clearly visible on tiny tabs
  async function makeIcon(size, borderRadius, padding) {
    const innerW = size - (padding * 2);
    const innerH = size - (padding * 2);
    const resizedLogo = await sharp(transparentBuffer)
      .resize(innerW, innerH, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .toBuffer({ resolveWithObject: true });

    // Center resized logo inside inner bounds
    const topOffset = Math.round((size - resizedLogo.info.height) / 2);
    const leftOffset = Math.round((size - resizedLogo.info.width) / 2);

    const roundedRectSvg = Buffer.from(
      `<svg width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${borderRadius}" ry="${borderRadius}" fill="#ffffff"/></svg>`
    );

    return sharp(roundedRectSvg)
      .composite([{ input: resizedLogo.data, top: topOffset, left: leftOffset }])
      .png();
  }

  // 1. Dedicated browser tab favicons:
  // 48x48 crescent-favicon.png with 2px padding and 8px border-radius
  const fav48 = await makeIcon(48, 8, 2);
  await fav48.toFile(path.resolve('public/crescent-favicon.png'));
  await fav48.toFile(path.resolve('public/favicon.ico'));
  await fav48.toFile(path.resolve('app/favicon.ico'));

  // 32x32
  const fav32 = await makeIcon(32, 6, 1);
  await fav32.toFile(path.resolve('public/favicon-32x32.png'));

  // 16x16
  const fav16 = await makeIcon(16, 3, 1);
  await fav16.toFile(path.resolve('public/favicon-16x16.png'));

  // 192x192 icon.png
  const icon192 = await makeIcon(192, 32, 10);
  await icon192.toFile(path.resolve('app/icon.png'));
  await icon192.toFile(path.resolve('public/icon.png'));

  // 180x180 apple-icon.png
  const icon180 = await makeIcon(180, 30, 10);
  await icon180.toFile(path.resolve('app/apple-icon.png'));
  await icon180.toFile(path.resolve('public/apple-icon.png'));

  console.log('All crescent favicon and app icon assets generated successfully!');
}

generateAllAssets().catch(err => {
  console.error(err);
  process.exit(1);
});
