import { desktopCapturer } from 'electron';
import Jimp from 'jimp';
import path from 'path';
import sharp from 'sharp';

export async function captureScreen() {
  // Issue 1 : DesktopCapturer is not accesible
  const sources = await desktopCapturer.getSources({
    types: ['window'],
    thumbnailSize: {
      width: 1920,
      height: 1080,
    },
  });
  const browser = sources.find((s) => s.name === 'Chrome');

  if (browser == null) {
    return console.debug('Unable to find browser. Is it running?');
  }

  await sharp(browser.thumbnail.toPNG())
    .jpeg({ quality: 100 })
    .resize({
      width: 1920,
      height: 1080,
      position: 'bottom',
    })
    .toFile(`generated/compare.jpeg`);
  const [base, compare] = await Promise.all([
    Jimp.read(path.join(__dirname, `../../../../assets/base.png`)),
    Jimp.read(`generated/compare.jpeg`),
  ]);

  // Issue 2 : This is heavy, that's why we want to run it in a child process
  const diff = Jimp.diff(base, compare, 0.1);

  return diff;
}
