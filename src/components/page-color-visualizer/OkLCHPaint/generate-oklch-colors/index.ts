import GenerateColorsWorker from "./generate-oklch-colors.worker.ts?worker";

let prevWorker: Worker | null = null;
const isRunningMap = new WeakMap<Worker, boolean>();

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
      worker.postMessage([hue, width, height]);
    });
  };
};
