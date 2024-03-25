"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.captureScreen = void 0;
const electron_1 = require("electron");
const jimp_1 = __importDefault(require("jimp"));
const path_1 = __importDefault(require("path"));
const sharp_1 = __importDefault(require("sharp"));
async function captureScreen() {
    // Issue 1 : DesktopCapturer is not accesible
    const sources = await electron_1.desktopCapturer.getSources({
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
    await (0, sharp_1.default)(browser.thumbnail.toPNG())
        .jpeg({ quality: 100 })
        .resize({
        width: 1920,
        height: 1080,
        position: 'bottom',
    })
        .toFile(`generated/compare.jpeg`);
    const [base, compare] = await Promise.all([
        jimp_1.default.read(path_1.default.join(__dirname, `../../../../assets/base.png`)),
        jimp_1.default.read(`generated/compare.jpeg`),
    ]);
    // Issue 2 : This is heavy, that's why we want to run it in a child process
    const diff = jimp_1.default.diff(base, compare, 0.1);
    return diff;
}
exports.captureScreen = captureScreen;
