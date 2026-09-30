import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const publicDir = path.resolve('public');
const assetsSrcDir = path.resolve('assets-src');

if (!fs.existsSync(assetsSrcDir)) {
  fs.mkdirSync(assetsSrcDir, { recursive: true });
}

// Config for each image: target width, quality
const imageConfigs = [
  // Gallery images (displayed at ~328px -> 2x = 656px)
  { file: 'gallery-audi-interior.png', targetWidth: 656, quality: 75 },
  { file: 'gallery-audi-q5.jpg', targetWidth: 656, quality: 75 },
  { file: 'gallery-freightliner.jpg', targetWidth: 656, quality: 75 },
  { file: 'gallery-gehl-loader.jpg', targetWidth: 656, quality: 75 },
  { file: 'gallery-hyundai-elantra.png', targetWidth: 656, quality: 75 },
  { file: 'gallery-mack-truck.jpg', targetWidth: 656, quality: 75 },
  { file: 'gallery-mercedes-engine.jpg', targetWidth: 656, quality: 75 },
  { file: 'gallery-tesla-modelx.jpg', targetWidth: 656, quality: 75 },
  { file: 'gallery-toyota-4runner.jpg', targetWidth: 656, quality: 75 },
  { file: 'gallery-toyota-highlander.jpg', targetWidth: 656, quality: 75 },

  // Service images (displayed at ~323px -> 2x = 646px; interior also used in about at 480px -> 2x = 960px)
  { file: 'service-ai-interior.png', targetWidth: 960, quality: 75 },
  { file: 'service-ai-odor.png', targetWidth: 646, quality: 75 },
  { file: 'service-ai-stain.png', targetWidth: 646, quality: 75 },
  { file: 'service-ai-steam.png', targetWidth: 646, quality: 75 },
  { file: 'service-ai-truck.png', targetWidth: 646, quality: 75 },
  { file: 'service-van.jpg', targetWidth: 646, quality: 75 },

  // Hero Porsche (displayed at max ~600px desktop -> max 1024px)
  { file: 'porsche-hero.png', targetWidth: 1024, quality: 80 },

  // Hero background
  { file: 'hero-bg.jpg', targetWidth: 1280, quality: 75 },

  // Logo
  { file: 'logo.png', targetWidth: 480, quality: 80 }
];

async function run() {
  console.log('--- Starting Image Optimization ---');
  let totalBefore = 0;
  let totalAfter = 0;
  const report = [];

  for (const config of imageConfigs) {
    const srcPath = path.join(publicDir, config.file);
    if (!fs.existsSync(srcPath)) {
      // Check if already moved to assetsSrcDir
      const backupPath = path.join(assetsSrcDir, config.file);
      if (!fs.existsSync(backupPath)) {
        console.warn(`File not found: ${config.file}`);
        continue;
      }
    }

    const inputPath = fs.existsSync(srcPath) ? srcPath : path.join(assetsSrcDir, config.file);
    const beforeStats = fs.statSync(inputPath);
    const beforeSize = beforeStats.size;
    totalBefore += beforeSize;

    const baseName = config.file.substring(0, config.file.lastIndexOf('.'));
    const destWebpName = `${baseName}.webp`;
    const destPath = path.join(publicDir, destWebpName);

    const image = sharp(inputPath);
    const metadata = await image.metadata();

    let resizeWidth = config.targetWidth;
    if (metadata.width && metadata.width < resizeWidth) {
      resizeWidth = metadata.width; // Never upscale
    }

    await sharp(inputPath)
      .resize({ width: resizeWidth, withoutEnlargement: true })
      .webp({ quality: config.quality, effort: 6 })
      .toFile(destPath);

    const afterStats = fs.statSync(destPath);
    const afterSize = afterStats.size;
    totalAfter += afterSize;

    // Move original to assets-src if it's still in public
    if (fs.existsSync(srcPath)) {
      const targetBackup = path.join(assetsSrcDir, config.file);
      fs.renameSync(srcPath, targetBackup);
    }

    report.push({
      file: config.file,
      webp: destWebpName,
      beforeKiB: (beforeSize / 1024).toFixed(1),
      afterKiB: (afterSize / 1024).toFixed(1),
      reduction: ((1 - afterSize / beforeSize) * 100).toFixed(1) + '%'
    });
  }

  console.table(report);
  console.log(`Total Before: ${(totalBefore / 1024).toFixed(1)} KiB (${(totalBefore / 1024 / 1024).toFixed(2)} MB)`);
  console.log(`Total After: ${(totalAfter / 1024).toFixed(1)} KiB (${(totalAfter / 1024 / 1024).toFixed(2)} MB)`);
  console.log(`Total Savings: ${((1 - totalAfter / totalBefore) * 100).toFixed(1)}%`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
