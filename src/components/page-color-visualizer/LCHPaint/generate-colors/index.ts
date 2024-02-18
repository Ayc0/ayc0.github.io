import GenerateColorsWorker from "./generate-colors.worker.ts?worker";

const worker = new GenerateColorsWorker();

export const createGenerateColors = () => {
  return (
    hue: number,
    width: number,
    height: number
  ): Promise<Uint8ClampedArray> => {
    return new Promise((res) => {
      worker.onmessage = (event: MessageEvent<Uint8ClampedArray>) => {
        res(event.data.slice());
      };
      worker.postMessage([hue, width, height]);
    });
  };
};
