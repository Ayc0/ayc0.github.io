import GenerateColorsWorker from "./generate-lch-colors.worker.ts?worker";

// TODO: use https://docs.rs/palette/latest/palette/ and WASM instead of a web worker

let prevWorker: Worker | null = null;
const isRunningMap = new WeakMap<Worker, boolean>();

const doesSupportColorSpace = new ImageData(1, 1).colorSpace !== undefined;

export const createGenerateColors = () => {
  return (
    hue: number,
    width: number,
    height: number
  ): Promise<Uint8ClampedArray> => {
    if (prevWorker && isRunningMap.get(prevWorker)) {
      prevWorker.terminate();
    }

    const worker = new GenerateColorsWorker();
    prevWorker = worker;

    return new Promise((res) => {
      worker.onmessage = (event: MessageEvent<Uint8ClampedArray>) => {
        isRunningMap.set(worker, false);
        res(event.data.slice());
      };

      isRunningMap.set(worker, true);
      worker.postMessage([
        hue,
        width,
        height,
        doesSupportColorSpace ? "display-p3" : "srgb",
      ]);
    });
  };
};
