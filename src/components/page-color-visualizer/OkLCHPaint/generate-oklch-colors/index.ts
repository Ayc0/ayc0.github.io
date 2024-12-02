import GenerateColorsWorker from "./generate-oklch-colors.worker.ts?worker";

const doesSupportColorSpace = new ImageData(1, 1).colorSpace !== undefined;
const worker = new GenerateColorsWorker();

export const createGenerateColors = (offscreenCanvas: OffscreenCanvas) => {
  worker.postMessage(offscreenCanvas, [offscreenCanvas]);
  return (hue: number, width: number, height: number) => {
    worker.postMessage([
      hue,
      width,
      height,
      doesSupportColorSpace ? "display-p3" : "srgb",
    ]);
  };
};
